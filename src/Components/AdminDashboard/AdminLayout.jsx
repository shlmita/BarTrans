import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import FinanceOverview from './FinanceOverview';
import PesananManager from './PesananManager';
import TravelManager from './TravelManager';
import MobilManager from './MobilManager';
import TrukManager from './TruckManager'; 
import PenginapanManager from './PenginapanManager';
import WisataManager from './WisataManager'; 
import WebManager from './WebManager'; 
import ReviewManager from './ReviewManager';
import AkunManager from './AkunManager';

import { LayoutDashboard, Receipt, Bus, CarFront, Truck, Hotel, Users, Star, Map, Globe } from 'lucide-react';

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState('finance');

  const menu = [
    { id: 'finance', label: 'Finance & Laba', icon: LayoutDashboard },
    { id: 'pesanan', label: 'Data Transaksi', icon: Receipt },
    { id: 'travel', label: 'Kelola Travel', icon: Bus },
    { id: 'mobil', label: 'Sewa Mobil', icon: CarFront },
    { id: 'truk', label: 'Jasa Angkut', icon: Truck },
    { id: 'inap', label: 'Penginapan', icon: Hotel },
    { id: 'wisata', label: 'Paket Wisata', icon: Map }, 
    { id: 'review', label: 'Control Review', icon: Star },
    { id: 'akun', label: 'Manajemen Akun', icon: Users },
    { id: 'web', label: 'Manajemen Web', icon: Globe }, 
  ];

  // Ambil data menu yang sedang aktif untuk nampilin ikon dinamis
  const activeMenuObj = menu.find(m => m.id === activeTab);

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      
      <AdminSidebar menu={menu} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-28 md:pb-8 custom-scrollbar relative w-full scroll-smooth">
        <div className="max-w-6xl mx-auto">
          
          {/* 🔥 STICKY HEADER KHUSUS MOBILE (Glassmorphism) 🔥 */}
          <header className="sticky top-0 z-30 bg-[#f8f9fa]/85 backdrop-blur-xl -mx-4 px-4 py-4 md:mx-0 md:px-0 md:py-0 md:bg-transparent md:backdrop-blur-none md:static mb-6 md:mb-8 border-b border-gray-200/60 md:border-none flex justify-between items-center transition-all">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#00437a] tracking-tight flex items-center gap-2.5">
                {/* Ikon menu cuma muncul di sebelah judul saat mode mobile */}
                {activeMenuObj && <activeMenuObj.icon className="md:hidden text-[#f26e22]" size={24} />}
                {activeMenuObj?.label}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm mt-0.5 md:mt-1">Dashboard Control Panel BarTrans.</p>
            </div>
            
            {/* Logo BarTrans Mini khusus Mobile (Pojok Kanan Atas) */}
            <div className="md:hidden flex items-center justify-center bg-gradient-to-br from-[#00437a] to-[#005a9e] px-3 py-1.5 rounded-xl shadow-md border border-white/20">
              <span className="font-black text-sm tracking-wide text-[#f26e22]">Bar<span className="text-white">Trans</span></span>
            </div>
          </header>

          <div className="animate-fade-in">
            {activeTab === 'finance' && <FinanceOverview />}
            {activeTab === 'pesanan' && <PesananManager />}
            {activeTab === 'travel' && <TravelManager />}
            {activeTab === 'mobil' && <MobilManager />}
            {activeTab === 'truk' && <TrukManager />}
            {activeTab === 'inap' && <PenginapanManager />}
            {activeTab === 'wisata' && <WisataManager />} 
            {activeTab === 'review' && <ReviewManager />}
            {activeTab === 'akun' && <AkunManager />}
            {activeTab === 'web' && <WebManager />} 
          </div>
        </div>
      </main>
      
    </div>
  );
}