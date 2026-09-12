import React from 'react';
import { X, Star, ShieldCheck, ShoppingBag, Phone, CheckCircle, Truck, RotateCcw, Award } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/storeData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleWhatsAppBuy = () => {
    const text = `Hello S R COMPUTER, I want to buy:\n*${product.name}*\nPrice: ₹${product.price.toLocaleString('en-IN')}\nCondition: ${product.condition}\nPlease confirm store pickup or delivery in Bhubaneswar/Odisha.`;
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition"
          id="close-product-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Image & Condition */}
          <div className="bg-gray-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 relative">
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#0055ff] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {product.badge}
              </span>
            )}

            <div className="w-full max-w-[260px] aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 p-3 bg-white rounded-2xl border border-gray-200 w-full text-center text-xs">
              <span className="font-bold text-gray-800">{product.condition}</span>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Certified by S R Computer Diagnostic Bench
              </p>
            </div>
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="font-bold text-[#0055ff] uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="capitalize text-gray-400">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="text-2xl font-black text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mt-4 space-y-1.5">
                <span className="text-xs font-bold text-gray-700">Highlights:</span>
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Store Guarantees */}
              <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0055ff]" />
                  <span>{product.warranty}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0055ff]" />
                  <span>Doorstep Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#0055ff]" />
                  <span>7-Day Replacement</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#0055ff]" />
                  <span>100% Genuine</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="py-2.5 px-3 bg-[#0055ff] hover:bg-[#0044cc] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow"
                  id="modal-add-to-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleWhatsAppBuy}
                  className="py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow"
                  id="modal-whatsapp-buy-btn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.09c-1.52 0-3.02-.41-4.32-1.18l-.31-.18-3.21.84.86-3.13-.2-.32a8.03 8.03 0 0 1-1.23-4.31c0-4.47 3.64-8.1 8.11-8.1 2.17 0 4.2 0.84 5.73 2.38a8.058 8.058 0 0 1 2.38 5.73c0 4.47-3.64 8.08-8.11 8.08zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42l-.48-.01c-.16 0-.42.06-.65.3-.22.24-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.23 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
                  </svg>
                  <span>WhatsApp Buy</span>
                </button>
              </div>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store: {STORE_INFO.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
