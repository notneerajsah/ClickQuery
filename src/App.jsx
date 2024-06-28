import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  StickyNavbar from './component/Navbar'; // Assuming Navbar is a component
import Login from './component/Login';
import Signup from './component/Signup';
import Dmlpage from './pages/Dmlpage';
import Ddlpage from './pages/Ddlpage';
import Landing from './pages/Landing';
import About from './pages/About';
import { dbmscontext } from './context/dbmscontext';
import Homepage from './pages/Homepage';
import Footer from './component/Footer';

function App() {
  const { isLoggedIn, setIsLoggedIn} = useContext(dbmscontext);
console.log("isloggedin",isLoggedIn);
  // Conditional rendering based on authentication status
  return (
    <BrowserRouter>
      <StickyNavbar/> {/* Assuming Navbar is a global component */}

      <Routes>
        <Route path="/" element={<Landing />} /> {/* Landing page as default */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Homepage/>}/>
       
        <Route
          path="/dml"
          element={isLoggedIn ? <Dmlpage /> : <Login />} // Redirect to Login if not logged in
        />
        <Route
          path="/ddl"
          element={isLoggedIn ? <Ddlpage /> : <Login />} // Redirect to Login if not logged in
        />
        <Route  path="/about" element={<About/>}/>

        {/* Potential catch-all route for unmatched paths (optional) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer  />
    </BrowserRouter>
  );
}

export default App;
