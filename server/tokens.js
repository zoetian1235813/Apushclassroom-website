import jwt from "jsonwebtoken";

const jwtSecret =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production" ? "" : "dev-only-jwt-secret");
if (!jwtSecret) {
  console.warn("[Auth] JWT_SECRET is not set. Set it in your environment before deploying.");
} else if (!process.env.JWT_SECRET) {
  console.warn("[Auth] Using a development-only JWT secret. Set JWT_SECRET before deploying.");
}

const DEFAULT_EXPIRY = "7d";

export const signToken = (payload, options = {}) =>
  jwt.sign(payload, jwtSecret, { expiresIn: DEFAULT_EXPIRY, ...options });

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};
