import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  Star,
  ShoppingBag,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Share2
} from 'lucide-react';
import { VideoReview } from '../types';
import { STORE_INFO } from '../data/storeData';

interface VideoPlayerModalProps {
  video: VideoReview | null;
  allVideos: VideoReview[];
  onClose: () => void;
  onSelectVideo: (video: VideoReview) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  allVideos,
  onClose,
  onSelectVideo
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
  const [durationStr, setDurationStr] = useState('0:00');
  const [copied, setCopied] = useState(false);
  const historyPushedRef = useRef(false);

  // Phone Back Button (popstate) Integration
  useEffect(() => {
    if (!video) return;

    // Push a state into browser history so pressing phone's physical back button closes the modal
    window.history.pushState({ modal: 'video_review_active', id: video.id }, '');
    historyPushedRef.current = true;

    const handlePopState = () => {
      historyPushedRef.current = false;
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = '';
      if (historyPushedRef.current) {
        // If unmounted without popstate (e.g. programmatically), revert history step
        window.history.back();
        historyPushedRef.current = false;
      }
    };
  }, [video?.id]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);

    const format = (sec: number) => {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };
    setCurrentTimeStr(format(current));
    setDurationStr(format(total));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const handleManualBack = () => {
    if (historyPushedRef.current) {
      // Trigger browser back to trigger popstate listener
      window.history.back();
    } else {
      onClose();
    }
  };

  const handleShare = () => {
    if (navigator.share && video) {
      navigator.share({
        title: `${video.customerName} Review - S R COMPUTER`,
        text: `Watch customer review for ${video.productName} at S R COMPUTER, Baramunda!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!video) return null;

  const currentIndex = allVideos.findIndex((v) => v.id === video.id);
  const prevVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 sm:bg-black/90 backdrop-blur-md flex flex-col items-center justify-between sm:justify-center sm:p-4 overflow-hidden"
      role="dialog"
      aria-modal="true"
      id="video-player-modal"
    >
      {/* Top Mobile Bar - High Priority Touch Target */}
      <div className="w-full max-w-4xl flex items-center justify-between px-4 py-3 sm:py-2 text-white shrink-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={handleManualBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-bold transition active:scale-95 shadow-md"
          id="video-modal-back-btn"
          aria-label="Back to store"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-xs sm:text-sm">Back</span>
        </button>

        <div className="text-center px-2">
          <span className="text-xs font-bold text-white/90 truncate block max-w-[180px] sm:max-w-xs">
            Customer Video Review
          </span>
          <span className="text-[10px] text-blue-300 block">
            {currentIndex + 1} of {allVideos.length} Reviews
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
            title="Share Video"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleManualBack}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl flex-1 flex flex-col md:flex-row items-center justify-center gap-4 px-2 sm:px-6 overflow-y-auto">
        
        {/* Video Card Container */}
        <div className="relative w-full md:w-3/5 aspect-[9/16] sm:aspect-[4/3] md:aspect-[16/10] max-h-[62vh] sm:max-h-[68vh] bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/10 group">
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            autoPlay
            playsInline
            loop
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Large Center Play/Pause indicator on click */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#0055ff]/90 text-white flex items-center justify-center shadow-xl hover:scale-110 transition active:scale-95 z-10"
              aria-label="Play video"
            >
              <Play className="w-8 h-8 ml-1 fill-white" />
            </button>
          )}

          {/* Navigation Arrows for Previous / Next Video */}
          {prevVideo && (
            <button
              onClick={() => onSelectVideo(prevVideo)}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white items-center justify-center transition opacity-0 group-hover:opacity-100 z-10"
              title="Previous Review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {nextVideo && (
            <button
              onClick={() => onSelectVideo(nextVideo)}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white items-center justify-center transition opacity-0 group-hover:opacity-100 z-10"
              title="Next Review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Bottom Player Overlay Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 z-10">
            {/* Scrubber track */}
            <div
              onClick={handleSeek}
              className="w-full h-1.5 bg-white/30 hover:h-2.5 rounded-full cursor-pointer transition-all mb-2 relative"
            >
              <div
                className="h-full bg-[#0055ff] rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 shadow-xs" />
              </div>
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-1 rounded-md hover:bg-white/20 transition"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1 rounded-md hover:bg-white/20 transition"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[10px] text-gray-300 font-mono">
                  {currentTimeStr} / {durationStr}
                </span>
              </div>

              <span className="text-[10px] bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full font-bold border border-green-500/40">
                Verified Customer
              </span>
            </div>
          </div>
        </div>

        {/* Customer & Product Information Card */}
        <div className="w-full md:w-2/5 bg-slate-900/90 rounded-2xl p-4 sm:p-5 text-white border border-slate-800 flex flex-col justify-between shrink-0 space-y-3 shadow-xl">
          <div>
            {/* Customer Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-black text-sm sm:text-base text-white tracking-tight">
                    {video.customerName}
                  </h4>
                  {video.verifiedPurchase && (
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-gray-400">{video.location}</p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5 bg-amber-400/20 px-2 py-1 rounded-lg border border-amber-400/30 text-amber-300 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{video.rating}.0</span>
              </div>
            </div>

            {/* Product Purchased Tag */}
            <div className="mt-3 p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider block">
                Purchased Item
              </span>
              <div className="font-bold text-xs text-white mt-0.5 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span className="line-clamp-1">{video.productName}</span>
              </div>
            </div>

            {/* Customer Review Quote */}
            <p className="mt-3 text-xs sm:text-sm text-gray-300 italic leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              "{video.reviewText}"
            </p>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
                `Hello S R COMPUTER, I saw the customer video review for "${video.productName}" on your website and would like to know price & availability!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#0055ff] hover:bg-[#0044cc] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire This Model on WhatsApp</span>
            </a>

            <div className="flex gap-2">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Call Store</span>
              </a>

              <button
                onClick={handleManualBack}
                className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom helper info for phone navigation */}
      <div className="p-2 text-center text-[11px] text-gray-400 shrink-0">
        <span className="bg-white/10 px-3 py-1 rounded-full">
          💡 You can press your <strong>Phone's Back Button</strong> or swipe back anytime to return to the shop
        </span>
      </div>

      {copied && (
        <div className="fixed bottom-12 bg-white text-black font-bold text-xs px-4 py-2 rounded-full shadow-2xl z-60 animate-bounce">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};
