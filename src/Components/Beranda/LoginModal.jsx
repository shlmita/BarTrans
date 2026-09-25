import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // IMPORT NAVIGASI
import { X, Mail, Lock, LogIn } from 'lucide-react';
import logoBartrans from '../../assets/Bartrans.png'; 

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // INISIALISASI FUNGSI NAVIGASI

  if (!isOpen) return null;

  // FUNGSI VALIDASI LOGIN DUMMY
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Cek Kredensial Admin Dummy
    if (email === 'admin@bartrans.com' && password === 'admin123') {
      onClose(); // Tutup modalnya
      navigate('/admin'); // Lempar ke halaman dashboard!
    } else {
      // Kalau salah, kasih pesan error
      setError('Email atau password salah! (Coba: admin@bartrans.com / admin123)');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="bg-white border border-gray-200 rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-20">
          <X size={18} />
        </button>

        <div className="p-8 relative z-10">
          <div className="text-center mb-8 flex flex-col items-center">
            <img src={logoBartrans} alt="Logo BarTrans" className="h-14 w-auto object-contain mb-4" />
            <h3 className="text-2xl font-bold text-[#00437a] mb-2">Welcome Back</h3>
            <p className="text-gray-500 text-sm">Masuk ke akun BarTrans kamu.</p>
          </div>

          {/* Form dipasangkan fungsi handleLogin saat disubmit */}
          <form className="space-y-5" onSubmit={handleLogin}>
            
            {/* Notifikasi Error jika login gagal */}
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 text-center font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bartrans.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-[#00437a] transition-colors placeholder:text-gray-400 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2 flex justify-between items-center">
                <span>Password</span>
                <a href="#" className="text-[#f26e22] hover:text-[#d95d1a] capitalize normal-case transition-colors">Lupa?</a>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-[#00437a] transition-colors placeholder:text-gray-400 shadow-sm"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 bg-[#f26e22] hover:bg-[#d95d1a] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2">
              <LogIn size={18} />
              Masuk Sekarang
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Belum punya akun? <a href="#" className="text-[#00437a] font-semibold hover:underline">Daftar di sini</a>
          </p>
        </div>
      </div>
    </div>
  );
}