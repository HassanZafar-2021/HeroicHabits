const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../../controllers/userController");

// POST - Register a new user
router.post("/register", registerUser);

// POST - Login a user
router.post("/login", loginUser);

module.exports = router;
