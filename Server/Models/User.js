const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: { type: String, required: [true, "cannot be empty"] },
    lastname: { type: String, required: [true, "cannot be empty"] },
    username: { type: String, required: [true, "cannot be empty"] },
    password: { type: String, required: [true, "cannot be empty"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
