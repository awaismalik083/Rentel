import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [status, setStatus] = useState(""); // For status messages
  const [loading, setLoading] = useState(false); // To disable buttons while processing

  const isPhoneValid = (phone) => {
    const regex = /^\+\d{10,15}$/;
    return regex.test(phone);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => handleSendCode(),
      });
    }
  };

  const handleSendCode = async () => {
    if (!isPhoneValid(phone)) {
      setStatus("❌ Please enter a valid phone number (with country code).");
      return;
    }

    setLoading(true);
    setStatus("📤 Sending OTP...");
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setStatus("✅ OTP sent successfully!");
    } catch (err) {
      console.error("Error sending OTP:", err);
      setStatus("❌ Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (otp.trim().length === 0) {
      setStatus("❌ Please enter the OTP.");
      return;
    }

    setLoading(true);
    setStatus("🔍 Verifying OTP...");

    try {
      await confirmationResult.confirm(otp);
      setStatus("✅ Phone number verified!");
    } catch (err) {
      console.error("Verification error:", err);
      setStatus("❌ Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📱 Phone Verification</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="+1234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
        />
        <button
          style={styles.button}
          onClick={handleSendCode}
          disabled={loading || !phone}
        >
          {loading ? "Processing..." : "Send OTP"}
        </button>

        <input
          style={styles.input}
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={loading || !confirmationResult}
        />
        <button
          style={{ ...styles.button, backgroundColor: "#16a34a" }}
          onClick={handleVerifyCode}
          disabled={loading || !confirmationResult || !otp}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div style={styles.status}>{status}</div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3f4f6",
    padding: "1rem",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    fontSize: "1.7rem",
    fontWeight: "bold",
    color: "#111827",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginBottom: "1rem",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  status: {
    marginTop: "10px",
    color: "#374151",
    fontSize: "15px",
    minHeight: "24px",
  },
};

export default PhoneLogin;
