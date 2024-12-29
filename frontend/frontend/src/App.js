import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
// import UploadAssignment from './components/UploadAssignment';
// import ViewAssignments from './components/ViewAssignments';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

const App = () => {
  return (
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* <Route path="/upload-assignment" element={<UploadAssignment />} />
            <Route path="/view-assignments" element={<ViewAssignments />} /> */}
          </Routes>
        </div>
      </Router>
  );
};

export default App;
