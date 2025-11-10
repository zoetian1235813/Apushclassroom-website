import "dotenv/config";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

import db from "./db.js";
import { sendVerificationCode } from "./email.js";
import { requireAuth } from "./middleware.js";
import { signToken } from "./tokens.js";
import {
  buildWeChatAuthUrl,
  exchangeWeChatCode,
  fetchWeChatUserInfo,
} from "./wechat.js";
import {
  generateNumericCode,
  generateState,
  isoNow,
  minutesFromNow,
  secondsFromNow,
} from "./utils.js";
import config from "./config.js";

const app = express();

const allowedOrigins = config.clientOrigins;

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  })
);
app.use(express.json());

app.get(config.healthPath, (req, res) => {
  res.json({
    status: "ok",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const emailCodeTtlSeconds = config.emailCodeTtlSeconds;
const wechatRedirectUri = config.wechatRedirectUri;
const openaiApiKey = config.openai.apiKey;
const openaiClient = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

let frqQuestionBank = [];
try {
  const frqRaw = readFileSync(
    new URL("../resources/frq/questions.json", import.meta.url),
    "utf-8"
  );
  frqQuestionBank = JSON.parse(frqRaw);
} catch (error) {
  console.error("[FRQ] Failed to load question bank:", error);
  frqQuestionBank = [];
}

const findFrqQuestion = (questionId) =>
  frqQuestionBank.find((question) => question.id === questionId);

const insertEmailCodeStmt = db.prepare(`
  INSERT INTO email_verification_codes (email, code, expires_at, created_at)
  VALUES (?, ?, ?, ?)
`);

const consumeEmailCodeStmt = db.prepare(`
  UPDATE email_verification_codes
  SET consumed = 1
  WHERE id = ?
`);

const findValidEmailCodeStmt = db.prepare(`
  SELECT *
  FROM email_verification_codes
  WHERE email = ?
    AND consumed = 0
  ORDER BY created_at DESC
  LIMIT 1
`);

const cleanupExpiredCodesStmt = db.prepare(`
  DELETE FROM email_verification_codes
  WHERE expires_at < ?
    OR consumed = 1
`);

const upsertUserByEmailStmt = db.prepare(`
  INSERT INTO users (id, email, display_name, created_at, updated_at, last_login_at)
  VALUES (@id, @email, @display_name, @created_at, @updated_at, @last_login_at)
  ON CONFLICT(email) DO UPDATE SET
    updated_at = excluded.updated_at,
    last_login_at = excluded.last_login_at
`);

const upsertUserByWeChatStmt = db.prepare(`
  INSERT INTO users (id, wechat_openid, wechat_unionid, display_name, avatar_url, created_at, updated_at, last_login_at)
  VALUES (@id, @wechat_openid, @wechat_unionid, @display_name, @avatar_url, @created_at, @updated_at, @last_login_at)
  ON CONFLICT(wechat_openid) DO UPDATE SET
    display_name = excluded.display_name,
    avatar_url = excluded.avatar_url,
    wechat_unionid = COALESCE(excluded.wechat_unionid, users.wechat_unionid),
    updated_at = excluded.updated_at,
    last_login_at = excluded.last_login_at
`);

const getUserByEmailStmt = db.prepare(`
  SELECT *
  FROM users
  WHERE email = ?
`);

const getUserByWeChatStmt = db.prepare(`
  SELECT *
  FROM users
  WHERE wechat_openid = ?
`);

const insertOauthStateStmt = db.prepare(`
  INSERT INTO oauth_states (state, redirect_uri, created_at, expires_at)
  VALUES (?, ?, ?, ?)
`);

const getOauthStateStmt = db.prepare(`
  SELECT *
  FROM oauth_states
  WHERE state = ?
`);

const deleteOauthStateStmt = db.prepare(`
  DELETE FROM oauth_states
  WHERE state = ?
`);

const selectProgressStmt = db.prepare(`
  SELECT topic_id AS topicId, step_id AS stepId
  FROM lesson_progress
  WHERE user_id = ?
`);

const upsertProgressStmt = db.prepare(`
  INSERT INTO lesson_progress (user_id, topic_id, step_id, completed, updated_at)
  VALUES (?, ?, ?, ?, ?)
  ON CONFLICT(user_id, topic_id, step_id) DO UPDATE SET
    completed = excluded.completed,
    updated_at = excluded.updated_at
`);

const deleteProgressStmt = db.prepare(`
  DELETE FROM lesson_progress
  WHERE user_id = ?
    AND topic_id = ?
    AND step_id = ?
`);

const upsertWrongQuestionStmt = db.prepare(`
  INSERT INTO wrong_questions (
    user_id,
    question_id,
    topic_id,
    topic_name,
    unit_id,
    unit_name,
    question_data,
    incorrect_count,
    last_incorrect_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
  ON CONFLICT(user_id, question_id) DO UPDATE SET
    topic_id = excluded.topic_id,
    topic_name = excluded.topic_name,
    unit_id = excluded.unit_id,
    unit_name = excluded.unit_name,
    question_data = excluded.question_data,
    incorrect_count = wrong_questions.incorrect_count + 1,
    last_incorrect_at = excluded.last_incorrect_at,
    resolved = 0,
    resolved_at = NULL
`);

const selectWrongQuestionsStmt = db.prepare(`
  SELECT *
  FROM wrong_questions
  WHERE user_id = ?
    AND resolved = 0
  ORDER BY last_incorrect_at DESC
`);

const getWrongQuestionStmt = db.prepare(`
  SELECT *
  FROM wrong_questions
  WHERE user_id = ?
    AND question_id = ?
    AND resolved = 0
`);

const resolveWrongQuestionStmt = db.prepare(`
  UPDATE wrong_questions
  SET resolved = 1,
      resolved_at = ?
  WHERE user_id = ?
    AND question_id = ?
`);

const mapWrongQuestion = (row) => {
  if (!row) {
    return null;
  }
  let questionData = null;
  try {
    questionData = row.question_data ? JSON.parse(row.question_data) : null;
  } catch (error) {
    console.warn("[WrongQuestions] Failed to parse question_data", error);
  }
  return {
    id: row.id,
    questionId: row.question_id,
    topicId: row.topic_id,
    topicName: row.topic_name,
    unitId: row.unit_id,
    unitName: row.unit_name,
    incorrectCount: row.incorrect_count,
    lastIncorrectAt: row.last_incorrect_at,
    questionData,
  };
};

const mapUser = (user) => ({
  id: user.id,
  email: user.email,
  displayName: user.display_name,
  avatarUrl: user.avatar_url,
  wechatOpenId: user.wechat_openid,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
  lastLoginAt: user.last_login_at,
});

const validateEmail = (email) => {
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailPattern.test(email);
};

app.get("/healthz", (_req, res) => {
  res.json({ ok: true, timestamp: isoNow() });
});

app.post("/auth/email/request-code", async (req, res) => {
  const { email } = req.body ?? {};

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required" });
  }

  const code = generateNumericCode(6);
  const createdAt = isoNow();
  const expiresAt = secondsFromNow(emailCodeTtlSeconds);

  try {
    insertEmailCodeStmt.run(email.toLowerCase(), code, expiresAt, createdAt);
    cleanupExpiredCodesStmt.run(isoNow());
    await sendVerificationCode(email, code);
  } catch (error) {
    console.error("[Email] Failed to send verification code:", error);
    return res
      .status(500)
      .json({ error: "Failed to send verification email. Please try again." });
  }

  return res.json({ success: true, expiresAt });
});

app.post("/auth/email/verify", (req, res) => {
  const { email, code } = req.body ?? {};

  if (!email || !code) {
    return res
      .status(400)
      .json({ error: "Email and verification code are required" });
  }

  const record = findValidEmailCodeStmt.get(email.toLowerCase());

  if (!record) {
    return res.status(400).json({ error: "Invalid or expired verification code" });
  }

  if (record.code !== code) {
    return res.status(400).json({ error: "Invalid verification code" });
  }

  if (new Date(record.expires_at) < new Date()) {
    return res.status(400).json({ error: "Verification code has expired" });
  }

  consumeEmailCodeStmt.run(record.id);

  const now = isoNow();
  let user = getUserByEmailStmt.get(email.toLowerCase());
  if (!user) {
    const newUser = {
      id: uuidv4(),
      email: email.toLowerCase(),
      display_name: email.split("@")[0],
      created_at: now,
      updated_at: now,
      last_login_at: now,
    };
    upsertUserByEmailStmt.run(newUser);
    user = getUserByEmailStmt.get(email.toLowerCase());
  } else {
    upsertUserByEmailStmt.run({
      id: user.id,
      email: user.email,
      display_name: user.display_name,
      created_at: user.created_at,
      updated_at: now,
      last_login_at: now,
    });
    user = getUserByEmailStmt.get(email.toLowerCase());
  }

  const token = signToken({ sub: user.id, provider: "email" });

  return res.json({
    token,
    user: mapUser(user),
  });
});

app.get("/auth/wechat/url", (req, res) => {
  const { redirectUri } = req.query;
  if (!redirectUri) {
    return res.status(400).json({ error: "redirectUri query parameter is required" });
  }
  const state = generateState();
  const createdAt = isoNow();
  const expiresAt = minutesFromNow(10);
  insertOauthStateStmt.run(state, redirectUri, createdAt, expiresAt);
  const url = buildWeChatAuthUrl({
    redirectUri: wechatRedirectUri,
    state,
  });
  return res.json({ url, state, expiresAt });
});

app.get("/auth/wechat/callback", async (req, res) => {
  const { code, state, error, error_description: errorDescription } = req.query;

  if (error) {
    console.error("[WeChat] OAuth error:", error, errorDescription);
    return res.status(400).send("WeChat authorization failed.");
  }

  if (!code || !state) {
    return res.status(400).send("Missing OAuth code or state.");
  }

  const stateRecord = getOauthStateStmt.get(state);
  if (!stateRecord) {
    return res.status(400).send("Invalid OAuth state.");
  }

  deleteOauthStateStmt.run(state);

  if (new Date(stateRecord.expires_at) < new Date()) {
    return res.status(400).send("OAuth state has expired.");
  }

  try {
    const tokenData = await exchangeWeChatCode(code);
    const { access_token: accessToken, openid, unionid } = tokenData;
    let userInfo = null;

    try {
      userInfo = await fetchWeChatUserInfo(accessToken, openid);
    } catch (fetchError) {
      console.warn("[WeChat] Could not fetch user info:", fetchError);
    }

    const now = isoNow();
    let user = getUserByWeChatStmt.get(openid);
    const wechatUserRecord = {
      id: user?.id ?? uuidv4(),
      wechat_openid: openid,
      wechat_unionid: unionid || user?.wechat_unionid || null,
      display_name:
        userInfo?.nickname || user?.display_name || `WeChat User ${openid.slice(-4)}`,
      avatar_url: userInfo?.headimgurl || user?.avatar_url || null,
      created_at: user?.created_at ?? now,
      updated_at: now,
      last_login_at: now,
    };

    upsertUserByWeChatStmt.run(wechatUserRecord);
    user = getUserByWeChatStmt.get(openid);

    const token = signToken({ sub: user.id, provider: "wechat" });

    const redirectUrl = new URL(stateRecord.redirect_uri);
    redirectUrl.searchParams.set("provider", "wechat");
    redirectUrl.searchParams.set("authToken", token);

    return res.redirect(redirectUrl.toString());
  } catch (exchangeError) {
    console.error("[WeChat] Failed to complete OAuth:", exchangeError);
    return res.status(500).send("WeChat login failed. Please try again.");
  }
});

app.get("/auth/me", requireAuth, (req, res) => {
  const user = mapUser(req.user);
  const progress = selectProgressStmt.all(req.user.id);
  return res.json({ user, progress });
});

app.get("/progress", requireAuth, (req, res) => {
  const progress = selectProgressStmt.all(req.user.id);
  return res.json({ progress });
});

app.post("/progress", requireAuth, (req, res) => {
  const { topicId, stepId, completed } = req.body ?? {};
  if (!topicId || !stepId) {
    return res.status(400).json({ error: "topicId and stepId are required" });
  }

  if (completed) {
    upsertProgressStmt.run(
      req.user.id,
      topicId,
      stepId,
      1,
      isoNow()
    );
  } else {
    deleteProgressStmt.run(req.user.id, topicId, stepId);
  }

  const progress = selectProgressStmt.all(req.user.id);
  return res.json({ success: true, progress });
});

app.get("/wrong-questions", requireAuth, (req, res) => {
  const rows = selectWrongQuestionsStmt.all(req.user.id);
  const items = rows.map(mapWrongQuestion).filter(Boolean);
  const topicMap = new Map();
  items.forEach((item) => {
    if (!item) {
      return;
    }
    const existing = topicMap.get(item.topicId) || {
      topicId: item.topicId,
      topicName: item.topicName,
      unitName: item.unitName,
      count: 0,
      latestIncorrectAt: item.lastIncorrectAt,
    };
    existing.count += 1;
    if (
      item.lastIncorrectAt &&
      item.lastIncorrectAt > (existing.latestIncorrectAt || "")
    ) {
      existing.latestIncorrectAt = item.lastIncorrectAt;
    }
    topicMap.set(item.topicId, existing);
  });
  const topicStats = Array.from(topicMap.values()).sort((a, b) => {
    if (a.count === b.count) {
      return (b.latestIncorrectAt || "").localeCompare(a.latestIncorrectAt || "");
    }
    return b.count - a.count;
  });
  return res.json({
    items,
    topicStats,
    total: items.length,
  });
});

app.post("/wrong-questions", requireAuth, (req, res) => {
  const {
    questionId,
    topicId,
    topicName,
    unitId,
    unitName,
    question,
  } = req.body ?? {};

  if (!questionId || !topicId || !question) {
    return res.status(400).json({
      error: "questionId, topicId, and question payload are required.",
    });
  }

  const payloadString = JSON.stringify(question);
  const now = isoNow();

  upsertWrongQuestionStmt.run(
    req.user.id,
    questionId,
    topicId,
    topicName || null,
    typeof unitId === "number" ? unitId : null,
    unitName || null,
    payloadString,
    now
  );

  const recordRow = getWrongQuestionStmt.get(req.user.id, questionId);
  return res.json({
    record: mapWrongQuestion(recordRow),
  });
});

app.post("/wrong-questions/resolve", requireAuth, (req, res) => {
  const { questionId } = req.body ?? {};
  if (!questionId) {
    return res.status(400).json({ error: "questionId is required." });
  }
  resolveWrongQuestionStmt.run(isoNow(), req.user.id, questionId);
  return res.json({ success: true });
});

const MIN_FRQ_LENGTH = 80;

const buildRubricPrompt = (question) => {
  const generalNotes = question.rubric.generalNotes
    .map((note) => `- ${note}`)
    .join("\n");
  const criteriaNotes = question.rubric.criteria
    .map((criterion) => {
      const earnNotes = criterion.earningNotes
        .map((note) => `    - ${note}`)
        .join("\n");
      const pitfalls = (criterion.sampleMisses ?? [])
        .map((note) => `    - ${note}`)
        .join("\n");
      return [
        `${criterion.row} (${criterion.maxPoints} pt${criterion.maxPoints > 1 ? "s" : ""}) – ${criterion.title}`,
        `  Description: ${criterion.description}`,
        `  Earn the point:\n${earnNotes}`,
        pitfalls ? `  Common misses:\n${pitfalls}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return `General Notes:\n${generalNotes}\n\nCriteria:\n${criteriaNotes}`;
};

app.post("/frq/grade", async (req, res) => {
  if (!openaiClient) {
    return res.status(500).json({ error: "AI grading is not configured." });
  }
  const { questionId, response } = req.body ?? {};
  if (!questionId || typeof questionId !== "string") {
    return res.status(400).json({ error: "questionId is required." });
  }
  if (!response || typeof response !== "string") {
    return res.status(400).json({ error: "response is required." });
  }
  if (response.trim().length < MIN_FRQ_LENGTH) {
    return res.status(400).json({ error: "请提供更完整的作答内容再请求 AI 评分。" });
  }

  const question = findFrqQuestion(questionId);
  if (!question) {
    return res.status(404).json({ error: "Question not found." });
  }

  const rubricPrompt = buildRubricPrompt(question);

  const systemPrompt =
    "You are an experienced AP United States History reader. Score student essays strictly according to the official College Board rubric. Always return valid JSON.";

  const userPrompt = `
APUSH Question:
${question.prompt}

Rubric (max ${question.pointsPossible} points):
${rubricPrompt}

Student response:
${response.trim()}

Return JSON with the following shape:
{
  "questionId": "${question.id}",
  "totalScore": number between 0 and ${question.pointsPossible},
  "maxScore": ${question.pointsPossible},
  "summary": "overall evaluation in 1-2 sentences",
  "suggestions": ["actionable next steps"],
  "breakdown": [
    {
      "criterionId": "row-a",
      "title": "Thesis / Claim",
      "awardedPoints": 0-1,
      "maxPoints": 1,
      "feedback": "specific feedback for this row"
    }
  ]
}
`;

  try {
    const completion = await openaiClient.chat.completions.create({
      model: config.openai.model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const rawContent =
      completion.choices?.[0]?.message?.content?.trim() || "{}";
    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (parseError) {
      console.error("[FRQ] Failed to parse AI response:", rawContent, parseError);
      return res.status(502).json({
        error: "AI 返回数据异常，请重试。",
      });
    }

    const breakdown = Array.isArray(parsed.breakdown) ? parsed.breakdown : [];
    const normalizedBreakdown = question.rubric.criteria.map((criterion) => {
      const match = breakdown.find(
        (item) => item?.criterionId === criterion.id
      );
      const awarded = Number(match?.awardedPoints ?? match?.score ?? 0);
      return {
        criterionId: criterion.id,
        title: match?.title || criterion.title,
        awardedPoints: Math.max(
          0,
          Math.min(criterion.maxPoints, Number.isFinite(awarded) ? awarded : 0)
        ),
        maxPoints: criterion.maxPoints,
        feedback:
          match?.feedback ||
          match?.comment ||
          "No specific feedback was provided for this row.",
      };
    });

    const suggestions = Array.isArray(parsed.suggestions)
      ? parsed.suggestions.filter((item) => typeof item === "string")
      : [];

    const totalScoreRaw = Number(parsed.totalScore ?? parsed.score ?? 0);
    const responseBody = {
      questionId: question.id,
      totalScore: Math.max(
        0,
        Math.min(
          question.pointsPossible,
          Number.isFinite(totalScoreRaw) ? totalScoreRaw : 0
        )
      ),
      maxScore: question.pointsPossible,
      summary:
        typeof parsed.summary === "string"
          ? parsed.summary
          : "评分完成，但未提供摘要。",
      suggestions,
      breakdown: normalizedBreakdown,
      rawModelResponse: rawContent,
    };

    return res.json(responseBody);
  } catch (error) {
    console.error("[FRQ] AI grading failed:", error);
    if (error?.response?.status === 401) {
      return res.status(500).json({ error: "OpenAI API key is invalid." });
    }
    return res.status(500).json({
      error: "AI 评分失败，请稍后重试。",
    });
  }
});

app.delete("/progress", requireAuth, (req, res) => {
  const { topicId, stepId } = req.body ?? {};
  if (!topicId || !stepId) {
    return res.status(400).json({ error: "topicId and stepId are required" });
  }
  deleteProgressStmt.run(req.user.id, topicId, stepId);
  const progress = selectProgressStmt.all(req.user.id);
  return res.json({ success: true, progress });
});

const isDirectRun =
  process.argv[1] && process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  app.listen(config.port, () => {
    console.log(`[Server] API listening on port ${config.port}`);
  });
}

export default app;
