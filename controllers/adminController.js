const adminModel = require("../models/adminModel");
const eventsModel = require("../models/eventsModel");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUserValid = await adminModel.findOne({
      username: username,
      password: password,
    });

    if (isUserValid) {
      res.status(200).json({ message: "Login Sucessfull", username: username });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Login Failed", error: err });
  }
};
exports.createEvent = async (req, res) => {
  try {
    const createEvent = await eventsModel.create(req.body);

    res
      .status(200)
      .json({ message: "Event created successfully", createEvent });
  } catch (err) {
    res.status(500).json({ message: "Failed to create event", error: err });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updateEvent = await eventsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updateEvent) {
      res
        .status(200)
        .json({ message: "Event updated successfully", updateEvent });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update event", error: err });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deleteEvent = await eventsModel.findByIdAndDelete(req.params.id);
    if (deleteEvent) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event", error: err });
  }
};
