import React, { useState, useEffect } from 'react';
import { Home, Info, Grid, Star, Camera, User } from 'lucide-react';
import logoBartrans from '../../assets/Bartrans.png'; 
import LoginModal from './LoginModal'; 

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'Company', icon: Info }, 
    { id: 'services', label: 'Services', icon: Grid },
    { id: 'reviews', label: 'Reviews', icon: Star } 
  ];

  const activeIndex = navItems.findIndex(item => item.id === activeSection);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;

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

  return (
    <>
      {/* 
        ==================================================
        DESKTOP NAVBAR (White Glassmorphism Theme) 
        ==================================================
      */}
      <div className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? 'py-4' : 'py-6'}`}>
        <nav 
          className={`mx-auto flex justify-between items-center px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isScrolled 
              ? 'bg-white/90 backdrop-blur-xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-full py-2.5 w-[90%] max-w-5xl' 
              : 'bg-white/95 backdrop-blur-xl border border-gray-200 shadow-lg rounded-full py-3 w-[95%] max-w-7xl'
            }
          `}
        >
          {/* Logo (Tanpa mix-blend-screen biar warna aslinya keluar) */}
          <div 
            className="cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center" 
            onClick={() => scrollTo('home')}
          >
            <img 
              src={logoBartrans} 
              alt="Logo BarTrans" 
              className="h-10 md:h-12 w-auto object-contain mr-2" 
            />
          </div>

          {/* Wrapper Menu Tengah */}
          <div className="relative flex items-center bg-gray-100/80 p-1 rounded-full border border-gray-200/50">
            {/* Sliding Pill */}
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
                  className={`relative w-[90px] py-2 text-sm font-semibold transition-all duration-300 z-10
                    ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'}
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Grup Kanan */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all duration-300 group bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full border border-gray-200 hover:scale-105 active:scale-95">
              <Camera size={16} className="group-hover:scale-125 group-hover:rotate-12 group-hover:text-[#f26e22] transition-all duration-300" />
            </button>

            {/* Tombol Login */}
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2.5 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-200 px-1.5 py-1.5 pr-5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <div className="bg-[#f26e22] group-hover:bg-[#d95d1a] p-2 rounded-full text-white shadow-md transition-colors">
                <User size={14} strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-gray-600 group-hover:text-[#f26e22] transition-colors">Login</span>
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE TOP BAR (White Theme) */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-gray-200 py-3 shadow-sm px-5 flex justify-between items-center`}>
        <div className="cursor-pointer" onClick={() => scrollTo('home')}>
           <img 
              src={logoBartrans} 
              alt="Logo BarTrans" 
              className="h-8 w-auto object-contain" 
            />
        </div>

        <button 
          onClick={() => setIsLoginOpen(true)}
          className="flex items-center gap-2 bg-gray-100 active:bg-gray-200 border border-gray-200 p-1 pr-3.5 rounded-full transition-all active:scale-95"
        >
          <div className="bg-[#f26e22] p-1.5 rounded-full text-white">
            <User size={12} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-bold text-gray-600">Login</span>
        </button>
      </div>

      {/* MOBILE BOTTOM NAVBAR (White Theme) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 animate-fade-in">
        <nav className="bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-[2rem] p-2 relative overflow-hidden">
          <div className="relative flex w-full h-14">
            
            {/* Sliding Pill Mobile */}
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
                  className={`flex-1 flex flex-col items-center justify-center relative z-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-90
                    ${isActive ? 'text-[#f26e22]' : 'text-gray-400 hover:text-gray-600'}
                  `}
                >
                  <div className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? '-translate-y-1.5' : 'translate-y-0'}`}>
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span 
                    className={`text-[10px] font-bold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] absolute bottom-1.5
                      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}