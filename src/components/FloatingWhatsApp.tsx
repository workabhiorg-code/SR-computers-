import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 flex-col sm:flex-row">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="bg-white text-gray-800 text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div>
            <p className="font-bold text-gray-900">Need help with printers or accessories?</p>
            <p className="text-[11px] text-gray-500">Chat with S R COMPUTER on WhatsApp</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Action Button matching screenshot */}
      <a
        href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent("Hello S R Computer, I am visiting your website and have a query about your computers, laptops, printers, and accessories.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group focus:outline-none ring-4 ring-green-100"
        title="Chat with S R COMPUTER on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.09c-1.52 0-3.02-.41-4.32-1.18l-.31-.18-3.21.84.86-3.13-.2-.32a8.03 8.03 0 0 1-1.23-4.31c0-4.47 3.64-8.1 8.11-8.1 2.17 0 4.2 0.84 5.73 2.38a8.058 8.058 0 0 1 2.38 5.73c0 4.47-3.64 8.08-8.11 8.08zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42l-.48-.01c-.16 0-.42.06-.65.3-.22.24-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.23 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
        </svg>
      </a>
    </div>
  );
};
