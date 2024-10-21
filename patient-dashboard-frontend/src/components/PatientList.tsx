import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Patient } from '../types';
import { toast } from 'react-toastify';

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
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const patientsPerPage = 5;
    const config = {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
    };
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API_URL}/api/patients?size=${patientsPerPage}&page=${currentPage}`,
            config
        )
            .then(response => {
                setTotalPages(response.data.metadata.totalPages)
                const formattedPatients: Patient[] = formatPatient(response.data.patients)
                setPatients(formattedPatients)
            })
            .catch(() => {
                toast.error("Error fetching data")
            });
    }, [currentPage]);

    const filterPatients = useCallback(async (searchedTerm: string) => {
        const filteredPatients = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/patients?size=${patientsPerPage}&page=1&search=${searchedTerm}`, config)
        const formattedPatients: Patient[] = formatPatient(filteredPatients.data.patients)
        setPatients(formattedPatients)
        setCurrentPage(filteredPatients.data.metadata.currentPage)
        setTotalPages(filteredPatients.data.metadata.totalPages)
        // setSearchTerm(searchedTerm);
    }, [])

    useEffect(() => {
        // Set a timeout to update the debounced term
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500); // Adjust the delay time (in milliseconds) as needed

        // Clear timeout if the user types before the timer completes
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        // Call the filter function when debouncedTerm updates
        filterPatients(debouncedTerm);
        // setCurrentPage(1); // Uncomment if you want to reset pagination on search
    }, [debouncedTerm, filterPatients]);


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
                placeholder="Search patients or condition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 h-12 border rounded w-full"
            />
            <ul className="flex-1 overflow-y-auto max-h-80 space-y-2">
                {patients.length > 0 ? patients.map(patient => (
                    <li
                        key={patient.id}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelectPatient(patient)}
                    >
                        <div>
                            {patient.name}
                            <ul>
                                <li>Age: {patient.age}</li>
                                <li>Condition: {patient.condition?.join(", ")}</li>
                            </ul>
                        </div>
                    </li>
                ))
                    : <>No patient found</>
                }
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
