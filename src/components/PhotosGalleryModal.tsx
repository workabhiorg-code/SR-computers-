import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { STORE_GALLERY, STORE_INFO } from '../data/storeData';

interface PhotosGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotosGalleryModal: React.FC<PhotosGalleryModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const current = STORE_GALLERY[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? STORE_GALLERY.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === STORE_GALLERY.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Store & Product Photos</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>{STORE_INFO.name} • {STORE_INFO.address}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
            id="close-photos-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Photo Viewer */}
        <div className="relative bg-black flex items-center justify-center min-h-[340px] sm:min-h-[440px] flex-1">
          <img
            src={current.image}
            alt={current.title}
            className="max-h-[60vh] max-w-full object-contain"
            referrerPolicy="no-referrer"
          />

          {/* Nav buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Caption Overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white">
            <h4 className="font-bold text-sm sm:text-base">{current.title}</h4>
            <p className="text-xs text-gray-300 mt-0.5">{current.caption}</p>
          </div>
        </div>

        {/* Thumbnails Row */}
        <div className="p-3 bg-gray-50 flex items-center gap-3 overflow-x-auto justify-center">
          {STORE_GALLERY.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                currentIndex === idx ? 'border-[#0055ff] ring-2 ring-blue-300' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
