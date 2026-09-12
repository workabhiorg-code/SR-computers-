import React, { useState } from 'react';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { HeroBanner } from './components/HeroBanner';
import { BrandBar } from './components/BrandBar';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { TrackOrderModal } from './components/TrackOrderModal';
import { ContactModal } from './components/ContactModal';
import { ReviewsModal } from './components/ReviewsModal';
import { PhotosGalleryModal } from './components/PhotosGalleryModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { VideoReviewsSection } from './components/VideoReviewsSection';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AccountModal } from './components/AccountModal';
import { BudgetFinderModal } from './components/BudgetFinderModal';
import { getStoredProducts, getStoredOrders, getStoredSettings, getStoredVideoReviews } from './services/storeStorage';
import { Product, CartItem, StoreOrder, StoreSettings, VideoReview } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Store dynamic catalog, orders, settings & video reviews (persisted in localStorage, cloud-ready)
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());
  const [orders, setOrders] = useState<StoreOrder[]>(() => getStoredOrders());
  const [settings, setSettings] = useState<StoreSettings>(() => getStoredSettings());
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>(() => getStoredVideoReviews());

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(3);
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeVideoReview, setActiveVideoReview] = useState<VideoReview | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);
  const [isBudgetQuizOpen, setIsBudgetQuizOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setIsAdminOpen(true);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Smooth scroll to product catalog if clicked
    const element = document.getElementById('product-catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand(null);
    setSearchQuery('');
  };

  const scrollToProducts = () => {
    const el = document.getElementById('product-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToVideoReviews = () => {
    const el = document.getElementById('video-reviews-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
      
      {/* 1. Header (Ocean Blue bar with S R COMPUTER logo, search bar, icons, sub-navigation, Hamburger Menu) */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        wishlistCount={wishlistCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenGoogleProfile={() => setIsReviewsOpen(true)}
        onOpenAdmin={handleAdminLogin}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectCategory={handleSelectCategory}
        onOpenBudgetQuiz={() => setIsBudgetQuizOpen(true)}
        onOpenPhotos={() => setIsPhotosOpen(true)}
        onOpenReviews={() => setIsReviewsOpen(true)}
        onScrollToVideoReviews={scrollToVideoReviews}
        onScrollToProducts={scrollToProducts}
      />

      {/* 2. Circular Category Bar matching screenshot ("SALE New Arrivals", Mono, All-in-One, etc.) */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Hero Banner ("Bhubaneswar's Trusted", "Retail Computers & Accessories", "Explore Catalog") */}
      <HeroBanner
        onShopClick={scrollToProducts}
        onOpenGoogleProfile={() => setIsReviewsOpen(true)}
        onOpenBudgetQuiz={() => setIsBudgetQuizOpen(true)}
      />

      {/* 4. Explore Trusted Printer Brands (HP, Brother, Canon, Samsung, Epson, Ricoh, Dell, Lenovo) */}
      <BrandBar
        selectedBrand={selectedBrand}
        onSelectBrand={(brand) => {
          setSelectedBrand(brand);
          scrollToProducts();
        }}
      />

      {/* 5. Customer Video Reviews & Unboxings (Optimized for phones, back-button popstate support) */}
      <VideoReviewsSection
        reviews={videoReviews}
        onSelectVideo={(video) => setActiveVideoReview(video)}
        onOpenAdmin={() => setIsAccountOpen(true)}
      />

      {/* 6. Product Catalog with Filters and WhatsApp Buy */}
      <ProductCatalog
        products={products}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        searchQuery={searchQuery}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onAddToCart={handleAddToCart}
        onClearFilters={handleClearFilters}
      />

      {/* 7. Comprehensive Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenGoogleProfile={() => setIsReviewsOpen(true)}
        onOpenAdmin={handleAdminLogin}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* 8. Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Customer Video Player with Phone Back Button Handler */}
      <VideoPlayerModal
        video={activeVideoReview}
        allVideos={videoReviews.filter((v) => v.published !== false)}
        onClose={() => setActiveVideoReview(null)}
        onSelectVideo={(video) => setActiveVideoReview(video)}
      />

      {/* Account Modal (Merged Customer & Admin Portal Gateway) */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onAdminLogin={handleAdminLogin}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals and Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderPlaced={() => setOrders(getStoredOrders())}
      />

      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
      />

      <PhotosGalleryModal
        isOpen={isPhotosOpen}
        onClose={() => setIsPhotosOpen(false)}
      />

      {/* Smart Budget & Device Finder Quiz */}
      <BudgetFinderModal
        isOpen={isBudgetQuizOpen}
        onClose={() => setIsBudgetQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onSelectProduct={(product) => {
          setSelectedProduct(product);
          setIsBudgetQuizOpen(false);
        }}
      />

      {/* Store Admin Portal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        initialAuthenticated={isAdminAuthenticated}
        products={products}
        onUpdateProducts={(newProducts) => setProducts(newProducts)}
        orders={orders}
        onUpdateOrders={(newOrders) => setOrders(newOrders)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
        videoReviews={videoReviews}
        onUpdateVideoReviews={(newReviews) => setVideoReviews(newReviews)}
      />

    </div>
  );
}
