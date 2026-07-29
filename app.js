// sec-gate-demo — tiny payments lookup service (never actually run; demo only)
const express = require("express");
const mysql = require("mysql2");

const app = express();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "app",
  database: "payments",
});

app.get("/lookup", (req, res) => {
  const id = String(req.query.id || "");
  if (!/^[0-9]+$/.test(id)) return res.status(400).json({ error: "invalid id" });
  db.query("SELECT id, amount, status FROM payments WHERE customer_id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "db error" });
    res.json({ results: rows });
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000);
