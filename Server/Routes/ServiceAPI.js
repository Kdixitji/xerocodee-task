// routes/service.js

const express = require("express");
const router = express.Router();
const ServiceData = require("../Models/ServiceData");

// Create a new service data entry
router.post("/", async (req, res) => {
  const { userType, name, hostingType, hostingOptions } = req.body;

  try {
    const newServiceData = new ServiceData({
      userType,
      name,
      hostingType,
      hostingOptions,
    });

    const savedServiceData = await newServiceData.save();
    res.status(201).json(savedServiceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving service data." });
  }
});

// Get service data for a specific user
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const userServices = await ServiceData.find({ userId });
    res.status(200).json(userServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving service data." });
  }
});

module.exports = router;
