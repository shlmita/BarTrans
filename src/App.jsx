import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Beranda from './Components/Beranda/beranda';
// PASTIKAN PATH IMPORT ADMIN LAYOUT INI SESUAI DENGAN FOLDER LU YA!
import AdminLayout from './Components/AdminDashboard/AdminLayout'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Utama untuk Pelanggan */}
        <Route path="/" element={<Beranda />} />
        
        {/* Halaman Khusus Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;