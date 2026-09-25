import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export default function TestimoniCard({ data }) {
  const getServiceColor = (service) => {
    switch(service) {
      case 'Sewa Mobil': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Travel': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Jasa Angkut': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Paket Wisata': return 'bg-teal-50 text-teal-600 border-teal-200';
      case 'Penginapan': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#00437a]/30 transition-all duration-300 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={data.avatar} alt={data.name} className="w-12 h-12 rounded-full border-2 border-gray-100 group-hover:border-[#00437a] transition-colors" />
          <div>
            <h4 className="text-[#00437a] font-bold text-sm flex items-center gap-1.5">
              {data.name} <CheckCircle2 size={14} className="text-[#f26e22]" />
            </h4>
            <span className="text-gray-400 text-xs">{data.date}</span>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getServiceColor(data.service)}`}>
          {data.service}
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={14} className={`${index < data.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed flex-grow italic">"{data.comment}"</p>
    </div>
  );
}