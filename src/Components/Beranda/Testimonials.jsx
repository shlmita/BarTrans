import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Anindya',
    role: 'Traveler & Blogger',
    comment: 'Sewa mobil buat liburan keluarga di Jogja bener-bener gampang dan mobilnya bersih banget. Bakal langganan terus sih ini!',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    id: 2,
    name: 'Rizky Pratama',
    role: 'Pengusaha Logistik',
    comment: 'Pesan truk engkel buat pindahan kantor luar kota aman terkendali. Sopirnya profesional dan tepat waktu banget.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 3,
    name: 'Jessica Wijaya',
    role: 'Content Creator',
    comment: 'Paket wisata Bali-nya worth it banget! Gak perlu pusing mikirin itinerary, semua udah diurus rapi sama timnya.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  }
];

export default function Testimonials({ onSeeMore }) {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-2 text-[#00437a]">What Our <span className="text-[#f26e22]">Clients Say</span></h2>
        <p className="text-gray-500 text-sm">Mereka yang sudah merasakan kemudahan perjalanan bersama kami.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div 
            key={rev.id}
            className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between relative shadow-sm hover:shadow-lg hover:border-[#00437a]/30 transition-all duration-300"
          >
            <div className="absolute top-6 right-6 text-[#f26e22]/20">
              <Quote size={32} />
            </div>

            <div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">"{rev.comment}"</p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <img src={rev.img} alt={rev.name} className="w-12 h-12 rounded-full object-cover border border-[#00437a]/20" />
              <div>
                <h4 className="font-semibold text-[#00437a] text-sm">{rev.name}</h4>
                <p className="text-xs text-gray-500">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={onSeeMore}
          className="group px-8 py-3.5 bg-orange-50 hover:bg-[#f26e22] border border-orange-200 hover:border-transparent text-[#f26e22] hover:text-white text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-3"
        >
          Lihat Semua Ulasan
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}