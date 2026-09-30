import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, Grid, Star, Camera, User, LogOut, KeyRound, Phone, ShieldCheck, ChevronDown, X } from 'lucide-react';
import logoBartrans from '../../assets/Bartrans.png'; 

export default function Navbar({ onOpenLogin }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 💡 PERBAIKAN: Pisahkan Ref untuk Desktop dan Mobile
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'Company', icon: Info }, 
    { id: 'services', label: 'Services', icon: Grid },
    { id: 'reviews', label: 'Reviews', icon: Star } 
  ];

  const activeIndex = navItems.findIndex(item => item.id === activeSection);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setWhatsapp(parsed.whatsapp || '');
      } catch (err) {
        console.error("Gagal parse data user:", err);
      }
    }
  }, []);

  // 💡 PERBAIKAN: Deteksi klik di luar untuk kedua versi Navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideDesktop = desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target);
      const isOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target);
      
      if (isOutsideDesktop && isOutsideMobile) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/');
    window.location.reload();
  };

  const handleGoToAdmin = (e) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    navigate('/admin');
  };

  const handleOpenEdit = (e) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/users/${user.id}/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp, password })
      });
      const result = await response.json();
      if (result.status === 'success') {
        const updatedUser = { ...user, whatsapp };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert('Profil berhasil diperbarui!');
        setIsEditProfileOpen(false);
        setPassword('');
      } else {
        alert(result.message || 'Gagal memperbarui profil');
      }
    } catch (error) {
      alert('Gagal terhubung ke server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['home', 'about', 'services', 'reviews'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      if (window.scrollY === 0) {
        setActiveSection('home');
        return;
      }
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
    setActiveSection(id);
  };

  const firstName = user?.nama ? user.nama.trim().split(' ')[0] : '';

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? 'py-4' : 'py-6'}`}>
        <nav 
          className={`mx-auto flex justify-between items-center px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isScrolled 
              ? 'bg-white/90 backdrop-blur-xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-full py-2.5 w-[90%] max-w-5xl' 
              : 'bg-white/95 backdrop-blur-xl border border-gray-200 shadow-lg rounded-full py-3 w-[95%] max-w-7xl'
            }
          `}
        >
          <div className="cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center" onClick={() => scrollTo('home')}>
            <img src={logoBartrans} alt="Logo BarTrans" className="h-10 md:h-12 w-auto object-contain mr-2" />
          </div>

          <div className="relative flex items-center bg-gray-100/80 p-1 rounded-full border border-gray-200/50">
            <div 
              className="absolute top-1 bottom-1 w-[90px] bg-[#f26e22] rounded-full shadow-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
              style={{ transform: `translateX(${safeActiveIndex * 100}%)` }}
            />
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative w-[90px] py-2 text-sm font-semibold transition-all duration-300 z-10 ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all duration-300 group bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full border border-gray-200 hover:scale-105 active:scale-95">
              <Camera size={16} className="group-hover:scale-125 group-hover:rotate-12 group-hover:text-[#f26e22] transition-all duration-300" />
            </button>

            {user ? (
              <div className="relative" ref={desktopDropdownRef}>
                <button 
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  <div className="bg-[#00437a] p-1.5 rounded-full text-white">
                    <User size={14} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-bold text-[#00437a] max-w-[100px] truncate">{firstName}</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[9999] animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">Logged as</p>
                      <p className="text-xs font-bold text-gray-800 truncate">{user.email}</p>
                    </div>

                    {(user.role === 'Superadmin' || user.role === 'Driver') && (
                      <button 
                        type="button"
                        onClick={handleGoToAdmin}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#00437a] hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <ShieldCheck size={16} /> Portal Admin
                      </button>
                    )}

                    <button 
                      type="button"
                      onClick={handleOpenEdit}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <KeyRound size={16} /> Edit Akun / Password
                    </button>

                    <button 
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1 cursor-pointer"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                type="button"
                onClick={onOpenLogin}
                className="flex items-center gap-2.5 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-200 px-1.5 py-1.5 pr-5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
              >
                <div className="bg-[#f26e22] group-hover:bg-[#d95d1a] p-2 rounded-full text-white shadow-md transition-colors">
                  <User size={14} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-gray-600 group-hover:text-[#f26e22] transition-colors">Login</span>
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* MOBILE TOP BAR */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-gray-200 py-3 shadow-sm px-5 flex justify-between items-center`}>
        <div className="cursor-pointer" onClick={() => scrollTo('home')}>
           <img src={logoBartrans} alt="Logo BarTrans" className="h-8 w-auto object-contain" />
        </div>

        {user ? (
          <div className="relative" ref={mobileDropdownRef}>
            <button 
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200"
            >
              <span className="text-xs font-bold text-[#00437a] max-w-[80px] truncate">{firstName}</span>
              <ChevronDown size={12} className="text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[9999]">
                {(user.role === 'Superadmin' || user.role === 'Driver') && (
                  <button 
                    type="button"
                    onClick={handleGoToAdmin}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#00437a] hover:bg-blue-50"
                  >
                    <ShieldCheck size={14} /> Portal Admin
                  </button>
                )}
                <button 
                  type="button"
                  onClick={handleOpenEdit}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <KeyRound size={14} /> Edit Profil / Pass
                </button>
                <button 
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 border-t border-gray-100"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            type="button"
            onClick={onOpenLogin}
            className="flex items-center gap-2 bg-gray-100 active:bg-gray-200 border border-gray-200 p-1 pr-3.5 rounded-full transition-all active:scale-95"
          >
            <div className="bg-[#f26e22] p-1.5 rounded-full text-white">
              <User size={12} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-bold text-gray-600">Login</span>
          </button>
        )}
      </div>

      {/* MOBILE BOTTOM NAVBAR */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 animate-fade-in">
        <nav className="bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-[2rem] p-2 relative overflow-hidden">
          <div className="relative flex w-full h-14">
            <div 
              className="absolute top-0 bottom-0 w-1/4 bg-orange-50 border border-orange-100 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
              style={{ transform: `translateX(${safeActiveIndex * 100}%)` }}
            />
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon; 
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex-1 flex flex-col items-center justify-center relative z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-90 ${isActive ? 'text-[#f26e22]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? '-translate-y-1.5' : 'translate-y-0'}`}>
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`text-[10px] font-bold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] absolute bottom-1.5 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* MODAL EDIT PROFILE */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-fade-in">
            <button type="button" onClick={() => setIsEditProfileOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
              <X size={20} />
            </button>
            <h3 className="text-xl font-extrabold text-[#00437a] mb-1">Pengaturan Profil</h3>
            <p className="text-xs text-gray-500 mb-6">Ubah informasi No. WhatsApp atau Kata Sandi kamu.</p>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">No WhatsApp</label>
                <div className="relative flex items-center">
                  <Phone size={16} className="absolute left-3 text-gray-400" />
                  <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="08xxxxxxxxxx" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00437a]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password Baru (Opsional)</label>
                <div className="relative flex items-center">
                  <KeyRound size={16} className="absolute left-3 text-gray-400" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kosongkan jika tidak diganti" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00437a]" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#00437a] hover:bg-[#00335e] text-white font-bold rounded-xl text-sm transition-all shadow-md mt-2 cursor-pointer">
                {isSubmitting ? 'Simpan...' : 'Simpan Perubahan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}