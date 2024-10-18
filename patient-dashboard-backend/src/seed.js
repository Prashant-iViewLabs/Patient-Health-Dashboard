// src/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Patient = require("../models/Patients");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const patients = [
      {
        name: "John Doe",
        dateOfBirth: "1980-01-01",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        medicalHistory: ["hypertension", "hyperlipidemia"],
        pastTreatments: [
          {
            treatment: "Physical Therapy",
            date: "2023-01-15",
            notes: "Completed series for lower back pain.",
          },
          {
            treatment: "Cardiac Rehabilitation",
            date: "2022-10-05",
            notes: "Post-heart attack recovery.",
          },
        ],
        medicationHistory: [
          {
            medication: "Lisinopril",
            prescribedDate: "2021-06-01",
            dosage: "10 mg",
            status: "active",
          },
          {
            medication: "Atorvastatin",
            prescribedDate: "2020-08-15",
            dosage: "20 mg",
            status: "active",
          },
        ],
        labResults: [
          {
            date: "2023-02-20",
            result: "200 mg/dL",
            testName: "Lipid Profile",
          },
        ],
      },
      {
        name: "Jane Smith",
        dateOfBirth: "1990-05-15",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
        medicalHistory: ["diabetes", "asthma"],
        pastTreatments: [
          {
            treatment: "Allergy Testing",
            date: "2023-05-10",
            notes: "Identified multiple allergens.",
          },
        ],
        medicationHistory: [
          {
            medication: "Metformin",
            prescribedDate: "2021-09-01",
            dosage: "500 mg",
            status: "active",
          },
        ],
        labResults: [],
      },
      {
        name: "Emily Johnson",
        dateOfBirth: "1975-09-22",
        email: "emily.johnson@example.com",
        phone: "555-123-4567",
        medicalHistory: ["thyroid disorder"],
        pastTreatments: [],
        medicationHistory: [
          {
            medication: "Levothyroxine",
            prescribedDate: "2022-01-10",
            dosage: "50 mcg",
            status: "active",
          },
        ],
        labResults: [
          {
            date: "2023-06-15",
            result: "2.5 uIU/mL",
            testName: "TSH",
          },
        ],
      },
      {
        name: "Michael Brown",
        dateOfBirth: "1985-02-10",
        email: "michael.brown@example.com",
        phone: "555-987-6543",
        medicalHistory: ["none"],
        pastTreatments: [],
        medicationHistory: [
          {
            medication: "Ibuprofen",
            prescribedDate: "2022-12-01",
            dosage: "200 mg",
            status: "as needed",
          },
        ],
        labResults: [
          {
            date: "2023-01-05",
            result: "Normal",
            testName: "General Health Check",
          },
        ],
      },
      {
        name: "Sarah Davis",
        dateOfBirth: "1970-01-01",
        email: "sarah.davis@example.com",
        phone: "555-246-8101",
        medicalHistory: ["hypertension"],
        pastTreatments: [
          {
            treatment: "Cardiology Consultation",
            date: "2023-03-20",
            notes: "Routine check-up.",
          },
        ],
        medicationHistory: [],
        labResults: [
          {
            date: "2023-03-22",
            result: "130/85 mmHg",
            testName: "Blood Pressure",
          },
        ],
      },
      {
        name: "David Wilson",
        dateOfBirth: "2000-06-30",
        email: "david.wilson@example.com",
        phone: "555-135-7913",
        medicalHistory: ["none"],
        pastTreatments: [],
        medicationHistory: [],
        labResults: [
          {
            date: "2024-01-10",
            result: "Normal",
            testName: "Routine Check",
          },
        ],
      },
      {
        name: "Laura Martinez",
        dateOfBirth: "1995-03-18",
        email: "laura.martinez@example.com",
        phone: "555-246-1357",
        medicalHistory: ["allergies"],
        pastTreatments: [
          {
            treatment: "Skin Allergy Treatment",
            date: "2023-04-14",
            notes: "Follow-up visit.",
          },
        ],
        medicationHistory: [
          {
            medication: "Cetirizine",
            prescribedDate: "2022-11-01",
            dosage: "10 mg",
            status: "active",
          },
        ],
        labResults: [],
      },
      {
        name: "Robert Garcia",
        dateOfBirth: "1988-11-11",
        email: "robert.garcia@example.com",
        phone: "555-864-2097",
        medicalHistory: ["migraines"],
        pastTreatments: [
          {
            treatment: "Neurology Consultation",
            date: "2023-02-25",
            notes: "Migraines discussed.",
          },
        ],
        medicationHistory: [
          {
            medication: "Sumatriptan",
            prescribedDate: "2023-03-01",
            dosage: "50 mg",
            status: "as needed",
          },
        ],
        labResults: [
          {
            date: "2023-01-15",
            result: "No abnormalities",
            testName: "Neurological Assessment",
          },
        ],
      },
      {
        name: "Sophia Anderson",
        dateOfBirth: "1992-07-24",
        email: "sophia.anderson@example.com",
        phone: "555-753-1594",
        medicalHistory: ["none"],
        pastTreatments: [
          {
            treatment: "Routine Physical Exam",
            date: "2023-07-12",
            notes: "General health check-up.",
          },
        ],
        medicationHistory: [],
        labResults: [],
      },
      {
        name: "James Thomas",
        dateOfBirth: "1978-04-12",
        email: "james.thomas@example.com",
        phone: "555-369-2580",
        medicalHistory: ["diabetes", "high cholesterol"],
        pastTreatments: [
          {
            treatment: "Nutritional Counseling",
            date: "2023-08-05",
            notes: "Discussed dietary changes.",
          },
        ],
        medicationHistory: [
          {
            medication: "Simvastatin",
            prescribedDate: "2021-07-15",
            dosage: "40 mg",
            status: "active",
          },
        ],
        labResults: [
          {
            date: "2023-09-10",
            result: "210 mg/dL",
            testName: "Lipid Profile",
          },
        ],
      },
    ];
    await Patient.insertMany(patients);
    console.log("Sample patients added");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    mongoose.disconnect();
  });
