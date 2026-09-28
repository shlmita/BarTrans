import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Service'; 
import Testimonials from './Testimonials';
import Footer from './Footer';

import TestimoniPage from '../Testimoni/TestimoniPage'; 

// 🔥 1. Tangkap prop onOpenLogin dari App.jsx 🔥
export default function Beranda({ onOpenLogin }) {
  const [showFullReview, setShowFullReview] = useState(false);

  return (
    // UBAH: Background jadi Ash প্রাধান্য Gray, Teks jadi gelap
    <div className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans pb-20 md:pb-0">
      
      {/* 🔥 2. Lempar (passing) prop onOpenLogin ke Navbar 🔥 */}
      <Navbar onOpenLogin={onOpenLogin} />
      
      {showFullReview ? (
        <TestimoniPage onBack={() => setShowFullReview(false)} />
      ) : (
        <main className="max-w-7xl mx-auto px-6 lg:px-12 animate-fade-in">
          <Hero />
          <About />
          <Services />
          <Testimonials onSeeMore={() => setShowFullReview(true)} />
        </main>
      )}

      <Footer />
    </div>
  );
}