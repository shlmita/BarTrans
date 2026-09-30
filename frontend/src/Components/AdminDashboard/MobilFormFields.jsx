import React from 'react';
import { Car, FileText, Settings, CalendarDays, DollarSign, CheckSquare, Wrench, MapPin, Building2 } from 'lucide-react';

export default function MobilFormFields({ formData, handleChange, handleFeatureToggle }) {
  const fiturOptions = ['AC Dingin', 'Bluetooth/Audio', 'Kamera Mundur', 'Sensor Parkir', 'Sunroof', 'Kursi Kulit'];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Car size={14} className="text-[#00437a]" /> Nama Unit Mobil
          </label>
          <input 
            type="text" name="unit" required 
            value={formData.unit} onChange={handleChange}
            placeholder="Contoh: Toyota Alphard"
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
            placeholder="Contoh: K 1234 AB"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <MapPin size={14} className="text-[#f26e22]" /> Lokasi Penyewaan
          </label>
          <input 
            type="text" name="lokasi" required 
            value={formData.lokasi} onChange={handleChange}
            placeholder="Contoh: Pool Pusat Pati"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Building2 size={14} className="text-[#00437a]" /> Brand Rental <span className="text-gray-400 lowercase normal-case font-medium">(Opsional)</span>
          </label>
          <input 
            type="text" name="brand" 
            value={formData.brand} onChange={handleChange}
            placeholder="Contoh: BarTrans Rent"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <DollarSign size={14} className="text-[#f26e22]" /> Harga Sewa / Hari (Rp)
          </label>
          <input 
            type="number" name="harga" min="0" required
            value={formData.harga} onChange={handleChange}
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
            <option value="Disewa">Sedang Disewa</option>
            <option value="Maintenance">Maintenance / Servis</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <CalendarDays size={14} className="text-[#00437a]" /> Tanggal Ready
          </label>
          <input 
            type="text" name="tglReady" required
            value={formData.tglReady} onChange={handleChange}
            placeholder="Contoh: Selalu Ready / 28 Sep 2026"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Wrench size={14} className="text-gray-500" /> Kondisi Kendaraan
          </label>
          <select 
            name="kondisi" value={formData.kondisi} onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all font-semibold cursor-pointer"
          >
            <option value="Sangat Baik">Sangat Baik (Prima)</option>
            <option value="Baik">Baik (Normal)</option>
            <option value="Perlu Servis Ringan">Perlu Servis Ringan</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <FileText size={14} className="text-[#00437a]" /> Deskripsi Lengkap
        </label>
        <textarea 
          name="deskripsi" rows="3"
          value={formData.deskripsi} onChange={handleChange}
          placeholder="Jelaskan detail kendaraan, warna, bahan bakar, dll..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all custom-scrollbar resize-none"
        ></textarea>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
          <CheckSquare size={14} className="text-emerald-500" /> Fitur Kendaraan
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {fiturOptions.map(fitur => {
            const isChecked = formData.fitur.includes(fitur);
            return (
              <label 
                key={fitur} 
                className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  isChecked ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={isChecked}
                  onChange={() => handleFeatureToggle(fitur)} 
                />
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'}`}>
                  {isChecked && <CheckSquare size={12} className="text-white" />}
                </div>
                <span className="text-xs font-bold">{fitur}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}