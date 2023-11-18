const express = require("express");
const router = express.Router();
const { 
    registerUser,
    login,
    getMe,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");

router.post("/", registerUser);
router.post("/login", login);
router.get("/me", authenticate, getMe);

module.exports = router;