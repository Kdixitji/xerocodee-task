// UserAPI.js
const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

router.get(
  "/userdata",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user; // The user object is attached to the request by passport
    res.json({ username: user.username, email: user.email }); // Return user data
  }
);

module.exports = router;
