import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Package,
  ShoppingBag,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  Phone,
  Search,
  Cloud,
  ChevronRight,
  Eye,
  Check,
  Tag,
  Video,
  Play,
  Star
} from 'lucide-react';
import { Product, StoreOrder, StoreSettings, VideoReview } from '../types';
import {
  verifyAdminPin,
  setAdminPin,
  getAdminPin,
  resetStoredProducts,
  saveStoredProducts,
  updateOrderStatus,
  deleteStoredOrder,
  saveStoredSettings,
  exportDataAsJSON,
  importDataFromJSON,
  saveStoredVideoReviews,
  updateStoredVideoReview,
  deleteStoredVideoReview
} from '../services/storeStorage';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  orders: StoreOrder[];
  onUpdateOrders: (newOrders: StoreOrder[]) => void;
  settings: StoreSettings;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  videoReviews: VideoReview[];
  onUpdateVideoReviews: (newReviews: VideoReview[]) => void;
  initialAuthenticated?: boolean;
}

const CATEGORY_OPTIONS = [
  { id: 'laptops', label: 'Laptops' },
  { id: 'all-in-one', label: 'All-in-One Multi-Function' },
  { id: 'inktank', label: 'InkTank Color Printers' },
  { id: 'laser', label: 'Laser Printers' },
  { id: 'accessories', label: 'Accessories & Peripherals' },
  { id: 'storage', label: 'Storage & RAM Upgrades' },
  { id: 'networking', label: 'Networking & Routers' },
  { id: 'toners', label: 'Toners & Inks' }
];

const BRAND_OPTIONS = [
  'HP',
  'Brother',
  'Canon',
  'Samsung',
  'Epson',
  'Ricoh',
  'Dell',
  'Lenovo',
  'Logitech',
  'Crucial',
  'Kingston',
  'TP-Link',
  'ASUS'
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  orders,
  onUpdateOrders,
  settings,
  onUpdateSettings,
  videoReviews,
  onUpdateVideoReviews,
  initialAuthenticated = false
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'videos' | 'settings' | 'cloudflare'>('inventory');

  useEffect(() => {
    if (initialAuthenticated && isOpen) {
      setIsAuthenticated(true);
    }
  }, [initialAuthenticated, isOpen]);

  // Product Form Modal state
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Video Review Form Modal state
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Partial<VideoReview> | null>(null);

  // PIN Change state
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinChangeMessage, setPinChangeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Import/Export message
  const [importNotice, setImportNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setIsAuthenticated(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect PIN code. Default is 1234');
    }
  };

  const handleToggleStock = (productId: string) => {
    const updated = products.map((p) =>
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    );
    saveStoredProducts(updated);
    onUpdateProducts(updated);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (window.confirm(`Are you sure you want to delete "${productName}" from the catalog?`)) {
      const updated = products.filter((p) => p.id !== productId);
      saveStoredProducts(updated);
      onUpdateProducts(updated);
    }
  };

  const handleOpenAddProduct = () => {
    setCurrentProduct({
      id: `src-${Date.now()}`,
      name: '',
      brand: 'HP',
      category: 'laptops',
      price: 19999,
      originalPrice: 24999,
      rating: 4.9,
      reviewsCount: 12,
      image: '/images/products/hp-15s-laptop.jpg',
      badge: 'New Arrival',
      condition: '100% Brand New',
      warranty: '1 Year Official Manufacturer Warranty',
      features: ['Official GST Invoice', 'Brand New Factory Sealed Box'],
      inStock: true,
      description: 'Brand new retail unit available for immediate pickup or delivery across Odisha.'
    });
    setIsEditingProduct(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsEditingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct || !currentProduct.name) return;

    const fullProduct: Product = {
      id: currentProduct.id || `src-${Date.now()}`,
      name: currentProduct.name,
      brand: (currentProduct.brand as Product['brand']) || 'HP',
      category: currentProduct.category || 'laptops',
      price: Number(currentProduct.price) || 0,
      originalPrice: Number(currentProduct.originalPrice) || Number(currentProduct.price) || 0,
      rating: Number(currentProduct.rating) || 4.9,
      reviewsCount: Number(currentProduct.reviewsCount) || 10,
      image: currentProduct.image || '/images/products/hp-15s-laptop.jpg',
      badge: currentProduct.badge || '',
      condition: '100% Brand New',
      warranty: currentProduct.warranty || '1 Year Brand Warranty',
      features: Array.isArray(currentProduct.features) ? currentProduct.features : ['100% Brand New Boxed'],
      inStock: currentProduct.inStock !== false,
      description: currentProduct.description || ''
    };

    const exists = products.some((p) => p.id === fullProduct.id);
    let updated: Product[];
    if (exists) {
      updated = products.map((p) => (p.id === fullProduct.id ? fullProduct : p));
    } else {
      updated = [fullProduct, ...products];
    }

    saveStoredProducts(updated);
    onUpdateProducts(updated);
    setIsEditingProduct(false);
    setCurrentProduct(null);
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog back to original retail products? Any custom products will be replaced.')) {
      const reset = resetStoredProducts();
      onUpdateProducts(reset);
    }
  };

  const handleExportJSON = () => {
    const json = exportDataAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sr-computer-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importDataFromJSON(content);
        if (res.success) {
          setImportNotice(res.message);
          window.location.reload();
        } else {
          setImportNotice(res.message);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleChangeOrderStatus = (orderId: string, status: StoreOrder['status']) => {
    const updated = updateOrderStatus(orderId, status);
    onUpdateOrders(updated);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Delete this order record?')) {
      const updated = deleteStoredOrder(orderId);
      onUpdateOrders(updated);
    }
  };

  // Video Review Handlers
  const handleToggleVideoPublished = (videoId: string) => {
    const target = videoReviews.find((v) => v.id === videoId);
    if (!target) return;
    const updated = updateStoredVideoReview(videoId, { published: !target.published });
    onUpdateVideoReviews(updated);
  };

  const handleDeleteVideo = (videoId: string, name: string) => {
    if (window.confirm(`Delete customer video review by "${name}"?`)) {
      const updated = deleteStoredVideoReview(videoId);
      onUpdateVideoReviews(updated);
    }
  };

  const handleOpenAddVideo = () => {
    setCurrentVideo({
      id: `vid-${Date.now()}`,
      customerName: '',
      location: 'Baramunda, Bhubaneswar',
      productName: products[0]?.name || 'HP 15s Intel Core i3 Laptop',
      rating: 5,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: '/images/products/hp-15s-laptop.jpg',
      duration: '0:45',
      reviewText: 'Great product and quick delivery from S R COMPUTER!',
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      published: true
    });
    setIsEditingVideo(true);
  };

  const handleOpenEditVideo = (video: VideoReview) => {
    setCurrentVideo({ ...video });
    setIsEditingVideo(true);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVideo || !currentVideo.customerName) return;

    const fullVideo: VideoReview = {
      id: currentVideo.id || `vid-${Date.now()}`,
      customerName: currentVideo.customerName,
      location: currentVideo.location || 'Bhubaneswar, Odisha',
      productName: currentVideo.productName || 'HP Laptop / Printer',
      rating: Number(currentVideo.rating) || 5,
      videoUrl: currentVideo.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: currentVideo.thumbnailUrl || '/images/products/hp-15s-laptop.jpg',
      duration: currentVideo.duration || '0:45',
      reviewText: currentVideo.reviewText || '',
      date: currentVideo.date || new Date().toISOString().slice(0, 10),
      verifiedPurchase: currentVideo.verifiedPurchase !== false,
      published: currentVideo.published !== false
    };

    const exists = videoReviews.some((v) => v.id === fullVideo.id);
    let updated: VideoReview[];
    if (exists) {
      updated = videoReviews.map((v) => (v.id === fullVideo.id ? fullVideo : v));
    } else {
      updated = [fullVideo, ...videoReviews];
    }

    saveStoredVideoReviews(updated);
    onUpdateVideoReviews(updated);
    setIsEditingVideo(false);
    setCurrentVideo(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settingsForm);
    onUpdateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setPinChangeMessage({ type: 'error', text: 'PIN must be at least 4 digits.' });
      return;
    }
    if (newPin !== confirmPin) {
      setPinChangeMessage({ type: 'error', text: 'PINs do not match.' });
      return;
    }
    setAdminPin(newPin);
    setPinChangeMessage({ type: 'success', text: 'Admin PIN updated successfully!' });
    setNewPin('');
    setConfirmPin('');
    setTimeout(() => setPinChangeMessage(null), 3000);
  };

  // Filtered products
  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCatalogValue = products.reduce((sum, p) => sum + p.price, 0);
  const inStockCount = products.filter((p) => p.inStock).length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Top bar */}
        <div className="bg-[#0055ff] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Lock className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl tracking-tight leading-tight">
                S R COMPUTER • Store Admin Portal
              </h2>
              <p className="text-xs text-blue-100">
                Soubhagya Nagar, Baramunda • 4.9★ Retail Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition"
              >
                Lock Session
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition"
              aria-label="Close Admin Portal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content area */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0055ff] flex items-center justify-center mb-4 border border-blue-200">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Admin Passcode Required</h3>
            <p className="text-xs text-gray-500 mt-2">
              Enter your store security PIN to manage products, pricing, inventory, and customer orders.
            </p>

            <form onSubmit={handleLogin} className="mt-6 w-full space-y-3">
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 4-digit PIN"
                className="w-full px-4 py-3 text-center tracking-widest text-2xl font-mono rounded-xl border-2 border-gray-300 focus:border-[#0055ff] focus:outline-none"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-600 font-semibold flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pinError}</span>
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-[#0055ff] hover:bg-[#0044cc] text-white font-bold rounded-xl shadow-md transition text-sm"
              >
                Access Admin Dashboard
              </button>
              <div className="pt-2">
                <span className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                  Default PIN: <strong className="text-gray-800">1234</strong> (can be customized inside)
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tab Navigation */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 flex items-center gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'inventory'
                    ? 'bg-[#0055ff] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Product Inventory</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'inventory' ? 'bg-white/20' : 'bg-gray-200'}`}>
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'orders'
                    ? 'bg-[#0055ff] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Orders & Inquiries</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'orders' ? 'bg-white/20' : 'bg-gray-200'}`}>
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'videos'
                    ? 'bg-[#0055ff] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Video className="w-4 h-4 text-purple-500" />
                <span>Video Reviews</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'videos' ? 'bg-white/20' : 'bg-gray-200'}`}>
                  {videoReviews.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'settings'
                    ? 'bg-[#0055ff] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Store Settings & Security</span>
              </button>

              <button
                onClick={() => setActiveTab('cloudflare')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'cloudflare'
                    ? 'bg-[#0055ff] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Cloud className="w-4 h-4 text-amber-500" />
                <span>Cloudflare Free Hosting Guide</span>
              </button>
            </div>

            {/* Tab 1: Product Inventory */}
            {activeTab === 'inventory' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100">
                    <span className="text-xs text-blue-800 font-semibold">Total Catalog Items</span>
                    <div className="text-2xl font-black text-gray-900 mt-1">{products.length}</div>
                    <span className="text-[10px] text-gray-500">Retail Computers & Tech</span>
                  </div>
                  <div className="p-4 bg-green-50/70 rounded-2xl border border-green-100">
                    <span className="text-xs text-green-800 font-semibold">In Stock Items</span>
                    <div className="text-2xl font-black text-green-700 mt-1">{inStockCount}</div>
                    <span className="text-[10px] text-gray-500">Ready for pickup/dispatch</span>
                  </div>
                  <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-100">
                    <span className="text-xs text-amber-800 font-semibold">Out of Stock</span>
                    <div className="text-2xl font-black text-amber-700 mt-1">{products.length - inStockCount}</div>
                    <span className="text-[10px] text-gray-500">Requires restocking</span>
                  </div>
                  <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100">
                    <span className="text-xs text-purple-800 font-semibold">Catalog Value</span>
                    <div className="text-2xl font-black text-purple-900 mt-1">
                      ₹{totalCatalogValue.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-gray-500">Inventory retail value</span>
                  </div>
                </div>

                {/* Actions & Filters Header */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={catalogSearch}
                        onChange={(e) => setCatalogSearch(e.target.value)}
                        placeholder="Search product by name or brand..."
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0055ff]"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>

                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0055ff]"
                    >
                      <option value="all">All Categories</option>
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleOpenAddProduct}
                      className="px-4 py-2 bg-[#0055ff] hover:bg-[#0044cc] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product</span>
                    </button>

                    <button
                      onClick={handleExportJSON}
                      title="Download full catalog backup JSON"
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Backup</span>
                    </button>

                    <label
                      title="Restore catalog from JSON backup"
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition flex items-center gap-1 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Import</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportJSON}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={handleResetCatalog}
                      title="Reset to factory sample products"
                      className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {importNotice && (
                  <div className="p-3 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs font-semibold">
                    {importNotice}
                  </div>
                )}

                {/* Products Table */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Product</th>
                          <th className="px-3 py-3">Brand & Category</th>
                          <th className="px-3 py-3">Price (₹)</th>
                          <th className="px-3 py-3">Stock Status</th>
                          <th className="px-3 py-3">Warranty</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredProducts.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                              No products found matching your filter.
                            </td>
                          </tr>
                        ) : (
                          filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-blue-50/40 transition">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-11 h-11 object-contain rounded-lg bg-gray-50 p-1 border border-gray-200"
                                  />
                                  <div>
                                    <div className="font-bold text-gray-900 line-clamp-1">{product.name}</div>
                                    {product.badge && (
                                      <span className="inline-block mt-0.5 px-2 py-0.2 bg-blue-100 text-[#0055ff] rounded text-[10px] font-bold">
                                        {product.badge}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-3">
                                <span className="font-bold text-gray-800">{product.brand}</span>
                                <div className="text-[10px] text-gray-500 capitalize">{product.category}</div>
                              </td>
                              <td className="px-3 py-3 font-mono font-bold text-gray-900">
                                <div>₹{product.price.toLocaleString('en-IN')}</div>
                                {product.originalPrice > product.price && (
                                  <div className="text-[10px] text-gray-400 line-through">
                                    ₹{product.originalPrice.toLocaleString('en-IN')}
                                  </div>
                                )}
                              </td>
                              <td className="px-3 py-3">
                                <button
                                  onClick={() => handleToggleStock(product.id)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition flex items-center gap-1.5 ${
                                    product.inStock
                                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                                  }`}
                                  title="Click to toggle In Stock / Out of Stock"
                                >
                                  <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-600' : 'bg-red-600'}`} />
                                  <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                                </button>
                              </td>
                              <td className="px-3 py-3 text-gray-600 text-[11px]">
                                {product.warranty}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => handleOpenEditProduct(product)}
                                    className="p-1.5 text-gray-600 hover:text-[#0055ff] hover:bg-blue-50 rounded-lg transition"
                                    title="Edit Product"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(product.id, product.name)}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Orders & Inquiries */}
            {activeTab === 'orders' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Customer Orders & Inquiries</h3>
                    <p className="text-xs text-gray-500">
                      Orders placed via cart checkout and WhatsApp requests
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-semibold">
                    Total: {orders.length} orders
                  </span>
                </div>

                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 bg-white border border-gray-200 rounded-2xl shadow-2xs hover:border-blue-200 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-blue-100 text-[#0055ff] font-mono font-bold text-xs rounded-md">
                            {order.orderNumber}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <span className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded capitalize">
                            {order.deliveryType === 'pickup' ? 'Store Pickup (Baramunda)' : 'Doorstep Delivery'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleChangeOrderStatus(order.id, e.target.value as StoreOrder['status'])
                            }
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                              order.status === 'Completed'
                                ? 'bg-green-50 text-green-800 border-green-200'
                                : order.status === 'Confirmed'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : order.status === 'Processing'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : order.status === 'Cancelled'
                                ? 'bg-red-50 text-red-800 border-red-200'
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Customer Details */}
                      <div className="py-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="font-bold text-gray-800">
                            {order.customerName || 'Direct Store Visitor'}
                          </div>
                          {order.customerPhone && (
                            <div className="text-gray-600 mt-0.5 flex items-center gap-2">
                              <span>Phone: {order.customerPhone}</span>
                              <a
                                href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${order.customerName || 'Sir/Madam'}, regarding your S R COMPUTER order ${order.orderNumber}:`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 font-bold hover:underline inline-flex items-center gap-1"
                              >
                                Chat on WhatsApp
                              </a>
                            </div>
                          )}
                          {order.notes && (
                            <p className="text-gray-500 italic mt-1 bg-gray-50 p-1.5 rounded">
                              "{order.notes}"
                            </p>
                          )}
                        </div>

                        {/* Items ordered list */}
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 space-y-1">
                          <div className="text-[11px] font-bold text-gray-700">Ordered Items:</div>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-[11px]">
                              <span className="text-gray-800">
                                {item.quantity}x {item.product.name}
                              </span>
                              <span className="font-mono font-semibold text-gray-900">
                                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                          <div className="pt-1.5 border-t border-gray-200 flex justify-between font-bold text-xs">
                            <span>Total Amount:</span>
                            <span className="text-[#0055ff] font-mono">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Customer Video Reviews Management */}
            {activeTab === 'videos' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Header with Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                      <Video className="w-5 h-5 text-[#0055ff]" />
                      <span>Customer Video Reviews & Demos</span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Upload customer unboxings, testing videos, and buyer feedback. Optimized for smartphone shoppers with phone physical back button support.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddVideo}
                    className="px-4 py-2.5 bg-[#0055ff] hover:bg-[#0044cc] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition shrink-0"
                    id="admin-add-video-btn"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload New Video Review</span>
                  </button>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                    <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider block">
                      Total Reviews
                    </span>
                    <span className="text-2xl font-black text-purple-900 mt-1 block">
                      {videoReviews.length}
                    </span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                    <span className="text-[11px] font-semibold text-green-700 uppercase tracking-wider block">
                      Published on Store
                    </span>
                    <span className="text-2xl font-black text-green-900 mt-1 block">
                      {videoReviews.filter((v) => v.published !== false).length}
                    </span>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
                      Average Rating
                    </span>
                    <span className="text-2xl font-black text-amber-900 mt-1 block">
                      5.0 ★
                    </span>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                      Mobile Navigation
                    </span>
                    <span className="text-xs font-bold text-blue-900 mt-1 block">
                      Phone Back Active ✓
                    </span>
                  </div>
                </div>

                {/* Video Review Cards List */}
                <div className="space-y-4">
                  {videoReviews.length === 0 ? (
                    <div className="p-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                      <Video className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <h4 className="font-bold text-gray-700 text-sm">No video reviews yet</h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Click "Upload New Video Review" to add your first customer review!
                      </p>
                    </div>
                  ) : (
                    videoReviews.map((video) => (
                      <div
                        key={video.id}
                        className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs hover:border-blue-300 transition"
                      >
                        {/* Video Thumbnail Preview */}
                        <div className="relative w-full md:w-48 aspect-video rounded-xl bg-black overflow-hidden shrink-0 group">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.customerName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-9 h-9 rounded-full bg-[#0055ff] text-white flex items-center justify-center shadow-md">
                              <Play className="w-4 h-4 ml-0.5 fill-white" />
                            </div>
                          </div>
                          {video.duration && (
                            <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white font-mono text-[9px] font-bold">
                              {video.duration}
                            </span>
                          )}
                        </div>

                        {/* Video Info Details */}
                        <div className="flex-1 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-gray-900 text-sm">
                              {video.customerName}
                            </h4>
                            <span className="text-xs text-gray-500">
                              ({video.location})
                            </span>
                            {video.verifiedPurchase && (
                              <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-[10px] font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified Buyer
                              </span>
                            )}
                            <div className="flex items-center text-amber-400 text-xs">
                              {[...Array(video.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                              ))}
                            </div>
                          </div>

                          <div className="text-xs font-semibold text-blue-700">
                            Purchased: <span className="text-gray-900">{video.productName}</span>
                          </div>

                          <p className="text-xs text-gray-600 italic line-clamp-2">
                            "{video.reviewText}"
                          </p>

                          <div className="text-[10px] text-gray-400 font-mono truncate max-w-md">
                            URL: {video.videoUrl}
                          </div>
                        </div>

                        {/* Visibility & Actions */}
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                          <button
                            onClick={() => handleToggleVideoPublished(video.id)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                              video.published !== false
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                video.published !== false ? 'bg-green-600' : 'bg-gray-400'
                              }`}
                            />
                            <span>{video.published !== false ? 'Published' : 'Hidden'}</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditVideo(video)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition"
                              title="Edit Review"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(video.id, video.customerName)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition"
                              title="Delete Review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>

                {/* Helpful Upload Tips */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-1">
                  <div className="font-bold text-gray-800 flex items-center gap-1.5">
                    💡 Tips for Adding Customer Video Reviews:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-600 pl-1 text-[11px]">
                    <li>Upload horizontal or vertical smartphone clips recorded by customers.</li>
                    <li>Supports direct MP4 URLs, Cloudflare Stream, Google Cloud Storage, or AWS S3 links.</li>
                    <li>When shoppers click any video on mobile, they can press their phone's native back button or swipe back to instantly return without reloading.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 3: Store Settings & Security */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Store Identity & Contact Settings</h3>
                  <p className="text-xs text-gray-500">
                    Changes here take effect immediately across all website footers, headers, and modals.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      value={settingsForm.storeName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={settingsForm.phone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Number (with country code)</label>
                      <input
                        type="text"
                        value={settingsForm.whatsapp}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Physical Store Address</label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Opening Hours Note</label>
                    <input
                      type="text"
                      value={settingsForm.hoursNote}
                      onChange={(e) => setSettingsForm({ ...settingsForm, hoursNote: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Top Announcement Banner</label>
                    <textarea
                      rows={2}
                      value={settingsForm.announcement}
                      onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0055ff] hover:bg-[#0044cc] text-white font-bold rounded-xl text-xs shadow-md transition"
                    >
                      Save Store Information
                    </button>
                    {settingsSaved && (
                      <span className="text-xs text-green-600 font-bold flex items-center gap-1 animate-in fade-in">
                        <Check className="w-4 h-4" /> Changes saved!
                      </span>
                    )}
                  </div>
                </form>

                {/* Change Admin PIN Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm">Change Security PIN</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Set a new 4 or 6 digit PIN to protect your admin portal.
                  </p>

                  <form onSubmit={handleChangePin} className="space-y-3 max-w-sm">
                    <input
                      type="password"
                      placeholder="New PIN (min 4 digits)"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New PIN"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                    />
                    {pinChangeMessage && (
                      <p
                        className={`text-xs font-bold ${
                          pinChangeMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {pinChangeMessage.text}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-xs transition"
                    >
                      Update Security PIN
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* Tab 4: Cloudflare Pages Free Hosting Guide */}
            {activeTab === 'cloudflare' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold mb-2">
                    <Cloud className="w-4 h-4 text-amber-500" />
                    <span>100% Free Hosting on Cloudflare Pages</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                    Deploy S R COMPUTER on Cloudflare Pages
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Cloudflare Pages offers unlimited bandwidth, free automated SSL, and fast edge caching across India at zero cost.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                      <span className="w-6 h-6 rounded-full bg-[#0055ff] text-white flex items-center justify-center text-xs">
                        1
                      </span>
                      <span>Export or Push Code to GitHub</span>
                    </div>
                    <p className="text-xs text-gray-600 pl-8">
                      Push this repository to your GitHub account (e.g. <code className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-800">sr-computer-website</code>).
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                      <span className="w-6 h-6 rounded-full bg-[#0055ff] text-white flex items-center justify-center text-xs">
                        2
                      </span>
                      <span>Connect to Cloudflare Dashboard</span>
                    </div>
                    <p className="text-xs text-gray-600 pl-8">
                      Log in to <strong className="text-gray-900">dash.cloudflare.com</strong> &gt; Click <strong className="text-gray-900">Workers & Pages</strong> &gt; Click <strong className="text-gray-900">Create Application</strong> &gt; Select <strong className="text-gray-900">Pages</strong> &gt; Connect to Git.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                      <span className="w-6 h-6 rounded-full bg-[#0055ff] text-white flex items-center justify-center text-xs">
                        3
                      </span>
                      <span>Configure Build Settings (Vite / React)</span>
                    </div>
                    <div className="pl-8 space-y-1.5 text-xs text-gray-700">
                      <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-gray-200 font-mono">
                        <div>
                          <span className="text-gray-400 block text-[10px]">Framework Preset</span>
                          <strong className="text-gray-900">Vite</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Build Command</span>
                          <strong className="text-gray-900">npm run build</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Build Output Directory</span>
                          <strong className="text-gray-900">dist</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Node.js Version</span>
                          <strong className="text-gray-900">18 or 20</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                      <span className="w-6 h-6 rounded-full bg-[#0055ff] text-white flex items-center justify-center text-xs">
                        4
                      </span>
                      <span>Free Custom Domain with SSL</span>
                    </div>
                    <p className="text-xs text-gray-600 pl-8">
                      In the Cloudflare Pages settings, add your custom domain (such as <code className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-800">srcomputer.in</code>). Cloudflare automatically issues free HTTPS certificates and routes global traffic seamlessly.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900">
                  <div className="font-bold mb-1">💡 Real-time Multi-Device Sync Tip:</div>
                  When you want multiple staff members on different devices to manage the catalog concurrently, Firebase Firestore can be linked as your real-time cloud database, which also operates with a free tier.
                </div>
              </div>
            )}

          </div>
        )}

        {/* Add / Edit Product Modal */}
        {isEditingProduct && currentProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="text-lg font-black text-gray-900">
                  {currentProduct.id && products.some((p) => p.id === currentProduct.id)
                    ? 'Edit Product'
                    : 'Add New Product'}
                </h3>
                <button
                  onClick={() => setIsEditingProduct(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={currentProduct.name || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    placeholder="e.g. HP 15s 12th Gen Intel Core i3 Laptop"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Brand *</label>
                    <select
                      value={currentProduct.brand || 'HP'}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, brand: e.target.value as Product['brand'] })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    >
                      {BRAND_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Category *</label>
                    <select
                      value={currentProduct.category || 'laptops'}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={currentProduct.price || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                      placeholder="e.g. 36990"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl font-mono focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Original / MRP (₹)</label>
                    <input
                      type="number"
                      value={currentProduct.originalPrice || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, originalPrice: Number(e.target.value) })}
                      placeholder="e.g. 45000"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl font-mono focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={currentProduct.badge || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, badge: e.target.value })}
                      placeholder="e.g. Bestseller, 20% OFF, Student Pick"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Warranty Info</label>
                    <input
                      type="text"
                      value={currentProduct.warranty || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, warranty: e.target.value })}
                      placeholder="e.g. 1 Year Official Brand Warranty"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Product Photo URL</label>
                  <input
                    type="url"
                    value={currentProduct.image || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Key Highlights (comma separated)</label>
                  <input
                    type="text"
                    value={
                      Array.isArray(currentProduct.features)
                        ? currentProduct.features.join(', ')
                        : ''
                    }
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    placeholder="8GB RAM, 512GB SSD, Windows 11, Fast Charging"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Description</label>
                  <textarea
                    rows={2}
                    value={currentProduct.description || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                    placeholder="Describe this product and warranty coverage..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="instock-checkbox"
                    checked={currentProduct.inStock !== false}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, inStock: e.target.checked })}
                    className="w-4 h-4 text-[#0055ff] rounded"
                  />
                  <label htmlFor="instock-checkbox" className="font-bold text-gray-800">
                    Product is In Stock & Available for Sale
                  </label>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0055ff] hover:bg-[#0044cc] text-white font-bold rounded-xl shadow-md transition"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add / Edit Video Review Modal */}
        {isEditingVideo && currentVideo && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#0055ff]" />
                  <h3 className="text-lg font-black text-gray-900">
                    {currentVideo.id && videoReviews.some((v) => v.id === currentVideo.id)
                      ? 'Edit Customer Video Review'
                      : 'Upload New Customer Video Review'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditingVideo(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVideo} className="space-y-3.5 text-xs">
                {/* Customer Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Customer Full Name *</label>
                    <input
                      type="text"
                      required
                      value={currentVideo.customerName || ''}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, customerName: e.target.value })}
                      placeholder="e.g. Rakesh Panda"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Customer Location *</label>
                    <input
                      type="text"
                      required
                      value={currentVideo.location || ''}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, location: e.target.value })}
                      placeholder="e.g. Baramunda, Bhubaneswar"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Product Name & Rating */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Purchased Product *</label>
                    <input
                      type="text"
                      required
                      value={currentVideo.productName || ''}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, productName: e.target.value })}
                      placeholder="e.g. HP 15s Intel Core i3 Laptop"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Rating</label>
                    <select
                      value={currentVideo.rating || 5}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none bg-white font-bold text-amber-600"
                    >
                      <option value={5}>5 ★★★★★</option>
                      <option value={4}>4 ★★★★☆</option>
                      <option value={3}>3 ★★★☆☆</option>
                    </select>
                  </div>
                </div>

                {/* Video URL (MP4 / Web Video) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-gray-700">Video File URL (MP4/Webm) *</label>
                    <span className="text-[10px] text-gray-400">Direct playable link</span>
                  </div>
                  <input
                    type="url"
                    required
                    value={currentVideo.videoUrl || ''}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, videoUrl: e.target.value })}
                    placeholder="https://.../video.mp4"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none font-mono text-[11px]"
                  />
                  {/* Preset test samples */}
                  <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto text-[10px]">
                    <span className="text-gray-400 shrink-0">Sample presets:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentVideo({
                          ...currentVideo,
                          videoUrl:
                            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
                        })
                      }
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md shrink-0"
                    >
                      Demo Clip 1
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentVideo({
                          ...currentVideo,
                          videoUrl:
                            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
                        })
                      }
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md shrink-0"
                    >
                      Demo Clip 2
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentVideo({
                          ...currentVideo,
                          videoUrl:
                            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4'
                        })
                      }
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md shrink-0"
                    >
                      Demo Clip 3
                    </button>
                  </div>
                </div>

                {/* Video Thumbnail URL */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Video Thumbnail Cover Image URL *</label>
                  <input
                    type="url"
                    required
                    value={currentVideo.thumbnailUrl || ''}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, thumbnailUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none text-[11px]"
                  />
                  {currentVideo.thumbnailUrl && (
                    <div className="mt-2 w-32 aspect-video rounded-lg overflow-hidden border border-gray-200 bg-black">
                      <img
                        src={currentVideo.thumbnailUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Duration & Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Duration (e.g. 0:45)</label>
                    <input
                      type="text"
                      value={currentVideo.duration || '0:45'}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, duration: e.target.value })}
                      placeholder="0:45"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Review Date</label>
                    <input
                      type="date"
                      value={currentVideo.date || new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Review Text Quote */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Customer Review Quote / Caption *</label>
                  <textarea
                    rows={2}
                    required
                    value={currentVideo.reviewText || ''}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, reviewText: e.target.value })}
                    placeholder="What did the customer say in this video review?"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055ff] focus:outline-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-2 pt-1 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="video-verified-checkbox"
                      checked={currentVideo.verifiedPurchase !== false}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, verifiedPurchase: e.target.checked })}
                      className="w-4 h-4 text-[#0055ff] rounded"
                    />
                    <label htmlFor="video-verified-checkbox" className="font-bold text-gray-800">
                      Mark as Verified Buyer Badge
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="video-published-checkbox"
                      checked={currentVideo.published !== false}
                      onChange={(e) => setCurrentVideo({ ...currentVideo, published: e.target.checked })}
                      className="w-4 h-4 text-[#0055ff] rounded"
                    />
                    <label htmlFor="video-published-checkbox" className="font-bold text-gray-800">
                      Publish immediately on website video review section
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingVideo(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0055ff] hover:bg-[#0044cc] text-white font-bold rounded-xl shadow-md transition"
                  >
                    Save & Publish Video
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
