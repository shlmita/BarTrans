import React, { useState } from 'react';
import { X, CalendarDays, MapPin, CheckCircle2, Package, ShieldCheck, Box, CreditCard, Info } from 'lucide-react';
import { ZoomInModal } from '../animasi/CSSAnimasi';

export default function TruckModal({ item, isOpen, onClose, onProceedCheckout }) {
  const [startDate, setStartDate] = useState('');
  const [distance, setDistance] = useState(10); 
  const today = new Date().toISOString().split('T')[0];

  const getNumericPrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  const unitPrice = item ? getNumericPrice(item.price) : 0;
  
  const baseDistance = 50; 
  const multiplier = Math.ceil(distance / baseDistance); 
  const totalPrice = unitPrice * multiplier;

  const descParts = item?.desc.split('•') || [];
  const capacity = descParts[0]?.trim() || 'TBA';
  const route = descParts[1]?.trim() || 'TBA';
  const type = item?.title.toLowerCase().includes('box') ? 'Box Tertutup (Aman Hujan)' : 'Bak Terbuka';

  const isReadyToCheckout = startDate !== '';
  const buttonText = startDate === '' ? 'Pilih Tanggal Pengiriman' : 'Lanjut Pembayaran';

  return (
    <ZoomInModal
      isOpen={isOpen}
      onClose={() => { setStartDate(''); setDistance(10); onClose(); }}
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
                <span className="bg-[#f26e22] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2 block w-max shadow-lg">Armada Logistik</span>
                <h3 className="font-bold text-2xl md:text-3xl text-white leading-tight">{item.title}</h3>
              </div>
            </div>

            <div className="p-5 md:p-6 bg-white">
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center"><Package className="text-[#00437a]" size={20} /><span className="text-[10px] text-gray-500 uppercase font-semibold">Kapasitas</span><span className="text-xs text-gray-900 font-bold">{capacity.replace('Kapasitas ', '')}</span></div>
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center"><MapPin className="text-[#00437a]" size={20} /><span className="text-[10px] text-gray-500 uppercase font-semibold">Rute</span><span className="text-xs text-gray-900 font-bold">{route}</span></div>
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center"><Box className="text-[#00437a]" size={20} /><span className="text-[10px] text-gray-500 uppercase font-semibold">Tipe</span><span className="text-[10px] text-gray-900 font-bold leading-tight">{type}</span></div>
              </div>
              <div>
                <h4 className="text-[#f26e22] font-semibold mb-2 text-sm flex items-center gap-2"><ShieldCheck size={18} /> Info Layanan</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Solusi tepat untuk pengiriman barang pindahan, distribusi bisnis, maupun material proyek. Harga sudah termasuk BBM dan supir profesional.</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col bg-[#f8f9fa] h-[55%] md:h-auto relative">
            <button onClick={onClose} className="hidden md:block absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 bg-white shadow-sm rounded-xl transition-colors z-10"><X size={20} /></button>

            <div className="p-5 md:p-8 flex-grow overflow-y-auto custom-scrollbar">
              <div className="text-center md:text-left mb-6">
                <h4 className="text-[#00437a] font-bold text-xl md:text-2xl">Jadwal Pengiriman</h4>
                <p className="text-gray-500 text-xs mt-1">Tentukan tanggal dan estimasi jarak rute perjalanan.</p>
              </div>

              <div className="space-y-5">
                <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3 block flex items-center gap-2"><CalendarDays size={16} className="text-[#f26e22]" /> Tanggal Pengiriman</label>
                  <input type="date" min={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-[#00437a] transition-colors cursor-pointer" />
                </div>

                <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-2"><MapPin size={16} className="text-[#f26e22]" /> Jarak Tempuh (KM)</label>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl p-2">
                    <button onClick={() => setDistance(Math.max(1, distance - 10))} className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-gray-100 text-gray-700 font-bold">-10</button>
                    <div className="flex-grow text-center text-lg font-bold text-[#00437a]">{distance} KM</div>
                    <button onClick={() => setDistance(distance + 10)} className="w-10 h-10 rounded-lg bg-[#f26e22] text-white hover:bg-[#d95d1a] font-bold">+10</button>
                  </div>
                  <div className="mt-4 flex items-start gap-2 bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <Info size={14} className="text-[#f26e22] shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-xs text-gray-600">Tarif dasar dihitung per blok <strong>{baseDistance} KM</strong>. Saat ini terhitung <strong>{multiplier} blok tarif</strong>.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-gray-200 bg-white shrink-0 z-20">
              <div className="flex justify-between items-end mb-4 px-1">
                <div><p className="text-[11px] text-gray-500 mb-0.5">Tarif Total ({multiplier}x Tarif)</p><p className="text-sm font-semibold text-gray-900">Grand Total</p></div>
                <div className="text-right"><p className="text-xl md:text-3xl font-bold text-[#00437a]">Rp {totalPrice.toLocaleString('id-ID')}</p></div>
              </div>
              <button disabled={!isReadyToCheckout} onClick={() => onProceedCheckout({ ...item, startDate, distance, calculatedTotal: `Rp ${totalPrice.toLocaleString('id-ID')}` })} className={`w-full py-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${!isReadyToCheckout ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#f26e22] hover:bg-[#d95d1a] text-white shadow-md'}`}><CreditCard size={18} />{buttonText}</button>
            </div>
          </div>
        </>
      )}
    </ZoomInModal>
  );
}