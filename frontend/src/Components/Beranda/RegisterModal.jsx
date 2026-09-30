import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, CreditCard, UserPlus } from 'lucide-react';
import logoBartrans from '../../assets/Bartrans.png'; 

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    nama: '', whatsapp: '', email: '', nik: '', password: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.status === 'success') {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onSwitchToLogin();
        }, 2000);
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      setErrorMsg('Gagal terhubung ke server backend!');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="bg-white border border-gray-200 rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 max-h-[90vh] flex flex-col">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-20">
          <X size={18} />
        </button>

        <div className="p-6 md:p-8 relative z-10 overflow-y-auto custom-scrollbar flex-1">
          <div className="text-center mb-6 flex flex-col items-center">
            <img src={logoBartrans} alt="Logo BarTrans" className="h-12 w-auto object-contain mb-3" />
            <h3 className="text-xl font-bold text-[#00437a] mb-1">Daftar Akun Baru</h3>
            <p className="text-gray-500 text-sm">Lengkapi data untuk bergabung dengan BarTrans.</p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            
            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 text-center font-bold">
                {errorMsg}
              </div>
            )}

            {isSuccess && (
              <div className="bg-emerald-50 text-emerald-600 text-xs p-3 rounded-lg border border-emerald-100 text-center font-bold">
                Pendaftaran berhasil! Mengalihkan ke halaman Login...
              </div>
            )}

            <div>
              <label className="text-[11px] text-gray-600 uppercase tracking-wider font-bold mb-1.5 block">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User size={16} className="text-gray-400" /></div>
                <input type="text" name="nama" required value={formData.nama} onChange={handleChange} placeholder="Budi Santoso"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-[#00437a] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-gray-600 uppercase tracking-wider font-bold mb-1.5 block">No WhatsApp</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Phone size={16} className="text-gray-400" /></div>
                <input type="tel" name="whatsapp" required value={formData.whatsapp} onChange={handleChange} placeholder="081234567890"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-[#00437a] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-gray-600 uppercase tracking-wider font-bold mb-1.5 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail size={16} className="text-gray-400" /></div>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="budi@email.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-[#00437a] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-gray-600 uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                NIK <span className="text-gray-400 normal-case lowercase font-medium">(Opsional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><CreditCard size={16} className="text-gray-400" /></div>
                <input type="text" name="nik" value={formData.nik} onChange={handleChange} placeholder="3318..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-mono text-gray-900 outline-none focus:border-[#00437a] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-gray-600 uppercase tracking-wider font-bold mb-1.5 block">Buat Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock size={16} className="text-gray-400" /></div>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="Minimal 6 karakter"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-[#00437a] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#00437a] hover:bg-[#003057] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4">
              <UserPlus size={18} />
              Daftar Sekarang
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-5">
            Sudah punya akun? <button onClick={onSwitchToLogin} className="text-[#f26e22] font-bold hover:underline">Masuk di sini</button>
          </p>
        </div>
      </div>
    </div>
  );
}