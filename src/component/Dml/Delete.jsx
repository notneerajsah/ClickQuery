import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Delete = () => {
  const [tableName, setTableName] = useState('');
  const [columnName, setColumnName] = useState('');
  const [columnValue, setColumnValue] = useState('');
  const [message, setMessage] = useState('');

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handleColumnNameChange = (event) => {
    setColumnName(event.target.value);
  };

  const handleColumnValueChange = (event) => {
    setColumnValue(event.target.value);
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      // Make an HTTP POST request to delete the record
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);

      const dataToSend = {
        decodedToken:decodedToken,
        tableName:tableName,
        columnName: columnName,
        columnValue: columnValue
      };
      const response = await axios.post('http://localhost:3334/api/deletedata/', dataToSend);

      // Handle the response from the backend
      setMessage(response.data.message);
    } catch (error) {
      // Handle errors
      console.error('Error deleting record:', error);
      setMessage('An error occurred while deleting the record');
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Delete Record</h1>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label htmlFor="tableName" className="block text-sm font-medium text-gray-700">Table Name:</label>
          <input
            type="text"
            id="tableName"
            value={tableName}
            onChange={handleTableNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="columnName" className="block text-sm font-medium text-gray-700">Column Name:</label>
          <input
            type="text"
            id="columnName"
            value={columnName}
            onChange={handleColumnNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="columnValue" className="block text-sm font-medium text-gray-700">Column Value:</label>
          <input
            type="text"
            id="columnValue"
            value={columnValue}
            onChange={handleColumnValueChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
          Delete Record
        </button>
      </form>
      {message && <div className="text-black-600 mt-4">{message}</div>}
    </div>
  );
};

export default Delete;
