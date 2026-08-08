import dns from "dns";
import "dotenv/config";
// ...

dns.setServers(["8.8.8.8", "1.1.1.1"]);

requireEnv("MONGO_URI");
requireEnv("JWT_SECRET");
requireEnv("CLIENT_URL");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import payments from "./routes/payments.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/payments", payments);
app.get("/health", (_, res) => res.json({ ok: true }));


app.use("/api/auth", authRoutes);

// ✅ Express 5 will catch thrown errors from async handlers
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
});

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Mongo connected");
  app.listen(process.env.PORT || 4000, () =>
    console.log("🟢 API on http://localhost:" + (process.env.PORT || 4000))
  );
};
run();
// TOP OF FILE
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION ➜", err?.message || err);
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION ➜", err?.message || err);
  process.exit(1);
});

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`❌ Missing ${name} in .env`);
    process.exit(1);
  }
  return v;
}
