import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Phone, MapPin, Clock, ChevronDown, Check, X, Lock, Menu } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { NavigationDrawer } from './NavigationDrawer';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
  onOpenContact: () => void;
  onOpenGoogleProfile: () => void;
  onOpenAdmin?: () => void;
  onOpenAccount: () => void;
  onSelectCategory: (catId: string) => void;
  onOpenBudgetQuiz?: () => void;
  onOpenPhotos?: () => void;
  onOpenReviews?: () => void;
  onScrollToVideoReviews?: () => void;
  onScrollToProducts?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenTrackOrder,
  onOpenContact,
  onOpenGoogleProfile,
  onOpenAdmin,
  onOpenAccount,
  onSelectCategory,
  onOpenBudgetQuiz,
  onOpenPhotos,
  onOpenReviews,
  onScrollToVideoReviews,
  onScrollToProducts
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSupportMenu, setShowSupportMenu] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(STORE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <header className="bg-[#0055ff] text-white shadow-md sticky top-0 z-40">
      {/* Top Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2.5 pb-2.5">
        
        {/* Row 1: Mobile Hamburger + Logo + (User, Heart, Cart Action Icons) */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Hamburger Menu Button + Store Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center justify-center w-10 h-10 -ml-1 rounded-xl text-white hover:bg-white/15 active:scale-95 transition shrink-0 focus:outline-none focus:ring-2 focus:ring-white/40"
              title="Open Navigation Menu"
              aria-label="Open Navigation Menu"
              id="header-hamburger-btn"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Logo styled like REFUBB but customized for S R COMPUTER */}
            <button 
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-1.5 sm:gap-2 text-left focus:outline-none group shrink-0"
              id="header-logo-btn"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/15 flex items-center justify-center p-1 sm:p-1.5 border border-white/30 group-hover:bg-white/25 transition shadow-xs">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <path d="M20,15 L70,15 C85,15 85,45 70,45 L40,45 L75,85 L50,85 L20,50 L35,50 L35,32 L20,32 Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-white flex items-center leading-none">
                  S<span className="text-cyan-300">R</span>&nbsp;COMPUTER
                </span>
                <span className="text-[9px] tracking-wider uppercase text-blue-100 font-semibold hidden sm:block mt-0.5">
                  Retail Computers & Accessories • 4.9★
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar (hidden on mobile, shown on md+) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
            <div className="relative w-full">
              <input
                type="text"
                id="header-desktop-search-input"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for Inkjet Printer, Laptops, Toners, Accessories..."
                className="w-full pl-5 pr-11 py-2.5 rounded-full bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow-inner"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Right Action Icons: User Account, Wishlist Heart, Cart (with badge count) */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Account Icon */}
            <button
              onClick={onOpenAccount}
              className="flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center p-1.5 hover:bg-white/15 active:scale-95 rounded-full transition relative text-white"
              title="My Account"
              aria-label="My Account"
              id="header-account-btn"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Wishlist Heart Icon */}
            <button
              onClick={() => onSelectCategory('sale')}
              className="flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center p-1.5 hover:bg-white/15 active:scale-95 rounded-full transition relative text-white"
              title="Wishlist"
              aria-label="Wishlist"
              id="header-wishlist-btn"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute 1 right-1 bg-amber-400 text-gray-900 text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon with badge count */}
            <button
              onClick={onOpenCart}
              className="flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center p-1.5 hover:bg-white/15 active:scale-95 rounded-full transition relative text-white"
              title="Shopping Cart"
              aria-label="Shopping Cart"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -top-0.5 -right-0.5 bg-white text-[#0055ff] font-black text-[11px] rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Row 2: Mobile Search Bar (Matching screenshot full-width rounded pill) */}
        <div className="md:hidden mt-2.5">
          <div className="relative w-full">
            <input
              type="text"
              id="header-mobile-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for Inkjet Printer"
              className="w-full pl-4 pr-10 py-2 rounded-full bg-white text-gray-900 placeholder-gray-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow-inner"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Sub Navigation Links for Website Version - Centered & Aesthetic */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 pt-3 pb-1 overflow-x-auto text-xs sm:text-sm font-medium border-t border-white/20 mt-3 scrollbar-none">
          <button 
            onClick={() => onSelectCategory('all')} 
            className="hover:text-cyan-200 transition-colors duration-150 shrink-0 hover:underline underline-offset-4 py-1"
            id="nav-home-btn"
          >
            Home
          </button>
          
          <button 
            onClick={() => onSelectCategory('all-in-one')} 
            className="hover:text-cyan-200 transition-colors duration-150 shrink-0 hover:underline underline-offset-4 py-1"
            id="nav-printers-btn"
          >
            Printers
          </button>
          
          <button 
            onClick={() => onSelectCategory('thermal')} 
            className="hover:text-cyan-200 transition-colors duration-150 shrink-0 hover:underline underline-offset-4 py-1"
            id="nav-printer-parts-btn"
          >
            Printer Parts
          </button>

          <button 
            onClick={() => onSelectCategory('accessories')} 
            className="hover:text-cyan-200 transition-colors duration-150 shrink-0 hover:underline underline-offset-4 py-1"
            id="nav-accessories-btn"
          >
            Computer Accessories
          </button>

          <button 
            onClick={onOpenContact} 
            className="hover:text-cyan-200 transition-colors duration-150 shrink-0 hover:underline underline-offset-4 py-1"
            id="nav-about-btn"
          >
            About Us
          </button>

          {/* Contact Support Dropdown */}
          <div className="relative shrink-0">
            <button 
              onClick={() => setShowSupportMenu(!showSupportMenu)}
              className="flex items-center gap-1 hover:text-cyan-200 transition-colors duration-150 hover:underline underline-offset-4 py-1"
              id="nav-contact-dropdown-btn"
            >
              <span>Contact Support</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showSupportMenu && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-xl py-2 z-50 border border-gray-100 text-xs"
                onMouseLeave={() => setShowSupportMenu(false)}
              >
                <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
                  <p className="font-bold text-gray-900 text-sm">S R COMPUTER Support</p>
                  <p className="text-gray-500 text-[11px]">Bhubaneswar, Odisha</p>
                </div>
                
                <a 
                  href={`tel:${STORE_INFO.phone}`} 
                  className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-blue-50 text-gray-700 hover:text-[#0055ff]"
                >
                  <Phone className="w-4 h-4 text-[#0055ff]" />
                  <div>
                    <div className="font-semibold">Call Now</div>
                    <div className="text-gray-500 text-[11px]">{STORE_INFO.phone}</div>
                  </div>
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 text-left text-gray-600"
                >
                  <span>Copy Phone Number</span>
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-green-600" /> : <span className="text-[10px] text-gray-400">096581 40143</span>}
                </button>

                <div className="px-3 py-2 text-gray-500 text-[11px] border-t border-gray-100 flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{STORE_INFO.status} (Opens 10am Thu)</span>
                </div>

                <div className="px-3 py-2 text-gray-500 text-[11px] flex items-start gap-1.5 border-t border-gray-100">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span>Soubhagya Nagar, Baramunda</span>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={onOpenTrackOrder} 
            className="hover:text-cyan-200 transition-colors duration-150 shrink-0 hover:underline underline-offset-4 py-1"
            id="nav-track-btn"
          >
            Track Your Order
          </button>
        </nav>
      </div>

      {/* Slide-over Hamburger Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        cartCount={cartCount}
        onSelectCategory={onSelectCategory}
        onOpenCart={onOpenCart}
        onOpenTrackOrder={onOpenTrackOrder}
        onOpenAccount={onOpenAccount}
        onOpenContact={onOpenContact}
        onOpenBudgetQuiz={onOpenBudgetQuiz}
        onOpenPhotos={onOpenPhotos}
        onOpenReviews={onOpenReviews}
        onScrollToVideoReviews={onScrollToVideoReviews}
        onScrollToProducts={onScrollToProducts}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </header>
  );
};
