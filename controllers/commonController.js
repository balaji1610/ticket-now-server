const eventsModel = require("../models/eventsModel");

exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await eventsModel.find();
    res.status(200).json(allEvents);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events", error: err });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const getEvent = await eventsModel.findById(req.params.id);

    if (getEvent) {
      res.status(200).json(getEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events", error: err });
  }
};

exports.getEventByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const getEventByCategory = await eventsModel.find({
      eventCategory: category,
    });
    if (getEventByCategory.length) {
      res.status(200).json(getEventByCategory);
    } else {
      res.status(404).json({ message: "Events not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events", error: err });
  }
};
