// ── Product domain models ─────────────────────────────────────────────────────
// Single source of truth for all product-related types across the application.

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  size: string;
  color?: string;
  colorHex?: string;
  stock: number;
}

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;        // 1–5
  date: string;          // ISO date string
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  currency: string;
  originalPrice?: number; // for sale items
  images: ProductImage[];
  description: string;
  details: string[];      // bullet-point specs
  material?: string;
  origin?: string;
  variants: ProductVariant[];
  tags: string[];
  rating: number;         // aggregate 1–5
  reviewCount: number;
  reviews: ProductReview[];
  isFeatured?: boolean;
  isNew?: boolean;
  isLimited?: boolean;
  relatedIds?: string[];
}

export type ProductCategory =
  | 'oversized-tee'
  | 'hoodie'
  | 'sweater'
  | 'shirt'
  | 'jacket'
  | 'scarf'
  | 'tote-bag'
  | 'accessory';

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'oversized-tee': 'Oversized T-Shirt',
  'hoodie':        'Hoodie',
  'sweater':       'Sweater',
  'shirt':         'Luxury Shirt',
  'jacket':        'Jacket',
  'scarf':         'Scarf',
  'tote-bag':      'Tote Bag',
  'accessory':     'Accessory',
};

// ── Cart models ───────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}