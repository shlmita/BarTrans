import React from 'react';
import { ImagePlus, X } from 'lucide-react';

export default function PenginapanImageUpload({ gambar, onUpload, onRemove }) {
  return (
    <div className="mb-6">
      <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <ImagePlus size={14} className="text-[#00437a]" /> Foto Penginapan
      </label>
      
      {gambar ? (
        <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden border border-gray-200 group bg-gray-50 flex justify-center">
          <img src={gambar} alt="Preview Penginapan" className="h-full w-auto object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              type="button" 
              onClick={onRemove}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-red-600 transition-colors shadow-lg"
            >
              <X size={16} /> Hapus Foto
            </button>
          </div>
        </div>
      ) : (
        <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-[#00437a] transition-all group">
          <ImagePlus size={28} className="text-gray-400 group-hover:text-[#00437a] mb-2 transition-colors" />
          <span className="text-xs font-bold text-gray-500 group-hover:text-[#00437a] transition-colors">Klik untuk upload foto kamar/villa</span>
          <span className="text-[10px] text-gray-400 mt-1">Format: JPG, PNG (Maks: 2MB)</span>
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </label>
      )}
    </div>
  );
}