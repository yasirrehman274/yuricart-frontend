"use client";

import { Suspense } from "react";
import { useCart } from "@/hooks/cart";
import Link from "next/link";
import Image from "next/image";
import MainNavigation from "@/app/MainNavigation";
import SearchField from "@/components/SearchFiend";
import MobileMenu from "@/app/MobileMenu";
import MobileBottomNav from "@/components/ui/MobileBottomNav";
import UserButton from "@/components/UserButton";
import ShoppingCartButton from "@/app/ShoppingCartButton";
import { Category } from "@/lib/api/types";

interface NavbarClientProps {
  collections: Category[];
}

export default function NavbarClient({ collections }: NavbarClientProps) {
  const { data: cartData } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 shadow-sm">
        <div className="bg-background">
          <div className="mx-auto max-w-7xl p-3 md:p-5">
            <Suspense>
              <div className="block md:hidden">
                <MobileMenu collections={collections} />
              </div>
            </Suspense>

            <div className="hidden items-center gap-3 md:flex md:justify-between">
              <div className="flex">
                <Link href="/" className="flex items-center gap-4">
                  <Image src="/logonew.svg" alt="Logo" width={60} height={60} />
                </Link>
                <MainNavigation
                  collections={collections}
                  className="hidden md:flex"
                />
              </div>

              <SearchField className="hidden max-w-96 md:inline" />

              <div className="flex items-center justify-center gap-5">
                <UserButton className="hidden md:inline-flex" />
                <ShoppingCartButton initialData={cartData} />
              </div>
            </div>
          </div>
        </div>

        <MobileBottomNav />
      </header>
    </>
  );
}
