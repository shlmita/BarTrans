import React from 'react';
import { Truck, FileText, Settings, DollarSign, Weight, Box } from 'lucide-react';

export default function TrukFormFields({ formData, handleChange }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Truck size={14} className="text-[#00437a]" /> Jenis Truk
          </label>
          <input 
            type="text" name="jenis" required 
            value={formData.jenis} onChange={handleChange}
            placeholder="Contoh: CDE Engkel Bak"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <FileText size={14} className="text-gray-400" /> Nomor Polisi
          </label>
          <input 
            type="text" name="nopol" required 
            value={formData.nopol} onChange={handleChange}
            placeholder="Contoh: K 8899 XX"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Weight size={14} className="text-[#00437a]" /> Kapasitas Maks (Ton)
          </label>
          <input 
            type="text" name="kapasitas" required 
            value={formData.kapasitas} onChange={handleChange}
            placeholder="Contoh: 2.5 Ton"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Box size={14} className="text-[#00437a]" /> Volume Kubikasi (CBM)
          </label>
          <input 
            type="text" name="volume" required 
            value={formData.volume} onChange={handleChange}
            placeholder="Contoh: 6 CBM"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <DollarSign size={14} className="text-[#f26e22]" /> Tarif Dasar (Per KM)
          </label>
          <input 
            type="number" name="tarif" min="0" required
            value={formData.tarif} onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#00437a] focus:bg-white focus:border-[#f26e22] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Settings size={14} className="text-emerald-500" /> Status Unit
          </label>
          <select 
            name="status" value={formData.status} onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all font-semibold cursor-pointer"
          >
            <option value="Tersedia">Tersedia (Ready)</option>
            <option value="Jalan">Sedang Jalan (Disewa)</option>
            <option value="Maintenance">Maintenance / Servis</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <FileText size={14} className="text-[#00437a]" /> Deskripsi Truk (Opsional)
        </label>
        <textarea 
          name="deskripsi" rows="3"
          value={formData.deskripsi} onChange={handleChange}
          placeholder="Jelaskan ukuran bak, tahun pembuatan, dll..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all custom-scrollbar resize-none"
        ></textarea>
      </div>
    </div>
  );
}