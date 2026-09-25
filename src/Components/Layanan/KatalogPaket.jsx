import React from 'react';
import { ArrowLeft, Palmtree } from 'lucide-react';
import ProductCard from '../Beranda/ProductCard';

export default function KatalogPaket({ data, onOpenModal, getPriceLabel, getButtonText, onBack }) {
  return (
    <div className="animate-fade-in w-full text-left bg-transparent min-h-[60vh]">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-[#00437a] mb-8 transition-colors group">
        <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold">Kembali ke Menu Utama</span>
      </button>

      <div className="mb-10 bg-white border border-gray-200 border-l-4 border-l-[#f26e22] p-6 md:p-10 rounded-2xl md:rounded-r-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-orange-50 border border-orange-100 rounded-xl text-[#f26e22]"><Palmtree size={28} /></div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f26e22]">Katalog Paket Wisata</h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl leading-relaxed">
          Eksplorasi keindahan nusantara dengan paket wisata eksklusif kami. Semua kebutuhan perjalanan mulai dari itinerary, tiket masuk wisata, hotel, hingga dokumentasi profesional sudah kami siapkan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {data.map((item, index) => <ProductCard key={item.id} item={item} index={index} activeTab="paket" getPriceLabel={getPriceLabel} getButtonText={getButtonText} onOpenModal={onOpenModal} />)}
      </div>
    </div>
  );
}