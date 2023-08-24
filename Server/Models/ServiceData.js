const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  //userId: { type: String, required: [true, "cannot be empty"] },
  userType: { type: String, required: [true, "cannot be empty"] },
  name: { type: String, required: [true, "cannot be empty"] },
  hostingType: { type: String, required: [true, "cannot be empty"] },
  hostingOptions: { type: String, required: [true, "cannot be empty"] },
});

const ServiceData = mongoose.model("Service", serviceSchema);

module.exports = ServiceData;
