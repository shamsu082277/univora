"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import {
  DEFAULT_EVENT_PLACEHOLDER,
  isTrustedImageUrl,
} from "@/lib/constants/images";

export interface EventImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackSrc?: string;
}

/**
 * EventImage Component
 *
 * Secure Next.js Image wrapper that:
 * 1. Validates external image URLs against trusted hostnames before passing them to next/image.
 * 2. Immediately replaces invalid or unsupported hostnames with a local placeholder SVG, preventing Next.js runtime crashes.
 * 3. Gracefully catches runtime 404s/network errors via onError and falls back to placeholder.
 * 4. Preserves all Next.js layout, responsive, and performance optimizations.
 */
export default function EventImage({
  src,
  alt,
  fallbackSrc = DEFAULT_EVENT_PLACEHOLDER,
  className = "",
  onError,
  ...props
}: EventImageProps) {
  // Determine if initial src is trusted
  const isSafe = isTrustedImageUrl(src);
  const initialResolvedSrc = isSafe && src ? src.trim() : fallbackSrc;

  const [currentSrc, setCurrentSrc] = useState<string>(initialResolvedSrc);
  const [hasError, setHasError] = useState(false);

  // Sync state if src or fallbackSrc prop changes
  useEffect(() => {
    if (isTrustedImageUrl(src) && src) {
      setCurrentSrc(src.trim());
      setHasError(false);
    } else {
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    }
  }, [src, fallbackSrc]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt || "Event Image"}
      className={className}
      onError={handleImageError}
    />
  );
}
