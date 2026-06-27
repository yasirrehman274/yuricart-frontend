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

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: ProductImageData | string;
  description?: string;
  status: "active" | "inactive";
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: ProductImageData | string;
  logo?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export function getImageUrl(item: { image?: ProductImageData | string } | { logo?: string }): string {
  const img = "image" in item ? (item as { image?: ProductImageData | string }).image : undefined;
  if (!img) {
    const logo = (item as { logo?: string }).logo;
    return logo || "";
  }
  if (typeof img === "string") return img;
  return img?.url || "";
}

export function getImagePublicId(item: { image?: ProductImageData | string }): string | undefined {
  const img = item.image;
  if (!img || typeof img === "string") return undefined;
  return img.publicId;
}

export interface ProductImageData {
  url: string;
  publicId?: string;
}

export interface ProductImages {
  primary: ProductImageData;
  gallery: ProductImageData[];
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
  images: ProductImages;
  tags: string[];
  colors: string[];
  sizes: string[];
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
  image: ProductImageData | string;
  link?: string;
  status: "active" | "inactive";
  sortOrder: number;
  placement: "hero" | "promo";
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminOrder {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  total: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt?: string;
}

export interface AdminCoupon {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  status: "active" | "inactive";
  expiryDate?: string;
}

export interface DashboardStatGroup {
  total: number;
  monthly?: number;
  pending?: number;
  active?: number;
}

export interface DashboardRecentOrder {
  orderNumber: string;
  customerName: string;
  total: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt?: string;
}

export interface DashboardStats {
  orders: DashboardStatGroup;
  revenue: DashboardStatGroup;
  products: DashboardStatGroup;
  customers: DashboardStatGroup;
  recentOrders?: DashboardRecentOrder[];
}
