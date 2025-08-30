import express from "express";
import { sendEmail } from "../controllers/emailSender.js";

const emailRoute = express.Router(); // ✅ spelling fixed

// In-memory store (use DB in production)
const codes = {};

// ✅ Send Verification Code
emailRoute.post("/send-code", async (req, res) => {
  const { email } = req.body;

  // ✅ Check if email is valid
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ message: "A valid email is required" });
  }

  // ✅ Generate 6-digit code
  const code = Math.floor(1000 + Math.random() * 9000);
  codes[email] = code;

  try {
    // ✅ Send email
    await sendEmail(email, "Your Verification Code", `Your verification code is: ${code}`);
    res.json({ success: true, message: "Code sent successfully" });
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Verify Code
emailRoute.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: "Missing data" });

  if (codes[email] && parseInt(code) === codes[email]) {
    delete codes[email];
    return res.json({ verified: true });
  }

  return res.status(400).json({ verified: false, message: "Invalid code" });
});



export default emailRoute;
