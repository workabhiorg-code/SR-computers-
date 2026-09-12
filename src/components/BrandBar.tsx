import React from 'react';
import { BRANDS } from '../data/storeData';

interface BrandBarProps {
  selectedBrand: string | null;
  onSelectBrand: (brandName: string | null) => void;
}

export const BrandBar: React.FC<BrandBarProps> = ({
  selectedBrand,
  onSelectBrand
}) => {
  return (
    <section className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section title matching screenshot */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            Explore Trusted Printer Brands
          </h2>
          {selectedBrand && (
            <button
              onClick={() => onSelectBrand(null)}
              className="text-xs font-semibold text-[#0055ff] hover:underline"
            >
              Clear filter ({selectedBrand})
            </button>
          )}
        </div>

        {/* Brand cards row matching screenshot: rounded rectangle with logo + product image + brand label */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
          {BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand.name;

            return (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(isSelected ? null : brand.name)}
                className={`flex flex-col items-center justify-between p-3 rounded-2xl border transition-all duration-200 group focus:outline-none ${
                  isSelected
                    ? 'bg-blue-50 border-[#0055ff] ring-2 ring-[#0055ff]/20 shadow-sm'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                id={`brand-card-${brand.id}`}
              >
                {/* Brand Logo Header */}
                <div className="h-6 flex items-center justify-center w-full px-2 mb-2">
                  <span className={`font-black text-sm tracking-wider uppercase ${
                    brand.name === 'Brother' ? 'text-[#00529b]' :
                    brand.name === 'Canon' ? 'text-[#c70000]' :
                    brand.name === 'Samsung' ? 'text-[#034ea2]' :
                    brand.name === 'Epson' ? 'text-[#002f6c]' :
                    brand.name === 'Ricoh' ? 'text-[#ce1126]' :
                    brand.name === 'Dell' ? 'text-[#0076ce]' :
                    brand.name === 'Lenovo' ? 'text-[#e2231a]' :
                    'text-[#0096d6]'
                  }`}>
                    {brand.name}
                  </span>
                </div>

                {/* Brand Product Image in rounded container */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center p-1.5 overflow-hidden bg-gray-50/70 group-hover:bg-white transition">
                  <img
                    src={brand.productImage}
                    alt={`${brand.name} Printer`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Brand Name at bottom */}
                <span className={`mt-2 text-xs font-semibold ${
                  isSelected ? 'text-[#0055ff]' : 'text-gray-700'
                }`}>
                  {brand.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
