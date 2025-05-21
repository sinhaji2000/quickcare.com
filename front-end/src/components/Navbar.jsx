import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/home')}
        >
          QuickCare
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li 
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Home
          </li>
          <li className="hover:text-gray-300 cursor-pointer">Services</li>
          <li className="hover:text-gray-300 cursor-pointer">Contact</li>

          {isLoggedIn ? (
            <li 
              className="hover:text-gray-300 cursor-pointer"
              onClick={() => navigate('/user/profile')}
            >
              Profile
            </li>
          ) : (
            <li 
              className="hover:text-gray-300 cursor-pointer"
              onClick={() => navigate('/user/login')}
            >
              Login
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
