export interface Product {
  id: string;
  name: string;
  brand: 'HP' | 'Brother' | 'Canon' | 'Samsung' | 'Epson' | 'Ricoh' | 'Dell' | 'Lenovo' | 'Logitech' | 'Crucial' | 'Kingston' | 'TP-Link' | 'ASUS';
  category: 'laptops' | 'all-in-one' | 'inktank' | 'laser' | 'accessories' | 'storage' | 'networking' | 'toners' | string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  condition: '100% Brand New' | 'Brand New' | 'Authorized Retail' | 'Genuine Boxed';
  warranty: string;
  features: string[];
  inStock: boolean;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  productImage: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  likes: number;
  isVerified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreInfo {
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
  status: string;
  hoursNote: string;
  address: string;
  phone: string;
  whatsapp: string;
  locationLink: string;
}

export interface VideoReel {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  verified: boolean;
  videoThumbnail: string;
  videoUrl: string;
  caption: string;
  productMentioned: string;
}

export interface CustomerTestimonial {
  id: string;
  name: string;
  location?: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
  productName: string;
  productImage: string;
  date: string;
}

export interface BuyingGuide {
  id: string;
  title: string;
  slug: string;
  summary: string;
  fullContent: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
}

export interface StoreOrder {
  id: string;
  orderNumber: string;
  customerName?: string;
  customerPhone?: string;
  deliveryType: 'pickup' | 'delivery';
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Completed' | 'Cancelled';
  createdAt: string;
  notes?: string;
}

export interface StoreSettings {
  storeName: string;
  phone: string;
  whatsapp: string;
  address: string;
  hoursNote: string;
  announcement: string;
}

export interface VideoReview {
  id: string;
  customerName: string;
  location: string;
  productName: string;
  rating: number;
  videoUrl: string;
  thumbnailUrl: string;
  duration?: string;
  reviewText: string;
  date: string;
  verifiedPurchase: boolean;
  published: boolean;
}
