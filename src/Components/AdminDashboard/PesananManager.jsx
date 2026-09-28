import React, { useState, useEffect } from 'react';
import { Receipt, User, Phone, CheckCircle, Clock, FileText, X, Printer, MapPin, CalendarDays, Car, Truck, Palmtree, Hotel } from 'lucide-react';
// Pastikan path logo sesuai dengan struktur foldermu. Jika beda, sesuaikan import-nya.
import logoBartrans from '../../assets/Bartrans.png'; 

export default function PesananManager() {
  const [filter, setFilter] = useState('Semua');
  const [pesananData, setPesananData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState(null);

  const tabs = ['Semua', 'Travel', 'Sewa Mobil', 'Jasa Angkut', 'Wisata', 'Penginapan'];

  const fetchPesanan = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pesanan');
      const result = await response.json();
      if (result.status === 'success') {
        setPesananData(result.data); 
      }
    } catch (error) {
      console.error("Gagal memuat data transaksi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPesanan();
    const interval = setInterval(fetchPesanan, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Lunas' ? 'Pending' : 'Lunas';
    if(!window.confirm(`Ubah status pesanan #${id} menjadi ${newStatus}?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/pesanan/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await response.json();
      if (result.status === 'success') {
        setPesananData(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
        if(selectedPesanan && selectedPesanan.id === id) {
          setSelectedPesanan(prev => ({...prev, status: newStatus}));
        }
      } else {
        alert("Gagal memperbarui status: " + result.message);
      }
    } catch (error) {
      console.error("Error update status:", error);
      alert("Gagal terhubung ke server.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatID = (id, layananStr) => {
    let prefix = 'ORD';
    const srv = (layananStr || 'Sewa Mobil').toUpperCase(); 
    
    if (srv.includes('TRAVEL')) prefix = 'TRV';
    else if (srv.includes('MOBIL') || srv.includes('SEWA')) prefix = 'MBL';
    else if (srv.includes('ANGKUT')) prefix = 'TRK';
    else if (srv.includes('WISATA')) prefix = 'WST';
    else if (srv.includes('PENGINAPAN')) prefix = 'PGN';

    const paddedNum = String(id || 0).padStart(3, '0');
    return `${prefix}-${paddedNum}`;
  };

  const handleViewInvoice = (p) => {
    setSelectedPesanan(p);
    setShowInvoice(true);
  };

  // 🔥 FUNGSI CETAK DARI TEMPLATE INVOICE CETAK
  const handleCetak = () => {
    const invoiceEl = document.getElementById('printable-invoice');
    if (!invoiceEl) return;

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
          <title>Cetak Invoice</title>
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
        <body onload="setTimeout(function(){ window.print(); }, 1500)">
          <div style="padding: 20px;">
            ${invoiceEl.outerHTML}
          </div>
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

  // Render Logika Icon & Tipe Layanan untuk Modal Invoice
  const renderInvoiceDetails = () => {
    if (!selectedPesanan) return null;
    const p = selectedPesanan;
    const srv = (p.layanan || 'Sewa Mobil').toUpperCase();
    
    let IconComponent = FileText;
    let serviceName = 'Layanan BarTrans';
    let durationLabel = 'Keterangan';
    let durationValue = p.unit_mobil || p.rute || '-';

    if (srv.includes('MOBIL') || srv.includes('SEWA')) {
      serviceName = 'Sewa Mobil Pribadi'; durationLabel = 'Unit Mobil'; durationValue = p.unit_mobil || '-'; IconComponent = Car;
    } else if (srv.includes('ANGKUT')) {
      serviceName = 'Jasa Angkut Logistik'; durationLabel = 'Rute'; durationValue = p.rute || '-'; IconComponent = Truck;
    } else if (srv.includes('WISATA')) {
      serviceName = 'Paket Wisata Eksekutif'; durationLabel = 'Tujuan'; durationValue = p.rute || '-'; IconComponent = Palmtree;
    } else if (srv.includes('PENGINAPAN')) {
      serviceName = 'Booking Penginapan'; durationLabel = 'Lokasi'; durationValue = p.rute || '-'; IconComponent = Hotel;
    }

    const printDate = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    const finalPrice = `Rp ${p.total_harga ? p.total_harga.toLocaleString('id-ID') : '0'}`;
    const invoiceNum = formatID(p.id, p.layanan);
    const isLunas = (p.status || 'Pending') === 'Lunas';

    return (
      <div className="flex flex-col w-full h-full bg-[#f8f9fa] overflow-hidden p-4 sm:p-5 relative z-10">
        
        {/* BADGE RINGKAS */}
        <div className={`flex items-center justify-between px-3.5 py-2 rounded-xl mb-3 shrink-0 border ${isLunas ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-orange-50 border-orange-200 text-orange-800'}`}>
          <div className="flex items-center gap-2">
            {isLunas ? <CheckCircle size={16} className="text-emerald-600 shrink-0" /> : <Clock size={16} className="text-orange-600 shrink-0" />}
            <span className="text-xs font-bold">{isLunas ? 'Pembayaran Sukses Terverifikasi' : 'Menunggu Verifikasi'}</span>
          </div>
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${isLunas ? 'bg-emerald-200/60 text-emerald-900' : 'bg-orange-200/60 text-orange-900'}`}>
            {p.status || 'Pending'}
          </span>
        </div>

        {/* KERTAS INVOICE UTAMA DARI TEMPLATE */}
        <div id="printable-invoice" className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-gray-100 flex justify-between items-start bg-white">
            <div>
              {/* Jika path logo salah, akan menampilkan teks sebagai ganti */}
              <img src={logoBartrans} alt="BarTrans" className="h-7 w-auto object-contain mb-1" onError={(e) => e.target.style.display='none'} />
              <h4 className="font-extrabold text-[#00437a] text-xs uppercase tracking-widest mt-1">INVOICE RESMI</h4>
              <p className="text-[10px] text-gray-400 font-mono">{invoiceNum}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Diterbitkan</p>
              <p className="text-xs font-bold text-gray-700">{printDate}</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-3 relative bg-white">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-[0.03] pointer-events-none">
              <span className={`text-7xl font-black border-8 p-3 rounded-2xl ${isLunas ? 'text-emerald-600 border-emerald-600' : 'text-orange-600 border-orange-600'}`}>
                {isLunas ? 'PAID' : 'UNPAID'}
              </span>
            </div>

            <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 relative z-10">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1 flex items-center gap-1.5">
                <IconComponent size={13} className="text-[#f26e22]" /> {serviceName}
              </p>
              <h5 className="text-sm font-bold text-[#00437a] leading-tight flex items-center gap-2"><User size={14}/> {p.nama_user || '-'}</h5>
              <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-2"><Phone size={12}/> {p.no_hp || '-'}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10 pt-1">
              <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1">
                  <CalendarDays size={11} className="text-[#00437a]" /> Tanggal Pelaksanaan
                </p>
                <p className="text-xs font-bold text-gray-800">{formatDate(p.tgl_sewa || p.tgl)}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5 flex items-center gap-1">
                  <MapPin size={11} className="text-[#00437a]" /> {durationLabel}
                </p>
                <p className="text-xs font-bold text-[#f26e22]">{durationValue}</p>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 my-2 relative z-10"></div>

            <div className="space-y-1.5 relative z-10 text-[11px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal Layanan</span>
                <span className="font-semibold text-gray-800">{finalPrice}</span>
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
              <div className={`text-[11px] font-bold flex items-center gap-1 mt-0.5 ${isLunas ? 'text-emerald-600' : 'text-orange-600'}`}>
                {isLunas ? <CheckCircle size={11} /> : <Clock size={11} />} 
                {isLunas ? 'LUNAS BERSYARAT' : 'BELUM LUNAS'}
              </div>
            </div>
            <span className="text-base sm:text-lg font-black text-[#00437a] relative z-10">{finalPrice}</span>
          </div>
        </div>

        {/* TOMBOL AKSI MODAL */}
        <div className="flex gap-2.5 w-full mt-3.5 pt-1 shrink-0">
          <button 
            onClick={handleCetak} 
            className="flex-1 py-3 bg-white hover:bg-gray-100 text-[#00437a] font-bold text-xs rounded-xl transition-all border border-gray-300 flex items-center justify-center gap-2 shadow-sm"
          >
            <Printer size={16} /> Cetak / PDF
          </button>
          <button 
            onClick={() => setShowInvoice(false)} 
            className="flex-1 py-3 bg-[#f26e22] hover:bg-[#d95d1a] text-white font-bold text-xs rounded-xl transition-all shadow-md"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-blue-50 text-[#00437a] rounded-2xl shadow-inner shrink-0"><Receipt size={24} /></div>
          <div>
            <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight">Data Transaksi</h3>
            <p className="text-gray-500 text-sm mt-0.5">Pantau pesanan dan konfirmasi pembayaran di sini.</p>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 -mx-2 px-2 md:mx-0 md:px-0 md:pb-0">
          {tabs.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all whitespace-nowrap shrink-0 ${filter === t ? 'bg-gradient-to-r from-[#00437a] to-[#005a9e] text-white border-transparent shadow-md hover:-translate-y-0.5' : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar pb-4">
        <table className="w-full text-sm text-left border-separate border-spacing-y-3">
          <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-4 font-bold">ID Pesanan</th>
              <th className="py-2 px-4 font-bold">Info Pemesan</th>
              <th className="py-2 px-4 font-bold">Detail Unit/Rute</th>
              <th className="py-2 px-4 font-bold">Pelaksanaan</th>
              <th className="py-2 px-4 font-bold">Total Harga</th>
              <th className="py-2 px-4 font-bold text-center">Status</th>
              <th className="py-2 px-4 font-bold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="7" className="text-center py-12 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200"><p className="text-gray-400 font-bold text-sm animate-pulse">Memuat data...</p></td></tr>
            ) : pesananData.filter(p => filter === 'Semua' || (p.layanan || 'Sewa Mobil') === filter).length === 0 ? (
              <tr><td colSpan="7" className="text-center py-12 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200"><p className="text-gray-400 font-bold text-sm">Belum ada transaksi.</p></td></tr>
            ) : (
              pesananData.filter(p => filter === 'Semua' || (p.layanan || 'Sewa Mobil') === filter).map((p, index) => {
                const layananLabel = (p.layanan || 'Sewa Mobil').toUpperCase();

                return (
                  <tr key={p.id || index} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl whitespace-nowrap">
                    <td className="py-4 px-4 rounded-l-2xl font-mono font-bold text-[#00437a]">
                      {formatID(p.id, p.layanan)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-gray-800 flex items-center gap-1.5"><User size={14} className="text-[#00437a]" /> {p.nama_user || '-'}</span>
                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5"><Phone size={14} className="text-[#f26e22]" /> {p.no_hp || '-'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      <span className="bg-white border border-blue-100 text-[#00437a] shadow-sm px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest mr-2 mb-1 inline-block">
                        {layananLabel}
                      </span>
                      <br/>{p.unit_mobil || p.rute || '-'}
                    </td>
                    <td className="py-4 px-4 text-gray-500 font-medium">
                      {formatDate(p.tgl_sewa || p.tgl)}
                    </td>
                    <td className="py-4 px-4 font-black text-gray-800">Rp {p.total_harga ? p.total_harga.toLocaleString('id-ID') : '0'}</td>
                    
                    {/* KOLOM STATUS (Dipisah) */}
                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => handleUpdateStatus(p.id, p.status || 'Pending')}
                        title="Ubah Status"
                        className={`px-3 py-1.5 mx-auto rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm border ${
                          (p.status || 'Pending') === 'Lunas' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}
                      >
                        {(p.status || 'Pending') === 'Lunas' ? <CheckCircle size={14}/> : <Clock size={14}/>}
                        {p.status || 'Pending'}
                      </button>
                    </td>

                    {/* KOLOM AKSI INVOICE (Dipisah) */}
                    <td className="py-4 px-4 rounded-r-2xl text-center">
                      <button 
                        onClick={() => handleViewInvoice(p)} 
                        title="Lihat & Cetak Invoice"
                        className="p-2 mx-auto bg-blue-50 text-[#00437a] border border-blue-100 rounded-lg hover:bg-[#00437a] hover:text-white transition-colors shadow-sm inline-flex items-center justify-center"
                      >
                        <FileText size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL PREVIEW INVOICE DENGAN TEMPLATE CETAK */}
      {showInvoice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-transparent rounded-2xl w-full max-w-md max-h-[95vh] overflow-hidden flex flex-col relative">
            <button 
              onClick={() => setShowInvoice(false)} 
              className="absolute right-4 top-4 z-50 p-1.5 bg-white/50 hover:bg-white text-gray-600 rounded-full backdrop-blur-md transition-all shadow-sm"
            >
              <X size={18} />
            </button>
            {renderInvoiceDetails()}
          </div>
        </div>
      )}
    </div>
  );
}