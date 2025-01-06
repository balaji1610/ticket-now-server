const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

//Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const commonRoute = require("./routes/commonRoute");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("", userRoute);
app.use("/admin", adminRoute);
app.use("/common", commonRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
