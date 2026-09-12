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
      {/* Top Main Bar */}
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-2"
        style={{ paddingTop: '0.5cm' }}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4 pb-2">
          
          {/* Top Left: Hamburger Menu Button (Mobile/Phone ONLY) + Store Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex md:hidden min-w-[44px] min-h-[44px] items-center justify-center p-2 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 active:scale-95 text-white transition shrink-0 border border-white/25 shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-300"
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center p-1 sm:p-1.5 border border-white/25 group-hover:bg-white/20 transition">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <path d="M20,15 L70,15 C85,15 85,45 70,45 L40,45 L75,85 L50,85 L20,50 L35,50 L35,32 L20,32 Z" />
                </svg>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-base sm:text-2xl tracking-tight text-white flex items-center">
                    S<span className="text-cyan-300">R</span>&nbsp;COMPUTER
                  </span>
                </div>
                <p className="text-[10px] tracking-wider uppercase text-blue-100 font-medium hidden sm:block">
                  Retail Computers & Accessories • 4.9★
                </p>
              </div>
            </button>
          </div>

          {/* Search Bar - Responsive rounded pill */}
          <div className="flex-1 max-w-xl mx-1.5 sm:mx-6">
            <div className="relative">
              <input
                type="text"
                id="header-search-input"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-9 sm:pl-5 sm:pr-11 py-2 rounded-full bg-white text-gray-800 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 shadow-inner"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Right Action Icons: Account, Wishlist, Cart (with badge), WhatsApp */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            {/* Account Icon (Desktop/Tablet) */}
            <button
              onClick={onOpenAccount}
              className="hidden sm:flex min-w-[40px] min-h-[40px] items-center justify-center p-1.5 hover:bg-white/10 rounded-full transition relative text-white"
              title="My Account"
              id="header-account-btn"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Wishlist Heart Icon (Desktop/Tablet) */}
            <button
              onClick={() => onSelectCategory('sale')}
              className="hidden sm:flex min-w-[40px] min-h-[40px] items-center justify-center p-1.5 hover:bg-white/10 rounded-full transition relative text-white"
              title="Wishlist"
              id="header-wishlist-btn"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* WhatsApp Icon */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent("Hello S R Computer, I would like to inquire about your computers, laptops, printers, and accessories.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[40px] min-h-[40px] items-center justify-center p-2 hover:bg-white/10 rounded-full transition text-white hover:text-green-300 active:scale-95"
              title="Chat on WhatsApp"
              id="header-whatsapp-link"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.09c-1.52 0-3.02-.41-4.32-1.18l-.31-.18-3.21.84.86-3.13-.2-.32a8.03 8.03 0 0 1-1.23-4.31c0-4.47 3.64-8.1 8.11-8.1 2.17 0 4.2 0.84 5.73 2.38a8.058 8.058 0 0 1 2.38 5.73c0 4.47-3.64 8.08-8.11 8.08zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42l-.48-.01c-.16 0-.42.06-.65.3-.22.24-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.23 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
              </svg>
            </a>

            {/* Cart Icon with badge count */}
            <button
              onClick={onOpenCart}
              className="flex min-w-[44px] min-h-[44px] items-center justify-center p-2 hover:bg-white/10 active:scale-95 rounded-full transition relative text-white"
              title="View Cart"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute 1 right-1 bg-white text-[#0055ff] font-black text-[11px] rounded-full w-4 h-4 flex items-center justify-center shadow">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Sub Navigation Links for Website Version - Centered & Aesthetic */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 py-2 overflow-x-auto text-xs sm:text-sm font-medium border-t border-white/85 scrollbar-none">
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
