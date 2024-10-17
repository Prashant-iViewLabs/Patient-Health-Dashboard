const mongoose = require('mongoose');

const priorAuthorizationSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    treatmentType: { type: String, required: true },
    insurancePlan: { type: String, required: true },
    doctorNotes: { type: String, required: false },
    dateOfService: { type: Date, required: true },
    diagnosisCode: { type: String, required: true },
    status: { type: String, default: 'pending' } // Could be pending, approved, or denied
});

const PriorAuthorization = mongoose.model('PriorAuthorization', priorAuthorizationSchema);

module.exports = PriorAuthorization;