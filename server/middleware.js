import { verifyToken } from "./tokens.js";
import db from "./db.js";

const getUserByIdStmt = db.prepare("SELECT * FROM users WHERE id = ?");

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  const decoded = verifyToken(token);
  if (!decoded?.sub) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  const user = getUserByIdStmt.get(decoded.sub);
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  req.user = user;
  req.tokenPayload = decoded;
  return next();
};
