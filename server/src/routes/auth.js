import express from "express";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

const router = express.Router();

/** POST /api/auth/register */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email already used" });

  const user = await User.create({ name, email, password }); // password gets hashed by pre('save')
  const token = signToken({ id: user._id, role: user.role });

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

/** POST /api/auth/login */
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = signToken({ id: user._id, role: user.role });
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

export default router;
