import React from 'react';
import { Filter, Star } from 'lucide-react';

export default function TestimoniFilter({ activeService, setActiveService, activeRating, setActiveRating }) {
  const services = ["Semua Layanan", "Sewa Mobil", "Travel", "Jasa Angkut", "Paket Wisata", "Penginapan"];
  const ratings = ["Semua Bintang", 5, 4, 3];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-8 space-y-5 animate-fade-in">
      <div className="flex items-center gap-2 text-[#00437a] font-semibold border-b border-gray-100 pb-3">
        <Filter size={18} className="text-[#f26e22]" /> Filter Ulasan
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Berdasarkan Layanan</p>
        <div className="flex flex-wrap gap-2">
          {services.map((srv) => (
            <button key={srv} onClick={() => setActiveService(srv)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeService === srv ? 'bg-[#00437a] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'}`}>
              {srv}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Berdasarkan Rating</p>
        <div className="flex flex-wrap gap-2">
          {ratings.map((rate) => (
            <button key={rate} onClick={() => setActiveRating(rate)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${activeRating === rate ? 'bg-orange-50 text-[#f26e22] border border-orange-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'}`}>
              {rate === "Semua Bintang" ? "Semua Bintang" : <><Star size={14} className="fill-current" />{rate} Bintang</>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}