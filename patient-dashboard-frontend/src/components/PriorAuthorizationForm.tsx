import React, { useState } from 'react';
import axios from 'axios';
import { Patient } from '../types';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface PriorAuthorizationFormProps {
    open: boolean;
    onClose: (value: boolean) => void;
    patient: Patient;
}

const PriorAuthorizationForm: React.FC<PriorAuthorizationFormProps> = ({ open, onClose, patient }) => {
    const [formData, setFormData] = useState({
        treatmentType: '',
        insurancePlan: '',
        dateOfService: '',
        diagnosisCode: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            ...formData,
            patientId: patient.id,
        });
        const config = {
            headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` }
        };
        axios.post(`${import.meta.env.VITE_APP_API_URL}/api/prior-authorization`, {
            ...formData,
            patientId: patient.id,
        }, config)
            .then(response => {
                console.log(response);
                toast.success('Authorization request submitted successfully!');
                // alert('Authorization request submitted successfully!');
            })
            .catch(error => {
                console.error('Error submitting authorization request:', error);
                toast.error('Failed to submit authorization request. Please try again.');
            });
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-10">
            <ToastContainer />
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >

                        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-lg font-bold mb-2">Submit Prior Authorization</h3>
                            <div className="mb-2">
                                <label className="block text-sm">Treatment Type:</label>
                                <input
                                    type="text"
                                    name="treatmentType"
                                    value={formData.treatmentType}
                                    onChange={handleChange}
                                    required
                                    className="p-2 border rounded w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm">Insurance Plan:</label>
                                <input
                                    type="text"
                                    name="insurancePlan"
                                    value={formData.insurancePlan}
                                    onChange={handleChange}
                                    required
                                    className="p-2 border rounded w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm">Date of Service:</label>
                                <input
                                    type="date"
                                    name="dateOfService"
                                    value={formData.dateOfService}
                                    onChange={handleChange}
                                    required
                                    className="p-2 border rounded w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm">Diagnosis Code:</label>
                                <input
                                    type="text"
                                    name="diagnosisCode"
                                    value={formData.diagnosisCode}
                                    onChange={handleChange}
                                    required
                                    className="p-2 border rounded w-full"
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                                Submit
                            </button>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default PriorAuthorizationForm;
