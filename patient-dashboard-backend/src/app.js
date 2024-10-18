// src/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const patientRoutes = require("../routes/patientsRoute"); // Import the patient routes
const priorAuthorizationRoutes = require("../routes/priorAuthorizationRoutes"); // Import the prior authorization routes
const authRoutes = require("../routes/authRoutes"); // Adjust path as necessary
const authMiddleware = require("../middleware/authMiddleware");
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: "*", // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['*'],
}));

app.use(express.json());


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);

// Use the patient routes
app.use("/api/patients", authMiddleware, patientRoutes); // Set the base route for patients
app.use("/api/prior-authorization", authMiddleware, priorAuthorizationRoutes); // Set the base route for prior authorization

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
