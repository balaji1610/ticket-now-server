const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5001;

app.use("", userRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
