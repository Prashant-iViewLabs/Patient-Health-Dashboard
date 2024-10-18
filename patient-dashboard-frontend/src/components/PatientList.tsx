import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../types';

interface PatientListProps {
    onSelectPatient: (patient: Patient) => void;
}

type responsePatient = {
    __v: number; _id: string; name: string; dateOfBirth: string; medicalHistory: string[];
}


const calculateAge = (birthDate: string) => {
    const birthDateObj = new Date(birthDate);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDateObj.getMonth();

    // Adjust age if the birthday hasn't occurred this year yet
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
}

const formatPatient = (patientsData: responsePatient[]) => {
    const updatedPatientList: Patient[] = []
    patientsData.map(((patient: responsePatient) => {
        updatedPatientList.push({
            id: patient._id,
            name: patient.name,
            age: calculateAge(patient.dateOfBirth),
            condition: patient.medicalHistory,
            dateOfBirth: patient.dateOfBirth,
            __v: patient.__v
        })
    }))
    return updatedPatientList
}


const PatientList: React.FC<PatientListProps> = ({ onSelectPatient }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const patientsPerPage = 5;

    useEffect(() => {
        // setPatients([
        //     {
        //         "id": "67111331ecb0d624f6713a58",
        //         "name": "John Doe",
        //         "dateOfBirth": "1980-01-01T00:00:00.000Z",
        //         "email": "john.doe@example.com",
        //         "phone": "123-456-7890",
        //         "healthRecords": [
        //             "hypertension",
        //             "hyperlipidemia"
        //         ],
        //         "age": 44,
        //         "condition": ["hypertension", "hyperlipidemia"],
        //         "__v": 0
        //     },
        //     {
        //         "id": "57111331ecb0d624f6713a59",
        //         "name": "Jane Smith",
        //         "dateOfBirth": "1990-05-15T00:00:00.000Z",
        //         "email": "jane.smith@example.com",
        //         "phone": "987-654-3210",
        //         "healthRecords": [
        //             "diabetes",
        //             "asthma"
        //         ],
        //         "age": 33,
        //         "condition": ["diabetes", "asthma"],
        //         "__v": 0
        //     },
        //     {
        //         "id": "77111331ecb0d624f6713a5a",
        //         "name": "Emily Johnson",
        //         "dateOfBirth": "1975-09-22T00:00:00.000Z",
        //         "email": "emily.johnson@example.com",
        //         "phone": "555-123-4567",
        //         "healthRecords": [
        //             "thyroid disorder"
        //         ],
        //         "age": 48,
        //         "condition": ["thyroid disorder"],
        //         "__v": 0
        //     },
        //     {
        //         "id": "67111331ecb0d624f6713a5b",
        //         "name": "Michael Brown",
        //         "dateOfBirth": "1985-02-10T00:00:00.000Z",
        //         "email": "michael.brown@example.com",
        //         "phone": "555-987-6543",
        //         "healthRecords": [
        //             "none"
        //         ],
        //         "age": 39,
        //         "condition": [],
        //         "__v": 0
        //     },
        //     {
        //         "id": "67111331ecb0d624f6713a5c",
        //         "name": "Sarah Davis",
        //         "dateOfBirth": "1965-12-05T00:00:00.000Z",
        //         "email": "sarah.davis@example.com",
        //         "phone": "555-246-8101",
        //         "healthRecords": [
        //             "hypertension"
        //         ],
        //         "age": 58,
        //         "condition": ["hypertension"],
        //         "__v": 0
        //     },
        //     {
        //         "id": "67111331ecb0d624f6713a5d",
        //         "name": "David Wilson",
        //         "dateOfBirth": "2000-06-30T00:00:00.000Z",
        //         "email": "david.wilson@example.com",
        //         "phone": "555-135-7913",
        //         "healthRecords": [
        //             "none"
        //         ],
        //         "age": 24,
        //         "condition": [],
        //         "__v": 0
        //     },
        //     {
        //         "id": "67111331ecb0d624f6713a5e",
        //         "name": "Laura Martinez",
        //         "dateOfBirth": "1995-03-18T00:00:00.000Z",
        //         "email": "laura.martinez@example.com",
        //         "phone": "555-246-1357",
        //         "healthRecords": [
        //             "allergies"
        //         ],
        //         "age": 29,
        //         "condition": ["allergies"],
        //         "__v": 0
        //     },
        //     {
        //         "id": "67111331ecb0d624f6713a5f",
        //         "name": "Robert Garcia",
        //         "dateOfBirth": "1988-11-11T00:00:00.000Z",
        //         "email": "robert.garcia@example.com",
        //         "phone": "555-864-2097",
        //         "healthRecords": [
        //             "migraines"
        //         ],
        //         "age": 35,
        //         "condition": ["migraines"],
        //         "__v": 0
        //     },
        //     {
        //         "id": "67111331ecb0d624f6713a60",
        //         "name": "Sophia Anderson",
        //         "dateOfBirth": "1992-07-24T00:00:00.000Z",
        //         "email": "sophia.anderson@example.com",
        //         "phone": "555-753-1594",
        //         "healthRecords": [
        //             "none"
        //         ],
        //         "age": 31,
        //         "condition": [],
        //         "__v": 0
        //     },
        //     {
        //         "id": "67111331ecb0d624f6713a61",
        //         "name": "James Thomas",
        //         "dateOfBirth": "1978-04-12T00:00:00.000Z",
        //         "email": "james.thomas@example.com",
        //         "phone": "555-369-2580",
        //         "healthRecords": [
        //             "diabetes",
        //             "high cholesterol"
        //         ],
        //         "age": 46,
        //         "condition": ["diabetes", "high cholesterol"],
        //         "__v": 0
        //     }
        // ]);
        const config = {
            headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
        };
        axios.get(`${import.meta.env.VITE_APP_API_URL}/api/patients?size=${patientsPerPage}&page=${currentPage}`,
            config
        )
            .then(response => {
                console.log("Patient List", response.data);
                setTotalPages(response.data.metadata.totalPages)
                const formattedPatients: Patient[] = formatPatient(response.data.patients)
                setPatients(formattedPatients)
            })
            .catch(error => console.error('Error fetching patients:', error));
    }, [currentPage]);

    const filterPatients = (searchedTerm: string) => {

        const filteredPatients = patients.filter(patient =>
            patient.name.toLowerCase().includes(searchedTerm.toLowerCase())
        );
        setPatients(filteredPatients)
        setSearchTerm(searchedTerm);
    }

    // const indexOfLastPatient = currentPage * patientsPerPage;
    // const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    // const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    // const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => {
                    filterPatients(e.target.value)
                    // setCurrentPage(1); // Reset to the first page when searching
                }}
                className="mb-4 p-2 h-12 border rounded w-full"
            />
            <ul className="flex-1 overflow-y-auto max-h-80 space-y-2">
                {patients.map(patient => (
                    <li
                        key={patient.id}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelectPatient(patient)}
                    >
                        <div>
                            {patient.name}
                            <ul>
                                <li>Age: {patient.age}</li>
                                <li>Condition: {patient.condition.join(", ")}</li>
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex h-12 justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PatientList;
