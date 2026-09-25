import React, { useState } from 'react';
import { X, Armchair, MapPin, Clock, CalendarDays, Ticket } from 'lucide-react';
import { ZoomInModal } from '../animasi/CSSAnimasi';

export default function TravelModal({ item, isOpen, onClose, onProceedCheckout }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); 
  const bookedSeats = [3, 7, 8]; 
  const totalSeats = 14; 
  const today = new Date().toISOString().split('T')[0];

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    setSelectedSeats(prev => prev.includes(seatNumber) ? prev.filter(seat => seat !== seatNumber) : [...prev, seatNumber]);
  };

  const getNumericPrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  const unitPrice = item ? getNumericPrice(item.price) : 0;
  const totalPrice = unitPrice * selectedSeats.length;

  const isReadyToCheckout = selectedSeats.length > 0 && selectedDate !== '';
  let checkoutButtonText = 'Lanjut Pembayaran';
  if (selectedSeats.length === 0) checkoutButtonText = 'Silakan Pilih Kursi Dulu';
  else if (selectedDate === '') checkoutButtonText = 'Pilih Tanggal Berangkat';

  return (
    <ZoomInModal
      isOpen={isOpen}
      onClose={() => { setSelectedSeats([]); setSelectedDate(''); onClose(); }}
      modalClass="bg-white border border-gray-200 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[85vh]"
    >
      {item && (
        <>
          <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-gray-100 relative h-[45%] md:h-auto overflow-y-auto shrink-0 custom-scrollbar">
            <button onClick={onClose} className="md:hidden absolute top-4 right-4 z-20 p-2 bg-white/50 backdrop-blur-md text-gray-800 hover:bg-white/80 rounded-full transition-colors"><X size={18} /></button>

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
                <span className="bg-[#00437a] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2 block w-max shadow-lg">Tiket Travel</span>
                <h3 className="font-bold text-2xl md:text-3xl text-white leading-tight">{item.title}</h3>
              </div>
            </div>

            <div className="p-5 md:p-6 space-y-3.5 bg-white">
              <div className="flex items-center gap-3.5 text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                <MapPin className="text-[#f26e22] shrink-0" size={22} /><span className="text-sm font-medium">Pool Utama / Door to Door</span>
              </div>
              <div className="flex items-center gap-3.5 text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                <Clock className="text-[#f26e22] shrink-0" size={22} /><span className="text-sm font-medium">08:00 WIB & 19:00 WIB</span>
              </div>
              <div className="flex items-center gap-3.5 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 shadow-sm focus-within:border-[#00437a] transition-colors cursor-pointer">
                <CalendarDays className="text-[#f26e22] shrink-0" size={22} />
                <div className="flex flex-col w-full">
                  <label htmlFor="travel-date" className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Pilih Tanggal</label>
                  <input id="travel-date" type="date" min={today} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-transparent text-sm font-semibold text-gray-900 outline-none w-full cursor-pointer mt-0.5" />
                </div>
              </div>
              <div className="pt-3">
                <h4 className="text-[#00437a] font-semibold mb-2 text-sm">Fasilitas Kendaraan</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}. Armada terawat dengan AC dingin, kursi *reclining seat*, USB charger di setiap baris, dan gratis air mineral.</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col bg-[#f8f9fa] h-[55%] md:h-auto relative">
            <button onClick={onClose} className="hidden md:block absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 bg-white shadow-sm rounded-xl transition-colors z-10"><X size={20} /></button>

            <div className="p-5 md:p-8 flex-grow overflow-y-auto custom-scrollbar">
              <div className="text-center md:text-left mb-6">
                <h4 className="text-[#00437a] font-bold text-xl md:text-2xl">Pilih Kursi Anda</h4>
                <p className="text-gray-500 text-xs mt-1">Klik pada kursi <span className="text-gray-800 font-semibold">yang tersedia</span> untuk memilih.</p>
              </div>

              <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-200 max-w-[300px] mx-auto shadow-md">
                <div className="flex justify-center gap-4 mb-6 text-[10px] text-gray-500 uppercase tracking-widest font-bold border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-gray-100 border border-gray-200"></div> Tersedia</div>
                  <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-[#f26e22]"></div> Dipilih</div>
                  <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-red-100 border border-red-200"></div> Terisi</div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center px-1 mb-2">
                    <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-[10px] uppercase font-bold bg-gray-50">Supir</div>
                    <div className="w-12 h-12"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-3.5 md:gap-x-6 md:gap-y-4 justify-items-center">
                    {[...Array(totalSeats)].map((_, index) => {
                      const seatNum = index + 1;
                      const isBooked = bookedSeats.includes(seatNum);
                      const isSelected = selectedSeats.includes(seatNum);
                      return (
                        <button key={seatNum} disabled={isBooked} onClick={() => handleSeatClick(seatNum)} className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 transform active:scale-95 ${isBooked ? 'bg-red-50 text-red-400 border border-red-200 cursor-not-allowed' : isSelected ? 'bg-[#f26e22] text-white shadow-md border-2 border-[#ea580c] scale-105' : 'bg-gray-50 text-gray-700 hover:bg-gray-200 border border-gray-200 shadow-sm cursor-pointer'}`}>
                          <Armchair size={18} strokeWidth={isBooked ? 1.5 : 2.5} /><span className="text-[11px] font-bold">{seatNum}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-gray-200 bg-white shrink-0 z-20">
              <div className="flex justify-between items-end mb-4 px-1">
                <div><p className="text-[11px] text-gray-500 mb-0.5">Kursi: {selectedSeats.length > 0 ? selectedSeats.sort((a,b)=>a-b).join(', ') : '-'}</p><p className="text-sm font-semibold text-gray-900">Total Harga</p></div>
                <div className="text-right"><p className="text-xl md:text-2xl font-bold text-[#00437a]">Rp {totalPrice.toLocaleString('id-ID')}</p></div>
              </div>
              <button disabled={!isReadyToCheckout} onClick={() => { onProceedCheckout({ ...item, selectedSeats, selectedDate, calculatedTotal: `Rp ${totalPrice.toLocaleString('id-ID')}` }); }} className={`w-full py-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${!isReadyToCheckout ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#f26e22] hover:bg-[#d95d1a] text-white shadow-md'}`}><Ticket size={18} />{checkoutButtonText}</button>
            </div>
          </div>
        </>
      )}
    </ZoomInModal>
  );
}