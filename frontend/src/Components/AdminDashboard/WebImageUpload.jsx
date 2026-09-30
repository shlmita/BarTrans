import React from 'react';
import { ImagePlus, X } from 'lucide-react';

export default function WebImageUpload({ label, gambar, onUpload, onRemove, aspect = "video" }) {
  // Atur rasio kotak preview berdasarkan props (default 16:9 / video)
  const heightClass = aspect === "square" ? "h-64 sm:h-80" : "h-48 sm:h-64";

  return (
    <div className="mb-6">
      <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <ImagePlus size={14} className="text-[#00437a]" /> {label}
      </label>
      
      {gambar ? (
        <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-gray-200 group bg-gray-50 flex justify-center shadow-inner`}>
          <img src={gambar} alt="Preview Web" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <button 
              type="button" 
              onClick={onRemove}
              className="bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-600 transition-colors shadow-xl hover:scale-105"
            >
              <X size={18} /> Ganti Gambar
            </button>
          </div>
        </div>
      ) : (
        <label className={`w-full ${heightClass} border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/50 hover:border-[#00437a] transition-all group`}>
          <div className="p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all mb-3 group-hover:scale-110">
            <ImagePlus size={32} className="text-gray-400 group-hover:text-[#00437a] transition-colors" />
          </div>
          <span className="text-sm font-bold text-gray-600 group-hover:text-[#00437a] transition-colors">Klik untuk upload {label}</span>
          <span className="text-xs text-gray-400 mt-1.5">Format: JPG, PNG, WebP (Maks: 3MB)</span>
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </label>
      )}
    </div>
  );
}