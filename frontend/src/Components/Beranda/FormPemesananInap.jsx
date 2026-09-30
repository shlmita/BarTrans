import React from 'react';
import { CalendarDays, Moon, User, Phone, IdCard } from 'lucide-react';

export default function FormPemesananInap({
  startDate, setStartDate,
  nightsCount, setNightsCount,
  name, setName,
  phone, setPhone,
  identityNumber, setIdentityNumber,
  unitPrice, today
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 p-4 md:p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block flex items-center gap-2">
            <CalendarDays size={16} className="text-[#00437a]" /> Tanggal Check-in
          </label>
          <input 
            type="date" 
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-[#f26e22] transition-colors cursor-pointer"
          />
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-2">
              <Moon size={16} className="text-[#00437a]" /> Durasi Menginap (Malam)
            </label>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl p-1.5 focus-within:border-[#f26e22]/50 transition-colors">
            <button 
              onClick={() => setNightsCount(Math.max(1, nightsCount - 1))}
              className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors shrink-0 font-bold"
            >
              -
            </button>
            <input 
              type="number"
              min="1"
              value={nightsCount}
              onChange={(e) => setNightsCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-grow text-center text-lg font-bold text-[#00437a] bg-transparent outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button 
              onClick={() => setNightsCount(nightsCount + 1)}
              className="w-10 h-10 rounded-lg bg-[#f26e22] hover:bg-[#d95d1a] text-white flex items-center justify-center transition-colors shrink-0 font-bold"
            >
              +
            </button>
          </div>
          <p className="text-[10px] text-gray-500 text-center mt-3">
            Harga per malam: Rp {unitPrice.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <div className="p-4 md:p-5 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <h5 className="text-sm text-[#00437a] font-semibold mb-2 border-b border-gray-100 pb-2">Data Tamu</h5>
        
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block flex items-center gap-2">
            <User size={14} className="text-[#f26e22]" /> Nama Lengkap Sesuai KTP
          </label>
          <input 
            type="text" 
            placeholder="Contoh: Budi Santoso"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#f26e22] transition-colors placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block flex items-center gap-2">
            <Phone size={14} className="text-[#f26e22]" /> No. Handphone (WA)
          </label>
          <input 
            type="tel" 
            placeholder="Contoh: 08123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#f26e22] transition-colors placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block flex items-center gap-2">
            <IdCard size={14} className="text-[#f26e22]" /> No. KTP / Identitas
          </label>
          <input 
            type="text" 
            placeholder="Contoh: 3301234567890001"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#f26e22] transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
}