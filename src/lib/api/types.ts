export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: PaginationMeta;
  message?: string;
  errors?: unknown;
}

export type ProductsSort =
  | "createdAt_desc"
  | "createdAt_asc"
  | "updatedAt_desc"
  | "updatedAt_asc"
  | "price_asc"
  | "price_desc"
  | "title_asc"
  | "title_desc";

export interface StorefrontProductImage {
  url: string;
  alt?: string;
  publicId?: string;
  isPrimary?: boolean;
}

export interface StorefrontImageData {
  url: string;
  publicId?: string;
}

export interface StorefrontProductImages {
  primary: StorefrontImageData;
  gallery: StorefrontImageData[];
}

export interface StorefrontProductVariant {
  sku?: string;
  options?: Record<string, string>;
  price?: number;
  salePrice?: number;
  stock?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  status?: "active" | "inactive";
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  sku?: string;
  stock: number;
  category?: Category | string;
  brand?: Brand | string;
  images: StorefrontProductImages;
  tags: string[];
  colors: string[];
  sizes: string[];
  variants?: StorefrontProductVariant[];
  status: "draft" | "active" | "archived";
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  ribbon?: string;
  currency: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  image: string;
  link?: string;
  status?: "active" | "inactive";
  sortOrder: number;
  placement: "hero" | "promo";
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  lineId: string;
  productId: string;
  slug: string;
  title: string;
  image?: string;
  price: number;
  salePrice?: number;
  quantity: number;
  sku?: string;
  options?: Record<string, string>;
  currency: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  slug: string;
  sku?: string;
  image?: string;
  price: number;
  quantity: number;
  options?: Record<string, string>;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: "cod" | "whatsapp" | "mpesa";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  trackingNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductQueryParams {
  q?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductsSort;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  tags?: string;
  page?: number;
  limit?: number;
}

export interface CategoryQueryParams {
  q?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface BrandQueryParams {
  q?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface BannerQueryParams {
  placement?: "hero" | "promo";
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}
