import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Printer, RotateCcw, ShoppingBag } from 'lucide-react';
import { PRODUCTS, STORE_INFO } from '../data/storeData';
import { Product } from '../types';

interface BudgetFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const BudgetFinderModal: React.FC<BudgetFinderModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onSelectProduct
}) => {
  const [step, setStep] = useState<number>(1);
  const [useCase, setUseCase] = useState<string>('office');
  const [budget, setBudget] = useState<string>('mid');
  const [feature, setFeature] = useState<string>('duplex');
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const handleCalculateRecommendation = () => {
    let result = PRODUCTS[0];
    if (useCase === 'retail' || feature === 'toner') {
      result = PRODUCTS.find((p) => p.name.includes('1020') || p.name.includes('P1108')) || PRODUCTS[0];
    } else if (feature === 'duplex') {
      result = PRODUCTS.find((p) => p.name.includes('HL-L2321D') || p.name.includes('Duplex')) || PRODUCTS[1];
    } else if (useCase === 'allinone' || feature === 'scan') {
      result = PRODUCTS.find((p) => p.category === 'all-in-one') || PRODUCTS[1];
    } else if (budget === 'low') {
      result = PRODUCTS.find((p) => p.price <= 8000) || PRODUCTS[4];
    } else {
      result = PRODUCTS.find((p) => p.price > 8000) || PRODUCTS[0];
    }
    setRecommendedProduct(result);
    setStep(4);
  };

  const resetQuiz = () => {
    setStep(1);
    setRecommendedProduct(null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
          id="close-budget-quiz-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0055ff] text-[11px] font-bold">
            S R COMPUTER WIZARD
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {step <= 3 ? `Step ${step} of 3` : 'Your Perfect Match!'}
          </span>
        </div>

        {/* Question 1: Use Case */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h3 className="text-xl font-black text-gray-900">What is your main printing requirement?</h3>
              <p className="text-xs text-gray-500 mt-1">We will filter models tested for your specific daily duty cycle.</p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'office', label: 'Office & Business Documents', desc: 'Fast monochrome printing, contracts, agreements' },
                { id: 'retail', label: 'Retail Shop & Invoicing / Billing', desc: 'Heavy GST billing, receipt printing, lowest cost per page' },
                { id: 'allinone', label: 'All-in-One Scanning & Copying', desc: 'Schools, coaching institutes, customer service desks' },
                { id: 'personal', label: 'Personal & Student Use', desc: 'Affordable study notes, projects, and assignments' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setUseCase(item.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border-2 transition flex items-center justify-between ${
                    useCase === item.id ? 'border-[#0055ff] bg-blue-50/60 font-semibold' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-gray-800">{item.label}</div>
                    <div className="text-[11px] text-gray-500">{item.desc}</div>
                  </div>
                  {useCase === item.id && <CheckCircle2 className="w-5 h-5 text-[#0055ff]" />}
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-[#0055ff] text-white rounded-xl font-bold text-sm hover:bg-[#0044cc] flex items-center gap-2 transition"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question 2: Budget */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h3 className="text-xl font-black text-gray-900">What is your budget range?</h3>
              <p className="text-xs text-gray-500 mt-1">All retail products include 100% genuine brand manufacturer warranty and GST invoice.</p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'low', label: 'Budget Friendly (Under ₹8,000)', desc: 'HP LaserJet 1007/1008, P1505N series' },
                { id: 'mid', label: 'Commercial Workhorse (₹8,000 - ₹12,000)', desc: 'HP 1020+, Brother Auto-Duplex, Canon 2900B' },
                { id: 'high', label: 'All-in-One Multi-Function (₹12,000+)', desc: 'HP MFP M132a, Heavy Duty Duplexer Network' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setBudget(item.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border-2 transition flex items-center justify-between ${
                    budget === item.id ? 'border-[#0055ff] bg-blue-50/60 font-semibold' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-gray-800">{item.label}</div>
                    <div className="text-[11px] text-gray-500">{item.desc}</div>
                  </div>
                  {budget === item.id && <CheckCircle2 className="w-5 h-5 text-[#0055ff]" />}
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#0055ff] text-white rounded-xl font-bold text-sm hover:bg-[#0044cc] flex items-center gap-2 transition"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question 3: Priority Feature */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h3 className="text-xl font-black text-gray-900">Which feature matters most to you?</h3>
              <p className="text-xs text-gray-500 mt-1">We match the exact hardware architecture for maximum reliability.</p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'duplex', label: 'Double-Sided (Auto-Duplex) Printing', desc: 'Save 50% paper automatically without turning sheets' },
                { id: 'toner', label: 'Cheapest Toner Refilling Cost', desc: 'Uses standard HP 12A/88A cartridge refilling for under ₹400' },
                { id: 'scan', label: 'Photocopy & High-Res Scanner', desc: 'ADF automatic document feeder for multiple sheets' },
                { id: 'speed', label: 'High Speed (25+ Pages Per Minute)', desc: 'Fast spooling for queues and rush billing' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFeature(item.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border-2 transition flex items-center justify-between ${
                    feature === item.id ? 'border-[#0055ff] bg-blue-50/60 font-semibold' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-gray-800">{item.label}</div>
                    <div className="text-[11px] text-gray-500">{item.desc}</div>
                  </div>
                  {feature === item.id && <CheckCircle2 className="w-5 h-5 text-[#0055ff]" />}
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
              >
                Back
              </button>
              <button
                onClick={handleCalculateRecommendation}
                className="px-6 py-2.5 bg-[#0055ff] text-white rounded-xl font-bold text-sm hover:bg-[#0044cc] flex items-center gap-2 shadow-lg transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Show My Match</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Recommended Result */}
        {step === 4 && recommendedProduct && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Best Match for Your Budget & Requirements</span>
              </div>
              <h3 className="text-xl font-black text-gray-900">{recommendedProduct.name}</h3>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-4">
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="w-36 h-36 object-contain bg-white rounded-xl p-2 border border-gray-100"
              />
              <div className="space-y-1.5 text-left w-full">
                <div className="text-xs text-[#0055ff] font-bold uppercase tracking-wider">
                  {recommendedProduct.brand} Certified
                </div>
                <div className="text-2xl font-black text-gray-900">
                  Rs. {recommendedProduct.price.toLocaleString('en-IN')}.00
                </div>
                <div className="text-xs text-gray-400 line-through">
                  Rs. {recommendedProduct.originalPrice.toLocaleString('en-IN')}.00
                </div>
                <div className="text-xs text-green-700 font-semibold">
                  ★ 4.9 Rating • 100% Brand New Sealed • Brand Warranty
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onAddToCart(recommendedProduct);
                  onClose();
                }}
                className="w-full py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(`Hello S R Computer, I used your Budget Finder and would like to purchase the ${recommendedProduct.name} for Rs. ${recommendedProduct.price}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition"
              >
                <span>Order on WhatsApp</span>
              </a>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={resetQuiz}
                className="text-xs text-gray-500 hover:text-gray-800 inline-flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
