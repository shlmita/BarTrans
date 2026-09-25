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

  useEffect(() => {
    if (selectedProduct || checkoutProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProduct, checkoutProduct]);

  const activeTabData = tabs.find(t => t.id === activeTab);
  
  const fullData = products[activeTab] || [];
  const previewData = fullData.slice(0, 4);

  const commonProps = { 
    data: previewData, 
    onOpenModal: setSelectedProduct, 
    getPriceLabel, 
    getButtonText 
  };
  
  const katalogProps = { 
    data: fullData,
    onOpenModal: setSelectedProduct, 
    getPriceLabel, 
    getButtonText,
    onBack: () => {
      setShowKatalog(false);
      window.scrollTo({ top: document.getElementById('services').offsetTop - 80, behavior: 'smooth' });
    } 
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
          {/* UBAH WARNA JUDUL KE NAVY & ORANYE */}
          <h2 className="text-3xl font-bold mb-2 text-[#00437a]">Our <span className="text-[#f26e22]">Services</span></h2>
          <p className="text-gray-500 mb-10 text-sm">Semua kebutuhan perjalanan lo ada di sini.</p>

          <MobileMenu 
            activeTab={activeTab} setActiveTab={setActiveTab} 
            isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} 
            activeTabData={activeTabData} tabs={tabs} 
          />

          <DynamicSlider 
            activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} 
          />

          <div className="relative z-10 mt-8 min-h-[400px]">
            {renderServiceContent()}

            {fullData.length > 4 && (
              <div className="mt-12 flex justify-center">
                {/* UBAH WARNA TOMBOL */}
                <button 
                  onClick={() => {
                    setShowKatalog(true); 
                    window.scrollTo({ top: document.getElementById('services').offsetTop - 80, behavior: 'smooth' });
                  }}
                  className="group px-8 py-3.5 bg-orange-50 hover:bg-[#f26e22] border border-orange-200 hover:border-transparent text-[#f26e22] hover:text-white text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-3 shadow-sm"
                >
                  Lihat Selengkapnya {activeTabData?.label}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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