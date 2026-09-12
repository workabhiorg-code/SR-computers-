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
    <section className="bg-white py-4 border-b border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-7 overflow-x-auto pb-2 scrollbar-none">
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
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e52e2e] flex items-center justify-center text-white font-black text-xs sm:text-sm tracking-wider shadow-sm group-hover:scale-105 transition-transform duration-200 border-2 ${
                      isSelected ? 'ring-2 ring-red-500 ring-offset-2 border-white' : 'border-transparent'
                    }`}
                  >
                    SALE
                  </div>
                ) : (
                  /* Circular product preview with subtle border and shadow matching screenshot */
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-white border flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 group-hover:border-[#0055ff] transition-all duration-200 ${
                      isSelected
                        ? 'border-[#0055ff] ring-2 ring-[#0055ff] ring-offset-2 bg-blue-50/40'
                        : 'border-gray-200 bg-white'
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
                  className={`text-[11px] sm:text-xs font-medium text-center max-w-[76px] sm:max-w-[84px] leading-tight transition-colors ${
                    isSelected
                      ? 'text-[#0055ff] font-bold'
                      : 'text-gray-700 group-hover:text-[#0055ff]'
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
