import React from 'react';
import { X, Plane, Building, Car, Camera } from 'lucide-react';
import { ZoomInModal } from '../animasi/CSSAnimasi';

export default function ProductModal({ item, isOpen, onClose, activeTab, onProceedCheckout }) {
  return (
    <ZoomInModal
      isOpen={isOpen}
      onClose={onClose}
      modalClass="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
    >
      {item && (
        <>
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-[#00437a]">Detail Paket: {item.title}</h3>
            <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-900 transition rounded-lg hover:bg-gray-100 bg-gray-50"><X size={20} /></button>
          </div>

          <div className="overflow-y-auto flex-grow p-4 md:p-6 space-y-6 custom-scrollbar bg-[#f8f9fa]">
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden relative shadow-sm border border-gray-200 bg-gray-100">
              <img 
                src={item.img} 
                alt={item.title} 
                loading="lazy" 
                decoding="async" 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="grid grid-cols-4 gap-2 md:gap-4">
              <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-gray-200 shadow-sm"><Plane className="text-[#f26e22]" size={20} /><span className="text-[10px] md:text-xs text-gray-600 font-medium">Flight PP</span></div>
              <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-gray-200 shadow-sm"><Building className="text-[#f26e22]" size={20} /><span className="text-[10px] md:text-xs text-gray-600 font-medium">Private Villa</span></div>
              <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-gray-200 shadow-sm"><Car className="text-[#f26e22]" size={20} /><span className="text-[10px] md:text-xs text-gray-600 font-medium">Transport</span></div>
              <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-gray-200 shadow-sm"><Camera className="text-[#f26e22]" size={20} /><span className="text-[10px] md:text-xs text-gray-600 font-medium">Documentasi</span></div>
            </div>

            <div>
              <h4 className="text-[#00437a] font-semibold mb-2 text-sm">Deskripsi Trip</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Eksplorasi destinasi tercantik dengan jadwal yang fleksibel bersama {item.title}. Termasuk akses VIP ke lokasi wisata ternama dan penginapan berstandar internasional.</p>
            </div>
          </div>

          <div className="p-4 md:px-6 md:py-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <div><p className="text-xs text-gray-500 mb-0.5">Total</p><p className="text-xl md:text-2xl font-bold text-[#00437a]">{item.price}</p></div>
            <button onClick={() => onProceedCheckout(item)} className="px-6 py-2.5 bg-[#f26e22] hover:bg-[#d95d1a] text-white font-medium text-sm rounded-xl transition-all shadow-md">Lanjut Pembayaran</button>
          </div>
        </>
      )}
    </ZoomInModal>
  );
}