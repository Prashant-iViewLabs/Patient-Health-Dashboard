import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(window.localStorage.getItem("token") ? true : false); // Manage login state

  // const handleLogin = () => {
  //   setIsLoggedIn(true); // Set logged in state to true
  // };

  const handleLogin = () => {
    setIsLoggedIn(true); // Set logged in state to true
  };
  const handleLogout = () => {
    window.localStorage.removeItem("token")
    setIsLoggedIn(false)
  };
  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("token") ? true : false)
  }, [])

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          isLoggedIn ?
            <Dashboard /> :
            <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
};

export default App;
