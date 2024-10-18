import React, { useState } from 'react';

import PatientList from '../components/PatientList';
import PatientDetail from '../components/PatientDetail';
import PriorAuthorizationForm from '../components/PriorAuthorizationForm';
import { Patient } from '../types';
import NoPatientImg from "../assets/NoPatientImg.png"
import { toast, ToastContainer } from 'react-toastify';

const Dashboard: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [open, setOpen] = useState(false)

    const handleDialog = () => {
        setOpen(true)
    }

    const handlePriorSubmissionform: (formSubmittedStatus: boolean) => void = (formSubmittedStatus) => {
        if (formSubmittedStatus) {
            setOpen(true)
            toast.success('Authorization request submitted successfully!');
        } else {
            setOpen(false)
            toast.error('Failed to submit authorization request. Please try again.');
        }
    }
    return (
        <div>
            <ToastContainer />
            <div className="flex flex-col md:flex-row min-h-screen p-4">
                <div className="md:w-1/3 p-4">
                    <h2 className="text-2xl font-bold mb-4">Patients List</h2>
                    <PatientList onSelectPatient={setSelectedPatient} />
                </div>
                <div className="md:w-2/3 p-4">
                    {selectedPatient ? (
                        <div className='flex flex-col gap-3'>
                            <a
                                href="#"
                                onClick={handleDialog}
                                className="rounded-md w-max bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Submit a prior authorization request
                            </a>
                            <PatientDetail patient={selectedPatient} />
                            {open && <PriorAuthorizationForm open={open} onClose={handlePriorSubmissionform} closeFunc={setOpen} patient={selectedPatient} />}
                        </div>
                    ) : (
                        <div className='h-full flex flex-col align-middle justify-center gap-3 '>
                            <img src={NoPatientImg} className='w-64 mx-auto h-auto' />
                            <p className='text-center'>Select a patient to view details and submit a prior authorization request.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
