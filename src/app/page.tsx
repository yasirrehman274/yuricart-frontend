import Product from "@/components/Products";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import HeroSlider from "@/components/SliderHero";
import {
  getFeaturedProducts,
  getProducts,
  toLegacyProductCards,
} from "@/lib/api";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-4 px-4 py-5 md:space-y-10 md:px-5 md:py-10">
      <HeroSlider />
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  try {
    const { items } = await getFeaturedProducts({ limit: 30 });
    const products =
      items.length > 0
        ? toLegacyProductCards(items)
        : toLegacyProductCards((await getProducts({ limit: 30 })).items);

    if (!products.length) return null;

    return (
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  } catch {
    return null;
  }
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
