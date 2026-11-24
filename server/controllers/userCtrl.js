const User = require("../models/User");

// GET CURRENT USER PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve profile",
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const updates = {};

    // Validate username
    if (username !== undefined) {
      if (typeof username !== "string" || username.trim().length < 3) {
        return res.status(400).json({
          success: false,
          message: "Username must contain at least 3 characters",
        });
      }

      updates.username = username.trim();
    }

    // Validate email
    if (email !== undefined) {
      if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
        });
      }

      updates.email = email.trim().toLowerCase();
    }

    // Prevent empty updates
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    // Duplicate username or email
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];

      return res.status(409).json({
        success: false,
        message: `${field || "Username or email"} already exists`,
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // Invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
