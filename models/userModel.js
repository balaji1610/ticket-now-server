const mongoose = require("mongoose");
const bookingDetailsSchema = new mongoose.Schema({
  userId: String,
  eventId: String,
  numberOfTicket: Number,
  ticketStaus: String,
  BookingDate: String,
});

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    createdAt: String,
    bookingDetails: [bookingDetailsSchema],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("users", userSchema);
