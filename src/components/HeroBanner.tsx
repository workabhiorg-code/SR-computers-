import React, { useState, useEffect } from 'react';
import { Phone, ShieldCheck, MapPin, Sparkles, ChevronRight, Award, CheckCircle2, Zap, Headphones } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface HeroBannerProps {
  onShopClick: () => void;
  onOpenGoogleProfile: () => void;
  onOpenBudgetQuiz: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopClick,
  onOpenGoogleProfile,
  onOpenBudgetQuiz
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance banner every 8s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1d5cc6] via-[#154fa8] to-[#0c3c86] text-white border-b border-blue-900 shadow-inner">
      {/* Subtle Background Watermark Tech Icons matching screenshot */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-4 left-6 w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-12 left-28 w-14 h-14 border-2 border-white rounded-xl flex items-center justify-center">
          <Award className="w-9 h-9 text-white" />
        </div>
        <div className="absolute top-6 left-52 w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <div className="absolute bottom-6 left-16 w-14 h-14 border-2 border-white rounded-lg flex items-center justify-center">
          <Zap className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 md:py-12 relative z-10">
        
        {/* SLIDE 0: Find the Right Printer & Laptop in your Budget (Matching Screenshot) */}
        {activeSlide === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center animate-in fade-in duration-300">
            
            {/* Left Column: Headline, Italic Subtitle, 3 Badges, White 'Click to Start' Button */}
            <div className="md:col-span-6 lg:col-span-7 flex flex-col items-start">
              
              {/* Store Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/15 backdrop-blur-xs rounded-full text-[11px] font-semibold text-blue-100 mb-2 border border-white/20">
                <MapPin className="w-3 h-3 text-cyan-300 shrink-0" />
                <span>S R COMPUTER • Bhubaneswar (4.9★)</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Find the right printer <br className="hidden sm:inline" />
                in <span className="text-cyan-300 underline decoration-cyan-400">your budget.</span>
              </h1>

              {/* Italic "Let us help you" matching screenshot */}
              <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-blue-100 mt-1 sm:mt-2">
                Let us help you
              </p>

              {/* 3 mini feature badges matching screenshot */}
              <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-blue-100 font-medium">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/15">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span>100% Brand Sealed</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/15">
                  <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Easy Setup</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/15">
                  <Headphones className="w-3.5 h-3.5 text-green-300 shrink-0" />
                  <span>Reliable Support</span>
                </div>
              </div>

              {/* CTA Buttons: White 'Click to Start' button matching screenshot */}
              <div className="mt-4 sm:mt-6 flex items-center gap-3">
                <button
                  onClick={onOpenBudgetQuiz}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-gray-900 font-extrabold text-xs sm:text-sm rounded-lg shadow-lg hover:bg-gray-100 active:scale-95 transition-all border border-gray-300 flex items-center gap-2 cursor-pointer"
                  id="hero-click-to-start-btn"
                >
                  <span>Click to Start</span>
                  <ChevronRight className="w-4 h-4 text-gray-900" />
                </button>

                <button
                  onClick={onShopClick}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600/80 hover:bg-blue-600 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-lg border border-white/20 transition cursor-pointer"
                  id="hero-browse-store-btn"
                >
                  Browse Store
                </button>
              </div>

            </div>

            {/* Right Column: Desk Setup with Modern Printer & Advisor */}
            <div className="md:col-span-6 lg:col-span-5 relative flex items-center justify-center pt-2 md:pt-0">
              <div className="relative w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20 shadow-2xl flex items-center justify-center">
                <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-xl overflow-hidden bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center">
                  <img
                    src="/images/hero/hero-printers.jpg"
                    alt="Multi-Function Brand New Printer"
                    className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 w-full p-2 sm:p-3 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Brother & Epson All-in-Ones</p>
                      <p className="text-[10px] text-cyan-300">Brand New • GST Bill & Warranty</p>
                    </div>
                    <span className="text-[10px] bg-green-500 text-white font-black px-2 py-0.5 rounded-full shadow-xs">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SLIDE 1: Retail Laptop & Accessories Showcase */}
        {activeSlide === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center animate-in fade-in duration-300">
            {/* Left Column */}
            <div className="md:col-span-6 lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/15 backdrop-blur-xs rounded-full text-[11px] font-semibold text-blue-100 mb-2 border border-white/20">
                <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                <span>Top Brand Laptops & Peripherals</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Laptops for Students <br className="hidden sm:inline" />
                &amp; <span className="text-cyan-300">Office Work</span>
              </h2>

              <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-blue-100 mt-1 sm:mt-2">
                Factory Sealed with Brand Warranty
              </p>

              {/* Highlights */}
              <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-blue-100 font-medium">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span>HP • Lenovo • Dell</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Free Data Transfer</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-4 sm:mt-6 flex items-center gap-3">
                <button
                  onClick={onShopClick}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-gray-900 font-extrabold text-xs sm:text-sm rounded-lg shadow-lg hover:bg-gray-100 active:scale-95 transition-all border border-gray-300 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Laptops</span>
                  <ChevronRight className="w-4 h-4 text-gray-900" />
                </button>

                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600/80 hover:bg-blue-600 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-lg border border-white/20 transition flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>

            {/* Right Column: Laptops Showcase */}
            <div className="md:col-span-6 lg:col-span-5 relative flex items-center justify-center pt-2 md:pt-0">
              <div className="relative w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20 shadow-2xl flex items-center justify-center">
                <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-xl overflow-hidden bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center">
                  <img
                    src="/images/hero/hero-laptops.jpg"
                    alt="HP & Lenovo Student Laptops"
                    className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 w-full p-2 sm:p-3 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">HP & Lenovo Thin & Light</p>
                      <p className="text-[10px] text-cyan-300">From ₹36,490 • Onsite Warranty</p>
                    </div>
                    <span className="text-[10px] bg-cyan-400 text-gray-950 font-black px-2 py-0.5 rounded-full shadow-xs">
                      Best Price
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Carousel Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
          <button
            onClick={() => setActiveSlide(0)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              activeSlide === 0 ? 'w-6 bg-white shadow' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label="Slide 1: Find the right printer in your budget"
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              activeSlide === 1 ? 'w-6 bg-white shadow' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label="Slide 2: Laptops for students"
          />
        </div>

      </div>
    </section>
  );
};
