
import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader); // 🔍 DEBUG

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token); // 🔍 DEBUG

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // 🔍 DEBUG

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
export default authMiddleware