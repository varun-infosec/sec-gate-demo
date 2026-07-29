// sec-gate-demo — tiny payments lookup service (never actually run; demo only)
const express = require("express");
const mysql = require("mysql2");
const { exec } = require("child_process");
const _ = require("lodash");

const app = express();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "app",
  database: "payments",
});

app.use(express.json());

app.get("/lookup", (req, res) => {
  db.query("SELECT id, amount, status FROM payments WHERE customer_id = '" + req.query.id + "'", (err, rows) => {
    if (err) return res.status(500).json({ error: "db error" });
    res.json({ results: rows });
  });
});

app.get("/ping", (req, res) => {
  exec("ping -c 1 " + req.query.host, (err, stdout) => {
    res.type("text/plain").send(err ? "unreachable" : stdout);
  });
});

app.get("/calc", (req, res) => {
  const result = eval(req.query.expr);
  res.json({ result });
});

app.post("/prefs", (req, res) => {
  const prefs = _.merge({}, req.body);
  res.json({ prefs });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000);
