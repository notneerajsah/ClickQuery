import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const DropTable = () => {
  const [tableName, setTableName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setTableName(event.target.value);
  };

  const handleDropTable = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
        
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          decodedToken: decodedToken
        }
      };

      const response = await axios.delete(`http://localhost:3334/ddl/droptable/${tableName}`, config);
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage('');
        setLoading(false);
      }, 3000);
    } catch (error) {
      setMessage('An error occurred while dropping the table');
      setTimeout(() => {
        setMessage('');
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Drop Table</h1>
      <input
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
        type="text"
        value={tableName}
        onChange={handleInputChange}
        placeholder="Enter table name to drop"
      />
      <button
        className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleDropTable}
        disabled={loading}
      >
        {loading ? 'Dropping...' : 'Drop Table'}
      </button>
      {message && <p className="text-black-500 mt-4">{message}</p>}
    </div>
  );
};

export default DropTable;
