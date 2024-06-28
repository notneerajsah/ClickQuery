import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; 
import './index.css';
import DbmscontextProvider from './context/dbmscontext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <DbmscontextProvider> 
    <App /> 
  </DbmscontextProvider>
);
