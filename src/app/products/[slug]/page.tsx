import {
  getProductBySlug,
  getRelatedProducts,
  toLegacyProductCards,
  toLegacyProductDetail,
} from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";
import { Suspense } from "react";
import Product from "@/components/Products";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductImageUrl } from "@/lib/api/product-utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product?._id) notFound();

  const imageUrl = getProductImageUrl(product);

  return {
    title: product.title,
    description: "Get this product on Yuricart Electronics",
    openGraph: {
      images: imageUrl ? [{ url: imageUrl, alt: product.title }] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const apiProduct = await getProductBySlug(slug);

  if (!apiProduct?._id) notFound();

  const legacyProduct = toLegacyProductDetail(apiProduct);

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={legacyProduct} apiProduct={apiProduct} />
      <hr />
      <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
        <RelatedProducts slug={slug} />
      </Suspense>
    </main>
  );
}

async function RelatedProducts({ slug }: { slug: string }) {
  const relatedProducts = await getRelatedProducts(slug);
  if (!relatedProducts.length) return null;

  const legacyProducts = toLegacyProductCards(relatedProducts);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid lg:grid-cols-4">
        {legacyProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
