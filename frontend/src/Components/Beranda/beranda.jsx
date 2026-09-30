import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Service'; 
import Testimonials from './Testimonials';
import Footer from './Footer';
import TestimoniPage from '../Testimoni/TestimoniPage'; 
import API_URL from '../config';

export default function Beranda({ onOpenLogin }) {
  const [showFullReview, setShowFullReview] = useState(false);
  const [webData, setWebData] = useState(null);

  // FETCH WEB DATA
  useEffect(() => {
    fetch(API_URL + '/api/web-settings')
      .then(res => res.json())
      .then(result => {
        if(result.status === 'success') setWebData(result.data);
      })
      .catch(err => console.error("Gagal load web setting:", err));
  }, []);

  // Loading Screen sederhana sebelum data ditarik
  if (!webData) return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#00437a]/30 border-t-[#f26e22] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans pb-20 md:pb-0">
      <Navbar onOpenLogin={onOpenLogin} />
      
      {showFullReview ? (
        <TestimoniPage onBack={() => setShowFullReview(false)} />
      ) : (
        <main className="max-w-7xl mx-auto px-6 lg:px-12 animate-fade-in">
          {/* 🔥 PASSING DATA KE MASING-MASING KOMPONEN 🔥 */}
          <Hero data={webData} />
          <About data={webData} />
          <Services />
          <Testimonials onSeeMore={() => setShowFullReview(true)} />
        </main>
      )}

      {/* 🔥 PASSING DATA KE FOOTER 🔥 */}
      <Footer data={webData} />
    </div>
  );
}