import React, { useState, useEffect } from 'react';
import { tabs, products, getPriceLabel, getButtonText } from './serviceData';

import DynamicSlider from '../animasi/DynamicSlider';
import MobileMenu from '../animasi/MobileMenu';
import ProductModal from './ProductModal'; 
import TravelModal from './TravelModal'; 
import CarModal from './CarModal'; 
import TruckModal from './TruckModal'; 
import PaketModal from './PaketModal'; 
import InapModal from './InapModal'; 
import PaymentModal from './PaymentModal'; 

import LayananMobil from '../Layanan/LayananMobil';
import LayananTravel from '../Layanan/LayananTravel';
import LayananAngkut from '../Layanan/LayananAngkut';
import LayananPaket from '../Layanan/LayananPaket';
import LayananInap from '../Layanan/LayananInap';

import KatalogMobil from '../Layanan/KatalogMobil';
import KatalogTravel from '../Layanan/KatalogTravel';
import KatalogAngkut from '../Layanan/KatalogAngkut';
import KatalogPaket from '../Layanan/KatalogPaket';
import KatalogInap from '../Layanan/KatalogInap';

export default function Services() {
  const [activeTab, setActiveTab] = useState('mobil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [checkoutProduct, setCheckoutProduct] = useState(null); 
  const [showKatalog, setShowKatalog] = useState(false);

  // 🔴 STATE DATA DARI DATABASE NODE.JS
  const [trukList, setTrukList] = useState([]);
  const [paketList, setPaketList] = useState([]); 
  const [inapList, setInapList] = useState([]); 
  const [travelList, setTravelList] = useState([]);

  useEffect(() => {
    const fetchTrukData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/truk');
        const result = await response.json();
        if (result.status === 'success') {
          const mappedTruk = result.data.map(truk => ({
            id: truk.id, title: truk.jenis, price: `Rp ${Number(truk.tarif).toLocaleString('id-ID')}`,
            img: truk.gambar, desc: `Kapasitas ${truk.kapasitas} • Volume ${truk.volume} • Nopol: ${truk.nopol}`, deskripsi: truk.deskripsi, status: truk.status, rawTruk: truk
          }));
          // 🔥 TAMBAHKAN .reverse() AGAR DATA TERBARU MUNCUL DI ATAS
          setTrukList(mappedTruk.reverse());
        }
      } catch (error) { console.error('Gagal mengambil data truk:', error); }
    };

    const fetchPaketData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/wisata');
        const result = await response.json();
        if (result.status === 'success') {
          const mappedPaket = result.data.map(paket => ({
            id: paket.id, title: paket.nama || paket.title, price: `Rp ${Number(paket.harga).toLocaleString('id-ID')}`,
            img: paket.gambar || paket.img, desc: `${paket.durasi || ''} • ${paket.tujuan || paket.destinasi || ''}`, tipe: paket.tipe, status: paket.status, rawPaket: paket 
          }));
          // 🔥 TAMBAHKAN .reverse() 
          setPaketList(mappedPaket.reverse());
        }
      } catch (error) { console.error('Gagal mengambil data wisata:', error); }
    };

    const fetchInapData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/penginapan');
        const result = await response.json();
        if (Array.isArray(result)) {
          const mappedInap = result.map(inap => ({
            id: inap.id, title: inap.nama, price: `Rp ${Number(inap.harga).toLocaleString('id-ID')}`,
            img: inap.gambar, desc: inap.tipe === 'Kamar Hotel' ? `Kamar ${inap.noKamar || '-'} • Lantai ${inap.lantai || '-'}` : `${inap.jmlKamarTidur || '-'} Kamar • Maks ${inap.kapasitas || '-'} Orang`,
            tipe: inap.tipe, fasilitas: typeof inap.fasilitas === 'string' ? JSON.parse(inap.fasilitas) : (inap.fasilitas || []), status: inap.status, rawInap: inap
          }));
          // 🔥 FILTER DULU BARU .reverse()
          setInapList(mappedInap.filter(item => item.status === 'Tersedia').reverse());
        }
      } catch (error) { console.error('Gagal mengambil data penginapan:', error); }
    };

    const fetchTravelData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/travel');
        const result = await response.json();
        if (Array.isArray(result)) {
          const mappedTravel = result.map(t => ({
            id: t.id,
            title: t.rute,
            price: `Rp ${Number(t.harga).toLocaleString('id-ID')}`,
            img: t.gambar || '',
            desc: t.unit,
            tipe: 'Travel Eksekutif',
            status: t.kursiTersedia > 0 ? 'Tersedia' : 'Penuh',
            seatMap: typeof t.seatMap === 'string' ? JSON.parse(t.seatMap) : (t.seatMap || []),
            rawTravel: t
          }));
          // 🔥 TAMBAHKAN .reverse()
          setTravelList(mappedTravel.reverse());
        }
      } catch (error) { console.error('Gagal mengambil data travel:', error); }
    };

    fetchTrukData();
    fetchPaketData();
    fetchInapData(); 
    fetchTravelData(); 
  }, []);

  useEffect(() => {
    if (selectedProduct || checkoutProduct) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'auto'; }
  }, [selectedProduct, checkoutProduct]);

  const activeTabData = tabs.find(t => t.id === activeTab);
  
  let fullData = [];
  if (activeTab === 'angkut') {
    fullData = trukList; 
  } else if (activeTab === 'paket') {
    fullData = paketList; 
  } else if (activeTab === 'inap') {
    fullData = inapList; 
  } else if (activeTab === 'travel') {
    fullData = travelList;
  } else {
    fullData = products[activeTab] || []; 
  }

  const previewData = fullData.slice(0, 4);

  const commonProps = { data: previewData, onOpenModal: setSelectedProduct, getPriceLabel, getButtonText };
  const katalogProps = { 
    data: fullData, onOpenModal: setSelectedProduct, getPriceLabel, getButtonText,
    onBack: () => { setShowKatalog(false); window.scrollTo({ top: document.getElementById('services').offsetTop - 80, behavior: 'smooth' }); } 
  };

  const renderServiceContent = () => {
    switch (activeTab) {
      case 'mobil': return <LayananMobil {...commonProps} />;
      case 'travel': return <LayananTravel {...commonProps} />;
      case 'angkut': return <LayananAngkut {...commonProps} />;
      case 'paket': return <LayananPaket {...commonProps} />;
      case 'inap': return <LayananInap {...commonProps} />;
      default: return null;
    }
  };

  const renderKatalogContent = () => {
    switch (activeTab) {
      case 'mobil': return <KatalogMobil {...katalogProps} />;
      case 'travel': return <KatalogTravel {...katalogProps} />;
      case 'angkut': return <KatalogAngkut {...katalogProps} />;
      case 'paket': return <KatalogPaket {...katalogProps} />;
      case 'inap': return <KatalogInap {...katalogProps} />;
      default: return null;
    }
  };

  return (
    <section id="services" className="py-20 text-center px-4 md:px-0 min-h-screen">
      {!showKatalog ? (
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-2 text-[#00437a]">Our <span className="text-[#f26e22]">Services</span></h2>
          <p className="text-gray-500 mb-10 text-sm">Semua kebutuhan perjalanan lo ada di sini.</p>

          <MobileMenu activeTab={activeTab} setActiveTab={setActiveTab} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} activeTabData={activeTabData} tabs={tabs} />
          <DynamicSlider activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

          <div className="relative z-10 mt-8 min-h-[400px]">
            {renderServiceContent()}

            {/* 🔥 SYARAT JUMLAH DATA DIHAPUS, SEKARANG TOMBOL SELALU MUNCUL DI SEMUA MENU 🔥 */}
            {fullData.length > 0 && (
              <div className="mt-12 flex justify-center">
                <button onClick={() => { setShowKatalog(true); window.scrollTo({ top: document.getElementById('services').offsetTop - 80, behavior: 'smooth' }); }} className="group px-8 py-3.5 bg-orange-50 hover:bg-[#f26e22] border border-orange-200 hover:border-transparent text-[#f26e22] hover:text-white text-sm font-semibold rounded-full transition-all flex items-center gap-3 shadow-sm">
                  Lihat Selengkapnya {activeTabData?.label}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            )}
            
          </div>
        </div>
      ) : (
        <div className="relative z-10 min-h-[400px] mt-4">
          {renderKatalogContent()}
        </div>
      )}

      {/* MODAL */}
      {activeTab === 'travel' ? <TravelModal item={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} onProceedCheckout={(item) => { setSelectedProduct(null); setCheckoutProduct(item); }} />
      : activeTab === 'mobil' ? <CarModal item={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} onProceedCheckout={(item) => { setSelectedProduct(null); setCheckoutProduct(item); }} />
      : activeTab === 'angkut' ? <TruckModal item={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} onProceedCheckout={(item) => { setSelectedProduct(null); setCheckoutProduct(item); }} />
      : activeTab === 'paket' ? <PaketModal item={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} onProceedCheckout={(item) => { setSelectedProduct(null); setCheckoutProduct(item); }} />
      : activeTab === 'inap' ? <InapModal item={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} onProceedCheckout={(item) => { setSelectedProduct(null); setCheckoutProduct(item); }} />
      : <ProductModal item={selectedProduct} isOpen={!!selectedProduct} activeTab={activeTab} onClose={() => setSelectedProduct(null)} onProceedCheckout={(item) => { setSelectedProduct(null); setCheckoutProduct(item); }} />}

      <PaymentModal item={checkoutProduct} isOpen={!!checkoutProduct} onClose={() => setCheckoutProduct(null)} />
    </section>
  );
}