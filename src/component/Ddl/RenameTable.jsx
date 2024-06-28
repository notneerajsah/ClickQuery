import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { jwtDecode } from "jwt-decode";

const RenameTableForm = ({ token, decodedToken }) => {
  const [currentTableName, setCurrentTableName] = useState('');
  const [newTableName, setNewTableName] = useState('');
  const [message, setMessage] = useState('');

  const handleCurrentTableNameChange = (event) => {
    setCurrentTableName(event.target.value);
  };

  const handleNewTableNameChange = (event) => {
    setNewTableName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      
      const config = {
        headers: {
          // Authorization: `Bearer ${token}`
        },
        data: {
          decodedToken: decodedToken
        }
      };
  
      const response = await axios.post(`http://localhost:3334/ddl/renametable/${currentTableName}/${newTableName}`,config);
      
      // console.log("response:", response);
      setMessage(response.data.message);
      setTimeout(() => setMessage(''), 3000);
      // console.log('New Table Name:', newTableName);
      // Reset form fields
      setCurrentTableName('');
      setNewTableName('');
    } catch (error) {
      console.error("Error renaming table:", error);
      setMessage('An error occurred while renaming the table');
      setTimeout(() => setMessage(''), 3000);
    }
  };
  

  return (
    <div className="max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Rename Table</h1>
      {message && <div className="text-black-600 mb-4">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentTableName" className="block text-sm font-medium text-gray-700">Current Table Name:</label>
          <input
            type="text"
            id="currentTableName"
            value={currentTableName}
            onChange={handleCurrentTableNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="newTableName" className="block text-sm font-medium text-gray-700">New Table Name:</label>
          <input
            type="text"
            id="newTableName"
            value={newTableName}
            onChange={handleNewTableNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
          Rename
        </button>
      </form>
    </div>
  );
};

export default RenameTableForm;
