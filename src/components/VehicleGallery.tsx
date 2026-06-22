
"use client";

import Image from "next/image";
import { useState } from "react";

export default function VehicleGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  const current = images[active];
  const currentFailed = failed.has(active);

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        {currentFailed || !current ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-background">
            <span className="font-heading text-text-muted text-xl px-6 text-center">{alt}</span>
          </div>
        ) : (
          <Image
            src={current}
            alt={alt}
            fill
            priority
            className="object-cover"
            onError={() => setFailed((prev) => new Set(prev).add(active))}
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`relative aspect-[4/3] overflow-hidden border transition-colors duration-200 ${
                i === active ? "border-accent" : "border-text/10 hover:border-text/40"
              }`}
            >
              {!failed.has(i) ? (
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  onError={() => setFailed((prev) => new Set(prev).add(i))}
                />
              ) : (
                <div className="absolute inset-0 bg-surface" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


