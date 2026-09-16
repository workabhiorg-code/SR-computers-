import React from 'react';
import { CATEGORIES } from '../data/storeData';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section className="bg-white py-3 sm:py-4 border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="flex items-start justify-start sm:justify-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar px-2 pb-1 scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center gap-1.5 focus:outline-none group shrink-0"
                id={`category-pill-${cat.id}`}
              >
                {cat.isSale ? (
                  /* Red SALE circular badge matching screenshot */
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e52e2e] flex items-center justify-center text-white font-black text-xs sm:text-sm tracking-wider shadow-sm group-hover:scale-105 active:scale-95 transition-transform duration-150 border-2 ${
                      isSelected ? 'ring-2 ring-red-500 ring-offset-2 border-white' : 'border-transparent'
                    }`}
                  >
                    SALE
                  </div>
                ) : (
                  /* Circular product preview with light blue/gray border matching screenshot */
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-white border flex items-center justify-center overflow-hidden shadow-xs group-hover:scale-105 active:scale-95 transition-all duration-150 ${
                      isSelected
                        ? 'border-[#0055ff] ring-2 ring-[#0055ff] ring-offset-2 bg-blue-50/50'
                        : 'border-sky-300 bg-white group-hover:border-[#0055ff]'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <span
                  className={`text-[11px] sm:text-xs font-semibold text-center max-w-[76px] sm:max-w-[84px] leading-tight transition-colors ${
                    isSelected
                      ? 'text-[#0055ff] font-bold'
                      : 'text-gray-800 group-hover:text-[#0055ff]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
