import React from 'react';
import { ArrowLeft, Hotel } from 'lucide-react';
import ProductCard from '../Beranda/ProductCard';

export default function KatalogInap({ data, onOpenModal, getPriceLabel, getButtonText, onBack }) {
  return (
    <div className="animate-fade-in w-full text-left bg-transparent min-h-[60vh]">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-[#f26e22] mb-8 transition-colors group">
        <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold">Kembali ke Menu Utama</span>
      </button>

      <div className="mb-10 bg-white border border-gray-200 border-l-4 border-l-[#00437a] p-6 md:p-10 rounded-2xl md:rounded-r-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-[#00437a]"><Hotel size={28} /></div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#00437a]">Katalog Penginapan & Villa</h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl leading-relaxed">
          Rekomendasi tempat menginap terbaik untuk liburan atau staycation lo. Dari hotel berbintang di tengah kota, homestay estetik pinggir pantai, hingga private villa eksklusif di pegunungan dengan kolam renang pribadi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {data.map((item, index) => <ProductCard key={item.id} item={item} index={index} activeTab="inap" getPriceLabel={getPriceLabel} getButtonText={getButtonText} onOpenModal={onOpenModal} />)}
      </div>
    </div>
  );
}