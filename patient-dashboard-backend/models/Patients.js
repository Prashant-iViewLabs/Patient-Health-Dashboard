// models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    medicalHistory: [String],
    pastTreatments: [
        {
            treatment: String,
            date: Date,
            notes: String,
        },
    ],
    medicationHistory: [
        {
            medication: String,
            prescribedDate: Date,
            dosage: String,
            status: String, // e.g., "active", "completed", "discontinued"
        },
    ],
    labResults: [
        {
            testName: String,
            date: Date,
            result: String,
            notes: String,
        },
    ],
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
