const express = require("express");
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticate");

const router = express.Router();

router.post("/createAccount", userController.createAccount);
router.post("/authLogin", userController.authLogin);
router.get("/verifyToken", authenticateToken, userController.verifyToken);
router.post("/logout", userController.logout);

module.exports = router;
