const adminModel = require("../models/adminModel");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUserValid = await adminModel.findOne({
      username: username,
      password: password,
    });

    if (isUserValid) {
      res.status(200).json({ message: "Login Sucessfull", username: username });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Login Failed", error: err });
  }
};
