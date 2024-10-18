import React, { useState, useEffect } from 'react';
import { Patient } from '../types';
// import axios from 'axios';

interface PatientDetailProps {
    patient: Patient;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient }) => {
    const [detailedPatient, setDetailedPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                // const response = await axios.get<Patient>(`/api/patients/${patient.id}`);
                setDetailedPatient({
                    ...patient,
                    pastTreatments: ["Blood pressure monitoring", "Cholesterol-lowering therapy"],
                    medicationHistory: ["Atenolol", "Simvastatin"],
                    labResults: [
                        { date: "2023-05-10T00:00:00.000Z", result: "Normal", testName: "Blood Sugar" },
                        { date: "2023-06-15T00:00:00.000Z", result: "Elevated", testName: "Cholesterol" }
                    ],
                });
            } catch (error) {
                console.log(error);
                setError('Error fetching patient details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [patient.id]);

    if (loading) {
        return <p>Loading patient details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!detailedPatient) {
        return null;
    }

    return (
        <div className="mb-4 border-2 rounded-md p-4 shadow-lg">
            <h3 className="text-xl font-semibold">{detailedPatient.name}'s Details</h3>
            <p><strong>Age:</strong> {detailedPatient.age}</p>
            <p><strong>Date of Birth:</strong> {new Date(detailedPatient.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Email:</strong> {detailedPatient.email}</p>
            <p><strong>Phone:</strong> {detailedPatient.phone}</p>
            <p><strong>Patient Id:</strong> {detailedPatient.id}</p>

            <h4 className="mt-2 font-semibold">Conditions:</h4>
            <ul>
                {detailedPatient.condition.map((record, index) => (
                    <li key={index} className="text-sm text-gray-600">
                        {record}
                    </li>
                ))}
            </ul>

            {detailedPatient.healthRecords && (
                <div>
                    <h4 className="mt-4 font-semibold">Health Records:</h4>
                    <ul>
                        {detailedPatient.healthRecords.map((record, index) => (
                            <li key={index} className="text-sm text-gray-600">
                                {record}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {detailedPatient.pastTreatments && (
                <div>
                    <h4 className="mt-4 font-semibold">Past Treatments:</h4>
                    <ul>
                        {detailedPatient.pastTreatments.map((treatment, index) => (
                            <li key={index} className="text-sm text-gray-600">
                                {treatment}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {detailedPatient.medicationHistory && (
                <div>
                    <h4 className="mt-4 font-semibold">Medication History:</h4>
                    <ul>
                        {detailedPatient.medicationHistory.map((medication, index) => (
                            <li key={index} className="text-sm text-gray-600">
                                {medication}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {detailedPatient.labResults && detailedPatient.labResults.length > 0 && (
                <div>
                    <h4 className="mt-4 font-semibold">Lab Results:</h4>
                    <ul>
                        {detailedPatient.labResults.map((result, index) => (
                            <li key={index} className="text-sm text-gray-600">
                                <strong>{result.testName}:</strong> {result.result} (Date: {new Date(result.date).toLocaleDateString()})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PatientDetail;
