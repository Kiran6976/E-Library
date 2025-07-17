import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Home from './pages/Home';
import Register from './pages/Register';
import Latest from './pages/Latest';
import AdminPanel from './pages/AdminPanel';

const App = () => {
  const role = localStorage.getItem("role"); // ✅ Get role from localStorage

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav style={{ padding: '10px', background: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/upload" style={{ marginRight: '10px' }}>Upload</Link>
          
          {/* ✅ Show Admin Panel only for admins */}
          {role === 'admin' && (
            <Link to="/admin" style={{ marginRight: '10px' }}>Admin Panel</Link>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/register" element={<Register />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
