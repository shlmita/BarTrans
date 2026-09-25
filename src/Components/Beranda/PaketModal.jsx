import React, { useState } from 'react';
import { X, PlaneTakeoff, Hotel, Car, Camera, CheckCircle2, ShieldCheck, CreditCard, Map } from 'lucide-react';
import { ZoomInModal } from '../animasi/CSSAnimasi';
import FormPemesananPaket from './FormPemesananPaket';

export default function PaketModal({ item, isOpen, onClose, onProceedCheckout }) {
  const [startDate, setStartDate] = useState('');
  const [paxCount, setPaxCount] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const getNumericPrice = (priceStr) => parseInt(priceStr.toString().replace(/[^0-9]/g, ''), 10) || 0;
  const unitPrice = item ? getNumericPrice(item.price) : 0;
  const totalPrice = unitPrice * paxCount;

  const descParts = (item?.desc || '').split('•');
  const duration = descParts[0]?.trim() || 'TBA';

  const isReadyToCheckout = startDate !== '' && name.trim() !== '' && phone.trim() !== '' && identityNumber.trim() !== '';
  let buttonText = 'Lanjut Pembayaran';
  if (startDate === '') buttonText = 'Pilih Tanggal Trip';
  else if (name === '' || phone === '' || identityNumber === '') buttonText = 'Isi Identitas Dhisik';

  return (
    <ZoomInModal
      isOpen={isOpen}
      onClose={() => { setStartDate(''); setPaxCount(1); setName(''); setPhone(''); setIdentityNumber(''); onClose(); }}
      modalClass="bg-white border border-gray-200 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[90vh]"
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
                <span className="bg-[#f26e22] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2 block w-max shadow-lg">Paket Wisata</span>
                <h3 className="font-bold text-2xl md:text-3xl text-white leading-tight">{item.title}</h3>
                <p className="text-gray-200 font-medium text-sm mt-1 flex items-center gap-1.5"><Map size={14} /> {duration}</p>
              </div>
            </div>

            <div className="p-5 md:p-6 bg-white">
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center"><PlaneTakeoff className="text-[#00437a]" size={18} /><span className="text-[9px] text-gray-600 font-bold leading-tight">Flight PP</span></div>
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center"><Hotel className="text-[#00437a]" size={18} /><span className="text-[9px] text-gray-600 font-bold leading-tight">Penginapan</span></div>
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center"><Car className="text-[#00437a]" size={18} /><span className="text-[9px] text-gray-600 font-bold leading-tight">Transport</span></div>
                <div className="bg-gray-50 border border-gray-100 p-2 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center"><Camera className="text-[#00437a]" size={18} /><span className="text-[9px] text-gray-600 font-bold leading-tight">Dokumentasi</span></div>
              </div>
              <div>
                <h4 className="text-[#f26e22] font-semibold mb-2 text-sm flex items-center gap-2"><ShieldCheck size={18} /> Deskripsi Trip</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Eksplorasi destinasi tercantik dengan jadwal yang fleksibel bersama paket <strong>{item.title}</strong>.</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Include tiket wisata & mangan sesuai itinerary.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Didampingi Tour Guide lokal sing wis pengalaman.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col bg-[#f8f9fa] h-[55%] md:h-auto relative">
            <button onClick={onClose} className="hidden md:block absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl shadow-sm transition-colors z-10"><X size={20} /></button>

            <div className="p-5 md:p-8 flex-grow overflow-y-auto custom-scrollbar">
              <div className="text-center md:text-left mb-6">
                <h4 className="text-[#00437a] font-bold text-xl md:text-2xl">Atur Liburan Anda</h4>
                <p className="text-gray-500 text-xs mt-1">Isi tanggal, jumlah peserta, lan data identitas.</p>
              </div>
              <FormPemesananPaket startDate={startDate} setStartDate={setStartDate} paxCount={paxCount} setPaxCount={setPaxCount} name={name} setName={setName} phone={phone} setPhone={setPhone} identityNumber={identityNumber} setIdentityNumber={setIdentityNumber} unitPrice={unitPrice} today={today} />
            </div>

            <div className="p-4 md:p-6 border-t border-gray-200 bg-white shrink-0 z-20">
              <div className="flex justify-between items-end mb-4 px-1">
                <div><p className="text-[11px] text-gray-500 mb-0.5">Total Biaya ({paxCount} Pax)</p><p className="text-sm font-semibold text-gray-900">Grand Total</p></div>
                <div className="text-right"><p className="text-xl md:text-3xl font-bold text-[#00437a]">Rp {totalPrice.toLocaleString('id-ID')}</p></div>
              </div>
              <button disabled={!isReadyToCheckout} onClick={() => { onProceedCheckout({ ...item, startDate, paxCount, customerData: { name, phone, identityNumber }, calculatedTotal: `Rp ${totalPrice.toLocaleString('id-ID')}` }); }} className={`w-full py-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${!isReadyToCheckout ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#f26e22] hover:bg-[#d95d1a] text-white shadow-md'}`}><CreditCard size={18} />{buttonText}</button>
            </div>
          </div>
        </>
      )}
    </ZoomInModal>
  );
}