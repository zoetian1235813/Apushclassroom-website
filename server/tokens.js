import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.warn("[Auth] JWT_SECRET is not set. Set it in your environment before deploying.");
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
