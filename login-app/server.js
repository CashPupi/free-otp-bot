import express from "express";
import Database from "better-sqlite3";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const db = new Database(path.join(__dirname, "database.db"));

// Init schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT    UNIQUE NOT NULL,
    password TEXT    NOT NULL
  )
`);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

// POST /api/register
app.post("/api/register", authLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password are required." });

  const hash = await bcrypt.hash(password, 12);
  try {
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hash);
    res.json({ message: "Registration successful." });
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({ error: "Username already taken." });
    }
    console.error("Register error:", err);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

// POST /api/login
app.post("/api/login", authLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password are required." });

  const user = db
    .prepare("SELECT username, password FROM users WHERE username = ?")
    .get(username);
  if (!user) return res.status(401).json({ error: "Invalid credentials." });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials." });

  res.json({ message: `Welcome, ${username}!` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Login app running on http://localhost:${PORT}`));
