const express = require("express");
const validateForm = require("../controllers/validateForm");
const router = express.Router();

router.post("/login", (req, res) => {
  validateForm(req, res);
});

router.post("/signup", (req, res) => {
  validateForm(req, res);
});
module.exports = router;
