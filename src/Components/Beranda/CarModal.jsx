import React, { useState } from 'react';
import { X, CalendarDays, Clock, ShieldCheck, CreditCard, CheckCircle2 } from 'lucide-react';
import { ZoomInModal } from '../animasi/CSSAnimasi';

export default function CarModal({ item, isOpen, onClose, onProceedCheckout }) {
  const [startDate, setStartDate] = useState('');
  const [rentalDays, setRentalDays] = useState(1);
  const today = new Date().toISOString().split('T')[0];
  
  // Membaca ketersediaan unit dari tag/status database
  const isReady = item ? item.tag === 'Tersedia' : false;

  const getNumericPrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  const unitPrice = item ? getNumericPrice(item.price) : 0;
  const totalPrice = unitPrice * rentalDays;

  // Murni mengambil kolom deskripsi dari database
  const deskripsiDatabase = item?.deskripsi || item?.desc || 'Tidak ada deskripsi layanan.';

  // Murni mengambil kolom fitur dari database
  const getFiturList = () => {
    if (Array.isArray(item?.fitur)) return item.fitur;
    if (typeof item?.fitur === 'string' && item.fitur.trim()) {
      try {
        const parsed = JSON.parse(item.fitur);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  };

  const fiturList = getFiturList();

  const isReadyToCheckout = isReady && startDate !== '';
  let buttonText = 'Lanjut Pembayaran';
  if (!isReady) buttonText = 'Unit Sedang Disewa / Maintenance';
  else if (startDate === '') buttonText = 'Pilih Tanggal Sewa';

  return (
    <ZoomInModal
      isOpen={isOpen}
      onClose={() => { setStartDate(''); setRentalDays(1); onClose(); }}
      modalClass="bg-white border border-gray-200 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[85vh]"
    >
      {item && (
        <>
          {/* SISI KIRI: Foto, Deskripsi Layanan & Fitur */}
          <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-gray-100 relative h-[45%] md:h-auto overflow-y-auto shrink-0 custom-scrollbar">
            <button onClick={onClose} className="md:hidden absolute top-4 right-4 z-20 p-2 bg-white/50 backdrop-blur-md text-gray-800 hover:bg-white/80 rounded-full transition-colors">
              <X size={18} />
            </button>

            {/* Header Foto Mobil */}
            <div className="w-full h-48 md:h-64 shrink-0 relative bg-gray-100">
              <img 
                src={item.img} 
                alt={item.title} 
                loading="lazy" 
                decoding="async" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5">
                <span className="bg-[#00437a] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2 block w-max shadow-lg">
                  Sewa Mobil
                </span>
                <h3 className="font-bold text-2xl md:text-3xl text-white leading-tight">{item.title}</h3>
              </div>
            </div>

            {/* Deskripsi Layanan & Fitur Fasilitas dari Database */}
            <div className="p-5 md:p-6 bg-white space-y-5">
              <div>
                <h4 className="text-[#f26e22] font-semibold mb-2 text-sm flex items-center gap-2">
                  <ShieldCheck size={18} /> Deskripsi Layanan
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {deskripsiDatabase}
                </p>
              </div>

              {/* Tampilan Fitur dari Database */}
              {fiturList.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Fitur & Fasilitas
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {fiturList.map((fitur, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-[#00437a] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
                      >
                        <CheckCircle2 size={14} className="text-[#f26e22]" />
                        {fitur}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SISI KANAN: Form Tanggal & Pembayaran */}
          <div className="w-full md:w-1/2 flex flex-col bg-[#f8f9fa] h-[55%] md:h-auto relative">
            <button onClick={onClose} className="hidden md:block absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl shadow-sm transition-colors z-10">
              <X size={20} />
            </button>

            <div className="p-5 md:p-8 flex-grow overflow-y-auto custom-scrollbar">
              <div className="text-center md:text-left mb-6">
                <h4 className="text-[#00437a] font-bold text-xl md:text-2xl">Atur Penyewaan</h4>
                <p className="text-gray-500 text-xs mt-1">Lengkapi detail penyewaan kendaraan Anda.</p>
              </div>
              
              <div className="space-y-5">
                <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                    <CalendarDays size={16} className="text-[#f26e22]" /> Tanggal Mulai Sewa
                  </label>
                  <input 
                    type="date" 
                    min={today} 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-[#00437a] transition-colors cursor-pointer" 
                  />
                </div>

                <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-2">
                      <Clock size={16} className="text-[#f26e22]" /> Durasi Sewa
                    </label>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl p-2">
                    <button 
                      onClick={() => setRentalDays(Math.max(1, rentalDays - 1))} 
                      className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-gray-100 text-gray-700 font-bold"
                    >
                      -
                    </button>
                    <div className="flex-grow text-center text-lg font-bold text-[#00437a]">
                      {rentalDays} Hari
                    </div>
                    <button 
                      onClick={() => setRentalDays(rentalDays + 1)} 
                      className="w-10 h-10 rounded-lg bg-[#f26e22] text-white hover:bg-[#d95d1a] font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-gray-200 bg-white shrink-0 z-20">
              <div className="flex justify-between items-end mb-4 px-1">
                <div>
                  <p className="text-[11px] text-gray-500 mb-0.5">Total Biaya</p>
                  <p className="text-sm font-semibold text-gray-900">Grand Total</p>
                </div>
                <div className="text-right">
                  <p className="text-xl md:text-3xl font-bold text-[#00437a]">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <button 
                disabled={!isReadyToCheckout} 
                onClick={() => onProceedCheckout({ ...item, startDate, rentalDays })} 
                className={`w-full py-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                  !isReadyToCheckout 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#f26e22] hover:bg-[#d95d1a] text-white shadow-md'
                }`}
              >
                <CreditCard size={18} />
                {buttonText}
              </button>
            </div>
          </div>
        </>
      )}
    </ZoomInModal>
  );
}