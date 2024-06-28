
import React, { createContext, useEffect } from "react";

import { useState } from "react";



export const dbmscontext = createContext(null);

const DbmscontextProvider = (props) => {
    
   
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State for isLoggedIn
    const [currentuser, setCurrentUser] = useState('Account'); // State for current user
    const [sqlcommand,setsqlcommand]=useState('ddl');
    const[user_table,setuser_table]=useState([]);
    // const[tabledata,settabledata]=useState('');
    
    const currentUserTable=(e)=>{
        setuser_table(e);
    }
    const setsqlfun = (sql) => {
        setsqlcommand(sql);
    };
    

   

   

    const contextValue = { isLoggedIn, setIsLoggedIn, currentuser,setCurrentUser,setsqlfun,sqlcommand,user_table,currentUserTable}; // Include loggined function
    return (
        <dbmscontext.Provider value={contextValue}>
            {props.children}
        </dbmscontext.Provider>
    );
};

export default DbmscontextProvider;