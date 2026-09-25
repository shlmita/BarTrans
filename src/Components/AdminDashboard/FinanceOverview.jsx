import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

const dataKeuangan = [
  { name: 'Sen', masuk: 4000000, keluar: 2400000 },
  { name: 'Sel', masuk: 3000000, keluar: 1398000 },
  { name: 'Rab', masuk: 2000000, keluar: 9800000 },
  { name: 'Kam', masuk: 2780000, keluar: 3908000 },
  { name: 'Jum', masuk: 1890000, keluar: 4800000 },
  { name: 'Sab', masuk: 2390000, keluar: 3800000 },
  { name: 'Min', masuk: 3490000, keluar: 4300000 },
];

export default function FinanceOverview() {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* KARTU RINGKASAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center gap-4 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shadow-inner"><ArrowUpRight size={20} /></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Pemasukan</p>
          </div>
          <p className="text-3xl font-black text-[#00437a] tracking-tight">Rp 45.000.000</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center gap-4 hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl shadow-inner"><ArrowDownRight size={20} /></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Pengeluaran</p>
          </div>
          <p className="text-3xl font-black text-[#00437a] tracking-tight">Rp 12.500.000</p>
        </div>

        <div className="bg-gradient-to-br from-[#f26e22] to-[#f58b4c] p-6 rounded-[2rem] shadow-xl shadow-[#f26e22]/20 flex flex-col justify-center gap-4 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
          {/* Efek Lingkaran Estetik di Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-3 bg-white/20 text-white rounded-xl backdrop-blur-sm"><Wallet size={20} /></div>
            <p className="text-xs font-bold text-orange-100 uppercase tracking-widest">Laba Bersih</p>
          </div>
          <p className="text-3xl font-black text-white tracking-tight relative z-10">Rp 32.500.000</p>
        </div>

      </div>

      {/* GRAFIK */}
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-blue-50 text-[#00437a] rounded-xl shadow-inner">
            <DollarSign size={20} />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-[#00437a] tracking-tight">Grafik Keuangan Mingguan</h3>
            <p className="text-gray-500 text-xs mt-0.5">Perbandingan arus kas masuk dan keluar minggu ini.</p>
          </div>
        </div>
        
        {/* Kontainer grafik yang aman di mobile */}
        <div className="h-72 w-full -ml-4 sm:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataKeuangan} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} tickFormatter={(value) => `Rp ${value / 1000000}M`} />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, '']}
              />
              <Line type="monotone" dataKey="masuk" stroke="#10b981" strokeWidth={4} name="Pemasukan" dot={{ strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="keluar" stroke="#ef4444" strokeWidth={4} name="Pengeluaran" dot={{ strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
} 