const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const jwt = require("jsonwebtoken");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("../routes/userRoute");
const adminRoute = require("../routes/adminRoute");
const commonRoute = require("../routes/commonRoute");

require("dotenv").config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your Netlify frontend domain if needed
    credentials: true,
  })
);
app.use(cookieParser());
const dbName = "ticket_now";
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Server is Running!..."));
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/common", commonRoute);

module.exports.handler = serverless(app); // Export the Express app as a serverless function
