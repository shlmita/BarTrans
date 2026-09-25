import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 pt-28 pb-12 lg:pt-32 lg:pb-20">
      <div className="flex-1 space-y-5 md:space-y-6 text-center lg:text-left px-2 md:px-0">
        
        {/* UBAH: Badge dengan background transparan gelap */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/5 border border-black/10 text-[10px] md:text-xs font-medium w-max mx-auto lg:mx-0 shadow-sm text-gray-700">
          <span>✈️</span> Indonesia's Finest
        </div>
        
        {/* UBAH: Judul utama warna gelap */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#00437a]">
          Redefine Your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f26e22] to-[#ea580c]">Travel Experience.</span>
        </h1>
        
        <p className="text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 text-sm md:text-base">
          Momen liburan itu mahal, jangan sampai dirusak itinerary yang berantakan. Biar kami yang atur, kamu tinggal nikmati perjalanannya.
        </p>
        
        <div className="pt-2">
          <button className="px-7 py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-[#f26e22] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] transition-all rounded-full font-semibold shadow-[0_5px_15px_rgba(242,110,34,0.3)] hover:shadow-[0_8px_20px_rgba(242,110,34,0.4)] hover:scale-105 active:scale-95 text-sm md:text-base text-white">
            Eksplor Sekarang ➔
          </button>
        </div>
      </div>
      
      <div className="flex-1 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00437a]/20 to-transparent rounded-[2rem] md:rounded-[3rem] blur-2xl -z-10 animate-pulse"></div>
        <img 
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4" 
          alt="Bali Temple" 
          className="w-full h-[320px] md:h-[450px] lg:h-[600px] object-cover rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-200 relative z-10"
        />
      </div>
    </section>
  );
}