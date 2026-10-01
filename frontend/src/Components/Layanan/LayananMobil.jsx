import React from 'react';
import { Car } from 'lucide-react';
import ProductCard from '../Beranda/ProductCard';

export default function LayananMobil({ data, onOpenModal, getPriceLabel, getButtonText }) {
  return (
    <div className="animate-fade-in w-full text-left">
      
      {/* BANNER LAYANAN (Sesuai dengan style Travel) */}
      <div className="mb-8 bg-white border border-gray-200 border-l-4 border-l-[#00437a] p-6 md:p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-50 text-[#00437a] rounded-lg">
            <Car size={24} />
          </div>
          <h3 className="text-2xl font-bold text-[#00437a]">Sewa Mobil Premium</h3>
        </div>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Pilihan armada mobil terlengkap untuk berbagai kebutuhan perjalanan Anda. Mulai dari city car, mobil keluarga, hingga mobil VIP premium yang dijamin bersih, terawat, dan siap jalan.
        </p>
      </div>

      {/* GRID CARD MOBIL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <ProductCard 
              key={item.id} 
              item={item} 
              index={index} 
              activeTab="mobil" 
              getPriceLabel={getPriceLabel} 
              getButtonText={getButtonText} 
              onOpenModal={onOpenModal} 
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 font-bold shadow-sm">
            Memuat data armada mobil...
          </div>
        )}
      </div>

    </div>
  );
}