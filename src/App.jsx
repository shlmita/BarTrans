import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Beranda from './Components/Beranda/beranda';
import AdminLayout from './Components/AdminDashboard/AdminLayout'; 

// 🔥 IMPORT KEDUA MODAL DI SINI 🔥
// (Pastikan path foldernya sesuai dengan struktur folder lu ya)
import LoginModal from './Components/Beranda/LoginModal'; 
import RegisterModal from './Components/Beranda/RegisterModal'; 

function App() {
  // 1. Siapin State untuk ngatur buka-tutup Modal
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // 2. Fungsi buat Switch (Tukar) antar Modal
  const openLogin = () => {
    setIsRegisterOpen(false); // Tutup register
    setIsLoginOpen(true);     // Buka login
  };

  const openRegister = () => {
    setIsLoginOpen(false);    // Tutup login
    setIsRegisterOpen(true);  // Buka register
  };

  return (
    <Router>
      
      {/* 3. Render Modal di luar Routes biar bisa numpuk di atas semua elemen */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToRegister={openRegister} // Fungsi switch dipanggil pas tulisan "Daftar di sini" diklik
      />
      
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        onSwitchToLogin={openLogin} // Fungsi switch dipanggil pas tulisan "Masuk di sini" diklik
      />

      <Routes>
        {/* Halaman Utama untuk Pelanggan */}
        {/* 🔥 Kita lempar fungsi openLogin ke Beranda sebagai props 🔥 */}
        <Route path="/" element={<Beranda onOpenLogin={openLogin} />} />
        
        {/* Halaman Khusus Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;