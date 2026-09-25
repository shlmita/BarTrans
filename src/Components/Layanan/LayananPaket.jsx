import React from 'react';
import ProductCard from '../Beranda/ProductCard';

export default function LayananPaket({ data, onOpenModal, getPriceLabel, getButtonText }) {
  return (
    <div className="animate-fade-in w-full text-left">
      <div className="mb-8 bg-gradient-to-r from-teal-900/20 to-transparent border-l-4 border-teal-400 p-5 md:p-6 rounded-r-2xl">
        <h3 className="text-2xl font-bold text-white mb-2">Paket Wisata Eksklusif</h3>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Liburan anti ribet! Itinerary lengkap, transportasi nyaman, penginapan estetik, fasilitas dokumentasi, sampai tiket wisata udah kami urus. Lo tinggal duduk manis dan nikmatin pengalaman liburan bareng orang tersayang.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <ProductCard 
            key={item.id} item={item} index={index} activeTab="paket" 
            getPriceLabel={getPriceLabel} getButtonText={getButtonText}
            onOpenModal={onOpenModal} 
          />
        ))}
      </div>
    </div>
  );
}