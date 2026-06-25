import { formatCurrency } from "@/lib/utils";
import {
  getBrandName,
  getProductDiscountPercent,
  getProductEffectivePrice,
  getProductImageUrl,
  getProductPrimaryImage,
  getProductGallery,
  hasProductDiscount,
} from "./product-utils";
import { Product } from "./types";

export type LegacyProductCard = ReturnType<typeof toLegacyProductCard>;
export type LegacyProductDetail = ReturnType<typeof toLegacyProductDetail>;

export function toLegacyProductCard(product: Product) {
  const imageUrl = getProductImageUrl(product);
  const primaryImage = getProductPrimaryImage(product);
  const gallery = getProductGallery(product);
  const discounted = hasProductDiscount(product);
  const effectivePrice = discounted ? product.salePrice! : product.price;
  const formattedPrice = formatCurrency(effectivePrice, product.currency);
  const formattedOriginal = formatCurrency(product.price, product.currency);
  const discountPercent = getProductDiscountPercent(product);

  const allImages = primaryImage
    ? [{ url: primaryImage.url, alt: primaryImage.publicId }]
    : [];
  gallery.forEach((img) => {
    allImages.push({ url: img.url, alt: img.publicId });
  });

  const mediaItems = allImages.length
    ? allImages.map((img) => ({
        image: {
          url: img.url,
          altText: product.title,
        },
      }))
    : [
        {
          image: {
            url: imageUrl,
            altText: product.title,
          },
        },
      ];

  return {
    _id: product._id,
    slug: product.slug,
    name: product.title,
    description: product.description,
    ribbon: product.ribbon,
    media: {
      mainMedia: {
        image: {
          url: imageUrl,
          altText: primaryImage?.url ? product.title : "",
        },
      },
      items: mediaItems,
    },
    price: {
      formatted: {
        price: formattedPrice,
      },
    },
    priceData: {
      currency: product.currency,
      price: product.price,
      formatted: {
        price: formattedOriginal,
        discountedPrice: discounted ? formattedPrice : undefined,
      },
    },
    priceRange: {
      minValue: effectivePrice,
      maxValue: product.price,
    },
    discount:
      discounted && discountPercent
        ? {
            type: "PERCENT" as const,
            value: discountPercent,
          }
        : undefined,
  };
}

export function toLegacyProductDetail(product: Product): LegacyProductCard & {
  brand?: string;
  manageVariants?: boolean;
  productOptions?: Array<{
    name?: string;
    choices?: Array<{
      description?: string;
      media?: { items?: Array<{ image?: { url?: string; altText?: string } }> };
    }>;
  }>;
  variants?: Array<{
    choices?: Record<string, string>;
    stock?: { quantity?: number; inStock?: boolean };
  }>;
  stock?: { quantity?: number; inventoryStatus?: string };
} {
  const card = toLegacyProductCard(product);
  const brandName = getBrandName(product.brand);
  const hasVariants =
    (product.variants?.length ?? 0) > 0 ||
    product.colors.length > 0 ||
    product.sizes.length > 0;

  const productOptions: Array<{
    name?: string;
    choices?: Array<{
      description?: string;
      media?: { items?: Array<{ image?: { url?: string; altText?: string } }> };
    }>;
  }> = [];

  if (product.colors.length) {
    productOptions.push({
      name: "Color",
      choices: product.colors.map((color) => ({
        description: color,
        media: { items: [] },
      })),
    });
  }

  if (product.sizes.length) {
    productOptions.push({
      name: "Size",
      choices: product.sizes.map((size) => ({ description: size })),
    });
  }

  const variants =
    product.variants?.map((variant) => ({
      choices: variant.options,
      stock: {
        quantity: variant.stock ?? 0,
        inStock: (variant.stock ?? 0) > 0,
      },
    })) ?? [];

  return {
    ...card,
    brand: brandName,
    manageVariants: hasVariants,
    productOptions: productOptions.length ? productOptions : undefined,
    variants: variants.length ? variants : undefined,
    stock: {
      quantity: product.stock,
      inventoryStatus: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    },
  };
}

export function toLegacyProductCards(products: Product[]) {
  return products.map(toLegacyProductCard);
}
