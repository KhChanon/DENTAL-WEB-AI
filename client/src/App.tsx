import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";

// page
import Homepage from './pages/Homepage/Homepage';
import Patientinfo from './pages/Patientinfo/Patientinfo';
import Followup from './pages/Followup/Followup';
import FAQ from './pages/FAQ/FAQ';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/> 
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/patientinfo" element={<Patientinfo />} />
        <Route path="/followup" element={<Followup />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );  
}

export default App;