import PaginationBar from "@/components/PaginationBar";
import Product from "@/components/Products";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
  toLegacyProductCards,
} from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      images: category.image ? [{ url: category.image }] : [],
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { page = "1" } = await searchParams;
  const category = await getCategoryBySlug(slug);

  if (!category?._id) notFound();

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Products</h2>
      <Suspense fallback={<LoadingSkeleton />} key={page}>
        <CategoryProducts categorySlug={slug} page={parseInt(page)} />
      </Suspense>
    </div>
  );
}

interface CategoryProductsProps {
  categorySlug: string;
  page: number;
}

async function CategoryProducts({ categorySlug, page }: CategoryProductsProps) {
  const pageSize = 8;

  const collectionProducts = await getProductsByCategorySlug(categorySlug, {
    limit: pageSize,
    page,
  });

  if (!collectionProducts.items.length && page === 1) notFound();
  if (page > collectionProducts.meta.totalPages) notFound();

  const legacyProducts = toLegacyProductCards(collectionProducts.items);

  return (
    <div className="space-y-10">
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {legacyProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <PaginationBar
        currentPage={page}
        totalPages={collectionProducts.meta.totalPages}
      />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
