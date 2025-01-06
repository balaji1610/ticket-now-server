const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/login", adminController.login);

router.post("/createEvent", adminController.createEvent);
router.get("/getAllEvents", adminController.getAllEvents);
router.put("/updateEvent/:id", adminController.updateEvent);
router.delete("/deleteEvent/:id", adminController.deleteEvent);

module.exports = router;
