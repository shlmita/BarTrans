import React from 'react';
import { Map, Compass, MapPin, Clock, Users, DollarSign, Settings, FileText } from 'lucide-react';

export default function WisataFormFields({ formData, handleChange }) {
  return (
    <div className="space-y-5">
      {/* Baris 1: Nama & Tipe Paket */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Map size={14} className="text-[#00437a]" /> Nama Paket Wisata
          </label>
          <input 
            type="text" name="nama" required 
            value={formData.nama} onChange={handleChange}
            placeholder="Contoh: Bromo Sunrise Adventure"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Compass size={14} className="text-[#f26e22]" /> Tipe / Kategori
          </label>
          <select 
            name="tipe" value={formData.tipe} onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:border-[#f26e22] outline-none transition-all font-bold cursor-pointer text-[#00437a]"
          >
            <option value="Open Trip">Open Trip (Gabungan)</option>
            <option value="Family Gathering">Family Gathering</option>
            <option value="Private Tour">Private Tour</option>
            <option value="Study Tour">Study Tour / Edukasi</option>
            <option value="Honeymoon">Honeymoon Package</option>
          </select>
        </div>
      </div>

      {/* Baris 2: Destinasi & Durasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <MapPin size={14} className="text-[#00437a]" /> Destinasi / Tujuan
          </label>
          <input 
            type="text" name="destinasi" required 
            value={formData.destinasi} onChange={handleChange}
            placeholder="Contoh: Gunung Bromo, Jawa Timur"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Clock size={14} className="text-[#00437a]" /> Durasi Perjalanan
          </label>
          <input 
            type="text" name="durasi" required 
            value={formData.durasi} onChange={handleChange}
            placeholder="Contoh: 2 Hari 1 Malam"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
      </div>

      {/* Baris 3: Kuota & Harga */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Users size={14} className="text-[#00437a]" /> Kuota / Peserta
          </label>
          <input 
            type="number" name="kuota" min="1" required 
            value={formData.kuota} onChange={handleChange}
            placeholder="Maksimal peserta"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <DollarSign size={14} className="text-[#f26e22]" /> Harga (Per Pax)
          </label>
          <input 
            type="number" name="harga" min="0" required
            value={formData.harga} onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#00437a] focus:bg-white focus:border-[#f26e22] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Settings size={14} className="text-emerald-500" /> Status
          </label>
          <select 
            name="status" value={formData.status} onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all font-semibold cursor-pointer"
          >
            <option value="Tersedia">Tersedia / Open</option>
            <option value="Penuh">Kuota Penuh</option>
            <option value="Selesai">Trip Selesai</option>
          </select>
        </div>
      </div>

      {/* Baris 4: Deskripsi & Itinerary */}
      <div>
        <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <FileText size={14} className="text-[#00437a]" /> Deskripsi & Itinerary Singkat
        </label>
        <textarea 
          name="deskripsi" rows="3"
          value={formData.deskripsi} onChange={handleChange}
          placeholder="Tuliskan jadwal kegiatan, meeting point, dll..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all custom-scrollbar resize-none"
        ></textarea>
      </div>
    </div>
  );
}