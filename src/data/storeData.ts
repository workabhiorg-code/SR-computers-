import { Product, Brand, Review, StoreInfo, VideoReel, CustomerTestimonial, BuyingGuide } from '../types';

export const STORE_INFO: StoreInfo = {
  name: "S R COMPUTER",
  rating: 4.9,
  reviewCount: 38,
  category: "Computer accessories store",
  status: "Closed · Opens 10 am Thu",
  hoursNote: "Mon - Sat: 10:00 AM – 9:00 PM | Sun: 11:00 AM – 6:00 PM",
  address: "Soubhagya Nagar, Baramunda, Bhubaneswar, Odisha 751003",
  phone: "096581 40143",
  whatsapp: "919658140143",
  locationLink: "https://www.google.com/maps/search/?api=1&query=S+R+COMPUTER+Soubhagya+Nagar+Baramunda+Bhubaneswar+Odisha+751003"
};

export const REVIEWS_BREAKDOWN = {
  average: 4.9,
  total: 38,
  distribution: [
    { stars: 5, count: 35, percentage: 92 },
    { stars: 4, count: 2, percentage: 5 },
    { stars: 3, count: 1, percentage: 3 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ]
};

export const HIGHLIGHT_QUOTES = [
  "Quality service, very friendly behavior.",
  "The staff is very polite and helped me choose the best laptop for my studies.",
  "Quick service &best price"
];

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Ashok Kumar Mohanty",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "2 weeks ago",
    text: "Quality service, very friendly behavior. Bought a brand new Brother multi-function laser printer for our office and got HP computer accessories. Working flawlessly with official brand warranty!",
    likes: 4,
    isVerified: true
  },
  {
    id: "rev-2",
    author: "Priyanka Mishra",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "a month ago",
    text: "The staff is very polite and helped me choose the best laptop for my studies. Also got an original Dell charger and wireless mouse at best wholesale rates in Baramunda.",
    likes: 7,
    isVerified: true
  },
  {
    id: "rev-3",
    author: "Subhransu Sekhar Sahoo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "3 months ago",
    text: "Quick service &best price. S R Computer is definitely one of the top trusted retail shops for laptops, printers, original toners, and desktop accessories in Bhubaneswar.",
    likes: 3,
    isVerified: true
  },
  {
    id: "rev-4",
    author: "Debasish Pattnaik",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "4 months ago",
    text: "Honest owner and very knowledgeable staff. Purchased brand new Epson EcoTank L3210 printer and high-speed POS billing printer for my grocery store with official warranty.",
    likes: 2,
    isVerified: true
  },
  {
    id: "rev-5",
    author: "Snigdha Rani Das",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "5 months ago",
    text: "Great experience! Needed urgent RAM and SSD upgrade for my Dell laptop. Completed in 20 minutes with genuine bill and manufacturer warranty. Highly recommended in Soubhagya Nagar.",
    likes: 5,
    isVerified: true
  },
  {
    id: "rev-6",
    author: "Rakesh Nayak",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    rating: 4,
    date: "6 months ago",
    text: "Wide collection of brand new laptops, printers, original toner cartridges, and computer components. Excellent post-sale support and guidance.",
    likes: 1,
    isVerified: true
  }
];

export const CATEGORIES = [
  { id: "sale", name: "Special Deals", isSale: true, icon: "SALE" },
  { id: "laptops", name: "Brand Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&auto=format&fit=crop&q=80" },
  { id: "all-in-one", name: "All-in-One Printers", image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=200&auto=format&fit=crop&q=80" },
  { id: "inktank", name: "Ink Tank Printers", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=200&auto=format&fit=crop&q=80" },
  { id: "laser", name: "Laser Printers", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200&auto=format&fit=crop&q=80" },
  { id: "accessories", name: "Keyboards & Mice", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&auto=format&fit=crop&q=80" },
  { id: "storage", name: "SSD & Storage", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&auto=format&fit=crop&q=80" },
  { id: "networking", name: "Wi-Fi & Routers", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop&q=80" }
];

export const BRANDS: Brand[] = [
  {
    id: "hp",
    name: "HP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/300px-HP_logo_2012.svg.png",
    productImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "lenovo",
    name: "Lenovo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/320px-Lenovo_logo_2015.svg.png",
    productImage: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "dell",
    name: "Dell",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/300px-Dell_Logo.svg.png",
    productImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "brother",
    name: "Brother",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Brother_logo.svg/320px-Brother_logo.svg.png",
    productImage: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "epson",
    name: "Epson",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Epson_logo.svg/320px-Epson_logo.svg.png",
    productImage: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "canon",
    name: "Canon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Canon_wordmark.svg/320px-Canon_wordmark.svg.png",
    productImage: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "logitech",
    name: "Logitech",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Logitech_logo.svg/320px-Logitech_logo.svg.png",
    productImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "crucial",
    name: "Crucial",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Crucial_Technology_logo.svg/320px-Crucial_Technology_logo.svg.png",
    productImage: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&auto=format&fit=crop&q=80"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "p-1",
    name: "HP 15s 12th Gen Intel Core i3 Thin & Light Laptop (8GB RAM / 512GB SSD / FHD / Windows 11)",
    brand: "HP",
    category: "laptops",
    price: 37990,
    originalPrice: 48990,
    rating: 4.9,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    badge: "Student Bestseller",
    condition: "100% Brand New",
    warranty: "1 Year Official HP Onsite Warranty",
    features: ["12th Gen Intel Core i3-1215U", "8GB DDR4 RAM + 512GB PCIe SSD", "15.6-inch FHD Anti-Glare", "MS Office & Windows 11 Preloaded"],
    inStock: true,
    description: "Brand new factory-sealed HP laptop. Praised by our student customers: 'The staff is very polite and helped me choose the best laptop for my studies'. Includes official GST invoice and nationwide HP support."
  },
  {
    id: "p-2",
    name: "Lenovo IdeaPad Slim 3 Core i5 12th Gen (16GB RAM / 512GB SSD / 15.6-inch FHD / Backlit Keyboard)",
    brand: "Lenovo",
    category: "laptops",
    price: 49990,
    originalPrice: 68990,
    rating: 4.9,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    badge: "Performance Pick",
    condition: "100% Brand New",
    warranty: "1 Year Lenovo Brand Warranty",
    features: ["Intel Core i5-1235U 10-Core", "16GB RAM for Seamless Multitasking", "Rapid Charge (80% in 1 hr)", "Dolby Audio & HD Privacy Webcam"],
    inStock: true,
    description: "Brand new sealed pack Lenovo laptop built for professionals, coding students, and multitasking. Fast bootup, crystal clear display, and lightweight mobility."
  },
  {
    id: "p-3",
    name: "Dell Inspiron 3520 Intel Core i3 12th Gen (8GB RAM / 512GB SSD / 120Hz Smooth Display)",
    brand: "Dell",
    category: "laptops",
    price: 36490,
    originalPrice: 45990,
    rating: 4.8,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=80",
    badge: "Reliable Daily Driver",
    condition: "100% Brand New",
    warranty: "1 Year Dell Hardware Warranty",
    features: ["120Hz Refresh Rate Display", "Spill-Resistant Ergonomic Keyboard", "Dell ComfortView Low Blue Light", "ExpressCharge Fast Battery"],
    inStock: true,
    description: "Reliable brand new Dell laptop designed for smooth everyday productivity, college projects, accounting, and streaming."
  },
  {
    id: "p-4",
    name: "Brother DCP-L2541DW Wireless Auto-Duplex Laser Multi-Function Printer (Print, Scan, Copy)",
    brand: "Brother",
    category: "all-in-one",
    price: 21499,
    originalPrice: 26499,
    rating: 4.9,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&auto=format&fit=crop&q=80",
    badge: "Auto Duplex",
    condition: "100% Brand New",
    warranty: "1 Year Official Brother Warranty",
    features: ["Automatic 2-Sided Printing", "30 ppm High Speed Laser", "35-Sheet Auto Document Feeder", "Wi-Fi & Mobile Cloud Print"],
    inStock: true,
    description: "Brand new sealed commercial workhorse for businesses, schools, coaching institutes, and lawyers in Bhubaneswar. High yield cartridge with low running cost."
  },
  {
    id: "p-5",
    name: "Epson EcoTank L3210 All-in-One Color Ink Tank Printer (Print, Scan, Copy)",
    brand: "Epson",
    category: "inktank",
    price: 12999,
    originalPrice: 15999,
    rating: 4.9,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&auto=format&fit=crop&q=80",
    badge: "Lowest Cost Per Page",
    condition: "100% Brand New",
    warranty: "1 Year or 30,000 Pages Epson Warranty",
    features: ["Piezo Heat-Free Technology", "Yields 4,500 Black & 7,500 Color Pages", "Spill-Free Keyed Ink Refills", "Borderless Photo Printing"],
    inStock: true,
    description: "India's best-selling color ink tank printer. Brand new in sealed retail box with complete 4-color ink bottles included. Super economical ~7 paise per page."
  },
  {
    id: "p-6",
    name: "HP Smart Tank 580 All-in-One Wi-Fi Color Ink Tank Printer (Print, Scan, Copy)",
    brand: "HP",
    category: "inktank",
    price: 13999,
    originalPrice: 17800,
    rating: 4.8,
    reviewsCount: 26,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600&auto=format&fit=crop&q=80",
    badge: "Smart Wi-Fi",
    condition: "100% Brand New",
    warranty: "1 Year HP Onsite Warranty + 6M Bonus on Registration",
    features: ["Self-Healing Dual-Band Wi-Fi", "Includes up to 12,000 Black Pages of Ink", "Print from Anywhere with HP Smart App", "Guided Backlit Buttons"],
    inStock: true,
    description: "Brand new wireless all-in-one printer with high-capacity inks inside box. Setup demonstration and software installation supported at our Baramunda store."
  },
  {
    id: "p-7",
    name: "Canon imageCLASS LBP2900B Single Function Monochrome Laser Printer",
    brand: "Canon",
    category: "laser",
    price: 14499,
    originalPrice: 17995,
    rating: 5.0,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop&q=80",
    badge: "Legendary Workhorse",
    condition: "100% Brand New",
    warranty: "1 Year Canon Official Warranty",
    features: ["Standard Canon 303 / HP 12A Cartridge", "Heavy Duty Metal Architecture", "Zero Maintenance Hassle", "Quick First Print in 9.2s"],
    inStock: true,
    description: "The most trusted single-function laser printer in India. Rugged build quality, exceptional reliability, and universal low-cost cartridge refilling."
  },
  {
    id: "p-8",
    name: "Logitech MK295 Silent Wireless Keyboard and Mouse Combo (SilentTouch)",
    brand: "Logitech",
    category: "accessories",
    price: 1999,
    originalPrice: 2995,
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80",
    badge: "SilentTouch Tech",
    condition: "100% Brand New",
    warranty: "1 Year Logitech Warranty",
    features: ["90% Reduced Typing & Click Noise", "36-Month Keyboard Battery Life", "Spill-Resistant Durable Design", "Plug-and-Play Nano Receiver"],
    inStock: true,
    description: "Original boxed Logitech wireless combo with full numeric keypad and 8 dedicated shortcut keys. Keep your study desk or office space whisper-quiet."
  },
  {
    id: "p-9",
    name: "Crucial BX500 500GB 3D NAND SATA 2.5-inch Internal Solid State Drive (SSD)",
    brand: "Crucial",
    category: "storage",
    price: 2899,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80",
    badge: "Instant Speedup",
    condition: "100% Brand New",
    warranty: "3 Years Crucial Brand Warranty",
    features: ["Up to 540 MB/s Sequential Read Speed", "300% Faster Than Traditional HDDs", "Free OS Cloning & Fitting at Store", "Energy Efficient Micron Flash"],
    inStock: true,
    description: "Transform slow computers instantly! Genuine sealed pack with manufacturer warranty. Free professional SSD fitting and data cloning at S R COMPUTER."
  },
  {
    id: "p-10",
    name: "Kingston NV2 1TB PCIe 4.0 NVMe M.2 2280 High-Speed Internal SSD",
    brand: "Kingston",
    category: "storage",
    price: 5499,
    originalPrice: 8990,
    rating: 4.9,
    reviewsCount: 33,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=80",
    badge: "Gen 4x4 Speed",
    condition: "100% Brand New",
    warranty: "3 Years Kingston Brand Warranty",
    features: ["Blazing 3,500 MB/s Read Speed", "Compact M.2 Form Factor", "Ideal for Modern Laptops & Gaming Rigs", "Low Power & Cool Running"],
    inStock: true,
    description: "High performance Gen 4x4 NVMe SSD for fast gaming loads, video rendering, and heavy multitasking. Genuine sealed pack with brand hologram."
  },
  {
    id: "p-11",
    name: "TP-Link Archer C6 AC1200 Dual-Band Gigabit Wireless Wi-Fi Router (MU-MIMO)",
    brand: "TP-Link",
    category: "networking",
    price: 2299,
    originalPrice: 3499,
    rating: 4.8,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    badge: "Gigabit Speed",
    condition: "100% Brand New",
    warranty: "3 Years TP-Link Warranty",
    features: ["867 Mbps on 5GHz + 300 Mbps on 2.4GHz", "4 High-Gain External Antennas", "Full Gigabit WAN & LAN Ports", "Supports Access Point Mode"],
    inStock: true,
    description: "High-speed Gigabit Wi-Fi router ideal for fiber broadband (JioFiber, Airtel Xstream, BSNL FTTH). Delivers lag-free 4K streaming and online classes."
  },
  {
    id: "p-12",
    name: "HP 12A Original LaserJet Black Toner Cartridge (Q2612A)",
    brand: "HP",
    category: "toners",
    price: 3450,
    originalPrice: 4650,
    rating: 4.9,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    badge: "100% Original",
    condition: "100% Brand New",
    warranty: "HP Security Hologram Protected",
    features: ["Yields ~2,000 Pages Crisp Black", "Microfine Polymerized Original Toner", "Preserves Printer Drum & Fuser Life", "Smudge-Free Legal Quality"],
    inStock: true,
    description: "100% original factory-sealed HP 12A toner cartridge. Guarantees razor-sharp text and prevents fuser damage in HP LaserJet 1020, 1022, 3050, and M1005."
  }
];

export const STORE_GALLERY = [
  {
    title: "S R COMPUTER Retail Showroom & Laptop Display",
    location: "Baramunda, Bhubaneswar",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80",
    caption: "Our official retail showroom located at Soubhagya Nagar, Baramunda"
  },
  {
    title: "Brand New Laptops & Customer Consultation",
    location: "S R Computer Baramunda",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
    caption: "Personalized student and professional laptop guidance by our experienced staff"
  },
  {
    title: "Genuine Computer Accessories & Storage Shelf",
    location: "Showroom Display",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    caption: "Wide range of original keyboards, mice, SSDs, RAM, routers, and original toners"
  },
  {
    title: "Printers & Live Demonstration Counter",
    location: "S R Computer Tech Desk",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&auto=format&fit=crop&q=80",
    caption: "Live print quality demo, unboxing, and driver setup assistance before purchase"
  }
];

export const SECONDARY_CATEGORIES = [
  {
    id: "laptops",
    name: "Brand Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=160&auto=format&fit=crop&q=80"
  },
  {
    id: "all-in-one",
    name: "All-in-One Printers",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=160&auto=format&fit=crop&q=80"
  },
  {
    id: "accessories",
    name: "Peripherals & Mice",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=160&auto=format&fit=crop&q=80"
  },
  {
    id: "storage",
    name: "Internal SSDs",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=160&auto=format&fit=crop&q=80"
  }
];

export const VIDEO_REELS: VideoReel[] = [
  {
    id: "reel-1",
    customerName: "Priyanka Mishra",
    location: "Baramunda, Bhubaneswar",
    rating: 5,
    verified: true,
    videoThumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-packaged-delivery-box-43187-large.mp4",
    caption: "The staff is very polite and helped me choose the best laptop for my college studies! Got original accessories too.",
    productMentioned: "HP 15s Core i3 Thin & Light Laptop"
  },
  {
    id: "reel-2",
    customerName: "Sachveer Yadav",
    location: "Bhubaneswar, Odisha",
    rating: 5,
    verified: true,
    videoThumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-packaged-delivery-box-43187-large.mp4",
    caption: "Bought a brand new Brother Auto-Duplex printer for my coaching institute. Excellent retail price and same-day delivery!",
    productMentioned: "Brother DCP-L2541DW Multi-Function"
  },
  {
    id: "reel-3",
    customerName: "Ashok Kumar Mohanty",
    location: "Bhubaneswar, Odisha",
    rating: 5,
    verified: true,
    videoThumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-packaged-delivery-box-43187-large.mp4",
    caption: "Quality service, very friendly behavior. Best computer retail shop in Soubhagya Nagar for genuine IT hardware!",
    productMentioned: "Epson EcoTank L3210 All-in-One"
  },
  {
    id: "reel-4",
    customerName: "Snigdha Rani Das",
    location: "Soubhagya Nagar, Bhubaneswar",
    rating: 5,
    verified: true,
    videoThumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-packaged-delivery-box-43187-large.mp4",
    caption: "Upgraded my laptop with Crucial 500GB SSD in 20 minutes with genuine bill. Boots up in 5 seconds now!",
    productMentioned: "Crucial BX500 500GB SSD Upgrade"
  },
  {
    id: "reel-5",
    customerName: "Subhransu Sekhar Sahoo",
    location: "Bhubaneswar, Odisha",
    rating: 5,
    verified: true,
    videoThumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-packaged-delivery-box-43187-large.mp4",
    caption: "Quick service & best price. S R Computer is definitely one of the top trusted shops for laptops and accessories.",
    productMentioned: "Logitech MK295 Silent Wireless Combo"
  },
  {
    id: "reel-6",
    customerName: "Debasish Pattnaik",
    location: "Cuttack, Odisha",
    rating: 5,
    verified: true,
    videoThumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-packaged-delivery-box-43187-large.mp4",
    caption: "Local store pickup at Baramunda. Unboxed brand new sealed HP Smart Tank printer with full demo!",
    productMentioned: "HP Smart Tank 580 Wi-Fi All-in-One"
  }
];

export const CUSTOMER_TESTIMONIALS_SLIDER: CustomerTestimonial[] = [
  {
    id: "test-1",
    name: "Priyanka Mishra",
    rating: 5,
    reviewTitle: "Best laptop for studies and accessories",
    reviewText: "The staff is very polite and helped me choose the best laptop for my studies. Also got an original Dell charger and wireless mouse at best wholesale rates in Baramunda.",
    productName: "HP 15s 12th Gen Intel Core i3 Laptop",
    productImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&auto=format&fit=crop&q=80",
    date: "August 2026"
  },
  {
    id: "test-2",
    name: "Ashok Kumar Mohanty",
    rating: 5,
    reviewTitle: "Quality service, very friendly behavior",
    reviewText: "Quality service, very friendly behavior. Bought a brand new Brother multi-function laser printer for office and got HP computer accessories. Working flawlessly with official warranty.",
    productName: "Brother DCP-L2541DW Auto-Duplex Laser",
    productImage: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=200&auto=format&fit=crop&q=80",
    date: "July 2026"
  },
  {
    id: "test-3",
    name: "Subhransu Sekhar Sahoo",
    rating: 5,
    reviewTitle: "Quick service & best price",
    reviewText: "Quick service &best price. S R Computer is definitely one of the top trusted retail shops for laptops, printers, original toners, and desktop accessories in Bhubaneswar.",
    productName: "Logitech MK295 Silent Wireless Combo",
    productImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&auto=format&fit=crop&q=80",
    date: "July 2026"
  },
  {
    id: "test-4",
    name: "Debasish Pattnaik",
    rating: 5,
    reviewTitle: "Honest owner and very knowledgeable staff",
    reviewText: "Purchased brand new Epson EcoTank L3210 printer for my retail store. Original sealed box with complete inks, official warranty, and GST invoice.",
    productName: "Epson EcoTank L3210 All-in-One",
    productImage: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=200&auto=format&fit=crop&q=80",
    date: "June 2026"
  },
  {
    id: "test-5",
    name: "Snigdha Rani Das",
    rating: 5,
    reviewTitle: "Superfast SSD Upgrade Experience",
    reviewText: "Needed urgent RAM and SSD upgrade for my Dell laptop. Completed in 20 minutes with genuine bill and manufacturer warranty. Highly recommended in Soubhagya Nagar.",
    productName: "Crucial BX500 500GB High-Speed SSD",
    productImage: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&auto=format&fit=crop&q=80",
    date: "May 2026"
  },
  {
    id: "test-6",
    name: "Rakesh Nayak",
    rating: 5,
    reviewTitle: "Top Computer Shop in Baramunda",
    reviewText: "Wide collection of brand new laptops, printers, original toner cartridges, and computer components. Excellent post-sale support and guidance.",
    productName: "HP 12A Original Toner Cartridge",
    productImage: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&auto=format&fit=crop&q=80",
    date: "May 2026"
  }
];

export const BUYING_GUIDES: BuyingGuide[] = [
  {
    id: "guide-1",
    title: "Best Laptops for Students & Professionals in 2026: Complete Buyer's Guide",
    slug: "best-laptops-students-professionals-india-2026",
    summary: "Confused between Intel Core i3 vs i5, 8GB vs 16GB RAM, or battery life? Here is how our expert staff at S R COMPUTER helps you pick the right laptop for your budget.",
    fullContent: `Choosing the right laptop for college, coding, accounting, or office work requires balancing processor generation, memory, storage, and after-sales service.
    
    1. Processor Generation Matters: Always choose 12th Gen or higher Intel Core (e.g. Core i3-1215U, Core i5-1235U) or AMD Ryzen 5000/7000 series with hybrid performance/efficiency cores.
    2. Minimum 8GB to 16GB RAM: Modern operating systems like Windows 11 and web browsers consume 4-5GB just running background tabs.
    3. Mandatory SSD Storage: Never buy a laptop with an old mechanical HDD. PCIe NVMe SSDs boot Windows in under 8 seconds.
    4. Anti-Glare FHD Display: Protect your eyes during long study or work sessions with Full HD (1920x1080) matte screens.
    5. Official Brand Warranty & GST Invoice: Always buy brand new sealed units from authorized retail dealers with genuine tax invoices to claim manufacturer warranty.
    
    Visit S R COMPUTER at Soubhagya Nagar, Baramunda for free in-person laptop demos and student discounts.`,
    readTime: "5 min read",
    date: "Jan 15, 2026",
    author: "S R COMPUTER Retail Team",
    tags: ["Laptops", "Buying Guide", "Students", "HP", "Lenovo", "Dell"],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "guide-2",
    title: "Ink Tank vs Laser: Which Brand New Printer Is Right For Your Home or Business?",
    slug: "ink-tank-vs-laser-printer-guide-2026",
    summary: "Discover the real differences between color ink tank printers (Epson EcoTank, HP Smart Tank) and monochrome laser printers (Brother, Canon, HP).",
    fullContent: `When buying a brand new printer, the cost of ink or toner over 3 years is often higher than the printer itself.
    
    Choose an Ink Tank Printer (Epson L3210, HP Smart Tank 580) if:
    - You need color prints, school projects, charts, and photo printing.
    - Low printing cost is your priority: ~7 to 10 paise per black page.
    - You print at least a few pages every week to keep printheads fresh.
    
    Choose a Laser Printer (Brother DCP-L2541DW, Canon LBP2900B) if:
    - You primarily print black-and-white documents, bills, legal forms, and invoices.
    - You need high speed (20-30 pages per minute) and instant dry powder output.
    - The printer may sit unused for weeks without risking dried-up ink nozzles.
    
    Our Baramunda store offers live print demonstrations so you can compare speed and output quality side-by-side.`,
    readTime: "4 min read",
    date: "Feb 02, 2026",
    author: "S R COMPUTER Retail Team",
    tags: ["Printers", "Ink Tank", "Laser", "Epson", "Brother", "Canon"],
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "guide-3",
    title: "Essential Computer Accessories to Boost Your Work-From-Home & Gaming Setup",
    slug: "essential-computer-accessories-guide-2026",
    summary: "From silent wireless keyboards to high-speed NVMe SSDs and dual-band routers, explore the most impactful upgrades for your PC setup.",
    fullContent: `A great computing setup is defined by the peripherals that connect you to your digital work:
    
    1. Silent Wireless Keyboards & Ergonomic Mice: Logitech MK295 SilentTouch reduces click noise by 90%, preventing fatigue in study and office rooms.
    2. NVMe M.2 & 2.5-inch SATA SSDs: Upgrading your old laptop from HDD to Crucial or Kingston SSD makes it feel 3x faster immediately.
    3. Dual-Band Gigabit Wi-Fi Routers: Routers like the TP-Link Archer C6 ensure full fiber broadband speeds without packet drops during video meetings.
    4. Genuine Toner Cartridges: Using original HP and Brother cartridges protects your printer heating fusers and guarantees dark, smudge-free text.
    
    All accessories at S R COMPUTER come with official manufacturer warranty and on-spot testing.`,
    readTime: "4 min read",
    date: "Feb 20, 2026",
    author: "S R COMPUTER Retail Team",
    tags: ["Accessories", "Logitech", "SSD", "Crucial", "Networking"],
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80"
  }
];

