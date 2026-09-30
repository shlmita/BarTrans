import React, { useEffect, useState } from 'react';

// 1. Wrapper Animasi untuk Kartu Produk (SUPER FAST STAGGER)
export function FadeInCard({ children, index = 0 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger instan dalam 5ms, biarkan CSS yang ngatur antreannya
    const timer = setTimeout(() => setShow(true), 5);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      // Durasi dipotong jadi 500ms (lebih snappy), jarak translate dipendekkan ke translate-y-6
      className={`h-full transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ 
        transitionDelay: `${index * 35}ms`, // Makin kecil = makin ngebut munculnya berurutan
        willChange: 'opacity, transform' 
      }}
    >
      {children}
    </div>
  );
}

// 2. Wrapper Animasi untuk Pop-up Modal (Bouncy Zoom - Fast)
export function ZoomInModal({ children, isOpen, onClose, modalClass }) {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      // Trigger modal instan
      const timer = setTimeout(() => setShow(true), 5);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      const timer = setTimeout(() => setRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!render) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        show ? 'bg-gray-900/60 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        // Modal juga dibikin lebih snappy 400ms
        className={`transform-gpu transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        } ${modalClass}`}
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </div>
    </div>
  );
}