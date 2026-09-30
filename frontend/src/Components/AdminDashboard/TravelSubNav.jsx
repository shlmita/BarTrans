import React from 'react';
import { Bus, MapPin } from 'lucide-react';

export default function TravelSubNav({ activeSubTab, setActiveSubTab }) {
  return (
    <div className="flex gap-3 mb-6 border-b border-gray-200 pb-4">
      <button
        onClick={() => setActiveSubTab('armada')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
          activeSubTab === 'armada'
            ? 'bg-[#00437a] text-white shadow-md'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        <Bus size={18} /> Manajemen Armada & Kursi
      </button>
      
      <button
        onClick={() => setActiveSubTab('lokasi')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
          activeSubTab === 'lokasi'
            ? 'bg-[#00437a] text-white shadow-md'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        <MapPin size={18} /> Titik Jemput & Tujuan
      </button>
    </div>
  );
}