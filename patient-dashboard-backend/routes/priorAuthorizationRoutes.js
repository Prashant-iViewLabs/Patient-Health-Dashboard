// routes/priorAuthorizationRoutes.js
const express = require("express");
const PriorAuthorization = require("../models/PriorAuthorization");

const router = express.Router();

// API endpoint to submit a prior authorization request
router.post('/', async (req, res) => {
    try {
        const { patientId, treatmentType, insurancePlan, dateOfService, diagnosisCode, doctorNotes } = req.body;

        // Create a new prior authorization request
        const priorAuthRequest = new PriorAuthorization({
            patientId,
            treatmentType,
            insurancePlan,
            dateOfService,
            diagnosisCode,
            doctorNotes
        });

        await priorAuthRequest.save();
        res.status(201).json(priorAuthRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const requests = await PriorAuthorization.find().populate('patientId'); // Populate patient data if needed
        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;
