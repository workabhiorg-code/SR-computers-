import React from 'react';
import { Play, Star, CheckCircle2, ShoppingBag, Sparkles, Video, MessageCircle } from 'lucide-react';
import { VideoReview } from '../types';
import { STORE_INFO } from '../data/storeData';

interface VideoReviewsSectionProps {
  reviews: VideoReview[];
  onSelectVideo: (video: VideoReview) => void;
  onOpenAdmin?: () => void;
}

export const VideoReviewsSection: React.FC<VideoReviewsSectionProps> = ({
  reviews,
  onSelectVideo,
  onOpenAdmin
}) => {
  const publishedReviews = reviews.filter((r) => r.published !== false);

  if (publishedReviews.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-gray-50 to-white border-y border-gray-200" id="video-reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#0055ff] rounded-full text-xs font-bold mb-2 border border-blue-100 shadow-2xs">
              <Video className="w-3.5 h-3.5 text-[#0055ff]" />
              <span>Real Customer Stories from Bhubaneswar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Customer Video Reviews & Demos
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
              Watch authentic unboxings, testing demos, and feedback from students, educators, and office owners who bought brand new laptops and printers at S R COMPUTER.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-gray-200 shadow-2xs text-xs">
              <span className="text-amber-500 font-bold flex items-center">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="ml-1 text-gray-900">4.9 / 5</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">38+ Google Reviews</span>
            </div>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition"
              >
                <span>+ Upload from Admin</span>
              </button>
            )}
          </div>
        </div>

        {/* Video Cards Grid - Touch Optimized for Mobile (Horizontal Swipeable / 2-col on small screen, 4-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {publishedReviews.map((review) => (
            <div
              key={review.id}
              onClick={() => onSelectVideo(review)}
              className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col active:scale-[0.98]"
              id={`video-review-card-${review.id}`}
            >
              {/* Video Thumbnail with Play Button Overlay */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-gray-900 overflow-hidden">
                <img
                  src={review.thumbnailUrl}
                  alt={review.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button - Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#0055ff] group-hover:bg-[#0044cc] text-white flex items-center justify-center shadow-lg group-hover:scale-115 transition-all duration-300">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>

                {/* Duration Badge */}
                {review.duration && (
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 text-white font-mono text-[10px] font-bold backdrop-blur-xs">
                    {review.duration}
                  </span>
                )}

                {/* Verified Customer Badge */}
                {review.verifiedPurchase && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-green-600/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs backdrop-blur-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {review.date}
                    </span>
                  </div>

                  {/* Customer Name & Location */}
                  <div className="mt-2">
                    <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-[#0055ff] transition line-clamp-1">
                      {review.customerName}
                    </h3>
                    <p className="text-[11px] text-gray-500">{review.location}</p>
                  </div>

                  {/* Product Tag */}
                  <div className="mt-2.5 px-2.5 py-1.5 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center gap-1.5 text-[11px] font-semibold text-blue-900">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#0055ff] shrink-0" />
                    <span className="line-clamp-1">{review.productName}</span>
                  </div>

                  {/* Customer Review Quote */}
                  <p className="mt-2 text-xs text-gray-600 line-clamp-2 italic leading-relaxed">
                    "{review.reviewText}"
                  </p>
                </div>

                {/* Watch Video Button */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0055ff] group-hover:translate-x-0.5 transition">
                  <span className="flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 fill-[#0055ff]" />
                    <span>Watch Video</span>
                  </span>
                  <span className="text-gray-400 text-sm">→</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* WhatsApp Video Review Invitation Bar */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0055ff] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                Bought a laptop or printer from S R COMPUTER?
              </h4>
              <p className="text-[11px] text-gray-600">
                Send your 30-second unboxing video to our WhatsApp (096581 40143) to get featured and receive a free laptop cleaning kit or mouse pad!
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
              'Hello S R COMPUTER, I would like to submit my customer video review for my recent purchase!'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#0055ff] hover:bg-[#0044cc] text-white rounded-xl text-xs font-bold shrink-0 transition active:scale-95 shadow-xs"
          >
            Submit Review on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
