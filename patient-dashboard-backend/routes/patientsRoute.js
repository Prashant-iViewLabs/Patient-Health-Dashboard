// routes/patientRoutes.js
const express = require("express");
const Patient = require("../models/Patients");

const router = express.Router();

// API endpoint to fetch patient list
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const size = parseInt(req.query.size) || 10; // Number of records per page
    const offset = (page - 1) * size; // Calculate the offset

    const searchQuery = req.query.search ? req.query.search.toLowerCase() : ""; // Get the search query

    // const totalCount = await Patient.countDocuments();
    const totalCount = await Patient.countDocuments({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, // Search in name
        { medicalHistory: { $regex: searchQuery, $options: "i" } }, // Search in medical history
        // Add more fields to search in as necessary
      ],
    });

    const patients = await Patient.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { medicalHistory: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .select("name dateOfBirth age medicalHistory")
      .skip(offset) // Use the offset to skip records
      .limit(size) // Limit the number of records returned
      .exec(); // Execute the query

    // Fetching only specific fields
    res.status(200).json({
      metadata: {
        totalCount: totalCount,
        currentPage: page,
        pageSize: size,
        totalPages: Math.ceil(totalCount / size),
      },
      patients: patients,
    });
  } catch (error) {
    console.error("Error fetching patients:", error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching patients", error });
  }
});

// API endpoin\t to fetch a specific patient by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate("pastTreatments") // If you create a separate model, otherwise just fetch
      .populate("medicationHistory") // If you create a separate model
      .populate("labResults"); // If you create a separate model
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
});

module.exports = router;
