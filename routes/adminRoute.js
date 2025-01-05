const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/login", adminController.login);

module.exports = router;
