import React, { useState } from 'react';
import { X, QrCode, Building, ShieldCheck, CheckCircle, Printer } from 'lucide-react';
import { ZoomInModal } from '../animasi/CSSAnimasi';
import qrisImage from '../../assets/QRISAKBAR.jpeg'; 
import TiketTravel from './TiketTravel';
import InvoiceCetak from './InvoiceCetak'; 

export default function PaymentModal({ item, isOpen, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    setIsSuccess(false); 
    setPaymentMethod('qris'); 
    onClose();
  };
  
  const handleConfirmPayment = () => setIsSuccess(true);
  
  // 🔥 JURUS DOM CLONING: Anti-Blank & Anti-Berantakan
  const handlePrint = () => {
    // 1. Cari elemen invoice/tiket yang mau dicetak
    const invoiceElement = document.getElementById('printable-invoice') || document.getElementById('printable-ticket');
    if (!invoiceElement) return;

    // 2. Bikin bungkus HTML baru khusus buat print
    const printContainer = document.createElement('div');
    printContainer.id = 'print-section';
    printContainer.innerHTML = invoiceElement.outerHTML; // Copy murni isi invoice aja

    // 3. Suntik ke dalam Body paling luar (lepas dari penjara Modal & React)
    document.body.appendChild(printContainer);

    // 4. Perintah Print
    window.print();

    // 5. Hapus langsung kloningannya setelah menu print tertutup
    document.body.removeChild(printContainer);
  };

  const finalPrice = item?.calculatedTotal || item?.price;
  const isTravelBooking = item?.selectedSeats !== undefined;
  const isRentalOrAngkut = item?.rentalDays !== undefined || item?.distance !== undefined;

  return (
    <>
      {/* 
        CSS INI SEKARANG SANGAT SEDERHANA:
        Cuma nyuruh Chrome untuk "Sembunyikan semua aplikasi React, dan tampilkan kloningan Invoice kita aja"
      */}
      <style type="text/css">
        {`
          @media print {
            @page { size: portrait; margin: 15mm; }
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              background: white !important;
            }
            
            /* Sembunyikan seluruh UI React (App Utama & Modal) */
            #root, body > div:not(#print-section) {
              display: none !important;
            }
            
            /* Tampilkan SATU-SATUNYA div hasil kloningan kita */
            #print-section {
              display: block !important;
              width: 100% !important;
            }
            
            /* Hilangkan shadow & border pada kertas cetak */
            #print-section * {
              box-shadow: none !important;
            }
            #print-section > div {
              border: none !important;
            }
          }
        `}
      </style>

      <ZoomInModal isOpen={isOpen} onClose={handleClose} modalClass="bg-white border border-gray-200 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {item && (
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-lg text-[#00437a]">
                {isSuccess ? 'Status Pembayaran' : 'Checkout'}
              </h3>
              <button onClick={handleClose} className="p-1.5 text-gray-400 hover:text-gray-900 transition rounded-lg hover:bg-gray-100 bg-gray-50">
                <X size={20} />
              </button>
            </div>

            {!isSuccess ? (
              <>
                <div className="p-5 space-y-6 flex-grow overflow-y-auto custom-scrollbar bg-[#f8f9fa]">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 shadow-sm">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className="text-gray-900 font-medium">Pending Payment</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Total</span>
                      <span className="text-[#f26e22] font-bold text-lg">{finalPrice}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#00437a] font-semibold mb-3 text-sm">Payment Method</h4>
                    <div className="space-y-3">
                      <button onClick={() => setPaymentMethod('qris')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${paymentMethod === 'qris' ? 'bg-orange-50 border-[#f26e22] text-[#f26e22]' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === 'qris' ? 'border-[#f26e22]' : 'border-gray-300'}`}>
                          {paymentMethod === 'qris' && <div className="w-2 h-2 rounded-full bg-[#f26e22]" />}
                        </div>
                        <QrCode size={18} />
                        <span className="text-sm font-medium text-gray-900">QRIS (OVO/GoPay/Dana)</span>
                      </button>
                      <button onClick={() => setPaymentMethod('bank')} className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${paymentMethod === 'bank' ? 'bg-blue-50 border-[#00437a] text-[#00437a]' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === 'bank' ? 'border-[#00437a]' : 'border-gray-300'}`}>
                          {paymentMethod === 'bank' && <div className="w-2 h-2 rounded-full bg-[#00437a]" />}
                        </div>
                        <Building size={18} />
                        <span className="text-sm font-medium text-gray-900">Bank Transfer</span>
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
                      <span className="text-gray-500 text-xs">Virtual Account BCA</span>
                      <span className="text-[#00437a] font-mono text-xl tracking-widest font-semibold">8077 1234 5678</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-200 bg-white shrink-0 z-10 shadow-sm">
                  <button onClick={handleConfirmPayment} className="w-full py-3.5 bg-[#f26e22] hover:bg-[#d95d1a] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                    <ShieldCheck size={18} />
                    Konfirmasi Pembayaran
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
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#00437a] mb-2">Pembayaran Sukses!</h3>
                  <p className="text-gray-600 text-sm text-center mb-6">
                    Transaksi Anda untuk <strong>{item.title}</strong> telah dikonfirmasi.
                  </p>

                  <div className="flex gap-3 w-full shrink-0">
                    <button onClick={handlePrint} className="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-xl transition-all border border-gray-200 flex items-center justify-center gap-2">
                      <Printer size={18} />
                      Cetak Struk
                    </button>
                    <button onClick={handleClose} className="flex-1 py-3 bg-[#f26e22] hover:bg-[#d95d1a] text-white font-bold text-sm rounded-xl transition-all shadow-md">
                      Selesai
                    </button>
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