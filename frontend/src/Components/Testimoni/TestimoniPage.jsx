import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquareHeart } from 'lucide-react';
import axios from 'axios';
import TestimoniFilter from './TestimoniFilter';
import TestimoniCard from './TestimoniCard';

export default function TestimoniPage({ onBack }) {
  const [activeService, setActiveService] = useState("Semua Layanan");
  const [activeRating, setActiveRating] = useState("Semua Bintang");
  
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Ambil dari MySQL (Hanya yang Approved)
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('http://localhost:5000/api/testimoni?status=Approved')
      .then(res => {
        // Konversi penamaan database agar pas dengan struktur TestimoniCard
        const mappedData = res.data.map(item => ({
          id: item.id,
          name: item.nama,
          service: item.layanan,
          rating: item.rating,
          date: new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
          comment: item.comment,
          avatar: item.gambar || `https://ui-avatars.com/api/?name=${item.nama.replace(/ /g, '+')}&background=00437a&color=fff`
        }));
        setAllData(mappedData);
        setFilteredData(mappedData);
      })
      .catch(err => console.error(err));
  }, []);

  // Filter Lokal
  useEffect(() => {
    let result = allData;
    if (activeService !== "Semua Layanan") result = result.filter(item => item.service === activeService);
    if (activeRating !== "Semua Bintang") result = result.filter(item => item.rating === activeRating);
    setFilteredData(result);
  }, [activeService, activeRating, allData]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-[#00437a] transition-colors mb-4 group text-sm font-semibold">
              <div className="p-1.5 bg-white border border-gray-200 rounded-lg group-hover:bg-gray-50 transition-colors">
                <ArrowLeft size={16} />
              </div>
              Kembali ke Beranda
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-[#00437a] flex items-center gap-3">
              Apa Kata <span className="text-[#f26e22]">Klien Kami?</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Lebih dari 10.000+ perjalanan sukses bersama BarTrans.</p>
          </div>
          <div className="hidden md:flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl border border-blue-100">
            <MessageSquareHeart size={30} className="text-[#00437a]" />
          </div>
        </div>

        <TestimoniFilter activeService={activeService} setActiveService={setActiveService} activeRating={activeRating} setActiveRating={setActiveRating} />

        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredData.map((item) => <TestimoniCard key={item.id} data={item} />)}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center animate-fade-in shadow-sm">
            <MessageSquareHeart size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ulasan Tidak Ditemukan</h3>
            <p className="text-gray-500 text-sm">Belum ada ulasan untuk filter {activeService} dengan {activeRating} Bintang saat ini.</p>
            <button onClick={() => { setActiveService("Semua Layanan"); setActiveRating("Semua Bintang"); }} className="mt-6 px-6 py-2 bg-[#00437a] hover:bg-[#003057] text-white rounded-xl text-sm font-semibold transition-colors">
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}