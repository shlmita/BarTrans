import React, { useState, useEffect } from 'react';
import { X, QrCode, Building, ShieldCheck, CheckCircle, Printer, User, Phone } from 'lucide-react';
import { ZoomInModal } from '../animasi/CSSAnimasi';
import qrisImage from '../../assets/QRISAKBAR.jpeg'; 
import TiketTravel from './TiketTravel';
import InvoiceCetak from './InvoiceCetak'; 

// Tambahkan prop currentUser dari luar (induk komponen)
export default function PaymentModal({ item, isOpen, onClose, currentUser }) {
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State form pemesan
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');

  // Otomatis mengisi form jika data currentUser tersedia
  useEffect(() => {
    if (currentUser) {
      setNama(currentUser.nama || currentUser.name || '');
      setNoHp(currentUser.noHp || currentUser.phone || '');
    }
  }, [currentUser]);

  const handleClose = () => {
    setIsSuccess(false); 
    setPaymentMethod('qris'); 
    // Kembalikan ke data user login jika modal ditutup
    setNama(currentUser?.nama || currentUser?.name || '');
    setNoHp(currentUser?.noHp || currentUser?.phone || '');
    onClose();
  };
  
  const finalPrice = item?.calculatedTotal || item?.price;

  const handleConfirmPayment = async () => {
    if (!nama || !noHp) {
      alert("Mohon isi Nama Lengkap dan No. WhatsApp terlebih dahulu!");
      return;
    }

    setIsLoading(true);

    try {
      const numericPrice = parseInt(String(finalPrice).replace(/[^0-9]/g, ''), 10) || 0;
      
      const payload = {
        nama_user: nama,
        no_hp: noHp,
        unit_mobil: item.title,
        tgl_sewa: item?.startDate || new Date().toISOString().split('T')[0],
        durasi: item?.rentalDays || item?.paxCount || item?.nightsCount || 1, 
        total_harga: numericPrice,
        metode_pembayaran: paymentMethod === 'qris' ? 'QRIS' : 'Transfer Bank',
        status: 'Pending' // Default status menunggu konfirmasi
      };

      const response = await fetch('http://localhost:5000/api/pesanan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setIsSuccess(true);
      } else {
        alert("Gagal memproses pesanan: " + result.message);
      }
    } catch (error) {
      console.error("Error kirim pesanan:", error);
      alert("Gagal terhubung ke server. Pastikan Backend aktif.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePrint = () => {
    const invoiceElement = document.getElementById('printable-invoice') || document.getElementById('printable-ticket');
    if (!invoiceElement) return;

    const printContainer = document.createElement('div');
    printContainer.id = 'print-section';
    printContainer.innerHTML = invoiceElement.outerHTML; 

    document.body.appendChild(printContainer);
    window.print();
    document.body.removeChild(printContainer);
  };

  const isTravelBooking = item?.selectedSeats !== undefined;
  const isRentalOrAngkut = item?.rentalDays !== undefined || item?.distance !== undefined;

  return (
    <>
      <style type="text/css">
        {`
          @media print {
            @page { size: portrait; margin: 15mm; }
            body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white !important; }
            #root, body > div:not(#print-section) { display: none !important; }
            #print-section { display: block !important; width: 100% !important; }
            #print-section * { box-shadow: none !important; }
            #print-section > div { border: none !important; }
          }
        `}
      </style>

      <ZoomInModal isOpen={isOpen} onClose={handleClose} modalClass="bg-white border border-gray-200 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {item && (
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-lg text-[#00437a]">{isSuccess ? 'Status Pembayaran' : 'Checkout'}</h3>
              <button onClick={handleClose} className="p-1.5 text-gray-400 hover:text-gray-900 transition rounded-lg hover:bg-gray-100 bg-gray-50"><X size={20} /></button>
            </div>

            {!isSuccess ? (
              <>
                <div className="p-5 space-y-6 flex-grow overflow-y-auto custom-scrollbar bg-[#f8f9fa]">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="text-[#00437a] font-semibold mb-3 text-sm">Informasi Pemesan</h4>
                    <div className="space-y-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User size={16} className="text-gray-400" /></div>
                        <input type="text" placeholder="Nama Lengkap" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f26e22] focus:bg-white transition-colors" />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone size={16} className="text-gray-400" /></div>
                        <input type="text" placeholder="No. WhatsApp" value={noHp} onChange={(e) => setNoHp(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#f26e22] focus:bg-white transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Ringkasan harga & Metode pembayaran tetap sama */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 shadow-sm">
                    <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Status</span><span className="text-gray-900 font-medium">Pending Payment</span></div>
                    <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Total</span><span className="text-[#f26e22] font-bold text-lg">{finalPrice}</span></div>
                  </div>

                  <div>
                    <h4 className="text-[#00437a] font-semibold mb-3 text-sm">Payment Method</h4>
                    <div className="space-y-3">
                      <button onClick={() => setPaymentMethod('qris')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${paymentMethod === 'qris' ? 'bg-orange-50 border-[#f26e22] text-[#f26e22]' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === 'qris' ? 'border-[#f26e22]' : 'border-gray-300'}`}>{paymentMethod === 'qris' && <div className="w-2 h-2 rounded-full bg-[#f26e22]" />}</div>
                        <QrCode size={18} /><span className="text-sm font-medium text-gray-900">QRIS (OVO/GoPay/Dana)</span>
                      </button>
                      <button onClick={() => setPaymentMethod('bank')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${paymentMethod === 'bank' ? 'bg-blue-50 border-[#00437a] text-[#00437a]' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === 'bank' ? 'border-[#00437a]' : 'border-gray-300'}`}>{paymentMethod === 'bank' && <div className="w-2 h-2 rounded-full bg-[#00437a]" />}</div>
                        <Building size={18} /><span className="text-sm font-medium text-gray-900">Bank Transfer</span>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'qris' ? (
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col items-center justify-center gap-3">
                      <img src={qrisImage} alt="QR Code" className="w-48 h-auto object-contain rounded-lg" />
                      <span className="text-[#00437a] text-[11px] font-bold uppercase tracking-widest mt-2">Scan To Pay</span>
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-center">
                      <span className="text-gray-500 text-xs">Virtual Account BCA</span><span className="text-[#00437a] font-mono text-xl tracking-widest font-semibold">8077 1234 5678</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-200 bg-white shrink-0 z-10 shadow-sm">
                  <button disabled={isLoading} onClick={handleConfirmPayment} className={`w-full py-3.5 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#f26e22] hover:bg-[#d95d1a] text-white'}`}>
                    <ShieldCheck size={18} /> {isLoading ? 'Memproses...' : 'Konfirmasi Pembayaran'}
                  </button>
                </div>
              </>
            ) : (
              isTravelBooking ? (
                <TiketTravel item={item} onPrint={handlePrint} onClose={handleClose} />
              ) : isRentalOrAngkut ? (
                <InvoiceCetak item={item} onPrint={handlePrint} onClose={handleClose} />
              ) : (
                <div className="p-6 flex flex-col items-center justify-center animate-fade-in flex-grow overflow-y-auto bg-[#f8f9fa]">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4"><CheckCircle size={40} className="text-emerald-500" /></div>
                  <h3 className="text-2xl font-bold text-[#00437a] mb-2">Pembayaran Sukses!</h3>
                  <p className="text-gray-600 text-sm text-center mb-6">Transaksi Anda untuk <strong>{item.title}</strong> telah dikonfirmasi.</p>
                  <div className="flex gap-3 w-full shrink-0">
                    <button onClick={handlePrint} className="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-xl transition-all border border-gray-200 flex items-center justify-center gap-2"><Printer size={18} />Cetak Struk</button>
                    <button onClick={handleClose} className="flex-1 py-3 bg-[#f26e22] hover:bg-[#d95d1a] text-white font-bold text-sm rounded-xl transition-all shadow-md">Selesai</button>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </ZoomInModal>
    </>
  );
}