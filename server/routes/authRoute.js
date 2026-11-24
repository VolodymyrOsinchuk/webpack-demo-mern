const express = require("express");
const router = express.Router();

const { login, register, logout } = require("../controllers/authCtrl");

// router.get("/me", authMiddleware, me);
router.post("/register", register);
router.post("/login", login);

// router.get("/me", authMiddleware, me);
router.post("/logout", logout);

module.exports = router;
