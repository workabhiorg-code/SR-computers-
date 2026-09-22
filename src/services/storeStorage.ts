import { Product, StoreOrder, StoreSettings, VideoReview } from '../types';
import { PRODUCTS, STORE_INFO } from '../data/storeData';

const PRODUCTS_KEY = 'sr_computer_products_v3';
const ORDERS_KEY = 'sr_computer_orders_v3';
const SETTINGS_KEY = 'sr_computer_settings_v3';
const VIDEO_REVIEWS_KEY = 'sr_computer_video_reviews_v3';
const ADMIN_PIN_KEY = 'sr_computer_admin_pin';

export const DEFAULT_PIN = '1234';

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: STORE_INFO.name,
  phone: STORE_INFO.phone,
  whatsapp: STORE_INFO.whatsapp,
  address: STORE_INFO.address,
  hoursNote: STORE_INFO.hoursNote,
  announcement: '100% Brand New Retail Laptops, Printers & Accessories • Official Brand Warranty • Visit Soubhagya Nagar, Baramunda or Call 096581 40143'
};

export const SAMPLE_VIDEO_REVIEWS: VideoReview[] = [
  {
    id: 'vid-1',
    customerName: 'Rakesh Panda',
    location: 'Baramunda, Bhubaneswar',
    productName: 'HP 15s 12th Gen Intel Core i3 Laptop',
    rating: 5,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/images/products/hp-15s-laptop.jpg',
    duration: '0:45',
    reviewText: 'Got the best price in Bhubaneswar with official 1-year HP India warranty and original backpack. Very polite staff and honest advice!',
    date: '2026-08-28',
    verifiedPurchase: true,
    published: true
  },
  {
    id: 'vid-2',
    customerName: 'Deepak Kumar Sahoo',
    location: 'Khandagiri, Bhubaneswar',
    productName: 'Brother DCP-L2541DW Auto-Duplex Laser Printer',
    rating: 5,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: '/images/products/brother-dcp-l2541dw.jpg',
    duration: '1:10',
    reviewText: 'For my coaching center notes, I needed heavy-duty auto double-sided printing. Staff unboxed it in front of me and gave a complete live demo.',
    date: '2026-09-02',
    verifiedPurchase: true,
    published: true
  },
  {
    id: 'vid-3',
    customerName: 'Ananya Priyadarshini',
    location: 'Patia, Bhubaneswar',
    productName: 'Epson EcoTank L3250 Wi-Fi All-in-One Color Printer',
    rating: 5,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: '/images/products/epson-ecotank-l3210.jpg',
    duration: '0:52',
    reviewText: 'Bought for home and college assignments. Wireless mobile printing connects in seconds. Saved ₹2,000 compared to online sellers with on-spot GST bill.',
    date: '2026-09-05',
    verifiedPurchase: true,
    published: true
  },
  {
    id: 'vid-4',
    customerName: 'Subrat Mohapatra',
    location: 'Nayapalli, Bhubaneswar',
    productName: 'Crucial P3 1TB NVMe SSD & 16GB DDR4 RAM Upgrade',
    rating: 5,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: '/images/products/crucial-bx500-ssd.jpg',
    duration: '1:05',
    reviewText: 'My desktop boot time went from 2 minutes to 8 seconds! Quick installation done in 20 minutes right before my eyes. 100% recommended!',
    date: '2026-09-07',
    verifiedPurchase: true,
    published: true
  }
];

// Initial sample orders for store demonstration
const SAMPLE_ORDERS: StoreOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'SRC-8841',
    customerName: 'Priyabrata Mohanty',
    customerPhone: '098612 34567',
    deliveryType: 'pickup',
    items: [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[5], quantity: 1 }
    ],
    totalAmount: 40980,
    status: 'Confirmed',
    createdAt: '2026-09-09T14:30:00.000Z',
    notes: 'Customer will pick up after 5 PM today.'
  },
  {
    id: 'ord-102',
    orderNumber: 'SRC-8842',
    customerName: 'Subhashree Nayak',
    customerPhone: '094370 89123',
    deliveryType: 'delivery',
    items: [
      { product: PRODUCTS[1], quantity: 1 }
    ],
    totalAmount: 14490,
    status: 'Processing',
    createdAt: '2026-09-10T08:15:00.000Z',
    notes: 'Doorstep delivery near Khandagiri Square, Bhubaneswar.'
  }
];

export const getStoredProducts = (): Product[] => {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    return JSON.parse(data);
  } catch {
    return PRODUCTS;
  }
};

export const saveStoredProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to localStorage:', err);
  }
};

export const resetStoredProducts = (): Product[] => {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS));
    return PRODUCTS;
  } catch {
    return PRODUCTS;
  }
};

export const getStoredOrders = (): StoreOrder[] => {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    if (!data) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(SAMPLE_ORDERS));
      return SAMPLE_ORDERS;
    }
    return JSON.parse(data);
  } catch {
    return SAMPLE_ORDERS;
  }
};

export const saveStoredOrders = (orders: StoreOrder[]): void => {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders:', err);
  }
};

export const addStoredOrder = (
  orderData: Omit<StoreOrder, 'id' | 'orderNumber' | 'createdAt'>
): StoreOrder => {
  const currentOrders = getStoredOrders();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newOrder: StoreOrder = {
    ...orderData,
    id: `ord-${Date.now()}`,
    orderNumber: `SRC-${randomNum}`,
    createdAt: new Date().toISOString()
  };
  const updated = [newOrder, ...currentOrders];
  saveStoredOrders(updated);
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: StoreOrder['status']): StoreOrder[] => {
  const currentOrders = getStoredOrders();
  const updated = currentOrders.map((o) => (o.id === orderId ? { ...o, status } : o));
  saveStoredOrders(updated);
  return updated;
};

export const deleteStoredOrder = (orderId: string): StoreOrder[] => {
  const currentOrders = getStoredOrders();
  const updated = currentOrders.filter((o) => o.id !== orderId);
  saveStoredOrders(updated);
  return updated;
};

export const getStoredSettings = (): StoreSettings => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveStoredSettings = (settings: StoreSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save store settings:', err);
  }
};

export const getAdminPin = (): string => {
  return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_PIN;
};

export const setAdminPin = (newPin: string): void => {
  localStorage.setItem(ADMIN_PIN_KEY, newPin);
};

export const verifyAdminPin = (inputPin: string): boolean => {
  const currentPin = getAdminPin();
  return inputPin.trim() === currentPin.trim();
};

export const getStoredVideoReviews = (): VideoReview[] => {
  try {
    const data = localStorage.getItem(VIDEO_REVIEWS_KEY);
    if (!data) {
      localStorage.setItem(VIDEO_REVIEWS_KEY, JSON.stringify(SAMPLE_VIDEO_REVIEWS));
      return SAMPLE_VIDEO_REVIEWS;
    }
    return JSON.parse(data);
  } catch {
    return SAMPLE_VIDEO_REVIEWS;
  }
};

export const saveStoredVideoReviews = (reviews: VideoReview[]): void => {
  try {
    localStorage.setItem(VIDEO_REVIEWS_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Failed to save video reviews:', err);
  }
};

export const addStoredVideoReview = (
  reviewData: Omit<VideoReview, 'id' | 'date'>
): VideoReview => {
  const currentReviews = getStoredVideoReviews();
  const newReview: VideoReview = {
    ...reviewData,
    id: `vid-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10)
  };
  const updated = [newReview, ...currentReviews];
  saveStoredVideoReviews(updated);
  return newReview;
};

export const updateStoredVideoReview = (
  id: string,
  updatedFields: Partial<VideoReview>
): VideoReview[] => {
  const currentReviews = getStoredVideoReviews();
  const updated = currentReviews.map((r) => (r.id === id ? { ...r, ...updatedFields } : r));
  saveStoredVideoReviews(updated);
  return updated;
};

export const deleteStoredVideoReview = (id: string): VideoReview[] => {
  const currentReviews = getStoredVideoReviews();
  const updated = currentReviews.filter((r) => r.id !== id);
  saveStoredVideoReviews(updated);
  return updated;
};

export const exportDataAsJSON = (): string => {
  const exportPayload = {
    storeName: 'S R COMPUTER',
    exportedAt: new Date().toISOString(),
    products: getStoredProducts(),
    orders: getStoredOrders(),
    videoReviews: getStoredVideoReviews(),
    settings: getStoredSettings()
  };
  return JSON.stringify(exportPayload, null, 2);
};

export const importDataFromJSON = (jsonString: string): { success: boolean; message: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.products && Array.isArray(parsed.products)) {
      saveStoredProducts(parsed.products);
    }
    if (parsed.orders && Array.isArray(parsed.orders)) {
      saveStoredOrders(parsed.orders);
    }
    if (parsed.videoReviews && Array.isArray(parsed.videoReviews)) {
      saveStoredVideoReviews(parsed.videoReviews);
    }
    if (parsed.settings && typeof parsed.settings === 'object') {
      saveStoredSettings(parsed.settings);
    }
    return { success: true, message: 'Store data restored successfully!' };
  } catch (err) {
    return { success: false, message: 'Invalid JSON backup file format.' };
  }
};
