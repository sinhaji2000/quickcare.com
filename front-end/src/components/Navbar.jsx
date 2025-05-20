// src/components/Navbar.js
import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  

const Navbar = () => {
  // For demo, toggle login state with useState.
  // In real app, get login status from context/auth provider.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left side: Profile or Login */}
       

        {/* Center: Logo */}
        <div className="text-2xl font-bold cursor-pointer">
          QuickCare
        </div>

        {/* Right side: Other links */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li className="hover:text-gray-300 cursor-pointer">Home</li>
          <li className="hover:text-gray-300 cursor-pointer">Services</li>
          <li className="hover:text-gray-300 cursor-pointer">Contact</li>
          <li>
          {isLoggedIn ? (
            <button 
              className="mr-4 px-4 py-2 bg-blue-800 rounded hover:bg-blue-700 transition"
              onClick={() => navigate('/user/profile')}
            >
              Profile
            </button>
          ) : (
            <button 
              className="mr-4 px-4 py-2 bg-green-500 rounded hover:bg-green-400 transition"
              onClick={() => navigate('/user/login')}
            >
              Login
            </button>
          )}
        </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
