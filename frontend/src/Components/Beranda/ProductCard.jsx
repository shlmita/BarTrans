import React from 'react';
import { FadeInCard } from '../animasi/CSSAnimasi';

export default function ProductCard({ item, activeTab, index, getPriceLabel, getButtonText, onOpenModal }) {
  return (
    <FadeInCard index={index}>
      <div className="bg-white rounded-3xl p-4 border border-gray-200 hover:border-[#00437a]/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full shadow-sm">
        <div className="relative h-48 mb-4 rounded-2xl overflow-hidden shrink-0">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover transition duration-700 hover:scale-110" />
          {item.tag && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-xs px-3 py-1 rounded-full text-[#f26e22] font-bold border border-[#f26e22]/20 shadow-sm">
              {item.tag}
            </span>
          )}
        </div>
        
        <div className="flex-grow">
            <h3 className="font-bold text-lg leading-tight text-[#00437a]">{item.title}</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">{item.desc}</p>
        </div>

        <div className="mt-auto">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-[#00437a] font-bold text-lg">{item.price}</span>
                {!item.price.includes('Mulai') && (
                  <span className="text-xs text-gray-500">{getPriceLabel(activeTab)}</span>
                )}
              </div>
            </div>
            <button 
              onClick={() => onOpenModal(item)}
              className="w-full py-3 bg-orange-50 hover:bg-[#f26e22] hover:text-white text-[#f26e22] font-semibold text-sm rounded-xl transition-all duration-300 border border-orange-200 hover:border-transparent"
            >
              {getButtonText(activeTab)}
            </button>
        </div>
      </div>
    </FadeInCard>
  );
}