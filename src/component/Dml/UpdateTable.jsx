import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const UpdateTable = () => {
  const[TableName,setTableName]=useState('')
  const [columnName, setColumnName] = useState('');
  const [columnValue, setColumnValue] = useState('');
  const [whereCondition, setWhereCondition] = useState('');
  const [message, setMessage] = useState('');


  const sendDataToBackend = async () => {
    try {
      // Your data object to send to the backend
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);

      const dataToSend = {
        decodedToken:decodedToken,
        TableName:TableName,
        columnName: columnName,
        columnValue: columnValue,
        whereCondition: whereCondition
      };

      // Make an HTTP POST request to the backend endpoint
      const response = await axios.post('http://localhost:3334/api/updatedata/', dataToSend);
      setMessage(response.data.message);
      setTimeout(() => setMessage(''), 3000);

      // Handle the response from the backend
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Update Table</h1>
      <div>
          <label htmlFor="currentTableName" className="block text-sm font-medium text-gray-700">Table Name:</label>
          <input
            type="text"
            id="currentTableName"
            value={TableName}
            onChange={(e)=>setTableName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      <div className="mb-4">
        <label htmlFor="columnName" className="block text-sm font-medium text-gray-700 mb-2">Column Name:</label>
        <input
          type="text"
          id="columnName"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="columnValue" className="block text-sm font-medium text-gray-700 mb-2">Column Value:</label>
        <input
          type="text"
          id="columnValue"
          value={columnValue}
          onChange={(e) => setColumnValue(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="whereCondition" className="block text-sm font-medium text-gray-700 mb-2">Where Condition:</label>
        <input
          type="text"
          id="whereCondition"
          value={whereCondition}
          onChange={(e) => setWhereCondition(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        onClick={sendDataToBackend}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
      >
        Update Data
      </button>
      {message && <p className="text-black-500 mt-4">{message}</p>}
    </div>
  );
};

export default UpdateTable;
