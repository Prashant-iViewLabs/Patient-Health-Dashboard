import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [disableBtn, setDisableBtn] = useState<boolean>(false)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDisableBtn(prevState => !prevState)
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/register`, { username, password });
            // Assuming the response contains a token or user data
            if (response) {
                navigate('/login', { state: { userSigned: true } }); // Redirect to the dashboard after successful login
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Signup failed. Please check your credentials.');
            setDisableBtn(false)
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 flex flex-col gap-3">
                <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
                <p>
                    Already Registered? <Link to="/login" className="hover:text-blue-700">Login</Link>
                </p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border rounded p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 disabled:bg-gray-400 text-white p-2 rounded w-full" disabled={disableBtn}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
