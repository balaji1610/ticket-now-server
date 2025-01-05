const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("superadmins", adminSchema);
