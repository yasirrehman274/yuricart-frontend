"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./use-toast";
import { Product } from "@/lib/api/types";
import { useCartStore } from "@/lib/cart/cart-store";

export function useCartCheckout() {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const items = useCartStore((s) => s.items);

  async function startCheckoutFlow() {
    if (!items.length) {
      toast({
        variant: "destructive",
        description: "Your cart is empty.",
      });
      return;
    }

    setPending(true);
    router.push("/checkout");
    setPending(false);
  }

  return { startCheckoutFlow, pending };
}

export function useQuickBuy() {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const clearCart = useCartStore((s) => s.clearCart);

  async function startCheckoutFlow(values: {
    product: Product;
    selectedOptions: Record<string, string>;
    quantity: number;
  }) {
    setPending(true);
    try {
      clearCart();
      addItem(values);
      router.push("/checkout");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to start checkout. Please try again.",
      });
    } finally {
      setPending(false);
    }
  }

  return { startCheckoutFlow, pending };
}
