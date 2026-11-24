const jwt = require("jsonwebtoken");
const User = require("../models/User");
const LogoutToken = require("../models/LogoutToken");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    // Check if the token was revoked via logout
    const logoutToken = await LogoutToken.findOne({ token });
    if (logoutToken) {
      return res.status(401).json({
        success: false,
        message: "Token has been revoked (logged out)",
      });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { protect };
