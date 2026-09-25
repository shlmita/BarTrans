import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react'; // 🔥 Import ikon titik tiga

export default function AdminSidebar({ menu, activeTab, setActiveTab }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Pecah menu jadi 2 bagian: 4 tampil di bawah, sisanya masuk ke pop-up
  const visibleMenu = menu.slice(0, 4);
  const hiddenMenu = menu.slice(4);

  // Cek apakah menu yang sedang aktif ada di dalam menu yang disembunyikan
  const isHiddenActive = hiddenMenu.some(m => m.id === activeTab);

  const handleMenuClick = (id) => {
    setActiveTab(id);
    setIsMoreOpen(false); // Otomatis tutup pop-up kalau menu dipilih
  };

  return (
    <>
      {/* 💻 WUJUD DESKTOP: Sidebar Kiri */}
      <aside className="hidden md:flex w-64 bg-[#00437a] text-white flex-col shadow-xl z-20 h-screen shrink-0">
        <div className="p-6 text-2xl font-black tracking-widest text-[#f26e22] bg-white/5 border-b border-white/10">
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
      </aside>

      {/* 📱 WUJUD MOBILE: Bottom Bar ala iOS (Glassmorphism + Pop-up Text) */}
      
      {/* Invisible Overlay untuk menutup pop-up kalau klik di luar */}
      {isMoreOpen && (
        <div className="md:hidden fixed inset-0 z-40" onClick={() => setIsMoreOpen(false)}></div>
      )}

      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-2">
        
        {/* POP-UP MENU LAINNYA */}
        {isMoreOpen && (
          <div className="absolute bottom-[calc(100%+12px)] right-0 bg-white/95 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-3xl p-3 w-56 flex flex-col gap-1 origin-bottom-right animate-fade-in">
            {hiddenMenu.map(m => {
              const isActive = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleMenuClick(m.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-xs text-left ${
                    isActive ? 'bg-[#00437a] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <m.icon size={16} /> {m.label}
                </button>
              );
            })}
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

          {/* TOMBOL "LAINNYA" (TITIK TIGA) */}
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