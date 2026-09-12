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

  // Auto-advance banner every 7s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-sky-50 to-blue-100 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-14">
        
        {/* SLIDE 0: Retail Computer Store - Bhubaneswar */}
        {activeSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-in fade-in duration-500">
            {/* Left Hero Text matching exact layout and typography */}
            <div className="lg:col-span-5 flex flex-col items-start z-10">
              {/* Store Location Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-[#0055ff] mb-3 shadow-xs border border-blue-200">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>S R COMPUTER • Bhubaneswar (4.9★)</span>
              </div>

              {/* Primary SEO Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0055ff] tracking-tight leading-tight">
                Bhubaneswar’s Trusted
                <span className="sr-only"> Retail Computers, Laptops, Printers &amp; Accessories Store - S R COMPUTER</span>
              </h1>

              {/* "Retail Computers & Printers Store" Pill */}
              <div className="mt-2.5 inline-block px-4 py-1.5 bg-blue-50/90 border border-blue-200 rounded-full text-lg sm:text-2xl font-bold text-[#0055ff] shadow-xs">
                Retail Computers & Accessories
              </div>

              {/* Value Proposition */}
              <p className="mt-3.5 text-base sm:text-xl font-medium text-slate-700 tracking-wide">
                100% Brand New. Genuine Warranty. Best Prices.
              </p>

              {/* Google Rating Highlights */}
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={onOpenGoogleProfile}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#0055ff] bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs transition"
                >
                  <span className="text-amber-500 font-bold">★★★★★ 4.9</span>
                  <span>(38 Google Reviews)</span>
                </button>
                <div className="flex items-center gap-1 text-xs text-green-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Official Brand Warranty</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={onShopClick}
                  className="px-7 py-3 bg-white hover:bg-blue-50 text-[#0055ff] font-bold text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg border border-blue-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                  id="hero-print-smart-btn"
                >
                  <span>Explore Catalog</span>
                  <ChevronRight className="w-5 h-5 text-[#0055ff]" />
                </button>

                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="px-5 py-3 bg-[#0055ff] hover:bg-[#0044cc] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md transition flex items-center gap-2"
                  id="hero-call-store-btn"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>

            {/* Right Product Showcase: Multi-tiered podium setup */}
            <div className="lg:col-span-7 relative flex items-center justify-center pt-4 lg:pt-0">
              <div className="relative w-full max-w-2xl">
                <div className="relative bg-gradient-to-b from-blue-50/80 to-white p-4 sm:p-6 rounded-3xl border border-blue-200/70 shadow-xl backdrop-blur-xs">
                  
                  {/* Visual arrangement of laptops and printers */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 items-end">
                    
                    {/* Left: HP Laptop */}
                    <div className="flex flex-col items-center group">
                      <div className="relative bg-white rounded-2xl p-2 sm:p-3 shadow-md border border-gray-100 w-full transition-transform group-hover:scale-105">
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          HP
                        </div>
                        <img
                          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80"
                          alt="HP Brand New Laptop"
                          className="w-full h-24 sm:h-36 object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="w-full h-8 sm:h-12 bg-blue-100 rounded-b-xl -mt-2 flex items-center justify-center shadow-inner text-center px-1">
                        <span className="text-[10px] sm:text-xs font-bold text-blue-900">HP 15s Thin & Light</span>
                      </div>
                    </div>

                    {/* Center: Brother All-in-One (Elevated) */}
                    <div className="flex flex-col items-center -translate-y-2 sm:-translate-y-4 group">
                      <div className="relative bg-white rounded-2xl p-2 sm:p-3 shadow-lg border-2 border-[#0055ff]/30 w-full transition-transform group-hover:scale-105">
                        <div className="absolute top-2 left-2 bg-[#0055ff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Brother
                        </div>
                        <div className="absolute top-2 right-2 bg-amber-400 text-gray-900 text-[9px] font-black px-1.5 py-0.5 rounded">
                          Bestseller
                        </div>
                        <img
                          src="https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&auto=format&fit=crop&q=80"
                          alt="Brother Auto-Duplex Printer"
                          className="w-full h-28 sm:h-44 object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="w-full h-10 sm:h-14 bg-[#0055ff] rounded-b-xl -mt-2 flex flex-col items-center justify-center text-white shadow-md text-center px-1">
                        <span className="text-[10px] sm:text-xs font-bold">Auto Duplex Laser</span>
                        <span className="text-[9px] text-blue-200 hidden sm:inline">1 Year Brand Warranty</span>
                      </div>
                    </div>

                    {/* Right: Epson EcoTank */}
                    <div className="flex flex-col items-center group">
                      <div className="relative bg-white rounded-2xl p-2 sm:p-3 shadow-md border border-gray-100 w-full transition-transform group-hover:scale-105">
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Epson
                        </div>
                        <img
                          src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&auto=format&fit=crop&q=80"
                          alt="Epson EcoTank Color Printer"
                          className="w-full h-24 sm:h-36 object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="w-full h-8 sm:h-12 bg-blue-100 rounded-b-xl -mt-2 flex items-center justify-center shadow-inner text-center px-1">
                        <span className="text-[10px] sm:text-xs font-bold text-blue-900">Epson EcoTank L3210</span>
                      </div>
                    </div>

                  </div>

                  {/* Trust guarantee banner below podiums */}
                  <div className="mt-4 pt-3 border-t border-blue-200 flex items-center justify-around text-center">
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#0055ff]" />
                      <span>100% Genuine Boxed</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                      <Award className="w-4 h-4 text-[#0055ff]" />
                      <span>Manufacturer Warranty</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                      <Sparkles className="w-4 h-4 text-[#0055ff]" />
                      <span>Free Demo & Setup</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 1: Find the right laptop or printer in your budget */}
        {activeSlide === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-in fade-in duration-500">
            {/* Left Column */}
            <div className="lg:col-span-6 flex flex-col items-start z-10">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Smart Retail Tech Advisor</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Find the <span className="text-[#0055ff]">right device</span> in <span className="underline decoration-blue-500">your budget</span>.
              </h2>

              <p className="text-2xl sm:text-3xl font-serif italic text-slate-700 mt-2">
                Let us help you choose
              </p>

              {/* 3 feature badges: Brand New Sealed, Easy Setup, Reliable Support */}
              <div className="mt-5 grid grid-cols-3 gap-3 w-full max-w-md">
                <div className="flex items-center gap-2 p-2.5 bg-white/90 rounded-xl border border-blue-200 text-xs font-bold text-gray-800 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#0055ff] shrink-0" />
                  <span>100% Brand New</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-white/90 rounded-xl border border-blue-200 text-xs font-bold text-gray-800 shadow-2xs">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>On-Spot Demo</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-white/90 rounded-xl border border-blue-200 text-xs font-bold text-gray-800 shadow-2xs">
                  <Headphones className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Retail Support</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 sm:mt-8 flex items-center gap-3">
                <button
                  onClick={onOpenBudgetQuiz}
                  className="px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-900 font-extrabold text-base sm:text-lg rounded-2xl shadow-lg border-2 border-gray-800 transition-transform transform hover:scale-105 flex items-center gap-2"
                  id="hero-click-to-start-btn"
                >
                  <span>Find My Device</span>
                  <ChevronRight className="w-5 h-5 text-gray-900" />
                </button>

                <button
                  onClick={onShopClick}
                  className="px-6 py-3.5 bg-[#0055ff] hover:bg-[#0044cc] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md transition"
                >
                  Browse Retail Store
                </button>
              </div>

            </div>

            {/* Right Column: Laptops and Printers showcase */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-xl bg-white/80 rounded-3xl p-6 border border-blue-200 shadow-xl backdrop-blur-xs flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 flex flex-col items-center">
                  <img
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80"
                    alt="Brand New Laptop"
                    className="w-full h-44 object-contain rounded-xl"
                  />
                  <span className="text-xs font-bold text-gray-800 mt-2 text-center">HP & Lenovo Student Laptops</span>
                  <span className="text-[11px] text-green-700 font-semibold">From ₹35,990 with Brand Warranty</span>
                </div>

                <div className="w-full sm:w-1/2 space-y-2 border-t sm:border-t-0 sm:border-l border-blue-100 pt-4 sm:pt-0 sm:pl-4 text-xs text-gray-600">
                  <div className="font-bold text-gray-900 text-sm">Why Bhubaneswar Chooses Us:</div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                    <span>Brand new factory-sealed units with GST invoice</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                    <span>Expert advice to choose the best laptop for studies</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                    <span>Doorstep delivery across Odisha or Baramunda pickup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Carousel Dots indicator matching screenshot */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveSlide(0)}
            className={`h-2.5 rounded-full transition-all ${
              activeSlide === 0 ? 'w-8 bg-[#0055ff] shadow' : 'w-2.5 bg-blue-300 hover:bg-blue-400'
            }`}
            aria-label="Slide 1: India's Most Trusted"
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`h-2.5 rounded-full transition-all ${
              activeSlide === 1 ? 'w-8 bg-[#0055ff] shadow' : 'w-2.5 bg-blue-300 hover:bg-blue-400'
            }`}
            aria-label="Slide 2: Budget Finder Wizard"
          />
        </div>

      </div>
    </section>
  );
};
