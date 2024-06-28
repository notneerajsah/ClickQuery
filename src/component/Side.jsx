import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { dbmscontext } from '../context/dbmscontext';
import { Link } from 'react-router-dom';

const Side = () => {
  const [allTables, setAllTables] = useState([]);
  const { isLoggedIn, currentUserTable } = useContext(dbmscontext);
  const[search,setsearch]=useState('');


  const handleseach=(e)=>{
    setsearch(e.target.value);
    console.log("search text:",search);
  }
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token && isLoggedIn) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;

          const response = await axios.get(`http://localhost:3334/api/tabledata/${userId}`);
          const data = response.data;
          setAllTables(data.rows);
          currentUserTable(data.rows);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setAllTables([]); // Clear tables if not logged in or no token
      }
    };
    fetchData();
  }, [isLoggedIn, currentUserTable]); // Fetch data whenever isLoggedIn changes

  return (
    <div className="rounded-md min-w-full h-full bg-custom-lightpink2 w-64 overflow-y-auto z-50 p-4">
      <nav id="hamburger" className="flex flex-col w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full flex items-center">
            <input
              type="text"
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-l-md focus:outline-none w-full"
              placeholder="Search..."
              value={search}
             onChange={handleseach}
            />
            <button className="bg-gray-200 hover:bg-gray-300  text-white py-3 space-x-1 px-4 rounded-r-md flex items-center justify-center">
              <i className="fas fa-search text-black"></i>
            </button>
          </div>

          <div className="bg-gray-700 p-4 rounded-md w-full">
            <h1 className="text-white font-bold text-lg">Your Tables</h1>
          </div>
          <ul className="flex flex-col gap-2 mt-4 w-full">
            {allTables.map((table, index) => (
              <li key={index} className="p-2 rounded-md bg-custom-peach1 hover:bg-gray-700 transition duration-300 ease-in-out">
                <Link to="/" className="flex text-white">
                  <span className="ml-2">{table.table_name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Side;
