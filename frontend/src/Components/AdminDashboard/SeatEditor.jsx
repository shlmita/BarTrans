import React from 'react';
import { Check } from 'lucide-react';

export default function SeatEditor({ seats, onToggleSeat }) {
  if (!seats || seats.length === 0) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-[1.5rem] p-5 shadow-inner relative flex flex-col h-full">
      
      {/* Kaca Depan & Label */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gray-200/50 border-b border-gray-200 flex items-center justify-center rounded-t-[1.5rem]">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Bagian Depan (Supir)</span>
      </div>
      
      {/* Area Setir Mobil */}
      <div className="mt-10 flex justify-end mb-6 pr-4">
        <div className="w-10 h-10 border-4 border-gray-300 rounded-full flex items-center justify-center relative shadow-sm bg-white">
          <div className="w-full h-1 bg-gray-300 absolute"></div>
          <div className="h-full w-1 bg-gray-300 absolute"></div>
        </div>
      </div>

      {/* Grid Kursi Penumpang */}
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 pb-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
          {seats.map((seat, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onToggleSeat(index)}
              className={`relative w-12 h-14 rounded-t-xl rounded-b-md flex flex-col items-center justify-center transition-all duration-300 border-2 shadow-sm
                ${seat.isReady 
                  ? 'bg-white border-emerald-400 text-emerald-600 hover:bg-emerald-50 hover:shadow-emerald-200/50 hover:-translate-y-1' 
                  : 'bg-gray-200 border-gray-300 text-gray-400 hover:bg-gray-300'}`}
            >
              {/* Sandaran Kursi */}
              <div className={`w-8 h-2 rounded-t-md mb-1 ${seat.isReady ? 'bg-emerald-200' : 'bg-gray-400'}`}></div>
              {/* Nomor Kursi */}
              <span className="text-xs font-black">{seat.id}</span>
              
              {/* Badge Centang kalau Ready */}
              {seat.isReady && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-md transform scale-100 transition-transform">
                  <Check size={12} strokeWidth={4} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Legend / Keterangan */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center gap-6 shrink-0">
        <div className="flex items-center gap-2 cursor-help">
          <div className="w-4 h-4 bg-white border-2 border-emerald-400 rounded"></div>
          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Tersedia</span>
        </div>
        <div className="flex items-center gap-2 cursor-help">
          <div className="w-4 h-4 bg-gray-200 border-2 border-gray-300 rounded"></div>
          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Terisi</span>
        </div>
      </div>

    </div>
  );
}   