// server/src/routes/payments.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/verify/paystack", async (req, res) => {
  try {
    const { reference } = req.body;
    if (!reference) return res.status(400).json({ ok: false, error: "No reference" });

    const resp = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });

    const status = resp.data?.data?.status; // "success"
    if (status === "success") {
      // TODO: save order to DB here
      return res.json({ ok: true });
    }
    return res.status(400).json({ ok: false, error: "Payment not successful" });
  } catch (err) {
    console.error("Paystack verify error:", err?.response?.data || err.message);
    return res.status(500).json({ ok: false, error: "Verification error" });
  }
});

export default router;
