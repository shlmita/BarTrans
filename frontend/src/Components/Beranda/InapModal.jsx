import React, { useState, useEffect } from 'react';
import { X, MapPin, Wifi, Wind, Coffee, Users, Layers, Tv, CheckCircle2, ShieldCheck, CreditCard, Waves } from 'lucide-react';
import { ZoomInModal } from '../animasi/CSSAnimasi';
import FormPemesananInap from './FormPemesananInap';

export default function InapModal({ item, isOpen, onClose, onProceedCheckout }) {
  const [startDate, setStartDate] = useState('');
  const [nightsCount, setNightsCount] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isOpen) {
      setStartDate('');
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setName(user.nama || '');
        setPhone(user.whatsapp || '');
        setIdentityNumber(user.nik || '');
      } else {
        setName(''); setPhone(''); setIdentityNumber('');
      }
      setNightsCount(1);
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const unitPrice = Number(item.rawInap?.harga) || 0;
  const grandTotal = unitPrice * nightsCount;
  const deskripsi = item.rawInap?.deskripsi || item.deskripsi || "Deskripsi belum tersedia untuk ruangan ini.";
  
  // LOGIKA PEMISAHAN FASILITAS
  const fasilitasAsli = item.fasilitas || [];
  const topFeatures = [];
  const bottomFeatures = [];

  // 1. Kotak pertama: Info Struktural
  if (item.tipe === 'Kamar Hotel') {
    topFeatures.push({ icon: <Layers className="text-[#00437a]" size={18} />, label: `Lantai ${item.rawInap?.lantai || '-'}` });
  } else {
    topFeatures.push({ icon: <Users className="text-[#00437a]" size={18} />, label: `Maks ${item.rawInap?.kapasitas || '-'} Org` });
  }

  const getIconForFeature = (featureName) => {
    const lower = featureName.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="text-[#00437a]" size={18} />;
    if (lower.includes('ac')) return <Wind className="text-[#00437a]" size={18} />;
    if (lower.includes('breakfast') || lower.includes('sarapan')) return <Coffee className="text-[#00437a]" size={18} />;
    if (lower.includes('tv')) return <Tv className="text-[#00437a]" size={18} />;
    if (lower.includes('pool') || lower.includes('renang')) return <Waves className="text-[#00437a]" size={18} />;
    return <CheckCircle2 className="text-[#00437a]" size={18} />;
  };

  // 2. Maksimal 4 kotak di atas, sisanya lempar ke list centang bawah
  fasilitasAsli.forEach(fitur => {
    if (topFeatures.length < 4) {
      topFeatures.push({ icon: getIconForFeature(fitur), label: fitur });
    } else {
      bottomFeatures.push(fitur);
    }
  });

  // LOGIKA TOMBOL CHECKOUT
  const isReadyToCheckout = startDate !== '' && name.trim() !== '' && phone.trim() !== '' && identityNumber.trim() !== '';
  let buttonText = 'Lanjutkan Pembayaran';
  if (startDate === '') buttonText = 'Pilih Tanggal Check-in';
  else if (name === '' || phone === '' || identityNumber === '') buttonText = 'Isi Data Tamu Dulu';

  const handleClose = () => {
    setStartDate(''); setNightsCount(1); setName(''); setPhone(''); setIdentityNumber('');
    onClose();
  };

  const handleCheckout = () => {
    onProceedCheckout({
      ...item,
      layanan: 'Booking Penginapan',
      unit_mobil: item.title,
      rute: `${nightsCount} Malam - NIK: ${identityNumber}`,
      tgl_sewa: startDate,
      total_harga: grandTotal,
      nama_pemesan: name,
      no_hp: phone,
    });
  };

  return (
    <ZoomInModal
      isOpen={isOpen}
      onClose={handleClose}
      modalClass="bg-white border border-gray-200 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[90vh]"
    >
      {/* ================= KOLOM KIRI (INFO) ================= */}
      <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-gray-100 relative h-[45%] md:h-auto overflow-y-auto shrink-0 custom-scrollbar text-left">
        {/* Tombol Close Mobile */}
        <button onClick={handleClose} className="md:hidden absolute top-4 right-4 z-20 p-2 bg-white/50 backdrop-blur-md text-gray-800 hover:bg-white/80 rounded-full transition-colors">
          <X size={18} />
        </button>

        {/* Header Gambar */}
        <div className="w-full h-48 md:h-64 shrink-0 relative bg-gray-100">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-5 right-5">
            <span className="bg-[#00437a] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2 block w-max shadow-lg">
              {item.tipe || 'Penginapan'}
            </span>
            <h3 className="font-bold text-2xl md:text-3xl text-white leading-tight">{item.title}</h3>
            <p className="text-gray-200 font-medium text-sm mt-1 flex items-center gap-1.5">
              <MapPin size={14} /> 
              {item.tipe === 'Kamar Hotel' ? `Kamar ${item.rawInap?.noKamar || '-'}` : 'Sewa Villa Utuh'}
            </p>
          </div>
        </div>

        <div className="p-5 md:p-6 bg-white">
          {/* Kotak Fasilitas (Maks 4) */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {topFeatures.map((feat, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 p-2 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center shadow-sm">
                {feat.icon}
                <span className="text-[9px] text-gray-600 font-bold leading-tight capitalize line-clamp-2">{feat.label}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-[#00437a] font-semibold mb-2 text-sm flex items-center gap-2">
              <ShieldCheck size={18} /> Deskripsi Ruangan
            </h4>
            <div className="text-sm text-gray-600 leading-relaxed mb-4 whitespace-pre-wrap">
              {deskripsi}
            </div>

            {/* List Centang Hijau Bawah */}
            <ul className="text-sm text-gray-500 space-y-2 border-t border-gray-100 pt-4 mt-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> 
                <span>Layanan Resepsionis & Keamanan 24 Jam</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> 
                <span>{item.tipe === 'Villa' ? 'Ruangan dibersihkan sebelum check-in' : 'Kamar dibersihkan setiap hari'}</span>
              </li>
              
              {/* Sisa fasilitas dari DB yang tidak masuk kotak atas */}
              {bottomFeatures.map((fas, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> 
                  <span className="capitalize">{fas}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ================= KOLOM KANAN (FORM) ================= */}
      <div className="w-full md:w-1/2 flex flex-col bg-[#f8f9fa] h-[55%] md:h-auto relative">
        {/* Tombol Close Desktop */}
        <button onClick={handleClose} className="hidden md:block absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl shadow-sm transition-colors z-10">
          <X size={20} />
        </button>

        <div className="p-5 md:p-8 flex-grow overflow-y-auto custom-scrollbar">
          <div className="text-center md:text-left mb-6">
            <h4 className="text-[#00437a] font-bold text-xl md:text-2xl">Atur Penginapan</h4>
            <p className="text-gray-500 text-xs mt-1">Isi tanggal check-in, durasi, dan data tamu.</p>
          </div>
          
          <FormPemesananInap 
            startDate={startDate} setStartDate={setStartDate}
            nightsCount={nightsCount} setNightsCount={setNightsCount}
            name={name} setName={setName}
            phone={phone} setPhone={setPhone}
            identityNumber={identityNumber} setIdentityNumber={setIdentityNumber}
            unitPrice={unitPrice} today={today}
          />
        </div>

        {/* Panel Bawah (Harga & Tombol) */}
        <div className="p-4 md:p-6 border-t border-gray-200 bg-white shrink-0 z-20">
          <div className="flex justify-between items-end mb-4 px-1">
            <div>
              <p className="text-[11px] text-gray-500 mb-0.5">Total Biaya ({nightsCount} Malam)</p>
              <p className="text-sm font-semibold text-gray-900">Grand Total</p>
            </div>
            <div className="text-right">
              <p className="text-xl md:text-3xl font-bold text-[#00437a]">Rp {grandTotal.toLocaleString('id-ID')}</p>
            </div>
          </div>
          
          <button 
            disabled={!isReadyToCheckout} 
            onClick={handleCheckout} 
            className={`w-full py-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
              !isReadyToCheckout 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-[#00437a] hover:bg-[#003057] text-white shadow-md'
            }`}
          >
            <CreditCard size={18} /> {buttonText}
          </button>
        </div>
      </div>
    </ZoomInModal>
  );
}