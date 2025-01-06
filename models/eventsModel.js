const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    date: String,
    venue: String,
    thumbnailImage: String,
    eventCategory: String,
    ticketPrice: Number,
    seats: [],
    createdEvent: String,
    TicketStatus: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("events", eventsSchema);
