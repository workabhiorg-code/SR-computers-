import React, { useState } from 'react';
import { X, Star, Check, ThumbsUp, PlusCircle } from 'lucide-react';
import { STORE_INFO, REVIEWS_BREAKDOWN, GOOGLE_REVIEWS, HIGHLIGHT_QUOTES } from '../data/storeData';
import { Review } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(GOOGLE_REVIEWS);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const filtered = selectedStarFilter
    ? reviewsList.filter((r) => r.rating === selectedStarFilter)
    : reviewsList;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      text: newText,
      likes: 0,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setShowAddForm(false);
      setSubmitted(false);
      setNewAuthor('');
      setNewText('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-2">
            <div className="font-bold text-lg text-gray-900 flex items-center gap-1">
              <span>Google Reviews</span>
              <span className="text-gray-400 font-normal">|</span>
              <span className="text-[#0055ff] font-bold">{STORE_INFO.name}</span>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
              ★ 4.9 (38)
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
            id="close-reviews-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Review Highlights Quote Section */}
          <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
              Customer Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {HIGHLIGHT_QUOTES.map((q, i) => (
                <div key={i} className="p-2.5 bg-white rounded-xl border border-blue-100 text-xs text-gray-700 italic font-medium">
                  "{q}"
                </div>
              ))}
            </div>
          </div>

          {/* Rating score & bars */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="sm:col-span-4 text-center sm:border-r border-gray-200 sm:pr-4">
              <div className="text-5xl font-black text-gray-900">4.9</div>
              <div className="flex justify-center text-amber-400 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium">38 Total Google Reviews</p>
            </div>

            <div className="sm:col-span-8 space-y-1">
              {REVIEWS_BREAKDOWN.distribution.map((dist) => (
                <button
                  key={dist.stars}
                  onClick={() => setSelectedStarFilter(selectedStarFilter === dist.stars ? null : dist.stars)}
                  className={`w-full flex items-center gap-2 text-xs py-0.5 px-1 rounded transition ${
                    selectedStarFilter === dist.stars ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="w-3 text-right">{dist.stars}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-current" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${dist.percentage}%` }} />
                  </div>
                  <span className="w-6 text-[10px] text-gray-400 text-right">{dist.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">
              {selectedStarFilter ? `Showing ${selectedStarFilter}-star reviews (${filtered.length})` : `All Reviews (${reviewsList.length})`}
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs font-bold text-[#0055ff] hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Add Review Form */}
          {showAddForm && (
            <form onSubmit={handleAddReview} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
              <h4 className="text-xs font-bold text-gray-900">Share your experience with S R COMPUTER</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Rating:</span>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1"
                      >
                        <Star className={`w-4 h-4 ${star <= newRating ? 'fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                required
                rows={3}
                placeholder="Write your review about our printers, service, or computer accessories..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0055ff] text-white text-xs font-bold rounded-lg hover:bg-[#0044cc]"
                >
                  {submitted ? 'Review Posted!' : 'Post Review'}
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-3">
            {filtered.map((rev) => (
              <div key={rev.id} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                      alt={rev.author}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-bold text-xs text-gray-900">{rev.author}</div>
                      <div className="text-[10px] text-gray-400">{rev.date}</div>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed font-normal">
                  "{rev.text}"
                </p>

                <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1 text-green-700 font-medium">
                    <Check className="w-3 h-3" /> Verified Customer
                  </span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
