import React from 'react';
import { MapPin, Navigation, Bus, Users, Tag } from 'lucide-react';

export default function TravelFormFields({ formData, handleChange, handleTotalKursiChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <MapPin size={14} className="text-[#f26e22]" /> Titik Jemput
          </label>
          <input 
            type="text" name="asal" required 
            value={formData.asal} onChange={handleChange}
            placeholder="Contoh: Pati"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Navigation size={14} className="text-[#00437a]" /> Tujuan
          </label>
          <input 
            type="text" name="tujuan" required 
            value={formData.tujuan} onChange={handleChange}
            placeholder="Contoh: Jakarta"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Bus size={14} className="text-[#00437a]" /> Nama Unit
          </label>
          <input 
            type="text" name="unit" required 
            value={formData.unit} onChange={handleChange}
            placeholder="Toyota Hiace 1"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Users size={14} className="text-gray-400" /> Total Kursi
          </label>
          <input 
            type="number" name="kursiTotal" min="1" required
            value={formData.kursiTotal} onChange={handleTotalKursiChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all font-semibold"
          />
        </div>
      </div>

      <div>
        <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <Tag size={14} className="text-[#f26e22]" /> Harga Tiket (Rp)
        </label>
        <input 
          type="number" name="harga" min="0" required
          value={formData.harga} onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#f26e22] outline-none transition-all font-bold text-[#00437a]"
        />
      </div>
    </div>
  );
}