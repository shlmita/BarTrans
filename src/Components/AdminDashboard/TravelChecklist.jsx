import React from 'react';
import { CheckSquare, Check } from 'lucide-react';

export default function TravelChecklist({ seats, formData, availableSeatsCount, handleToggleSeat, handleSelectAll, handleDeselectAll }) {
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
          <CheckSquare size={14} className="text-emerald-500" /> 
          Centang Kursi Ready ({availableSeatsCount} / {formData.kursiTotal})
        </label>
        <div className="flex gap-2 text-[11px]">
          <button type="button" onClick={handleSelectAll} className="font-bold text-[#00437a] hover:underline">
            Semua
          </button>
          <span className="text-gray-300">|</span>
          <button type="button" onClick={handleDeselectAll} className="font-bold text-gray-400 hover:text-red-500 hover:underline">
            Kosongkan
          </button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 max-h-40 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-5 gap-2">
          {seats.map((seat, index) => (
            <button
              key={seat.id}
              type="button"
              onClick={() => handleToggleSeat(index)}
              className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl border text-xs font-bold transition-all ${
                seat.isReady 
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm shadow-emerald-200' 
                  : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
              }`}
            >
              <Check size={12} className={seat.isReady ? 'stroke-[3]' : 'opacity-0 w-0'} />
              <span>{seat.id}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mt-1.5">
        * Centang (hijau) = kursi kosong. Abu-abu = kursi terisi.
      </p>
    </div>
  );
}