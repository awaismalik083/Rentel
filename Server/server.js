import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import passport from "passport";
import "./middlewares/passport.js";
import emailRoute from "./routes/emailRoute.js";
import jwt from "jsonwebtoken";
import PropertyRoute from "./routes/PropertyRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
import ContactRoute from "./routes/ContactRoute.js";

// Setup __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Basic middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true, // Allowed origins
  })
);
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Serve files from 'public' directory

// Initialize passport
app.use(passport.initialize());

// Connect to database
connectDB();

// Routes
app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/email", emailRoute);
app.use("/api/property", PropertyRoute);
app.use('/api/contact',ContactRoute)

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.redirect(
      `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/google-success?token=${token}`
    );
  }
);

// Error handling middleware

app.get("/", (req, res) => {
  res.send("Hello world");
});
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
