import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderQuery, setOrderQuery] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative p-6">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          id="close-track-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-blue-50 text-[#0055ff] rounded-xl">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Track Your Order</h3>
            <p className="text-xs text-gray-500">S R COMPUTER Dispatch & Store Pickup</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Order ID or Mobile Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="e.g. SRC-8921 or 9658140143"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0055ff]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#0055ff] text-white text-xs font-bold rounded-lg hover:bg-[#0044cc] transition"
              >
                Track
              </button>
            </div>
          </div>
        </form>

        {searched ? (
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-4 animate-in fade-in">
            <div className="flex justify-between items-start pb-2 border-b border-gray-200">
              <div>
                <span className="text-[11px] font-bold text-[#0055ff]">ORDER #{orderQuery.toUpperCase() || 'SRC-9402'}</span>
                <p className="text-xs font-bold text-gray-800 mt-0.5">HP / Brother Laser Printer & Toner</p>
              </div>
              <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                Ready for Pickup
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800">Diagnostic Check Passed</div>
                  <div className="text-[10px] text-gray-400">Tested 50 pages nozzle & auto-duplex</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800">Boxed with Warranty Card</div>
                  <div className="text-[10px] text-gray-400">Power cord and USB cable included</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800">Ready at Soubhagya Nagar Counter</div>
                  <div className="text-[10px] text-gray-400">Baramunda, Bhubaneswar • Call before arrival</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
              <span className="text-gray-500">Need help?</span>
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="text-[#0055ff] font-bold hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {STORE_INFO.phone}</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs text-blue-900 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0055ff]" />
              <span>Direct Store Pickup Point:</span>
            </p>
            <p className="text-slate-600">
              {STORE_INFO.address}
            </p>
            <p className="text-[11px] text-slate-500 pt-1">
              Store Timings: {STORE_INFO.hoursNote} ({STORE_INFO.status})
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
