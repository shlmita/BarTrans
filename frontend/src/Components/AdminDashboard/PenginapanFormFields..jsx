import React from 'react';
import { Hotel, Home, Bed, Layers, DollarSign, Settings, FileText, Users } from 'lucide-react';

export default function PenginapanFormFields({ formData, handleChange }) {
  return (
    <div className="space-y-5">
      {/* Baris 1: Nama & Tipe */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Hotel size={14} className="text-[#00437a]" /> Nama Penginapan
          </label>
          <input 
            type="text" name="nama" required 
            value={formData.nama} onChange={handleChange}
            placeholder="Contoh: Kamar Deluxe / Villa Kenangan"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Home size={14} className="text-[#f26e22]" /> Tipe Penginapan
          </label>
          <select 
            name="tipe" value={formData.tipe} onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:border-[#f26e22] outline-none transition-all font-bold cursor-pointer text-[#00437a]"
          >
            <option value="Kamar Hotel">Kamar Hotel</option>
            <option value="Villa">Sewa Villa Utuh</option>
          </select>
        </div>
      </div>

      {/* Baris 2: FORM DINAMIS (Hotel vs Villa) */}
      {formData.tipe === 'Kamar Hotel' ? (
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Bed size={14} className="text-[#00437a]" /> Nomor Kamar
            </label>
            <input 
              type="text" name="noKamar" required 
              value={formData.noKamar} onChange={handleChange}
              placeholder="Contoh: 101, 204B"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Layers size={14} className="text-[#00437a]" /> Di Lantai Berapa
            </label>
            <input 
              type="number" name="lantai" min="1" required 
              value={formData.lantai} onChange={handleChange}
              placeholder="Contoh: 1"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Bed size={14} className="text-[#00437a]" /> Jml Kamar Tidur
            </label>
            <input 
              type="number" name="jmlKamarTidur" min="1" required 
              value={formData.jmlKamarTidur} onChange={handleChange}
              placeholder="Contoh: 3 Kamar"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Users size={14} className="text-[#00437a]" /> Kapasitas Maks (Orang)
            </label>
            <input 
              type="number" name="kapasitas" min="1" required 
              value={formData.kapasitas} onChange={handleChange}
              placeholder="Contoh: 10 Orang"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
            />
          </div>
        </div>
      )}

      {/* Baris 3: Harga & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <DollarSign size={14} className="text-[#f26e22]" /> Harga / Malam (Rp)
          </label>
          <input 
            type="number" name="harga" min="0" required
            value={formData.harga} onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#00437a] focus:bg-white focus:border-[#f26e22] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Settings size={14} className="text-emerald-500" /> Status Ruangan
          </label>
          <select 
            name="status" value={formData.status} onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all font-semibold cursor-pointer"
          >
            <option value="Tersedia">Tersedia (Kosong)</option>
            <option value="Disewa">Sedang Disewa</option>
            <option value="Maintenance">Maintenance / Dibersihkan</option>
          </select>
        </div>
      </div>

      {/* Baris 4: Deskripsi */}
      <div>
        <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <FileText size={14} className="text-[#00437a]" /> Deskripsi Tambahan
        </label>
        <textarea 
          name="deskripsi" rows="2"
          value={formData.deskripsi} onChange={handleChange}
          placeholder="Tuliskan info view pemandangan, aturan khusus, dll..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all custom-scrollbar resize-none"
        ></textarea>
      </div>
    </div>
  );
}