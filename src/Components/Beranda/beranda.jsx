import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Service'; 
import Testimonials from './Testimonials';
import Footer from './Footer';

import TestimoniPage from '../Testimoni/TestimoniPage'; 

export default function Beranda() {
  const [showFullReview, setShowFullReview] = useState(false);

  return (
    // UBAH: Background jadi Ash Gray, Teks jadi gelap
    <div className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans pb-20 md:pb-0">
      <Navbar />
      
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