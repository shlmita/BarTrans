import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
      <div className="flex-1 w-full relative">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400/20 blur-2xl rounded-full"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-400/20 blur-2xl rounded-full"></div>
        
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
          alt="Team collaboration" 
          className="w-full h-[280px] md:h-[350px] lg:h-[450px] object-cover rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-200 relative z-10"
        />
      </div>

      <div className="flex-1 space-y-5 md:space-y-6 text-center lg:text-left px-2 md:px-0 z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-[#00437a]">
          Crafting Memories <br className="hidden md:block" />
          Since <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f26e22] to-[#ea580c]">2015</span>
        </h2>
        
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
          Berawal dari hobi jalan-jalan, BarTrans Travel kini hadir sebagai <span className="text-[#00437a] font-semibold">travel partner</span> terpercaya buat lo yang anti-ribet dan butuh pengalaman liburan premium.
        </p>
        
        {/* UBAH: Kotak Statistik jadi terang */}
        <div className="flex justify-center lg:justify-start gap-4 md:gap-8 pt-4">
          <div className="bg-white/70 backdrop-blur-md border border-gray-200 p-4 md:p-5 rounded-2xl w-[130px] md:w-40 shadow-sm hover:border-[#00437a]/30 transition-colors">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#00437a] mb-1">
              5K<span className="text-[#f26e22]">+</span>
            </h3>
            <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-wider font-bold">Happy Travelers</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md border border-gray-200 p-4 md:p-5 rounded-2xl w-[130px] md:w-40 shadow-sm hover:border-[#00437a]/30 transition-colors">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#00437a] mb-1">
              50<span className="text-[#f26e22]">+</span>
            </h3>
            <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-wider font-bold">Destinations</p>
          </div>
        </div>
      </div>
    </section>
  );
}