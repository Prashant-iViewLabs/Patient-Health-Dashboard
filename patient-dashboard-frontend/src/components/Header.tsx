// src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    isLoggedIn: boolean; // Prop to check login state
    handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLogout }) => {
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-xl font-bold">Healthcare Management</h1>
            </div>
            <nav>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="text-white hover:text-blue-300">
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="text-white hover:text-blue-300">
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
