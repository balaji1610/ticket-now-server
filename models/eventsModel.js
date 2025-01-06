const mongoose = require("mongoose");

const seatsSchema = new mongoose.Schema({
  seatNumber: String,
  isBooked: Boolean,
  bookedById: {
    type: String,
    default: null,
  },
  bookedByUser: {
    type: String,
    default: null,
  },
});
const eventsSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    date: String,
    venue: String,
    thumbnailImage: String,
    eventCategory: String,
    ticketPrice: Number,
    seats: [seatsSchema],
    createdEvent: String,
    TicketStatus: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("events", eventsSchema);
