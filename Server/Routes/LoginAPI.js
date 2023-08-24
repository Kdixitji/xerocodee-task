const Router = require("express");
const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(406).json({ message: "credentials not found" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  const payload = {
    username: username,
    _id: user._id,
  };
  const token = jwt.sign(payload, "some secrets.");
  res.json({ message: "Successfully Logged in", token, user });
  console.log(token);
});

module.exports = router;
