import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Import jwtDecode
import { jwtDecode } from "jwt-decode";
 // Assuming jwt-decode is not already installed
import { dbmscontext } from '../context/dbmscontext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggedIn, setIsLoggedIn, currentuser,setCurrentUser } = useContext(dbmscontext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3334/api/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      console.log("response::", response.data.user.username);
      setCurrentUser(response.data.user.username);
      setIsLoggedIn(true);
      navigate('/ddl');
      console.log('Login successful:', response.data.token);
    } catch (error) {
      console.error('Login failed', error.message);
    }
  };

  // Ensure jwtDecode is installed
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);
        setCurrentUser(decodedToken.username);
      } catch (error) {
        console.error('Error decoding token:', error.message);
        // Handle potential invalid token scenario (clear token or redirect to login)
      }
    }
  }, [isLoggedIn, currentuser]);

  return (
    <div>
      {!isLoggedIn ? (
        <div className="flex justify-center items-center h-screen">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
            <p className="mt-3 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
