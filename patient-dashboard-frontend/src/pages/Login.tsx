import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

interface LoginProps {
    onLogin: () => void; // Prop to check login state
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const { state } = useLocation();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [disableBtn, setDisableBtn] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    console.log(state);

    const location = useLocation();
    const navigate = useNavigate();
    const isLoggedIn = window.localStorage.getItem("token") ? true : false // Manage login state
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDisableBtn(prevState => !prevState)
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/login`, { username, password });
            // Assuming the response contains a token or user data
            if (response.data.token) {
                // if (username === "Prashant" && password === "123456789") {
                // Store the token (you might want to use localStorage or context for better state management)
                localStorage.setItem('token', response.data.token);
                navigate('/'); // Redirect to the dashboard after successful login
                onLogin()
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            setDisableBtn(false)
        }
    };
    useEffect(() => {
        if (location.state) {
            // Clear the state
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        !isLoggedIn ?
            <>
                <div className={`flex flex-col items-center ${state?.userSigned ? `justify-start` : `justify-center`} h-screen gap-3 bg-gray-100 `} >
                    {state?.userSigned && <div className='w-1/2 w-md-96  bg-white rounded-md shadow-md p-6 mt-6'>
                        <h4>Registration Successful! 🎉</h4>
                        <p>
                            Thank you for registering. Your account has been created successfully, and you can now log in to access all the features. If you have any questions or need assistance, feel free to reach out to our support team.
                        </p>
                    </div>}
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96  flex flex-col gap-3">
                        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                        <p>Don't have an account? <Link to={"/signup"}>Signup</Link></p>
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
                        <button type="submit" id='loginBtn' className="bg-blue-500 disabled:bg-gray-400 text-white p-2 rounded w-full" disabled={disableBtn}>
                            Login
                        </button>
                    </form>
                </div >
            </>
            : <Navigate to={"/"} />
    )
    // ):

};

export default Login;
