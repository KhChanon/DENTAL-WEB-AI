import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";

// page
import Homepage from './pages/Homepage/Homepage';
import Patientinfo from './pages/Patientinfo/Patientinfo';
import Followup from './pages/Followup/Followup';
import FollowRecords from './pages/Followup/FollowRecords';
import FAQ from './pages/FAQ/FAQ';
import Addcase  from './pages/Addcase/Addcase';
import Qrscanner from './pages/Qrscanner/Qrscanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/> 
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/patientinfo" element={<Patientinfo />} />
        <Route path="/followup" element={<Followup />} />
        <Route path="/followup/:id" element={<FollowRecords />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/addcase" element={<Addcase />} />
        <Route path="/qrscanner" element={<Qrscanner />} />
      </Routes>
    </Router>
  );  
}

export default App;