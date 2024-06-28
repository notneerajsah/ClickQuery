import React, { useContext, useState, useEffect, Profiler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dbmscontext } from '../context/dbmscontext.jsx';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn, currentuser, setCurrentUser, setsqlfun } = useContext(dbmscontext);
    const [phone, setPhone] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [profile, setprofile] = useState(false);


    const navigate = useNavigate();
    const Profilehandle = () => {
        setprofile(!profile);
    }
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSearchBar1 = () => {
        setIsExpanded(!isExpanded);
    };


    const handlesqlcommand = (e) => {
        setsqlfun(e.target.value);
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setPhone(width <= 900);
    }, [width]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentUser(null);
        navigate('/');
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };



    return (
        <nav className="bg-gradient-to-r from-purple-500 via-purple-300 to-pink-200 sticky w-full z-10">
            <div className="container mx-auto flex justify-between items-center p-4">
                {phone && (
                    <button className="text-white" onClick={toggleMenu}>
                        <i className="fa-solid fa-bars text-xl"></i>
                    </button>
                )}
                <div className={`${phone ? 'hidden' : 'block'} items-center`}>
                    <h1 className="text-white font-bold text-2xl">ClickQuery</h1>
                </div>
                {phone ? (<div className='flex flex-row gap-2 items-center justify-center'><div className="flex items-center space-x-4">
                    <div className="flex justify-center items-center mt-0 relative w-full max-w-md mx-auto">
                        <input
                            placeholder='Search...'
                            className={`bg-white border border-gray-300 text-gray-900 rounded-full py-2 px-4 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out 
                             ${isExpanded ? 'w-full' : 'w-2'} 
                            sm:w-full`}
                        />
                        <FiSearch
                            className="absolute left-3 text-gray-500 text-lg cursor-pointer sm:left-3 sm:text-lg"
                            onClick={toggleSearchBar1}
                        />
                    </div>
                    {!phone && (
                        <div className="flex items-center space-x-8">
                            <Link to="/ddl">
                                <button className="text-white hover:underline" value='ddl' onClick={handlesqlcommand}>DDL</button>
                            </Link>
                            <Link to="/dml">
                                <button className="text-white hover:underline" value='dml' onClick={handlesqlcommand}>DML</button>
                            </Link>
                        </div>
                    )}


                </div>
                    <div className="relative">

                        <button className="flex items-center text-white" onClick={Profilehandle}>
                            <i className="fa-solid fa-user text-xl"></i>
                            <span className="ml-2">{currentuser?.substring(0, 2)}</span>
                        </button>
                        {profile && (
                            <ul className="absolute right-0 mt-2 w-48 bg-blue-200 text-gray-800 shadow-lg rounded-md overflow-hidden gap-2">
                                {!isLoggedIn ? (
                                    <>
                                        <li className="hover:bg-gray-200 border-solid border-2 border-sky-500 p-2">
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li className="hover:bg-gray-200 border-solid border-2 border-sky-500 p-2">
                                            <Link to="/signup">Signup</Link>
                                        </li>
                                    </>
                                ) : (
                                    <li className="hover:bg-gray-200 p-2">
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div></div>) : (<><div className="flex items-center space-x-4">
                        <div className="flex justify-center items-center mt-2 relative w-full max-w-md mx-auto">
                            <input
                                placeholder='Search...'
                                className={`bg-white border border-gray-300 text-gray-900 rounded-full py-2 px-4 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out 
                             ${isExpanded ? 'w-full' : 'w-2'} 
                            sm:w-full`}
                            />
                            <FiSearch
                                className="absolute left-2 text-gray-500 text-lg cursor-pointer sm:left-2 sm:text-lg"
                                onClick={toggleSearchBar1}
                            />
                        </div>
                        {!phone && (
                            <div className="flex items-center space-x-8">
                                <Link to="/ddl">
                                    <button className="text-white hover:underline" value='ddl' onClick={handlesqlcommand}>DDL</button>
                                </Link>
                                <Link to="/dml">
                                    <button className="text-white hover:underline" value='dml' onClick={handlesqlcommand}>DML</button>
                                </Link>
                            </div>
                        )}


                    </div>
                        <div className="relative">

                            <button className="flex items-center text-white" onClick={Profilehandle}>
                                <i className="fa-solid fa-user text-xl"></i>
                                <span className="ml-2">{currentuser?.substring(0, 2)}</span>
                            </button>
                            {profile && (
                                <ul className="absolute right-0 mt-2 w-48 bg-blue-200 text-gray-800 shadow-lg rounded-md overflow-hidden gap-2">
                                    {!isLoggedIn ? (
                                        <>
                                            <li className="hover:bg-gray-200 border-solid border-2 border-sky-500 p-2">
                                                <Link to="/login">Login</Link>
                                            </li>
                                            <li className="hover:bg-gray-200 border-solid border-2 border-sky-500 p-2">
                                                <Link to="/signup">Signup</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <li className="hover:bg-gray-200 p-2">
                                            <button onClick={handleLogout}>Logout</button>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div></>)}

            </div>

            {phone && isMenuOpen && (
                <div className="bg-custom-purple p-4">
                    <ul className="space-y-4">
                        <li>
                            <h1 className="text-white font-bold text-2xl">ClickQuery</h1>
                        </li>
                        <li>
                            <Link to="/ddl">
                                <button className="text-white w-full text-left" value='ddl' onClick={handlesqlcommand}>DDL</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dml">
                                <button className="text-white w-full text-left" value='dml' onClick={handlesqlcommand}>DML</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
