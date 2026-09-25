import React from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenu({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen, activeTabData, tabs }) {
  return (
    <div className="md:hidden flex flex-col items-center mb-10 w-full relative z-40">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="flex items-center justify-between w-full max-w-[280px] px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-blue-50 font-semibold shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all active:scale-95"
      >
        <div className="flex items-center gap-3">
          <span className="text-blue-400">{activeTabData?.icon}</span>
          {activeTabData?.label}
        </div>
        
        {/* Ikon rotasi dengan Tailwind */}
        <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isMobileMenuOpen ? <X size={20} className="text-gray-400" /> : <Menu size={20} className="text-gray-400" />}
        </div>
      </button>

      {/* Dropdown Menu dengan efek scale & translate Tailwind */}
      <div 
        className={`absolute top-full w-full max-w-[280px] bg-[#1a233a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col origin-top transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'opacity-100 scale-y-100 translate-y-2 pointer-events-auto' 
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-b border-white/5 last:border-0 ${
              activeTab === tab.id ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}