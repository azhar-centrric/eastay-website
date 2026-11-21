import Image from "next/image";
import { cn } from "@/lib/utils";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Fills its (relatively positioned, aspect-ratio'd) parent. SVG placeholders skip
 * the optimizer; JPG/PNG/WebP photos you drop in later are optimized automatically.
 */
export function Photo({ src, alt, sizes, priority, className }: PhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={src.endsWith(".svg")}
      className={cn("object-cover", className)}
    />
  );
}
