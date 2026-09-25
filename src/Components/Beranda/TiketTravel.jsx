import React from 'react';
import { CheckCircle, Printer, MapPin, CalendarDays, Users, QrCode } from 'lucide-react';
// IMPORT LOGO DARI ASSETS
import logoBartrans from '../../assets/Bartrans.png'; 

export default function TiketTravel({ item, onPrint, onClose }) {
  const finalPrice = item?.calculatedTotal || item?.price;

  return (
    <div className="p-5 flex flex-col items-center justify-center animate-fade-in w-full bg-[#f8f9fa] rounded-b-2xl h-full">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3 mt-4 shrink-0">
        <CheckCircle size={32} className="text-emerald-500" />
      </div>
      <h3 className="text-xl font-bold text-[#00437a] mb-1">Pembayaran Sukses!</h3>
      <p className="text-gray-500 text-xs text-center mb-6">
        E-Tiket Travel Anda sudah terbit.
      </p>

      {/* TIKET BOARDING PASS STYLE */}
      <div id="printable-ticket" className="w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-6 relative">
        {/* Header Tiket */}
        <div className="bg-[#00437a] p-4 text-white flex justify-between items-center relative overflow-hidden">
           {/* Aksen Estetik Oranye */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#f26e22]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>

          <div className="relative z-10 flex items-center gap-3">
             {/* Logo BarTrans */}
            <div className="bg-white p-1 rounded-lg">
                <img 
                src={logoBartrans} 
                alt="Logo BarTrans" 
                className="h-8 w-auto object-contain" 
                />
            </div>
            <div>
              <h4 className="font-bold text-lg uppercase tracking-wider text-white">E-Tiket Travel</h4>
              <p className="text-[10px] text-blue-200">BarTrans Executive</p>
            </div>
          </div>
          <QrCode size={40} className="text-white opacity-90 relative z-10" />
        </div>

        {/* Body Tiket */}
        <div className="p-5 space-y-4 relative bg-white">
          {/* Efek Sobekan Kertas Kiri Kanan */}
          <div className="absolute -left-3 top-0 w-6 h-6 bg-[#f8f9fa] rounded-full border-b border-r border-gray-200 rotate-45"></div>
          <div className="absolute -right-3 top-0 w-6 h-6 bg-[#f8f9fa] rounded-full border-b border-l border-gray-200 -rotate-45"></div>
          
          <div className="border-t-2 border-dashed border-gray-200 absolute top-3 left-4 right-4"></div>

          <div className="pt-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <MapPin size={12} className="text-[#f26e22]" /> Rute Perjalanan
            </p>
            <p className="text-sm font-extrabold text-[#00437a]">{item.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <CalendarDays size={12} className="text-[#f26e22]" /> Tanggal
              </p>
              <p className="text-xs font-bold text-gray-800">{item.selectedDate || '-'}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Users size={12} className="text-[#f26e22]" /> No. Kursi
              </p>
              <p className="text-xs font-bold text-gray-800">
                {item.selectedSeats && item.selectedSeats.length > 0 
                  ? item.selectedSeats.sort((a, b) => a - b).join(', ') 
                  : '-'}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-500 font-bold uppercase">Total Lunas</span>
            <span className="text-sm font-black text-[#00437a]">{finalPrice}</span>
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex gap-3 w-full shrink-0">
        <button 
          onClick={onPrint}
          className="flex-1 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-xl transition-all border border-gray-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <Printer size={18} />
          Cetak Tiket
        </button>
        <button 
          onClick={onClose}
          className="flex-1 py-3.5 bg-[#f26e22] hover:bg-[#d95d1a] text-white font-bold text-sm rounded-xl transition-all shadow-md"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}