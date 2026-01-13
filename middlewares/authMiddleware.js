// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // your User model

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token and attach to req
      req.user = await User.findById(decoded.id).select("-password"); // exclude password
      next();
    } else {
      return res.status(401).json({ error: "Not authorized, no token" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};

module.exports = protect;
