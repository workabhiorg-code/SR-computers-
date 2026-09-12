import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  X,
  Laptop,
  Printer,
  Droplet,
  Keyboard,
  HardDrive,
  Sparkles,
  Video,
  Compass,
  Image as ImageIcon,
  Star,
  PackageCheck,
  User,
  ShoppingBag,
  Phone,
  MessageSquare,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Search,
  Tag,
  Clock,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  onSelectCategory: (categoryId: string) => void;
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
  onOpenAccount: () => void;
  onOpenContact: () => void;
  onOpenBudgetQuiz?: () => void;
  onOpenPhotos?: () => void;
  onOpenReviews?: () => void;
  onScrollToVideoReviews?: () => void;
  onScrollToProducts?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  cartCount,
  onSelectCategory,
  onOpenCart,
  onOpenTrackOrder,
  onOpenAccount,
  onOpenContact,
  onOpenBudgetQuiz,
  onOpenPhotos,
  onOpenReviews,
  onScrollToVideoReviews,
  onScrollToProducts,
  searchQuery = '',
  onSearchChange
}) => {
  const [internalSearch, setInternalSearch] = useState(searchQuery);

  // Sync internal search with external search
  useEffect(() => {
    setInternalSearch(searchQuery);
  }, [searchQuery]);

  // Handle Escape key to go back / close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Helper to execute destination action and close menu smoothly
  const navigateTo = (action: () => void) => {
    onClose();
    setTimeout(() => {
      action();
    }, 120);
  };

  const handleCategoryClick = (catId: string) => {
    navigateTo(() => {
      onSelectCategory(catId);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(internalSearch);
    }
    navigateTo(() => {
      if (onScrollToProducts) {
        onScrollToProducts();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
      {/* Dark backdrop with smooth fade */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Slide-over Drawer panel - Optimized for phone screen widths */}
      <aside
        className="fixed inset-y-0 left-0 max-w-[88vw] sm:max-w-sm w-full flex pr-4 z-50 overscroll-contain"
        aria-label="Mobile Navigation Menu"
      >
        <div className="w-full bg-white text-gray-800 shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-left duration-250 border-r border-gray-200">
          
          {/* Top Header with prominent Mobile Back Button and Brand Bar */}
          <div className="p-4 bg-gradient-to-r from-blue-700 via-[#0055ff] to-blue-600 text-white shrink-0 shadow-md">
            
            {/* Top Row: Back Button (44px min touch target) + Quick Cart + Close */}
            <div className="flex items-center justify-between gap-2 mb-3">
              {/* Prominent Back Button */}
              <button
                onClick={onClose}
                className="flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white text-xs font-bold transition border border-white/25 shadow-xs focus:outline-none focus:ring-2 focus:ring-white"
                id="drawer-back-btn"
                title="Go back to store"
                aria-label="Go back to store"
              >
                <ArrowLeft className="w-4 h-4 text-white shrink-0" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-1 sm:gap-2">
                {/* Cart Shortcut */}
                <button
                  onClick={() => navigateTo(onOpenCart)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white transition relative"
                  title="Cart"
                  aria-label="View Shopping Cart"
                  id="drawer-cart-quick-btn"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute 1 right-1 bg-amber-400 text-gray-900 text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white transition focus:outline-none"
                  title="Close Menu"
                  aria-label="Close Menu"
                  id="drawer-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Store Branding inside Mobile Drawer */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center p-2 border border-white/25 shadow-inner shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <path d="M20,15 L70,15 C85,15 85,45 70,45 L40,45 L75,85 L50,85 L20,50 L35,50 L35,32 L20,32 Z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                  <span>S R COMPUTER</span>
                  <span className="text-[10px] bg-amber-400 text-gray-900 font-black px-1.5 py-0.5 rounded-full shrink-0">
                    4.9 ★
                  </span>
                </h3>
                <p className="text-[11px] text-blue-100 flex items-center gap-1 mt-0.5 truncate">
                  <Clock className="w-3 h-3 text-cyan-300 shrink-0" />
                  <span>Open: 10:00 AM - 9:00 PM</span>
                </p>
              </div>
            </div>

            {/* In-Drawer Quick Search for Mobile */}
            {onSearchChange && (
              <form onSubmit={handleSearchSubmit} className="mt-3 relative">
                <input
                  type="text"
                  value={internalSearch}
                  onChange={(e) => {
                    setInternalSearch(e.target.value);
                    onSearchChange(e.target.value);
                  }}
                  placeholder="Search laptops, printers, toner..."
                  className="w-full pl-9 pr-9 py-2 bg-white/15 text-white placeholder-blue-200 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300 border border-white/20"
                  id="drawer-search-input"
                />
                <Search className="w-3.5 h-3.5 text-blue-200 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {internalSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setInternalSearch('');
                      onSearchChange('');
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </form>
            )}
          </div>

          {/* Quick Access Strip: Account, Orders, Support */}
          <div className="bg-blue-50/90 px-3 py-2 border-b border-blue-100 grid grid-cols-2 gap-2 text-xs shrink-0">
            <button
              onClick={() => navigateTo(onOpenAccount)}
              className="min-h-[40px] flex items-center justify-center gap-1.5 font-bold text-[#0055ff] hover:bg-white active:scale-95 rounded-lg px-2 py-1.5 bg-white/70 shadow-2xs border border-blue-100/60 transition"
              id="drawer-account-link"
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">My Account</span>
            </button>
            
            <button
              onClick={() => navigateTo(onOpenTrackOrder)}
              className="min-h-[40px] flex items-center justify-center gap-1.5 font-bold text-gray-700 hover:bg-white active:scale-95 rounded-lg px-2 py-1.5 bg-white/70 shadow-2xs border border-blue-100/60 transition"
              id="drawer-track-link"
            >
              <PackageCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">Track Order</span>
            </button>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 divide-y divide-gray-100 scroll-smooth">
            
            {/* 1. PRODUCT CATEGORIES */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 mb-1.5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                  Shop Products & Categories
                </p>
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="text-xs font-bold text-[#0055ff] hover:underline"
                >
                  View All
                </button>
              </div>

              {/* All Inventory */}
              <button
                onClick={() => handleCategoryClick('all')}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.99] text-gray-800 hover:text-[#0055ff] transition text-left group"
                id="menu-opt-all-products"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0055ff] flex items-center justify-center group-hover:bg-[#0055ff] group-hover:text-white transition shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none">All Store Inventory</p>
                    <p className="text-[10px] text-gray-500 mt-1">Full catalog with live prices</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0055ff] shrink-0" />
              </button>

              {/* Brand Laptops */}
              <button
                onClick={() => handleCategoryClick('laptops')}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.99] text-gray-800 hover:text-[#0055ff] transition text-left group"
                id="menu-opt-laptops"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition shrink-0">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none">Brand Laptops & Notebooks</p>
                    <p className="text-[10px] text-gray-500 mt-1">HP, Lenovo, ASUS, Dell Official</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0055ff] shrink-0" />
              </button>

              {/* All-in-One & Laser Printers */}
              <button
                onClick={() => handleCategoryClick('all-in-one')}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.99] text-gray-800 hover:text-[#0055ff] transition text-left group"
                id="menu-opt-printers-allinone"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition shrink-0">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none">All-in-One Printers</p>
                    <p className="text-[10px] text-gray-500 mt-1">Print, Scan, Copy & Auto-Duplex</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0055ff] shrink-0" />
              </button>

              {/* Ink Tank Printers */}
              <button
                onClick={() => handleCategoryClick('inktank')}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.99] text-gray-800 hover:text-[#0055ff] transition text-left group"
                id="menu-opt-inktank"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition shrink-0">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none">Ink Tank Color Wi-Fi Printers</p>
                    <p className="text-[10px] text-gray-500 mt-1">Epson EcoTank & Canon MegaTank</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0055ff] shrink-0" />
              </button>

              {/* Original Toners & Cartridges */}
              <button
                onClick={() => handleCategoryClick('toners')}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.99] text-gray-800 hover:text-[#0055ff] transition text-left group"
                id="menu-opt-toners"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-700 group-hover:text-white transition shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none">Original Toners & Inks</p>
                    <p className="text-[10px] text-gray-500 mt-1">Genuine HP, Brother, Epson supplies</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0055ff] shrink-0" />
              </button>

              {/* Peripherals & Accessories */}
              <button
                onClick={() => handleCategoryClick('accessories')}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.99] text-gray-800 hover:text-[#0055ff] transition text-left group"
                id="menu-opt-accessories"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition shrink-0">
                    <Keyboard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none">Keyboards & Accessories</p>
                    <p className="text-[10px] text-gray-500 mt-1">Combos, mice, cables & adapters</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0055ff] shrink-0" />
              </button>

              {/* SSD & RAM Upgrades */}
              <button
                onClick={() => handleCategoryClick('storage')}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.99] text-gray-800 hover:text-[#0055ff] transition text-left group"
                id="menu-opt-storage"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition shrink-0">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none">SSDs, RAM & Storage</p>
                    <p className="text-[10px] text-gray-500 mt-1">Crucial, Kingston & Western Digital</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0055ff] shrink-0" />
              </button>

              {/* Special Deals & Clearance */}
              <button
                onClick={() => handleCategoryClick('sale')}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-red-50 active:bg-red-100 active:scale-[0.99] text-gray-800 hover:text-red-600 transition text-left group"
                id="menu-opt-deals"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none flex items-center gap-1.5 text-red-600">
                      <span>Special Deals & Clearance</span>
                      <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded-full uppercase">
                        Hot
                      </span>
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">Discounted festival prices</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 shrink-0" />
              </button>
            </div>

            {/* 2. STORE HIGHLIGHTS & DISCOVERY */}
            <div className="pt-3 space-y-1">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-2 mb-1.5">
                Highlights & Customer Showcase
              </p>

              {/* Smart Budget Quiz */}
              {onOpenBudgetQuiz && (
                <button
                  onClick={() => navigateTo(onOpenBudgetQuiz)}
                  className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 active:bg-emerald-100 active:scale-[0.99] text-gray-800 hover:text-emerald-700 transition text-left group"
                  id="menu-opt-budget-finder"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold leading-none">Smart Device Finder</p>
                      <p className="text-[10px] text-gray-500 mt-1">Pick best laptop/printer for budget</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 shrink-0" />
                </button>
              )}

              {/* Customer Video Reviews & Unboxings */}
              <button
                onClick={() => {
                  navigateTo(() => {
                    if (onScrollToVideoReviews) {
                      onScrollToVideoReviews();
                    } else {
                      const el = document.getElementById('video-reviews-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  });
                }}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-rose-50 active:bg-rose-100 active:scale-[0.99] text-gray-800 hover:text-rose-600 transition text-left group"
                id="menu-opt-video-reviews"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none">Customer Video Reviews</p>
                    <p className="text-[10px] text-gray-500 mt-1">Real unboxings & customer talks</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 shrink-0" />
              </button>

              {/* Store Tour & Photos */}
              {onOpenPhotos && (
                <button
                  onClick={() => navigateTo(onOpenPhotos)}
                  className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-cyan-50 active:bg-cyan-100 active:scale-[0.99] text-gray-800 hover:text-cyan-700 transition text-left group"
                  id="menu-opt-store-photos"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition shrink-0">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold leading-none">Store Tour & Real Photos</p>
                      <p className="text-[10px] text-gray-500 mt-1">Our Baramunda retail showroom</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-600 shrink-0" />
                </button>
              )}

              {/* Google 4.9★ Reviews */}
              {onOpenReviews && (
                <button
                  onClick={() => navigateTo(onOpenReviews)}
                  className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-amber-50 active:bg-amber-100 active:scale-[0.99] text-gray-800 hover:text-amber-700 transition text-left group"
                  id="menu-opt-google-reviews"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition shrink-0">
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold leading-none flex items-center gap-1">
                        <span>Google Reviews</span>
                        <span className="text-xs text-amber-600 font-extrabold">4.9 ★ (38)</span>
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">Verified customer ratings</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 shrink-0" />
                </button>
              )}

              {/* Store Location */}
              <button
                onClick={() => navigateTo(onOpenContact)}
                className="w-full min-h-[46px] flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 active:bg-blue-100 active:scale-[0.99] text-gray-800 hover:text-[#0055ff] transition text-left group"
                id="menu-opt-contact-store"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0055ff] flex items-center justify-center group-hover:bg-[#0055ff] group-hover:text-white transition shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none">Visit Retail Store</p>
                    <p className="text-[10px] text-gray-500 mt-1">Soubhagya Nagar, Baramunda</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0055ff] shrink-0" />
              </button>
            </div>

          </div>

          {/* Sticky Mobile Bottom Dock with 1-Tap WhatsApp & Call */}
          <div className="p-3 bg-white border-t border-gray-200 shrink-0 shadow-lg space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent('Hello S R COMPUTER, I am contacting you from your mobile website. I need assistance regarding a laptop/printer.')}`}
                target="_blank"
                rel="noreferrer"
                className="min-h-[46px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold text-xs shadow-xs transition"
                id="drawer-bottom-whatsapp"
              >
                <MessageSquare className="w-4 h-4 shrink-0 fill-white" />
                <span className="truncate">WhatsApp</span>
              </a>

              {/* Call Store Button */}
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="min-h-[46px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0055ff] hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-xs transition"
                id="drawer-bottom-call"
              >
                <Phone className="w-4 h-4 shrink-0 fill-white" />
                <span className="truncate">Call Store</span>
              </a>
            </div>

            {/* Official Trust Footnote */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span>100% Brand Sealed • GST Bill &amp; Warranty</span>
            </div>
          </div>

        </div>
      </aside>
    </div>
  );
};
