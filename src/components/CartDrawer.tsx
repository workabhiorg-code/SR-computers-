import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/storeData';
import { addStoredOrder } from '../services/storeStorage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderPlaced?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced
}) => {
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    // Save order record to store storage
    addStoredOrder({
      customerName: customerName || undefined,
      customerPhone: customerPhone || undefined,
      deliveryType,
      items: [...items],
      totalAmount,
      status: 'Pending',
      notes: `Ordered via WhatsApp cart checkout (${deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'})`
    });

    if (onOrderPlaced) {
      onOrderPlaced();
    }

    let text = `*NEW ORDER - S R COMPUTER*\n`;
    if (customerName) text += `Customer: ${customerName}\n`;
    if (customerPhone) text += `Contact: ${customerPhone}\n`;
    text += `Fulfillment: ${deliveryType === 'pickup' ? 'Store Pickup (Baramunda)' : 'Home Delivery'}\n\n`;
    text += `*Ordered Items:*\n`;

    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n`;
    });

    text += `\n*Grand Total: ₹${totalAmount.toLocaleString('en-IN')}*\n`;
    text += `Store Address: Soubhagya Nagar, Baramunda, Bhubaneswar, Odisha 751003\n`;
    text += `Please confirm my order and send payment details.`;

    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#0055ff] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-bold text-lg">Your Cart ({items.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white transition"
              id="close-cart-btn"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-blue-50 text-[#0055ff] rounded-full mx-auto flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-800 text-base">Your cart is empty</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Explore our brand new laptops, printers, hardware and computer accessories.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2 bg-[#0055ff] text-white text-xs font-bold rounded-xl hover:bg-[#0044cc] transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-xs text-gray-500 font-medium">Items from S R Computer</span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Clear all
                  </button>
                </div>

                {items.map((item) => (
                  <div key={item.product.id} className="pt-4 flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain bg-gray-50 rounded-xl border border-gray-200 p-1 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-xs text-gray-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-500">{item.product.brand} • {item.product.condition}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-black text-xs text-gray-900">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-gray-100 text-gray-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-gray-100 text-gray-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Fulfillment options */}
                <div className="pt-4 space-y-2">
                  <label className="block text-xs font-bold text-gray-700">Fulfillment Method:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                        deliveryType === 'pickup'
                          ? 'border-[#0055ff] bg-blue-50 text-[#0055ff]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Store Pickup (Free)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                        deliveryType === 'delivery'
                          ? 'border-[#0055ff] bg-blue-50 text-[#0055ff]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      <span>Doorstep Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Optional Customer info for WhatsApp */}
                <div className="pt-3 space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone Number (Optional)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout button */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500">Subtotal:</span>
                <span className="font-extrabold text-xl text-gray-900">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-[11px] text-green-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Includes Official Brand Manufacturer Warranty & GST Invoice</span>
              </div>

              {/* Instant WhatsApp Order */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                id="cart-checkout-whatsapp-btn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.09c-1.52 0-3.02-.41-4.32-1.18l-.31-.18-3.21.84.86-3.13-.2-.32a8.03 8.03 0 0 1-1.23-4.31c0-4.47 3.64-8.1 8.11-8.1 2.17 0 4.2 0.84 5.73 2.38a8.058 8.058 0 0 1 2.38 5.73c0 4.47-3.64 8.08-8.11 8.08zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42l-.48-.01c-.16 0-.42.06-.65.3-.22.24-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.23 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
                </svg>
                <span>Checkout via WhatsApp</span>
              </button>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store to Order: {STORE_INFO.phone}</span>
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
