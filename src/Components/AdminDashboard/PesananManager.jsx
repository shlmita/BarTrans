import React, { useState } from 'react';
import { Receipt } from 'lucide-react';

const dummyPesanan = [
  { id: 'TRV-001', layanan: 'Travel', rute: 'Pati - Jakarta', tgl: '24 Sep 2026', status: 'Lunas', harga: 'Rp 350.000' },
  { id: 'MBL-002', layanan: 'Sewa Mobil', rute: 'Toyota Alphard (2 Hari)', tgl: '25 Sep 2026', status: 'Pending', harga: 'Rp 2.500.000' },
  { id: 'TRK-003', layanan: 'Jasa Angkut', rute: 'CDE Engkel (Pati - Semarang)', tgl: '26 Sep 2026', status: 'Lunas', harga: 'Rp 800.000' },
];

export default function PesananManager() {
  const [filter, setFilter] = useState('Semua');
  const tabs = ['Semua', 'Travel', 'Sewa Mobil', 'Jasa Angkut', 'Wisata', 'Penginapan'];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
      
      {/* HEADER & TABS FILTER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-blue-50 text-[#00437a] rounded-2xl shadow-inner shrink-0">
            <Receipt size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight">Data Transaksi</h3>
            <p className="text-gray-500 text-sm mt-0.5">Pantau dan kelola semua pesanan pelanggan.</p>
          </div>
        </div>
        
        {/* Filter Tabs - Aman di mobile (bisa di-scroll ke samping) */}
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 -mx-2 px-2 md:mx-0 md:px-0 md:pb-0">
          {tabs.map(t => (
            <button 
              key={t} 
              onClick={() => setFilter(t)} 
              className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all whitespace-nowrap shrink-0 ${
                filter === t 
                  ? 'bg-gradient-to-r from-[#00437a] to-[#005a9e] text-white border-transparent shadow-md hover:-translate-y-0.5' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* TABEL DATA */}
      <div className="overflow-x-auto custom-scrollbar pb-4">
        <table className="w-full text-sm text-left border-separate border-spacing-y-3">
          <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-4 font-bold">ID Pesanan</th>
              <th className="py-2 px-4 font-bold">Layanan</th>
              <th className="py-2 px-4 font-bold">Detail / Rute</th>
              <th className="py-2 px-4 font-bold">Pelaksanaan</th>
              <th className="py-2 px-4 font-bold">Total Harga</th>
              <th className="py-2 px-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyPesanan.filter(p => filter === 'Semua' || p.layanan === filter).map(p => (
              <tr key={p.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl whitespace-nowrap">
                
                <td className="py-4 px-4 rounded-l-2xl font-mono font-bold text-[#00437a]">{p.id}</td>
                
                <td className="py-4 px-4">
                  <span className="bg-white border border-blue-100 text-[#00437a] shadow-sm px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest">
                    {p.layanan}
                  </span>
                </td>
                
                <td className="py-4 px-4 text-gray-700 font-medium">{p.rute}</td>
                
                <td className="py-4 px-4 text-gray-500 font-medium">{p.tgl}</td>
                
                <td className="py-4 px-4 font-black text-gray-800">{p.harga}</td>
                
                <td className="py-4 px-4 rounded-r-2xl">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center w-max gap-1.5 ${
                    p.status === 'Lunas' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Lunas' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                    {p.status}
                  </span>
                </td>
                
              </tr>
            ))}
            
            {/* Tampilan jika data kosong */}
            {dummyPesanan.filter(p => filter === 'Semua' || p.layanan === filter).length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-12 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Receipt size={32} className="text-gray-300" />
                    <p className="text-gray-400 font-bold text-sm">Tidak ada transaksi untuk layanan ini.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}