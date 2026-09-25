import React from 'react';
import ProductCard from '../Beranda/ProductCard';

export default function LayananMobil({ data, onOpenModal, getPriceLabel, getButtonText }) {
  return (
    <div className="animate-fade-in w-full text-left">
      <div className="mb-8 bg-white border border-gray-200 border-l-4 border-l-[#00437a] p-5 md:p-6 rounded-r-2xl shadow-sm">
        <h3 className="text-2xl font-bold text-[#00437a] mb-2">Sewa Mobil Pribadi & VIP</h3>
        <p className="text-gray-600 text-sm max-w-3xl leading-relaxed">
          Pilihan armada terbaik untuk perjalanan dinas, wisata keluarga, atau kebutuhan wedding. Tersedia opsi lepas kunci maupun dengan sopir berpengalaman. Harga sudah termasuk asuransi dasar.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item, index) => <ProductCard key={item.id} item={item} index={index} activeTab="mobil" getPriceLabel={getPriceLabel} getButtonText={getButtonText} onOpenModal={onOpenModal} />)}
      </div>
    </div>
  );
}