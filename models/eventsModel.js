const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("events", eventsSchema);
