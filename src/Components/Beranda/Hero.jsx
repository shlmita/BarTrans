import React from 'react';

export default function Hero({ data }) {
  return (
    // 🔥 UBAH DI SINI: Tambahkan pt-32 lg:pt-40 untuk mendorong konten ke bawah
    <section className="pt-32 lg:pt-40 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20 py-12 md:py-20 relative min-h-[90vh]">
      
      {/* TEKS KIRI */}
      <div className="flex-1 space-y-6 text-center lg:text-left z-10 mt-6 lg:mt-0">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-[#00437a] text-xs font-bold tracking-widest uppercase mb-2">
          {data?.hero_badge || "Indonesia's Finest"}
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#00437a] leading-[1.1]">
          {data?.hero_heading1 || "Redefine Your"}<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f26e22] to-[#ea580c]">
            {data?.hero_heading2 || "Travel Experience."}
          </span>
        </h1>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
          {data?.hero_subtext || "Momen liburan itu mahal, jangan sampai dirusak itinerary yang berantakan. Biar kami yang atur, kamu tinggal nikmati perjalanannya."}
        </p>

        <div className="pt-4 flex justify-center lg:justify-start">
          <a href="#services" className="bg-gradient-to-r from-[#f26e22] to-[#f58b4c] text-white px-8 py-4 rounded-xl font-bold shadow-[0_10px_30px_rgba(242,110,34,0.3)] hover:-translate-y-1 transition-all">
            {data?.hero_btnText || "Eksplor Sekarang"}
          </a>
        </div>
      </div>

      {/* GAMBAR KANAN */}
      <div className="flex-1 w-full relative">
        <div className="absolute top-10 right-10 w-48 h-48 bg-orange-400/20 blur-3xl rounded-full"></div>
        <img 
          src={data?.hero_gambar || "https://images.unsplash.com/photo-1501785888041-af3ef285b470"} 
          alt="Travel Hero" 
          className="w-full aspect-square object-cover rounded-[3rem] shadow-2xl relative z-10 border-4 border-white"
        />
      </div>
    </section>
  );
}