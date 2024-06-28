import React, { useEffect, useState } from 'react';
import { dbmscontext } from '../../context/dbmscontext';
import { useContext } from 'react';  
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const InsertTable = () => {
  const [tableName, setTableName] = useState('');
  const [message, setMessage] = useState('');
  const { user_table, currentUserTables } = useContext(dbmscontext);
  const [columns, setColumns] = useState([]);
  const [columnValues, setColumnValues] = useState({});
  const [inserted, setInserted] = useState(false);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get(`http://localhost:3334/api/columns/${tableName}`);
        setColumns(response.data.columns);
      } catch (error) {
        console.error('Error fetching columns:', error);
        // Handle error
      }
    };

    if (tableName) {
      fetchColumns();
    }
  }, [tableName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.userId;

      const response = await fetch('http://localhost:3334/api/insertData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName, columnValues }),
      });

      if (response.ok) {
        setInserted(true);
        setMessage(`Data inserted into table "${tableName}" successfully.`);
        setTimeout(() => setMessage(''), 3000);

      } else {
        setInserted(false);
        setMessage('Failed to insert data into table. Please try again.');
        setTimeout(() => setMessage(''), 3000);

      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
      setTimeout(() => setMessage(''), 3000);

    }
  };

  const handleInputChange = (e, columnName) => {
    setColumnValues({
      ...columnValues,
      [columnName]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mr-2">
        <label htmlFor="tableName" className="block text-gray-700 font-bold mb-2">Table Name:</label>
        <input
          type="text"
          id="tableName"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          required
          className="shadow appearance-none mr-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline">Insert Table</button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}

      {!inserted &&
        <div className="mt-4 mr-2 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Columns:</h2>
          <table className="min-w-full divide-y divide-gray-200 right-m-2">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {columns.map((column, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{column.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{column.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={columnValues[column.name] || ''}
                      onChange={(e) => handleInputChange(e, column.name)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default InsertTable;
