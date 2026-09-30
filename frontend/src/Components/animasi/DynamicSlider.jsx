import React, { useState, useEffect } from 'react';

export default function DynamicSlider({ activeTab, setActiveTab, tabs }) {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  // Tambahan state buat ngunci klik biar ga di-spam saat animasi jalan
  const [isAnimating, setIsAnimating] = useState(false); 

  useEffect(() => {
    setInternalActiveTab(activeTab);
  }, [activeTab]);

  const baseW = 52;   
  const expW = 150;   
  const gap = 4;      
  const padding = 6;  
  const totalWidth = expW + ((tabs.length - 1) * baseW) + ((tabs.length - 1) * gap) + (padding * 2);

  const handleTabClick = (tabId) => {
    // Kalau ditab yang sama atau lagi gerak, cuekin aja
    if (tabId === internalActiveTab || isAnimating) return;

    setIsAnimating(true);
    setInternalActiveTab(tabId);
    
    // KUNCI JAWABANNYA DI SINI BOSKU:
    // Animasi CSS durasinya 500ms. Maka kita tahan React buat render komponen bawahnya
    // SELAMA 500ms juga! Biar animasinya mulus kelar dulu tanpa diganggu tugas berat render katalog.
    setTimeout(() => {
      setActiveTab(tabId);
      setIsAnimating(false);
    }, 500); 
  };

  const activeIndex = tabs.findIndex(t => t.id === internalActiveTab);

  return (
    <div className="hidden md:flex justify-center mt-8 mb-12">
      <div 
        className="bg-white/75 backdrop-blur-md rounded-full border border-gray-200 shadow-sm"
        style={{ 
          width: `${totalWidth}px`, 
          height: `${baseW + (padding * 2)}px`,
          position: 'relative' 
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const isPastActive = index > activeIndex;

          const offset = index * (baseW + gap);
          const extra = isPastActive ? (expW - baseW) : 0;
          const translateX = offset + extra;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              // translate3d memaksa browser pakai GPU murni 100%
              className={`absolute flex items-center rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
                isActive
                  ? 'bg-[#00437a] text-white shadow-md z-10' 
                  : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-[#f26e22] z-0' 
              } ${isAnimating ? 'cursor-wait pointer-events-none' : 'cursor-pointer'}`}
              style={{
                top: `${padding}px`,
                left: `${padding}px`,
                transform: `translate3d(${translateX}px, 0, 0)`, 
                width: `${isActive ? expW : baseW}px`,    
                height: `${baseW}px`,
                willChange: 'transform, width, background-color' 
              }}
            >
              <div className="absolute left-0 top-0 w-[52px] h-[52px] flex items-center justify-center">
                <span 
                  className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${isActive ? 'scale-110' : 'scale-100'}`}
                  style={{ willChange: 'transform' }}
                >
                  {tab.icon}
                </span>
              </div>

              <div
                className={`absolute left-[48px] top-0 h-[52px] flex items-center whitespace-nowrap font-semibold text-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
                  isActive
                    ? 'opacity-100 translate-x-0 delay-75'
                    : 'opacity-0 -translate-x-3 pointer-events-none'
                }`}
                style={{ willChange: 'opacity, transform' }}
              >
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}