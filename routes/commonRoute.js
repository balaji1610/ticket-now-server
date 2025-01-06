const express = require("express");

const commonController = require("../controllers/commonController");
const router = express.Router();

router.get("/getAllEvents", commonController.getAllEvents);
router.get("/getEvent/:id", commonController.getEvent);
router.post("/getEventByCategory", commonController.getEventByCategory);

module.exports = router;
