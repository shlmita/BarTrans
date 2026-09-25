import React from 'react';
import { Type, AlignLeft, MousePointerClick, Hash } from 'lucide-react';
import WebImageUpload from './WebImageUpload';

export default function WebHeroSection({ data, handleChange, handleImageUpload, handleRemoveImage }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      {/* KIRI: Form Teks */}
      <div className="space-y-5 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <h4 className="font-extrabold text-[#00437a] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <Type size={20} className="text-[#f26e22]" /> Copywriting Hero Section
        </h4>

        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Hash size={14} className="text-gray-400" /> Teks Badge (Label Kecil)
          </label>
          <input 
            type="text" name="badge" value={data.badge} onChange={handleChange}
            placeholder="Contoh: Indonesia's Finest"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Type size={14} className="text-[#00437a]" /> Judul (Baris 1)
            </label>
            <input 
              type="text" name="heading1" value={data.heading1} onChange={handleChange}
              placeholder="Contoh: Redefine Your"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#00437a] focus:bg-white focus:border-[#00437a] outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Type size={14} className="text-[#f26e22]" /> Judul (Baris 2)
            </label>
            <input 
              type="text" name="heading2" value={data.heading2} onChange={handleChange}
              placeholder="Contoh: Travel Experience."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#f26e22] focus:bg-white focus:border-[#f26e22] outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <AlignLeft size={14} className="text-gray-500" /> Sub-teks (Deskripsi)
          </label>
          <textarea 
            name="subtext" rows="3" value={data.subtext} onChange={handleChange}
            placeholder="Momen liburan itu mahal..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all custom-scrollbar resize-none leading-relaxed"
          ></textarea>
        </div>

        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <MousePointerClick size={14} className="text-[#f26e22]" /> Label Tombol Aksi
          </label>
          <input 
            type="text" name="btnText" value={data.btnText} onChange={handleChange}
            placeholder="Contoh: Eksplor Sekarang"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:bg-white focus:border-[#f26e22] outline-none transition-all"
          />
        </div>
      </div>

      {/* KANAN: Upload Gambar */}
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-center">
        <WebImageUpload 
          label="Gambar Utama (Hero)" 
          aspect="square"
          gambar={data.gambar} 
          onUpload={handleImageUpload} 
          onRemove={handleRemoveImage} 
        />
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mt-2">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-[#00437a]">Tips:</strong> Gunakan gambar pemandangan dengan resolusi tinggi (minimal 1080p) berorientasi kotak (square) atau portrait agar sesuai dengan desain Hero Section di sebelah kanan teks[cite: 29].
          </p>
        </div>
      </div>
    </div>
  );
}