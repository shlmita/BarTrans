import React from 'react';
import { CheckCircle, Printer, CalendarDays, MapPin, Clock, Car, Truck, Palmtree, Hotel, FileText, User } from 'lucide-react';
import logoBartrans from '../../assets/Bartrans.png'; 

export default function InvoiceCetak({ item, onClose }) {
  // 🔥 PERBAIKAN HARGA: Tampilkan harga yang sudah akurat
  const rawPrice = item?.calculatedTotal || item?.total_harga || item?.price || 0;
  const numericPrice = typeof rawPrice === 'number' ? rawPrice : parseInt(String(rawPrice).replace(/[^0-9]/g, ''), 10) || 0;
  const displayPrice = `Rp ${numericPrice.toLocaleString('id-ID')}`;
  
  const isCar = item?.rentalDays !== undefined || item?.layanan === 'Sewa Mobil';
  const isTruck = item?.distance !== undefined || item?.layanan === 'Jasa Angkut';
  const isPaket = item?.paxCount !== undefined || item?.layanan === 'Paket Wisata';
  const isInap = item?.nightsCount !== undefined || item?.layanan === 'Booking Penginapan' || item?.layanan === 'Penginapan';
  
  // 🔥 FUNGSI PEMBACA DATABASE: Memisahkan Durasi dan NIK dari kolom 'rute' MySQL
  let dbDuration = '-';
  let dbNik = '-';
  
  if (item?.rute) {
    const parts = item.rute.split(' - NIK: ');
    dbDuration = parts[0];
    if (parts.length > 1) dbNik = parts[1].trim();
  }

  // Tentukan Label dan Icon berdasarkan layanan
  let prefix = 'SRV';
  let serviceName = 'Layanan BarTrans';
  let durationLabel = 'Keterangan';
  let durationValue = '-';
  let IconComponent = FileText;

  if (isCar) {
    prefix = 'CAR'; serviceName = 'Sewa Mobil Pribadi'; durationLabel = 'Durasi Sewa'; durationValue = item?.rentalDays ? `${item.rentalDays} Hari` : '1 Hari'; IconComponent = Car;
  } else if (isTruck) {
    prefix = 'TRK'; serviceName = 'Jasa Angkut Logistik'; durationLabel = 'Jarak Tempuh'; durationValue = item?.distance ? `${item.distance} KM` : dbDuration; IconComponent = Truck;
  } else if (isPaket) {
    prefix = 'PKT'; serviceName = 'Paket Wisata Eksekutif'; durationLabel = 'Jumlah Peserta'; durationValue = item?.paxCount ? `${item.paxCount} Pax` : dbDuration; IconComponent = Palmtree;
  } else if (isInap) {
    prefix = 'INP'; serviceName = 'Booking Penginapan'; durationLabel = 'Durasi Menginap'; durationValue = item?.nightsCount ? `${item.nightsCount} Malam` : dbDuration; IconComponent = Hotel;
  }

  // Identitas Pemesan
  const namaPemesan = item?.customerData?.name || item?.nama_pemesan || item?.nama_user || '-';
  const noHpPemesan = item?.customerData?.phone || item?.no_hp || '-';
  const nikPemesan = item?.identityNumber || item?.customerData?.identityNumber || (dbNik !== '-' ? dbNik : '-');

  const invoiceNum = `INV/BT-${prefix}/${Math.floor(100000 + Math.random() * 900000)}`;
  const printDate = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

  const handleCetak = () => {
    const invoiceEl = document.getElementById('printable-invoice');
    if (!invoiceEl) {
      alert("Sistem sedang memuat struk, silakan coba lagi.");
      return;
    }

    const existingIframe = document.getElementById('print-frame');
    if (existingIframe) existingIframe.remove();

    const iframe = document.createElement('iframe');
    iframe.id = 'print-frame';
    iframe.style.position = 'fixed';
    iframe.style.top = '-10000px';
    iframe.style.left = '-10000px';
    iframe.style.width = '1000px';
    iframe.style.height = '1000px';
    
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;

    const printHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${invoiceNum}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: auto; margin: 15mm; }
            body { 
              background-color: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }
            #printable-invoice {
              margin: 0 auto;
              max-width: 800px;
              box-shadow: none !important;
              border: 1px solid #e5e7eb !important;
            }
            .opacity-\\[0\\.03\\] { opacity: 0.1 !important; } 
          </style>
        </head>
        <body>
          <div style="padding: 20px;">
            ${invoiceEl.outerHTML}
          </div>
          <script>
            setTimeout(function() {
              window.print();
            }, 1000);
          </script>
        </body>
      </html>
    `;

    iframeDoc.document.open();
    iframeDoc.document.write(printHTML);
    iframeDoc.document.close();
    
    setTimeout(() => {
        if(document.getElementById('print-frame')) {
            document.getElementById('print-frame').remove();
        }
    }, 5000);
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#f8f9fa] rounded-b-2xl overflow-hidden p-4 sm:p-5">
      
      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-600 shrink-0" />
          <span className="text-xs font-bold">Pembayaran Sukses Terverifikasi</span>
        </div>
        <span className="text-[10px] bg-emerald-200/60 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Lunas
        </span>
      </div>

      <div id="printable-invoice" className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-gray-100 flex justify-between items-start bg-white">
          <div>
            <img src={logoBartrans} alt="Logo BarTrans" className="h-7 w-auto object-contain mb-1" />
            <h4 className="font-extrabold text-[#00437a] text-xs uppercase tracking-widest">INVOICE RESMI</h4>
            <p className="text-[10px] text-gray-400 font-mono">{invoiceNum}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Diterbitkan</p>
            <p className="text-xs font-bold text-gray-700">{printDate}</p>
          </div>
        </div>

        <div className="p-4 sm:p-5 relative bg-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-[0.03] pointer-events-none">
            <span className="text-7xl font-black text-emerald-600 border-8 border-emerald-600 p-3 rounded-2xl">PAID</span>
          </div>

          <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 relative z-10 mb-3">
            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1 flex items-center gap-1.5">
              <IconComponent size={13} className="text-[#f26e22]" /> {serviceName}
            </p>
            <h5 className="text-sm font-bold text-[#00437a] leading-tight">{item.title || item.unit_mobil}</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">{item.desc || item.deskripsi}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 relative z-10">
            <div>
              <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1">
                <CalendarDays size={11} className="text-[#00437a]" /> Tanggal Pelaksanaan
              </p>
              <p className="text-xs font-bold text-gray-800">
                {item.startDate || (item.tgl_sewa ? item.tgl_sewa.split('T')[0] : '-')}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1">
                {isCar || isInap ? <Clock size={11} className="text-[#00437a]" /> : <MapPin size={11} className="text-[#00437a]" />}
                {durationLabel}
              </p>
              <p className="text-xs font-bold text-[#f26e22]">{durationValue}</p>
            </div>
          </div>

          <div className="mt-4 bg-blue-50/40 p-3 rounded-xl border border-blue-100 relative z-10">
            <p className="text-[9px] text-[#00437a] font-extrabold uppercase mb-2 border-b border-blue-100 pb-1 flex items-center gap-1.5">
              <User size={12} /> Identitas Pemesan
            </p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[11px]">
              <div>
                <span className="text-gray-400 uppercase text-[8px] block font-bold">Nama Lengkap</span>
                <span className="font-semibold text-gray-800">{namaPemesan}</span>
              </div>
              <div>
                <span className="text-gray-400 uppercase text-[8px] block font-bold">No. WhatsApp</span>
                <span className="font-semibold text-gray-800">{noHpPemesan}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 uppercase text-[8px] block font-bold">NIK / No. Identitas</span>
                <span className="font-semibold text-gray-800">{nikPemesan}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200 my-4 relative z-10"></div>

          <div className="space-y-1.5 relative z-10 text-[11px]">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal Layanan</span>
              <span className="font-semibold text-gray-800">{displayPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Biaya Admin & Pajak</span>
              <span className="font-semibold text-gray-800">Rp 0</span>
            </div>
          </div>
        </div>

        <div className="bg-[#00437a]/5 px-4 py-3 sm:px-5 sm:py-3.5 border-t border-[#00437a]/10 flex justify-between items-center relative overflow-hidden">
          <div>
            <span className="text-[9px] text-[#00437a] font-bold uppercase tracking-wider block">Total Pembayaran</span>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
              <CheckCircle size={11} /> LUNAS BERSYARAT
            </div>
          </div>
          <span className="text-base sm:text-lg font-black text-[#00437a] relative z-10">{displayPrice}</span>
        </div>
      </div>

      <div className="flex gap-2.5 w-full mt-3.5 pt-1 shrink-0">
        <button onClick={handleCetak} className="flex-1 py-3 bg-white hover:bg-gray-100 text-[#00437a] font-bold text-xs rounded-xl transition-all border border-gray-300 flex items-center justify-center gap-2 shadow-sm">
          <Printer size={16} /> Cetak / PDF
        </button>
        <button onClick={onClose} className="flex-1 py-3 bg-[#f26e22] hover:bg-[#d95d1a] text-white font-bold text-xs rounded-xl transition-all shadow-md">
          Selesai
        </button>
      </div>
    </div>
  );
}