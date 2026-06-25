/* eslint-disable @next/next/no-img-element */

import { ImgHTMLAttributes } from "react";

type ProductImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> & {
  /** Direct image URL from custom backend */
  src?: string;
  /** Alias kept for gradual WixImage migration */
  mediaIdentifier?: string;
  placeholder?: string;
  alt?: string | null | undefined;
  width?: number;
  height?: number;
};

/**
 * Storefront product/category image component.
 * Drop-in replacement for WixImage during migration — accepts either `src` or `mediaIdentifier`.
 */
export default function ProductImage({
  src,
  mediaIdentifier,
  placeholder = "/placeholder.png",
  alt,
  width,
  height,
  className,
  ...props
}: ProductImageProps) {
  const imageUrl = src || mediaIdentifier || placeholder;

  return (
    <img
      src={imageUrl}
      alt={alt || ""}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
}
