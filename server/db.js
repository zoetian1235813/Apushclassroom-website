import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const defaultDbPath = path.join(process.cwd(), "data", "app.db");
const dbPath = process.env.SQLITE_DB_PATH || defaultDbPath;

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  wechat_openid TEXT UNIQUE,
  wechat_unionid TEXT,
  display_name TEXT,
  avatar_url TEXT,
  account_type TEXT NOT NULL DEFAULT 'registered',
  subscription_status TEXT NOT NULL DEFAULT 'free',
  content_region TEXT NOT NULL DEFAULT 'overseas',
  subscription_updated_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_login_at TEXT
);

CREATE TABLE IF NOT EXISTS lesson_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  step_id TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL,
  UNIQUE(user_id, topic_id, step_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS email_verification_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  consumed INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS oauth_states (
  state TEXT PRIMARY KEY,
  redirect_uri TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS wrong_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  topic_name TEXT,
  unit_id INTEGER,
  unit_name TEXT,
  question_data TEXT NOT NULL,
  incorrect_count INTEGER NOT NULL DEFAULT 1,
  last_incorrect_at TEXT NOT NULL,
  resolved INTEGER NOT NULL DEFAULT 0,
  resolved_at TEXT,
  UNIQUE(user_id, question_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activation_codes (
  code TEXT PRIMARY KEY,
  consumed INTEGER NOT NULL DEFAULT 0,
  consumed_by TEXT,
  consumed_at TEXT
);
`);

db.exec(`
INSERT OR IGNORE INTO activation_codes (code) VALUES
('APUSH8888'),
('APUSH6666'),
('APUSH-2026-ACTIVE'),
('APUSH-VX-19855352384'),
('APUSH-ZOE-TIAN'),
('APUSH-9999'),
('APUSH-520'),
('APUSH-1314');
`);

const ensureColumn = (table, column, definition) => {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  const hasColumn = columns.some((item) => item.name === column);
  if (!hasColumn) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
};

ensureColumn("users", "subscription_status", "TEXT NOT NULL DEFAULT 'free'");
ensureColumn("users", "content_region", "TEXT NOT NULL DEFAULT 'overseas'");
ensureColumn("users", "subscription_updated_at", "TEXT");
ensureColumn("users", "account_type", "TEXT NOT NULL DEFAULT 'registered'");

export default db;
