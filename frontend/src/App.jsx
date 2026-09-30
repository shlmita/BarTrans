import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Beranda from './Components/Beranda/beranda';
import AdminLayout from './Components/AdminDashboard/AdminLayout'; 

import LoginModal from './Components/Beranda/LoginModal'; 
import RegisterModal from './Components/Beranda/RegisterModal'; 

// 🔥 Komponen Proteksi Akses Halaman Admin
const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Cek apakah user sudah login dan memiliki role Superadmin atau Driver
  if (!user || (user.role !== 'Superadmin' && user.role !== 'Driver')) {
    alert("Akses ditolak! Halaman ini khusus untuk Admin dan Driver.");
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // 🔥 State untuk menyimpan status login secara global
  const [currentUser, setCurrentUser] = useState(null);

  // Cek sesi login saat aplikasi pertama kali dimuat
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
    }
  }, []);

  const openLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <Router>
      {/* Modal Login & Register */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToRegister={openRegister} 
      />
      
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        onSwitchToLogin={openLogin} 
      />

      <Routes>
        {/* Halaman Utama untuk Pelanggan */}
        {/* 🔥 currentUser dioper ke Beranda agar bisa dibaca oleh Navbar/Modal */}
        <Route path="/" element={<Beranda onOpenLogin={openLogin} currentUser={currentUser} />} />
        
        {/* Halaman Khusus Admin (Hanya Superadmin & Driver) */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;