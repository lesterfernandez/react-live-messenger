const express = require("express");
const validateForm = require("../controllers/validateForm");
const router = express.Router();
const {
  handleLogin,
  attemptLogin,
  attemptRegister,
} = require("../controllers/authController");

router.route("/login").get(handleLogin).post(validateForm, attemptLogin);
router.post("/signup", validateForm, attemptRegister);
module.exports = router;
