"use client";

import Image from "next/image";
import { useState } from "react";
import { mediaItems } from "@/content/media";
import type { NewsItem } from "@/content/news";

export function NewsImage({ item, sizes, priority = false }: { item: NewsItem; sizes: string; priority?: boolean }) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const image = mediaItems.find((media) => media.id === item.imageId);
  const remoteVisible = item.imageUrl && failedUrl !== item.imageUrl;

  return (
    <>
      {image ? (
        <Image src={image.src} alt={remoteVisible ? "" : image.alt} fill sizes={sizes} priority={priority}
          className="media-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none"
          style={{ objectPosition: image.focalPoint }} />
      ) : null}
      {remoteVisible ? (
        // Editorial images come from multiple press domains; retain the local fallback on failure.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.imageUrl} alt="" loading={priority ? "eager" : "lazy"} decoding="async" referrerPolicy="no-referrer"
          onError={() => setFailedUrl(item.imageUrl!)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none" />
      ) : null}
    </>
  );
}
