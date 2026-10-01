import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ArrowUpRight, Clock, Users, Car, Compass, Truck, Map, Calendar, Loader2 } from 'lucide-react';
import API_URL from '../../config';

export default function FinanceOverview() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/statistik`)
      .then(res => res.json())
      .then(result => {
        if(result.status === 'success') {
          setStats(result.data);
        }
      })
      .catch(err => console.error("Gagal load statistik:", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-fade-in">
        <Loader2 className="animate-spin text-[#00437a] mb-4" size={40} />
        <p className="font-semibold animate-pulse">Memuat Data Keuangan BarTrans...</p>
      </div>
    );
  }

  // 🔥 FORMATTER PINTAR UNTUK SUMBU Y PADA GRAFIK
  const formatYAxis = (value) => {
    if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1).replace('.0', '')}M`;
    if (value >= 1000) return `Rp ${(value / 1000).toFixed(0)}K`;
    return `Rp ${value}`;
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* 💰 BARIS 1: KARTU RINGKASAN KEUANGAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        
        {/* Pemasukan Mingguan */}
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center gap-4 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shadow-inner"><ArrowUpRight size={20} /></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pemasukan 7 Hari Terakhir</p>
          </div>
          <p className="text-3xl font-black text-[#00437a] tracking-tight">Rp {stats.pemasukanMingguan.toLocaleString('id-ID')}</p>
        </div>

        {/* Pemasukan Bulanan */}
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center gap-4 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shadow-inner"><Calendar size={20} /></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pemasukan Bulan Ini</p>
          </div>
          <p className="text-3xl font-black text-[#00437a] tracking-tight">Rp {stats.pemasukanBulanan.toLocaleString('id-ID')}</p>
        </div>

        {/* 🔥 KOTAK ORANYE (PESANAN PENDING) */}
        <div className="bg-gradient-to-br from-[#f26e22] to-[#f58b4c] p-6 rounded-[2rem] shadow-xl shadow-[#f26e22]/20 flex flex-col justify-center gap-2 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <div className="flex items-center justify-between relative z-10 mb-1">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 text-white rounded-xl backdrop-blur-sm"><Clock size={20} /></div>
              <p className="text-xs font-bold text-orange-100 uppercase tracking-widest">Pesanan Belum Lunas</p>
            </div>
          </div>
          
          <div className="relative z-10 flex items-end gap-3">
            <p className="text-5xl font-black text-white tracking-tight">{stats.tertundaCount}</p>
            <span className="text-sm font-semibold text-orange-100 mb-1.5 uppercase tracking-wider">Transaksi</span>
          </div>
          
          {/* Label Nominal Kecil Estetik */}
          <div className="relative z-10 mt-1 inline-block">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-bold text-white shadow-sm border border-white/20">
              Total Nominal: Rp {stats.tertunda.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

      </div>

      {/* 👥 BARIS 2: STATISTIK USER & LAYANAN */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
        
        {/* Total Pengguna */}
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:col-span-2 flex flex-col justify-center gap-2 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl shadow-inner"><Users size={20} /></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Pengguna Terdaftar</p>
            </div>
          </div>
          <div className="flex items-end gap-4">
            <p className="text-5xl font-black text-[#00437a] tracking-tight">{stats.totalPengguna}</p>
            <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-bold text-xs shadow-sm mb-1 animate-pulse">
              <ArrowUpRight size={14} /> +{stats.penggunaBaru} Bln Ini
            </div>
          </div>
        </div>

        {/* Pemakaian Layanan */}
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group">
            <Car size={24} className="text-[#00437a] mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-bold text-gray-400 uppercase">Sewa Mobil</p>
            <p className="text-xl font-black text-[#00437a]">{stats.trxMobil} <span className="text-xs font-medium text-gray-500">Trx</span></p>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors group">
            <Compass size={24} className="text-[#f26e22] mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-bold text-gray-400 uppercase">Travel</p>
            <p className="text-xl font-black text-[#00437a]">{stats.trxTravel} <span className="text-xs font-medium text-gray-500">Trx</span></p>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group">
            <Truck size={24} className="text-[#00437a] mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-bold text-gray-400 uppercase">Angkut</p>
            <p className="text-xl font-black text-[#00437a]">{stats.trxAngkut} <span className="text-xs font-medium text-gray-500">Trx</span></p>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 rounded-2xl hover:bg-orange-50 transition-colors group">
            <Map size={24} className="text-[#f26e22] mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-bold text-gray-400 uppercase">Wisata</p>
            <p className="text-xl font-black text-[#00437a]">{stats.trxWisata} <span className="text-xs font-medium text-gray-500">Trx</span></p>
          </div>

        </div>
      </div>

      {/* 📈 GRAFIK KEUANGAN (Hanya Yang Lunas) */}
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-blue-50 text-[#00437a] rounded-xl shadow-inner">
            <DollarSign size={20} />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-[#00437a] tracking-tight">Grafik Pemasukan 7 Hari Terakhir</h3>
            <p className="text-gray-500 text-xs mt-0.5">Pergerakan arus kas dari pesanan yang sudah berstatus LUNAS.</p>
          </div>
        </div>
        
        <div className="h-72 w-full -ml-4 sm:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.grafik} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} tickFormatter={formatYAxis} />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Pemasukan Lunas']}
              />
              <Line type="monotone" dataKey="masuk" stroke="#10b981" strokeWidth={4} name="Pemasukan" dot={{ strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}