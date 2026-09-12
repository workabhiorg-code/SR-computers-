import React from 'react';
import { X, Phone, MapPin, Clock, MessageSquare, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          id="close-contact-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0055ff] text-xs font-bold mb-2">
            <span>About S R COMPUTER</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {STORE_INFO.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Bhubaneswar's Trusted Retail Store for Brand New Laptops, Printers & Computer Accessories
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="font-bold text-gray-900">4.9 Rating</span>
          <span className="text-gray-500">• 38 Verified Reviews on Google</span>
        </div>

        <div className="mt-5 space-y-4 text-xs text-gray-700">
          
          {/* Address */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
            <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold text-gray-900 block text-sm">Store Address</span>
              <p className="text-gray-600 mt-0.5">{STORE_INFO.address}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0055ff] font-bold hover:underline inline-flex items-center gap-1 mt-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Timings */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
            <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-900 block text-sm">Hours of Operation</span>
              <p className="text-red-600 font-semibold mt-0.5">{STORE_INFO.status}</p>
              <p className="text-gray-500 mt-0.5">{STORE_INFO.hoursNote}</p>
            </div>
          </div>

          {/* Contact Numbers */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
            <Phone className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold text-gray-900 block text-sm">Direct Phone & WhatsApp</span>
              <p className="text-gray-800 font-bold text-base mt-0.5">{STORE_INFO.phone}</p>
              <div className="flex gap-2 mt-2">
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="px-3 py-1.5 bg-[#0055ff] text-white rounded-lg font-bold hover:bg-[#0044cc] transition"
                >
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20SR%20Computer`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Quality commitment */}
        <div className="mt-5 p-3 bg-blue-50 rounded-2xl text-[11px] text-blue-900 flex items-center gap-2 border border-blue-100">
          <ShieldCheck className="w-4 h-4 text-[#0055ff] shrink-0" />
          <span>
            100% brand new products with official manufacturer warranties, genuine boxed accessories, and GST tax invoices.
          </span>
        </div>

      </div>
    </div>
  );
};
