const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createAccount = async (req, res) => {
  try {
    const { username, password } = req.body;
    const DuplicateUsername = await userModel.findOne(
      { username: username },
      { __v: 0 }
    );
    const saltType = 10;
    const hashedPassword = await bcrypt.hash(password, saltType);
    const date = new Date();
    const options = {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    const adduser = {
      username: username,
      password: hashedPassword,
      createdAt: new Intl.DateTimeFormat("en-GB", options).format(date),
      bookingDetails: [],
    };

    if (DuplicateUsername) {
      res.status(404).json({ message: "User is already registered" });
    } else {
      const result = await userModel.create(adduser);
      res.status(201).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to create account", error: err });
  }
};

exports.authLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Login successful", result: user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyToken = async (req, res) => {
  res.json({
    message: "You have access to this protected route",
    user: req.user,
  });
};

exports.logout = async (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
};

//booking
exports.saveTicket = async (req, res) => {
  try {
    const { userId } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $push: { bookingDetails: req.body } },
      { new: true }
    );

    res.status(200).json({ message: "Saved Ticket", result: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to Save Ticket", error: err });
  }
};

exports.cancleTicket = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    const canCelTicket = await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { bookingDetails: { eventId: eventId } },
      },
      { new: true }
    );
    res.status(200).json({ message: "Ticket cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel event", error: err });
  }
};
