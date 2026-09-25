import React from 'react';
import ProductCard from '../Beranda/ProductCard';

export default function LayananTravel({ data, onOpenModal, getPriceLabel, getButtonText }) {
  return (
    <div className="animate-fade-in w-full text-left">
      <div className="mb-8 bg-gradient-to-r from-indigo-900/20 to-transparent border-l-4 border-indigo-500 p-5 md:p-6 rounded-r-2xl">
        <h3 className="text-2xl font-bold text-white mb-2">Tiket Travel Eksekutif</h3>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Perjalanan antar kota lebih nyaman dengan armada premium, kursi kapten (captain seat), dan fasilitas antar-jemput langsung ke depan pintu (door-to-door). Jadwal keberangkatan pasti dan tepat waktu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <ProductCard 
            key={item.id} item={item} index={index} activeTab="travel" 
            getPriceLabel={getPriceLabel} getButtonText={getButtonText}
            onOpenModal={onOpenModal} 
          />
        ))}
      </div>
    </div>
  );
}