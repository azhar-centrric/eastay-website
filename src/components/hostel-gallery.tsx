"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryImage = { src: string; alt: string };

/** One large photo with arrows and a thumbnail strip underneath. */
export function HostelGallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const current = images[index];

  const go = (next: number) => setIndex((next + count) % count);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  };

  return (
    <div role="group" aria-roledescription="carousel" aria-label={`${name} photos`} onKeyDown={onKeyDown}>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          priority={index === 0}
        />
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-md transition-colors hover:bg-paper"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-md transition-colors hover:bg-paper"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-white" aria-live="polite">
          {index + 1} / {count}
        </span>
      </div>

      <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <li key={img.src} className="shrink-0">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}: ${img.alt}`}
              aria-current={i === index}
              className={cn(
                "relative block size-16 overflow-hidden bg-sand transition-opacity",
                i === index ? "opacity-100 ring-2 ring-eastay ring-offset-2 ring-offset-paper" : "opacity-60 hover:opacity-100",
              )}
            >
              <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
