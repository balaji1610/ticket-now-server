const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/login", adminController.login);

router.post("/createEvent", adminController.createEvent);
router.put("/updateEvent/:id", adminController.updateEvent);
router.delete("/deleteEvent/:id", adminController.deleteEvent);

//bookingTickets

router.post("/bookingTickets", adminController.bookingTickets);

module.exports = router;
