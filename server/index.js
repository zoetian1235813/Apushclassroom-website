import "dotenv/config";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

import db from "./db.js";
import { canTradeBetween as canSilkTrade } from "./silkRoadsRules.js";
import { sendVerificationCode } from "./email.js";
import { requireAuth, requireAdmin } from "./middleware.js";
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
const adminEmail = (process.env.ADMIN_EMAIL || "admin@apush.com").toLowerCase().trim();
const adminPassword = process.env.ADMIN_PASSWORD || "111111";
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

const insertGuestUserStmt = db.prepare(`
  INSERT INTO users (
    id,
    display_name,
    account_type,
    subscription_status,
    content_region,
    created_at,
    updated_at,
    last_login_at
  )
  VALUES (?, ?, 'guest', 'free', 'overseas', ?, ?, ?)
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

const updateContentRegionStmt = db.prepare(`
  UPDATE users
  SET content_region = ?,
      updated_at = ?
  WHERE id = ?
`);

const updateSubscriptionStmt = db.prepare(`
  UPDATE users
  SET subscription_status = ?,
      subscription_updated_at = ?,
      updated_at = ?
  WHERE id = ?
`);

const selectAdminUsersStmt = db.prepare(`
  SELECT
    id,
    email,
    wechat_openid,
    account_type,
    display_name,
    subscription_status,
    content_region,
    subscription_updated_at,
    subscription_expires_at,
    created_at,
    updated_at,
    last_login_at
  FROM users
  ORDER BY updated_at DESC
`);

const getUserByIdStmt = db.prepare(`
  SELECT *
  FROM users
  WHERE id = ?
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

const mapUser = (user) => {
  if (!user) return null;
  const now = new Date();
  const isExpired = user.subscription_expires_at && new Date(user.subscription_expires_at) < now;
  return {
    id: user.id,
    email: user.email,
    displayName: user.display_name,
    avatarUrl: user.avatar_url,
    wechatOpenId: user.wechat_openid,
    accountType: user.account_type || "registered",
    subscriptionStatus: isExpired ? "free" : (user.subscription_status || "free"),
    contentRegion: user.content_region || "overseas",
    subscriptionUpdatedAt: user.subscription_updated_at,
    subscriptionExpiresAt: user.subscription_expires_at,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    lastLoginAt: user.last_login_at,
  };
};

const validContentRegions = new Set(["china", "overseas"]);
const validSubscriptionStatuses = new Set(["free", "pending", "active"]);


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

  const normalizedEmail = email.toLowerCase().trim();
  const normalizedCode = code.trim();

  // Promo Account Bypass (e.g. apush101 with code 123456)
  const isPromoPattern = /^apush\d+$/.test(normalizedEmail);
  if (isPromoPattern && normalizedCode === "123456") {
    const now = isoNow();
    const nextYearExamEnd = "2027-06-30T23:59:59.999Z";
    let user = getUserByEmailStmt.get(normalizedEmail);

    if (!user) {
      const newUser = {
        id: uuidv4(),
        email: normalizedEmail,
        display_name: normalizedEmail.toUpperCase(),
        created_at: now,
        updated_at: now,
        last_login_at: now,
      };
      upsertUserByEmailStmt.run(newUser);
      
      // Set to active premium with expiration
      db.prepare(`
        UPDATE users 
        SET subscription_status = 'active', subscription_expires_at = ?, subscription_updated_at = ?
        WHERE id = ?
      `).run(nextYearExamEnd, now, newUser.id);
      
      user = getUserByEmailStmt.get(normalizedEmail);
    } else {
      // Force set to active premium and update login timestamp
      db.prepare(`
        UPDATE users 
        SET subscription_status = 'active', subscription_expires_at = ?, subscription_updated_at = ?, last_login_at = ?, updated_at = ?
        WHERE id = ?
      `).run(nextYearExamEnd, now, now, now, user.id);
      
      user = getUserByEmailStmt.get(normalizedEmail);
    }

    const token = signToken({ sub: user.id, provider: "email" });

    return res.json({
      token,
      user: mapUser(user),
    });
  }

  // Admin Account and Password Bypass
  if (
    (normalizedEmail === adminEmail || normalizedEmail === "admin" || normalizedEmail === "admin@apush.com") &&
    normalizedCode === adminPassword
  ) {
    const now = isoNow();
    const activeAdminEmail = normalizedEmail === "admin" ? adminEmail : normalizedEmail;
    let user = getUserByEmailStmt.get(activeAdminEmail);
    if (!user) {
      const adminUserId = uuidv4();
      const newUser = {
        id: adminUserId,
        email: activeAdminEmail,
        display_name: "Admin",
        created_at: now,
        updated_at: now,
        last_login_at: now,
      };
      upsertUserByEmailStmt.run(newUser);
      
      // Force set to admin and active premium
      updateSubscriptionStmt.run("active", now, now, adminUserId);
      db.prepare(`UPDATE users SET account_type = 'admin' WHERE id = ?`).run(adminUserId);
      
      user = getUserByEmailStmt.get(activeAdminEmail);
    } else {
      // Force set to admin and active premium
      updateSubscriptionStmt.run("active", now, now, user.id);
      db.prepare(`UPDATE users SET account_type = 'admin' WHERE id = ?`).run(user.id);
      
      upsertUserByEmailStmt.run({
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        created_at: user.created_at,
        updated_at: now,
        last_login_at: now,
      });
      user = getUserByEmailStmt.get(activeAdminEmail);
    }

    const token = signToken({ sub: user.id, provider: "email" });

    return res.json({
      token,
      user: mapUser(user),
    });
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

app.post("/auth/guest", (_req, res) => {
  const now = isoNow();
  const id = uuidv4();
  insertGuestUserStmt.run(id, "Guest User", now, now, now);
  const user = getUserByIdStmt.get(id);
  const token = signToken({ sub: user.id, provider: "guest" });

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

app.patch("/account/preferences", requireAuth, (req, res) => {
  const { contentRegion } = req.body ?? {};
  if (!validContentRegions.has(contentRegion)) {
    return res.status(400).json({ error: "contentRegion must be china or overseas" });
  }

  updateContentRegionStmt.run(contentRegion, isoNow(), req.user.id);
  const user = getUserByIdStmt.get(req.user.id);
  return res.json({ user: mapUser(user) });
});

app.post("/billing/upgrade-request", requireAuth, (req, res) => {
  const now = isoNow();
  updateSubscriptionStmt.run("pending", now, now, req.user.id);
  const user = getUserByIdStmt.get(req.user.id);
  return res.json({
    user: mapUser(user),
    message: "Upgrade request recorded. Admin can review this account.",
  });
});

app.post("/billing/activate", requireAuth, (req, res) => {
  const { code } = req.body ?? {};
  if (!code) {
    return res.status(400).json({ error: "激活码不能为空" });
  }

  const normalizedCode = code.trim().toUpperCase();

  const stmt = db.prepare(`SELECT * FROM activation_codes WHERE code = ?`);
  const record = stmt.get(normalizedCode);

  if (!record) {
    return res.status(400).json({ error: "无效的激活码，请检查拼写" });
  }

  if (record.consumed === 1) {
    return res.status(400).json({ error: "该激活码已被使用" });
  }

  const now = isoNow();

  db.prepare(`
    UPDATE activation_codes
    SET consumed = 1, consumed_by = ?, consumed_at = ?
    WHERE code = ?
  `).run(req.user.id, now, normalizedCode);

  updateSubscriptionStmt.run("active", now, now, req.user.id);

  const user = getUserByIdStmt.get(req.user.id);

  return res.json({
    success: true,
    user: mapUser(user),
    message: "账号激活成功！已开通高级权限（Premium）。",
  });
});

app.get("/admin/users", requireAdmin, (_req, res) => {
  const users = selectAdminUsersStmt.all().map((user) => ({
    id: user.id,
    email: user.email,
    wechatOpenId: user.wechat_openid,
    accountType: user.account_type,
    displayName: user.display_name,
    subscriptionStatus: user.subscription_status,
    contentRegion: user.content_region,
    subscriptionUpdatedAt: user.subscription_updated_at,
    subscriptionExpiresAt: user.subscription_expires_at,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    lastLoginAt: user.last_login_at,
  }));
  return res.json({ users });
});

app.patch("/admin/users/:userId/subscription", requireAdmin, (req, res) => {
  const { userId } = req.params;
  const { subscriptionStatus } = req.body ?? {};
  if (!validSubscriptionStatuses.has(subscriptionStatus)) {
    return res
      .status(400)
      .json({ error: "subscriptionStatus must be free, pending, or active" });
  }

  const existingUser = getUserByIdStmt.get(userId);
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  const now = isoNow();
  updateSubscriptionStmt.run(subscriptionStatus, now, now, userId);
  const user = getUserByIdStmt.get(userId);
  return res.json({ user: mapUser(user) });
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

// ==================== ADMIN ENDPOINTS ====================

// 1. GET /api/admin/stats - Overview stats
app.get("/api/admin/stats", requireAdmin, (req, res) => {
  try {
    const totalUsers = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;
    const activePremium = db.prepare("SELECT COUNT(*) AS count FROM users WHERE subscription_status = 'active'").get().count;
    const pendingRequests = db.prepare("SELECT COUNT(*) AS count FROM users WHERE subscription_status = 'pending'").get().count;
    const totalCodes = db.prepare("SELECT COUNT(*) AS count FROM activation_codes").get().count;
    const unusedCodes = db.prepare("SELECT COUNT(*) AS count FROM activation_codes WHERE consumed = 0").get().count;

    return res.json({
      totalUsers,
      activePremium,
      pendingRequests,
      totalCodes,
      unusedCodes,
    });
  } catch (err) {
    console.error("[Admin Stats Error]:", err);
    return res.status(500).json({ error: "Failed to fetch admin stats" });
  }
});

// 2. GET /api/admin/users - Users directory with details
app.get("/api/admin/users", requireAdmin, (req, res) => {
  try {
    const users = db.prepare("SELECT * FROM users ORDER BY created_at DESC").all();
    
    // Enrich users with progress info and mistake counts
    const enrichedUsers = users.map(user => {
      const progressCount = db.prepare("SELECT COUNT(*) AS count FROM lesson_progress WHERE user_id = ? AND completed = 1").get(user.id).count;
      const mistakeCount = db.prepare("SELECT COUNT(*) AS count FROM wrong_questions WHERE user_id = ?").get(user.id).count;
      
      return {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        avatarUrl: user.avatar_url,
        accountType: user.account_type,
        subscriptionStatus: user.subscription_status,
        contentRegion: user.content_region,
        createdAt: user.created_at,
        lastLoginAt: user.last_login_at,
        progressCount,
        mistakeCount,
        subscriptionExpiresAt: user.subscription_expires_at
      };
    });

    return res.json({ users: enrichedUsers });
  } catch (err) {
    console.error("[Admin Users Error]:", err);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 3. PATCH /api/admin/users/:id/subscription - Change user status or upgrade
app.patch("/api/admin/users/:id/subscription", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { subscriptionStatus, accountType, subscriptionExpiresAt } = req.body ?? {};
  
  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedAt = new Date().toISOString();
    const updatedSubStatus = subscriptionStatus || user.subscription_status;
    const updatedAccountType = accountType || user.account_type;
    const nextYearExamEnd = "2027-06-30T23:59:59.999Z";
    const updatedSubExpiresAt = subscriptionExpiresAt !== undefined ? subscriptionExpiresAt : (updatedSubStatus === "active" && !user.subscription_expires_at ? nextYearExamEnd : user.subscription_expires_at);

    db.prepare(`
      UPDATE users 
      SET subscription_status = ?, account_type = ?, updated_at = ?, subscription_updated_at = ?, subscription_expires_at = ?
      WHERE id = ?
    `).run(updatedSubStatus, updatedAccountType, updatedAt, updatedAt, updatedSubExpiresAt, id);

    const updatedUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    return res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("[Admin Update User Error]:", err);
    return res.status(500).json({ error: "Failed to update user subscription" });
  }
});

// 4. GET /api/admin/users/:id/progress - Fetch detailed student learning progress
app.get("/api/admin/users/:id/progress", requireAdmin, (req, res) => {
  const { id } = req.params;
  try {
    const progress = db.prepare("SELECT topic_id, step_id, updated_at FROM lesson_progress WHERE user_id = ?").all(id);
    const mistakes = db.prepare("SELECT * FROM wrong_questions WHERE user_id = ?").all(id);
    return res.json({ progress, mistakes });
  } catch (err) {
    console.error("[Admin Progress Fetch Error]:", err);
    return res.status(500).json({ error: "Failed to fetch student learning profile" });
  }
});

// 5. DELETE /api/admin/users/:id - Delete a user (cascades)
app.delete("/api/admin/users/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  try {
    db.prepare("DELETE FROM users WHERE id = ?").run(id);
    return res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("[Admin Delete User Error]:", err);
    return res.status(500).json({ error: "Failed to delete user" });
  }
});

// 6. GET /api/admin/codes - List all activation codes
app.get("/api/admin/codes", requireAdmin, (req, res) => {
  try {
    const codes = db.prepare(`
      SELECT ac.*, u.email AS consumed_by_email 
      FROM activation_codes ac
      LEFT JOIN users u ON ac.consumed_by = u.id
      ORDER BY ac.consumed_at DESC, ac.code ASC
    `).all();
    return res.json({ codes });
  } catch (err) {
    console.error("[Admin Codes Error]:", err);
    return res.status(500).json({ error: "Failed to fetch activation codes" });
  }
});

// 7. POST /api/admin/codes - Generate custom/batch activation codes
app.post("/api/admin/codes", requireAdmin, (req, res) => {
  const { code, count, prefix } = req.body ?? {};
  try {
    if (code) {
      // Create a single custom code
      db.prepare("INSERT INTO activation_codes (code, consumed) VALUES (?, 0)").run(code.trim().toUpperCase());
    } else {
      // Batch generate
      const codesGenerated = [];
      const batchPrefix = (prefix || "APUSH-").trim().toUpperCase();
      const codeCount = count || 5;

      for (let i = 0; i < codeCount; i++) {
        const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
        const finalCode = `${batchPrefix}${randomStr}`;
        db.prepare("INSERT INTO activation_codes (code, consumed) VALUES (?, 0)").run(finalCode);
        codesGenerated.push(finalCode);
      }
    }
    return res.json({ success: true, message: "Activation codes created successfully" });
  } catch (err) {
    console.error("[Admin Create Codes Error]:", err);
    return res.status(400).json({ error: "Code already exists or invalid arguments." });
  }
});

// 8. DELETE /api/admin/codes/:code - Revoke/delete an unused code
app.delete("/api/admin/codes/:code", requireAdmin, (req, res) => {
  const { code } = req.params;
  try {
    db.prepare("DELETE FROM activation_codes WHERE code = ?").run(code);
    return res.json({ success: true, message: "Activation code deleted" });
  } catch (err) {
    console.error("[Admin Revoke Code Error]:", err);
    return res.status(500).json({ error: "Failed to delete activation code" });
  }
});

// 9. POST /api/admin/generate-promo-accounts - Create a batch of apush+number accounts
app.post("/api/admin/generate-promo-accounts", requireAdmin, (req, res) => {
  const { count, prefix } = req.body ?? {};
  const now = isoNow();
  const nextYearExamEnd = "2027-06-30T23:59:59.999Z";

  try {
    const generated = [];
    const batchPrefix = (prefix || "apush").toLowerCase().trim();
    const batchCount = count || 5;

    // Get existing emails that start with the prefix
    const allEmails = db.prepare("SELECT email FROM users WHERE email LIKE ?").all(`${batchPrefix}%`).map(u => u.email);

    let currentNum = 101;
    for (let i = 0; i < batchCount; i++) {
      while (allEmails.includes(`${batchPrefix}${currentNum}`)) {
        currentNum++;
      }
      const email = `${batchPrefix}${currentNum}`;
      const newUser = {
        id: uuidv4(),
        email,
        display_name: email.toUpperCase(),
        account_type: 'registered',
        subscription_status: 'active',
        subscription_expires_at: nextYearExamEnd,
        created_at: now,
        updated_at: now,
        last_login_at: null,
      };

      db.prepare(`
        INSERT INTO users (id, email, display_name, account_type, subscription_status, subscription_expires_at, created_at, updated_at, last_login_at)
        VALUES (@id, @email, @display_name, @account_type, @subscription_status, @subscription_expires_at, @created_at, @updated_at, @last_login_at)
      `).run(newUser);

      generated.push(email);
      currentNum++;
    }

    return res.json({ success: true, accounts: generated });
  } catch (err) {
    console.error("[Admin Generate Promo Accounts Error]:", err);
    return res.status(500).json({ error: "Failed to generate promo accounts" });
  }
});


// ==================== SILK ROADS CLASSROOM SIMULATION ====================
const silkRegionIds = ["china","central-asia","india","persia","arabia","byzantium"];
const silkDefaultZones = {byzantium:"A",arabia:"A",persia:"B",india:"B","central-asia":"C",china:"C"};
const silkDecks = {
  china:["Silk-making technology","Gunpowder","Paper money","Farming techniques","Silk","Ginger","Rice","Wheat","Confucianism","Legalism","Taoism"],
  "central-asia":["Saddle","Stirrups","Livestock","Animal hides","Central Asian Horses","Animism"],
  india:["Medicine","Cotton","Pepper","Spices","Barley","Wheat","Hinduism","Buddhism"],
  persia:["Ammonium Chloride","Wool","Dates","Lapis lazuli","Grain","Zoroastrianism"],
  arabia:["Algebra","Cartography","Medical techniques","Dyes","Copper metal","Islam"],
  byzantium:["Glass-making techniques","Glass","Olive oil","Wine","Gold"],
};
const silkKinds = {
  "Silk-making technology":"technology","Gunpowder":"technology","Paper money":"technology","Farming techniques":"technology",
  "Confucianism":"belief","Legalism":"belief","Taoism":"belief","Stirrups":"technology","Animism":"belief",
  "Zoroastrianism":"belief","Hinduism":"belief","Buddhism":"belief","Algebra":"technology","Cartography":"technology",
  "Medical techniques":"technology","Islam":"belief","Glass-making techniques":"technology",
};
const silkOrigin = {};
for (const region of silkRegionIds) for (const name of silkDecks[region]) silkOrigin[name] = region;
const silkItem = (name, origin) => ({id:uuidv4(),name,origin:origin || silkOrigin[name] || "unknown",kind:name==="Disease"?"disease":(silkKinds[name] || "goods")});
const readSilkRoom = (code) => {
  const row=db.prepare("SELECT state_json FROM silk_road_rooms WHERE code=?").get(code);
  return row ? JSON.parse(row.state_json) : null;
};
const writeSilkRoom = (room) => {
  room.updatedAt=new Date().toISOString();
  db.prepare("INSERT INTO silk_road_rooms(code,state_json,updated_at) VALUES(?,?,?) ON CONFLICT(code) DO UPDATE SET state_json=excluded.state_json,updated_at=excluded.updated_at")
    .run(room.code,JSON.stringify(room),room.updatedAt);
};
const publicSilkRoom = (room, viewerId=null) => {
  const {hostToken,...visible}=room;
  return {...visible,players:room.players.map(({token,...player})=>({
    ...player,items:player.items.map(item=>player.id!==viewerId&&item.kind==="disease"
      ? {...item,name:"Sealed card",kind:"goods",origin:"unknown"} : item)
  }))};
};
const addSilkLog = (room,message) => room.log.push({id:uuidv4(),message,at:new Date().toISOString()});
const findSilkPlayer = (room,id) => room.players.find(player=>player.id===id);
const verifySilkPlayer = (room,id,token) => {
  const player=findSilkPlayer(room,id);
  return player && player.token===token ? player : null;
};

app.post("/api/silk-roads/rooms",(req,res)=>{
  const hostName=String(req.body?.hostName || "Teacher").trim().slice(0,32);
  const zones=req.body?.zones || silkDefaultZones;
  if(!silkRegionIds.every(region=>["A","B","C"].includes(zones[region]))) return res.status(400).json({error:"Assign all six regions to a trade zone."});
  let code="";
  do{code=Math.random().toString(36).slice(2,8).toUpperCase();}while(readSilkRoom(code));
  const hostToken=uuidv4(),now=new Date().toISOString();
  const room={code,hostToken,hostName,round:1,status:"lobby",zones,players:[],offers:[],log:[],chinaTaxPaid:[],createdAt:now,updatedAt:now};
  addSilkLog(room,hostName+" created a classroom.");writeSilkRoom(room);
  return res.status(201).json({room:publicSilkRoom(room),hostToken});
});
app.get("/api/silk-roads/rooms/:code",(req,res)=>{
  const room=readSilkRoom(String(req.params.code).toUpperCase());
  if(!room)return res.status(404).json({error:"Classroom not found. Check the six-character code."});
  return res.json({room:publicSilkRoom(room,req.query.playerId)});
});
app.post("/api/silk-roads/rooms/:code/join",(req,res)=>{
  const room=readSilkRoom(String(req.params.code).toUpperCase());
  if(!room)return res.status(404).json({error:"Classroom not found."});
  const name=String(req.body?.name||"").trim().slice(0,32),region=req.body?.region;
  if(!name||!silkRegionIds.includes(region))return res.status(400).json({error:"Enter a name and select one of the six regions."});
  if(room.status==="finished")return res.status(409).json({error:"This simulation has finished."});
  const regionPlayers=room.players.filter(p=>p.region===region).length;
  const items=[silkItem(silkDecks[region][regionPlayers%silkDecks[region].length])];
  if(regionPlayers===0)items.push(silkItem("Disease","unknown"));
  const player={id:uuidv4(),token:uuidv4(),name,region,items,joinedAt:new Date().toISOString()};
  room.players.push(player);if(req.body?.hostToken===room.hostToken)room.status="active";
  addSilkLog(room,name+" joined the "+region+" group.");writeSilkRoom(room);
  const {token,...publicPlayer}=player;
  return res.status(201).json({player:publicPlayer,playerToken:token,room:publicSilkRoom(room,player.id)});
});
app.post("/api/silk-roads/rooms/:code/round",(req,res)=>{
  const room=readSilkRoom(String(req.params.code).toUpperCase());
  if(!room)return res.status(404).json({error:"Classroom not found."});
  if(req.body?.hostToken!==room.hostToken)return res.status(403).json({error:"Only the teacher can advance the simulation."});
  const host=verifySilkPlayer(room,req.body?.playerId,req.body?.playerToken);
  if(!host)return res.status(403).json({error:"Your merchant session is not valid."});
  const next=Number(req.body?.round);
  if(next===4&&room.round===3){room.status="finished";addSilkLog(room,"The simulation ended. Merchants counted their foreign-origin items.");writeSilkRoom(room);return res.json({room:publicSilkRoom(room,host.id),message:"Simulation finished. Review your score and complete the historian's reflection."});}
  if(next!==room.round+1||next<2||next>3)return res.status(400).json({error:"Rounds must advance in order: 1 → 2 → 3."});
  if(room.round===2&&next===3){
    const unpaid=room.players.filter(p=>p.region==="china"&&!room.chinaTaxPaid.includes(p.id));
    if(unpaid.length)return res.status(409).json({error:"China's Round 2 silk tax is unpaid. Each China merchant must remove one goods card before Round 3.",unpaidMerchants:unpaid.map(p=>p.name)});
  }
  room.round=next;room.status="active";room.offers=room.offers.filter(o=>o.status!=="pending");
  addSilkLog(room,"Teacher advanced the class to Round "+next+".");writeSilkRoom(room);
  return res.json({room:publicSilkRoom(room,host.id),message:"Round "+next+" is now open. Read your regional guide card."});
});
app.post("/api/silk-roads/rooms/:code/trades",(req,res)=>{
  const room=readSilkRoom(String(req.params.code).toUpperCase());
  if(!room)return res.status(404).json({error:"Classroom not found."});
  const from=verifySilkPlayer(room,req.body?.playerId,req.body?.playerToken);
  const to=findSilkPlayer(room,req.body?.targetPlayerId);
  if(!from||!to||from.id===to.id)return res.status(400).json({error:"Choose another merchant in this classroom."});
  const offered=req.body?.offeredItemIds,requested=req.body?.requestedItemIds;
  const owns=(player,ids)=>Array.isArray(ids)&&ids.length>0&&ids.every(id=>player.items.some(item=>item.id===id));
  if(!owns(from,offered)||!owns(to,requested))return res.status(400).json({error:"Select cards currently held by both merchants."});
  const intermediaryIds=Array.isArray(req.body?.intermediaries)?req.body.intermediaries:[];
  const intermediaries=intermediaryIds.map(id=>findSilkPlayer(room,id));
  if(intermediaries.some(p=>!p)||new Set(intermediaryIds).size!==intermediaryIds.length||intermediaryIds.includes(from.id)||intermediaryIds.includes(to.id))return res.status(400).json({error:"Invalid intermediary chain."});
  if(!canSilkTrade(room.round,from.region,to.region,intermediaries.map(p=>p.region),room.zones)){
    const message=room.round===1?"Round 1 allows local trade only.":room.round===2?"Round 2 allows trade only within your assigned trade zone.":"Round 3 requires a valid chain of adjacent regions and merchant intermediaries.";
    return res.status(403).json({error:message});
  }
  const offer={id:uuidv4(),fromPlayerId:from.id,toPlayerId:to.id,offeredItemIds:offered,requestedItemIds:requested,intermediaries:intermediaryIds,status:"pending",createdAt:new Date().toISOString()};
  room.offers.push(offer);addSilkLog(room,from.name+" proposed an exchange with "+to.name+".");writeSilkRoom(room);
  return res.status(201).json({offer,room:publicSilkRoom(room,from.id)});
});
app.post("/api/silk-roads/rooms/:code/trades/:offerId/respond",(req,res)=>{
  const room=readSilkRoom(String(req.params.code).toUpperCase());
  if(!room)return res.status(404).json({error:"Classroom not found."});
  const offer=room.offers.find(o=>o.id===req.params.offerId);
  if(!offer||offer.status!=="pending")return res.status(404).json({error:"This offer is no longer available."});
  const to=verifySilkPlayer(room,req.body?.playerId,req.body?.playerToken);
  const from=findSilkPlayer(room,offer.fromPlayerId);
  if(!to||to.id!==offer.toPlayerId)return res.status(403).json({error:"Only the receiving merchant can respond."});
  const owns=(player,ids)=>Array.isArray(ids)&&ids.every(id=>player.items.some(item=>item.id===id));
  if(!from||!owns(from,offer.offeredItemIds)||!owns(to,offer.requestedItemIds))return res.status(409).json({error:"Inventory changed before this offer was accepted."});
  if(req.body?.accept!==true){offer.status="rejected";addSilkLog(room,to.name+" declined a trade offer.");}
  else{
    const outgoing=from.items.filter(i=>offer.offeredItemIds.includes(i.id)),incoming=to.items.filter(i=>offer.requestedItemIds.includes(i.id));
    from.items=from.items.filter(i=>!offer.offeredItemIds.includes(i.id)).concat(incoming);
    to.items=to.items.filter(i=>!offer.requestedItemIds.includes(i.id)).concat(outgoing);
    offer.status="accepted";addSilkLog(room,from.name+" and "+to.name+" completed an exchange.");
  }
  writeSilkRoom(room);return res.json({room:publicSilkRoom(room,to.id)});
});
app.post("/api/silk-roads/rooms/:code/discard",(req,res)=>{
  const room=readSilkRoom(String(req.params.code).toUpperCase());
  if(!room)return res.status(404).json({error:"Classroom not found."});
  const player=verifySilkPlayer(room,req.body?.playerId,req.body?.playerToken);
  if(!player||room.round!==2||player.region!=="china")return res.status(403).json({error:"China merchants can pay this tax in Round 2 only."});
  if(room.chinaTaxPaid.includes(player.id))return res.status(409).json({error:"Your silk tax has already been paid."});
  const item=player.items.find(i=>i.id===req.body?.itemId&&i.kind==="goods");
  if(!item)return res.status(400).json({error:"Choose a goods card. Trade for one if needed."});
  player.items=player.items.filter(i=>i.id!==item.id);room.chinaTaxPaid.push(player.id);
  addSilkLog(room,player.name+" removed a goods card for the China silk tax.");writeSilkRoom(room);
  return res.json({room:publicSilkRoom(room,player.id)});
});


const isDirectRun =
  process.argv[1] && process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  app.listen(config.port, () => {
    console.log(`[Server] API listening on port ${config.port}`);
  });
}

export default app;
