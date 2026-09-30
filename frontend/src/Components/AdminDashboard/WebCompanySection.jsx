import React from 'react';
import { Type, AlignLeft, BarChart2 } from 'lucide-react';
import WebImageUpload from './WebImageUpload';

export default function WebCompanySection({ data, handleChange, handleImageUpload, handleRemoveImage }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      
      {/* KIRI: Upload Gambar */}
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-center order-2 lg:order-1">
        <WebImageUpload 
          label="Gambar Tentang Perusahaan" 
          aspect="video"
          gambar={data.gambar} 
          onUpload={handleImageUpload} 
          onRemove={handleRemoveImage} 
        />
        <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 mt-2">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-[#f26e22]">Tips:</strong> Gunakan gambar aktivitas tim, kantor, atau interaksi pelanggan (orientasi landscape) agar terlihat profesional dan membangun kepercayaan.
          </p>
        </div>
      </div>

      {/* KANAN: Form Teks */}
      <div className="space-y-5 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm order-1 lg:order-2">
        <h4 className="font-extrabold text-[#00437a] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Type size={20} className="text-[#f26e22]" /> Copywriting Company Section
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Type size={14} className="text-[#00437a]" /> Judul (Biru)
            </label>
            <input 
              type="text" name="heading1" value={data.heading1} onChange={handleChange}
              placeholder="Contoh: Crafting Memories"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#00437a] focus:bg-white focus:border-[#00437a] outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Type size={14} className="text-[#f26e22]" /> Judul (Oranye)
            </label>
            <input 
              type="text" name="heading2" value={data.heading2} onChange={handleChange}
              placeholder="Contoh: Since 2015"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#f26e22] focus:bg-white focus:border-[#f26e22] outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <AlignLeft size={14} className="text-gray-500" /> Sub-teks (Sejarah / Profil)
          </label>
          <textarea 
            name="subtext" rows="4" value={data.subtext} onChange={handleChange}
            placeholder="Berawal dari hobi jalan-jalan..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all custom-scrollbar resize-none leading-relaxed"
          ></textarea>
        </div>

        {/* Kotak Statistik */}
        <div className="pt-2">
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <BarChart2 size={14} className="text-emerald-500" /> Data Statistik (Highlights)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <input 
                type="text" name="stat1Value" value={data.stat1Value} onChange={handleChange}
                placeholder="5K+" className="w-full bg-transparent text-xl font-extrabold text-[#00437a] outline-none mb-1"
              />
              <input 
                type="text" name="stat1Label" value={data.stat1Label} onChange={handleChange}
                placeholder="HAPPY TRAVELERS" className="w-full bg-transparent text-[10px] font-bold text-gray-400 uppercase outline-none"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <input 
                type="text" name="stat2Value" value={data.stat2Value} onChange={handleChange}
                placeholder="50+" className="w-full bg-transparent text-xl font-extrabold text-[#00437a] outline-none mb-1"
              />
              <input 
                type="text" name="stat2Label" value={data.stat2Label} onChange={handleChange}
                placeholder="DESTINATIONS" className="w-full bg-transparent text-[10px] font-bold text-gray-400 uppercase outline-none"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}