import React from 'react';
import { Star, MapPin, Phone, Clock, Mail, ShieldCheck, Truck, Headphones, ExternalLink, Video } from 'lucide-react';
import { STORE_INFO, CATEGORIES } from '../data/storeData';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenContact: () => void;
  onOpenTrackOrder: () => void;
  onOpenGoogleProfile: () => void;
  onOpenAdmin?: () => void;
  onOpenAccount?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenContact,
  onOpenTrackOrder,
  onOpenGoogleProfile,
  onOpenAdmin,
  onOpenAccount
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Trust Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Genuine Boxed</h4>
              <p className="text-[11px] text-slate-400">Official Brand Warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Store Pickup & Dispatch</h4>
              <p className="text-[11px] text-slate-400">Baramunda & all Odisha</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Dedicated Tech Support</h4>
              <p className="text-[11px] text-slate-400">Call 096581 40143</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">4.9★ Google Rating</h4>
              <p className="text-[11px] text-slate-400">Based on 38 Google reviews</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10">
          
          {/* Col 1 & 2: Store Branding & Google info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0055ff] flex items-center justify-center p-1 text-white">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                  <path d="M20,15 L70,15 C85,15 85,45 70,45 L40,45 L75,85 L50,85 L20,50 L35,50 L35,32 L20,32 Z" />
                </svg>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                S R COMPUTER
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              S R COMPUTER is Bhubaneswar's premier retail store for brand new laptops, printers, hardware upgrades, genuine computer accessories, and authorized technical support.
            </p>

            {/* Google Rating Box */}
            <div 
              onClick={onOpenGoogleProfile}
              className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 inline-flex items-center gap-3 cursor-pointer hover:border-blue-500 transition"
            >
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div>
                <div className="text-xs font-bold text-white">4.9 on Google (38 Reviews)</div>
                <div className="text-[10px] text-slate-400">Computer accessories store</div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelectCategory(c.id)}
                    className="hover:text-white transition"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Customer Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Help & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={onOpenTrackOrder} className="hover:text-white transition">
                  Track Your Order
                </button>
              </li>
              <li>
                <a
                  href={STORE_INFO.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition inline-flex items-center gap-1"
                >
                  <span>Google Map & Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button onClick={onOpenGoogleProfile} className="hover:text-white transition">
                  Read Customer Reviews (38)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('video-reviews-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-cyan-300 text-blue-400 font-semibold transition flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Customer Video Reviews</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Contact details from Google */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Store Location
            </h4>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{STORE_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2 text-white font-semibold">
              <Phone className="w-4 h-4 text-green-400 shrink-0" />
              <a href={`tel:${STORE_INFO.phone}`} className="hover:text-green-400 transition">
                {STORE_INFO.phone}
              </a>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{STORE_INFO.status}</span>
            </div>

            <div className="pt-2">
              <a
                href={STORE_INFO.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-cyan-400 hover:underline inline-flex items-center gap-1"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} S R COMPUTER. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Soubhagya Nagar, Baramunda, Bhubaneswar, Odisha 751003</p>
            {onOpenAccount ? (
              <button
                onClick={onOpenAccount}
                className="text-slate-400 hover:text-cyan-400 transition font-semibold"
                id="footer-account-link"
              >
                My Account
              </button>
            ) : onOpenAdmin ? (
              <button
                onClick={onOpenAdmin}
                className="text-slate-400 hover:text-cyan-400 transition font-semibold"
                id="footer-admin-link"
              >
                Store Admin Portal
              </button>
            ) : null}
          </div>
        </div>

      </div>
    </footer>
  );
};
