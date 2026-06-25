"use client";

import { Button, ButtonProps } from "./ui/button";
import { Product } from "@/lib/api/types";
import { useToast } from "@/hooks/use-toast";

interface BackInStockNotificationButtonProps extends ButtonProps {
  product: Product | { _id?: string; name?: string };
}

export default function BackInStockNotificationButton({
  product,
  ...props
}: BackInStockNotificationButtonProps) {
  const { toast } = useToast();

  return (
    <Button
      variant="secondary"
      {...props}
      onClick={() =>
        toast({
          description: "Back-in-stock notifications will be available soon.",
        })
      }
    >
      Notify when available
    </Button>
  );
}
