import React, { useState, useEffect } from 'react';
import { Star, Quote, Plus } from 'lucide-react';
import axios from 'axios';
import AddTestimoniModal from './AddTestimonialModal'; 

export default function Testimonials({ onSeeMore }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = () => {
    axios.get('http://localhost:5000/api/testimoni?status=Approved')
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scrolling {
            display: flex;
            width: max-content;
            animation: infinite-scroll 35s linear infinite;
          }
          .animate-scrolling:hover {
            animation-play-state: paused;
          }
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
          .hide-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2 text-[#00437a]">What Our <span className="text-[#f26e22]">Clients Say</span></h2>
          <p className="text-gray-500 text-sm">Mereka yang sudah merasakan kemudahan perjalanan bersama kami.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2 px-5 py-3 bg-white border-2 border-[#00437a] text-[#00437a] hover:bg-[#00437a] hover:text-white text-sm font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-lg"
        >
          <div className="bg-[#00437a] text-white group-hover:bg-white group-hover:text-[#00437a] rounded-full p-1 transition-colors">
            <Plus size={14} strokeWidth={3} />
          </div>
          Tulis Ulasan
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-400 font-semibold">Belum ada ulasan yang ditampilkan.</div>
      ) : (
        <div className="w-full relative overflow-hidden -mx-4 px-4 pb-10 hide-scroll">
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none"></div>

          <div className="animate-scrolling">
            <div className="flex gap-6 pr-6">
              {reviews.map((rev, index) => (
                <div key={`set1-${rev.id}-${index}`} className="w-[300px] md:w-[380px] shrink-0 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between relative shadow-sm hover:shadow-lg hover:border-[#00437a]/30 transition-all duration-300 cursor-pointer">
                  <div className="absolute top-6 right-6 text-[#f26e22]/20"><Quote size={32} /></div>
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">"{rev.comment}"</p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <img src={rev.gambar || `https://ui-avatars.com/api/?name=${rev.nama.replace(/ /g, '+')}&background=00437a&color=fff`} alt={rev.nama} className="w-12 h-12 rounded-full object-cover border border-[#00437a]/20 shrink-0" />
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-[#00437a] text-sm truncate">{rev.nama}</h4>
                      <p className="text-xs text-gray-500 truncate">{rev.layanan} • {rev.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-6 pr-6">
              {reviews.map((rev, index) => (
                <div key={`set2-${rev.id}-${index}`} className="w-[300px] md:w-[380px] shrink-0 bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between relative shadow-sm hover:shadow-lg hover:border-[#00437a]/30 transition-all duration-300 cursor-pointer">
                  <div className="absolute top-6 right-6 text-[#f26e22]/20"><Quote size={32} /></div>
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">"{rev.comment}"</p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <img src={rev.gambar || `https://ui-avatars.com/api/?name=${rev.nama.replace(/ /g, '+')}&background=00437a&color=fff`} alt={rev.nama} className="w-12 h-12 rounded-full object-cover border border-[#00437a]/20 shrink-0" />
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-[#00437a] text-sm truncate">{rev.nama}</h4>
                      <p className="text-xs text-gray-500 truncate">{rev.layanan} • {rev.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button onClick={onSeeMore} className="group px-8 py-3.5 bg-orange-50 hover:bg-[#f26e22] border border-orange-200 hover:border-transparent text-[#f26e22] hover:text-white text-sm font-semibold rounded-full transition-all duration-300 flex items-center gap-3">
            Lihat Semua Ulasan
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      )}

      <AddTestimoniModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setTimeout(fetchReviews, 1000);
        }} 
      />
    </section>
  );
}