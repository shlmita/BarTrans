import React from 'react';
import { CheckSquare, Check } from 'lucide-react';

export default function WisataChecklist({ fasilitasTerpilih, handleFeatureToggle }) {
  const daftarFasilitas = [
    'Transportasi PP', 'Tiket Wisata', 'Makan & Minum', 'Tour Guide', 
    'Dokumentasi (Foto/Video)', 'Asuransi Perjalanan', 'Penginapan/Hotel', 'Jeep/Offroad'
  ];

  return (
    <div className="pt-2 border-t border-gray-100">
      <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
        <CheckSquare size={14} className="text-emerald-500" /> Fasilitas Include
      </label>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {daftarFasilitas.map(fitur => {
          const isChecked = fasilitasTerpilih.includes(fitur);
          return (
            <label 
              key={fitur} 
              className={`flex items-center gap-2 p-2 border rounded-xl cursor-pointer transition-all ${
                isChecked ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <input 
                type="checkbox" 
                className="hidden"
                checked={isChecked}
                onChange={() => handleFeatureToggle(fitur)} 
              />
              <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'}`}>
                {isChecked && <Check size={12} className="text-white stroke-[3]" />}
              </div>
              <span className="text-[11px] font-bold truncate">{fitur}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}