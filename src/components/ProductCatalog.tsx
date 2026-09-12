import React, { useState } from 'react';
import { Star, ShieldCheck, ShoppingBag, Eye, Check, Sparkles, Filter } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/storeData';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  selectedBrand: string | null;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onClearFilters: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  selectedBrand,
  searchQuery,
  onSelectProduct,
  onAddToCart,
  onClearFilters
}) => {
  const [filterTag, setFilterTag] = useState<'all' | 'under10k' | 'duplex' | 'wireless'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filter products based on search, category, brand, and secondary filter
  const filtered = products.filter((p) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCat) return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'sale') {
        if (!p.badge && p.originalPrice <= p.price) return false;
      } else if (p.category !== selectedCategory) {
        return false;
      }
    }

    // Brand filter
    if (selectedBrand && p.brand !== selectedBrand) {
      return false;
    }

    // Secondary sub-filters
    if (filterTag === 'under10k' && p.price > 10000) return false;
    if (filterTag === 'duplex' && p.category !== 'duplexer' && !p.features.some(f => f.toLowerCase().includes('duplex'))) return false;
    if (filterTag === 'wireless' && p.category !== 'wifi' && !p.features.some(f => f.toLowerCase().includes('wi-fi') || f.toLowerCase().includes('wireless'))) return false;

    return true;
  });

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleWhatsAppOrder = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello S R COMPUTER, I am interested in purchasing:\n*${product.name}*\nPrice: ₹${product.price.toLocaleString('en-IN')}\nStore Location: Soubhagya Nagar, Baramunda.\nPlease let me know availability.`;
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="product-catalog-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header and Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-50 text-[#0055ff] rounded-lg">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Verified Store Inventory
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Ready for immediate pickup at Soubhagya Nagar, Baramunda or fast shipping across Odisha
            </p>
          </div>

          {/* Quick Sub-Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
            <button
              onClick={() => setFilterTag('all')}
              className={`px-3 py-1.5 rounded-full transition ${
                filterTag === 'all'
                  ? 'bg-[#0055ff] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => setFilterTag('under10k')}
              className={`px-3 py-1.5 rounded-full transition ${
                filterTag === 'under10k'
                  ? 'bg-[#0055ff] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Under ₹10,000
            </button>
            <button
              onClick={() => setFilterTag('duplex')}
              className={`px-3 py-1.5 rounded-full transition ${
                filterTag === 'duplex'
                  ? 'bg-[#0055ff] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Auto-Duplex
            </button>
            <button
              onClick={() => setFilterTag('wireless')}
              className={`px-3 py-1.5 rounded-full transition ${
                filterTag === 'wireless'
                  ? 'bg-[#0055ff] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Wi-Fi Wireless
            </button>
          </div>
        </div>

        {/* Active Filter Notice */}
        {(selectedCategory !== 'all' || selectedBrand || searchQuery) && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#0055ff]" />
              <span>
                Showing filtered results {selectedCategory !== 'all' && `for category "${selectedCategory}"`}
                {selectedBrand && ` by brand "${selectedBrand}"`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
            </div>
            <button
              onClick={onClearFilters}
              className="font-bold text-[#0055ff] hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-[#0055ff] mx-auto flex items-center justify-center mb-3">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-gray-800">No products found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              We frequently receive fresh stock of brand new laptops, printers, hardware and computer accessories at our Baramunda store. Call us directly to check latest arrivals!
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={onClearFilters}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-xs font-bold rounded-xl hover:bg-gray-300"
              >
                Clear Filters
              </button>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="px-4 py-2 bg-[#0055ff] text-white text-xs font-bold rounded-xl hover:bg-[#0044cc]"
              >
                Call 096581 40143
              </a>
            </div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-[#0055ff] hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
                  id={`product-card-${product.id}`}
                >
                  {/* Top Image Box */}
                  <div className="relative bg-gray-50/70 p-4 aspect-4/3 flex items-center justify-center overflow-hidden border-b border-gray-100">
                    
                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#0055ff] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Condition Pill */}
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-gray-200 shadow-2xs">
                      {product.condition}
                    </span>

                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Quick view icon overlay on hover */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/95 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand & Rating */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span className="font-bold text-[#0055ff] tracking-wider uppercase text-[11px]">
                          {product.brand}
                        </span>
                        <div className="flex items-center gap-1 font-semibold text-gray-800">
                          <Star className="w-3 h-3 text-amber-400 fill-current" />
                          <span>{product.rating}</span>
                          <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#0055ff] transition">
                        {product.name}
                      </h3>

                      {/* Warranty tag */}
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-green-700 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        <span>{product.warranty}</span>
                      </div>

                      {/* Features mini chips */}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feat, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-baseline gap-2 mb-2.5">
                        <span className="text-lg font-extrabold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                              {discount}% OFF
                            </span>
                          </>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => handleAdd(product, e)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            addedId === product.id
                              ? 'bg-green-600 text-white'
                              : 'bg-[#0055ff] text-white hover:bg-[#0044cc]'
                          }`}
                          id={`add-cart-btn-${product.id}`}
                        >
                          {addedId === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Added
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                            </>
                          )}
                        </button>

                        {/* WhatsApp Buy / Inquiry Button */}
                        <button
                          onClick={(e) => handleWhatsAppOrder(product, e)}
                          className="py-2 px-2 rounded-xl text-xs font-bold bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition flex items-center justify-center gap-1"
                          title="Order or inquire on WhatsApp"
                          id={`whatsapp-btn-${product.id}`}
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.09c-1.52 0-3.02-.41-4.32-1.18l-.31-.18-3.21.84.86-3.13-.2-.32a8.03 8.03 0 0 1-1.23-4.31c0-4.47 3.64-8.1 8.11-8.1 2.17 0 4.2 0.84 5.73 2.38a8.058 8.058 0 0 1 2.38 5.73c0 4.47-3.64 8.08-8.11 8.08zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42l-.48-.01c-.16 0-.42.06-.65.3-.22.24-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.23 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
                          </svg>
                          <span>WhatsApp</span>
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
