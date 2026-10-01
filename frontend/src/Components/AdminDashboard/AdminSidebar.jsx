import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Globe, LogOut } from 'lucide-react'; 

export default function AdminSidebar({ menu, activeTab, setActiveTab }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const navigate = useNavigate();

  const visibleMenu = menu.slice(0, 4);
  const hiddenMenu = menu.slice(4);

  const isHiddenActive = hiddenMenu.some(m => m.id === activeTab);

  const handleMenuClick = (id) => {
    setActiveTab(id);
    setIsMoreOpen(false); 
  };

  // 🔥 FUNGSI LOGOUT DAN NAVIGASI 🔥
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const handleGoToPortal = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
      {/* 💻 WUJUD DESKTOP: Sidebar Kiri */}
      <aside className="hidden md:flex w-64 bg-[#00437a] text-white flex-col shadow-xl z-20 h-screen shrink-0">
        <div className="p-6 text-2xl font-black tracking-widest text-[#f26e22] bg-white/5 border-b border-white/10 shrink-0">
          BarTrans <span className="text-white text-sm block font-normal tracking-normal mt-1">Admin Panel</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {menu.map(m => {
            const isActive = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleMenuClick(m.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm text-left ${
                  isActive ? 'bg-[#f26e22] text-white shadow-lg translate-x-1' : 'text-blue-100 hover:bg-white/10 hover:translate-x-1'
                }`}
              >
                <m.icon size={18} /> {m.label}
              </button>
            );
          })}
        </nav>

        {/* 🔥 TAMBAHAN TOMBOL DESKTOP (PORTAL & LOGOUT) 🔥 */}
        <div className="p-4 border-t border-white/10 space-y-2 shrink-0 bg-[#00437a]">
          <button 
            onClick={handleGoToPortal}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-blue-100 hover:bg-white/10 hover:translate-x-1 transition-all"
          >
            <Globe size={18} /> Portal BarTrans
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-red-300 hover:bg-red-500/20 hover:text-red-100 hover:translate-x-1 transition-all"
          >
            <LogOut size={18} /> Logout Akun
          </button>
        </div>
      </aside>

      {/* 📱 WUJUD MOBILE: Bottom Bar ala iOS */}
      {isMoreOpen && (
        <div className="md:hidden fixed inset-0 z-40" onClick={() => setIsMoreOpen(false)}></div>
      )}

      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-2">
        
        {/* POP-UP MENU LAINNYA */}
        {isMoreOpen && (
          <div className="absolute bottom-[calc(100%+12px)] right-0 bg-white/95 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-3xl p-3 w-56 flex flex-col gap-1 origin-bottom-right animate-fade-in max-h-[60vh] overflow-y-auto custom-scrollbar">
            {hiddenMenu.map(m => {
              const isActive = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleMenuClick(m.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-xs text-left shrink-0 ${
                    isActive ? 'bg-[#00437a] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <m.icon size={16} /> {m.label}
                </button>
              );
            })}

            {/* 🔥 TAMBAHAN TOMBOL MOBILE (PORTAL & LOGOUT) 🔥 */}
            <div className="my-1 border-t border-gray-100 shrink-0"></div>
            <button 
              onClick={handleGoToPortal}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-xs text-left text-gray-600 hover:bg-gray-100 shrink-0"
            >
              <Globe size={16} /> Portal BarTrans
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-xs text-left text-red-500 hover:bg-red-50 shrink-0"
            >
              <LogOut size={16} /> Logout Akun
            </button>
          </div>
        )}

        {/* BOTTOM NAV BAR */}
        <div className="flex justify-between items-center px-1">
          {visibleMenu.map(m => {
            const isActive = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleMenuClick(m.id)}
                className={`flex items-center gap-2 px-3 py-3 rounded-2xl transition-all duration-500 ease-out overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#00437a] to-[#005a9e] text-white shadow-md w-auto flex-1 justify-center' 
                    : 'bg-transparent text-gray-500 hover:bg-gray-100/50 w-12 justify-center'
                }`}
              >
                <m.icon size={20} className={isActive ? "scale-110 transition-transform shrink-0" : "shrink-0"} />
                {isActive && (
                  <span className="text-[11px] font-bold animate-fade-in whitespace-nowrap">
                    {m.label}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex items-center gap-2 px-3 py-3 rounded-2xl transition-all duration-500 ease-out overflow-hidden ${
              isHiddenActive || isMoreOpen
                ? 'bg-gradient-to-r from-[#f26e22] to-[#f58b4c] text-white shadow-md w-auto flex-1 justify-center' 
                : 'bg-transparent text-gray-500 hover:bg-gray-100/50 w-12 justify-center'
            }`}
          >
            <MoreHorizontal size={20} className={(isHiddenActive || isMoreOpen) ? "scale-110 transition-transform shrink-0" : "shrink-0"} />
            {(isHiddenActive || isMoreOpen) && (
              <span className="text-[11px] font-bold animate-fade-in whitespace-nowrap">
                Lainnya
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}