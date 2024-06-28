import React, { useState } from 'react';
import axios from 'axios';

const AlterTable = () => {
  const [tableName, setTableName] = useState('');
  const [alterations, setAlterations] = useState('');
  const [message, setMessage] = useState('');

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handleAlterationsChange = (event) => {
    setAlterations(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3334', { tableName, alterations });
      setMessage(response.data.message);
      setTimeout(() => setMessage(''), 3000);
      // Reset form fields
      setTableName('');
      setAlterations('');
    } catch (error) {
      setMessage('An error occurred while altering the table');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Alter Table</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tableName" className="block text-sm font-medium text-gray-700">
            Table Name:
          </label>
          <input
            type="text"
            id="tableName"
            value={tableName}
            onChange={handleTableNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter table name"
            required
          />
        </div>
        <div>
          <label htmlFor="alterations" className="block text-sm font-medium text-gray-700">
            Alterations:
          </label>
          <textarea
            id="alterations"
            value={alterations}
            onChange={handleAlterationsChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            placeholder="Enter alterations"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Alter Table
        </button>
      </form>
      {message && <p className="text-black-500 mt-4">{message}</p>}
    </div>
  );
};

export default AlterTable;
