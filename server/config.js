const parseOrigins = (value) =>
  value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const clientBaseValue = process.env.CLIENT_BASE_URL || "";
const clientOrigins = parseOrigins(clientBaseValue);
const primaryClientOrigin = clientOrigins[0] || "http://localhost:5173";

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: (process.env.NODE_ENV || "development") === "production",
  port: Number.parseInt(process.env.PORT ?? "4000", 10),
  clientOrigins,
  emailCodeTtlSeconds: Number.parseInt(process.env.EMAIL_CODE_TTL ?? "600", 10),
  wechatRedirectUri:
    process.env.WECHAT_REDIRECT_URI || `${primaryClientOrigin}/auth/wechat`,
  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    model: process.env.OPENAI_FRQ_MODEL || "gpt-4o-mini",
  },
  healthPath: process.env.HEALTHCHECK_PATH || "/healthz",
};

export default config;
