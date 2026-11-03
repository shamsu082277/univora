"use client";

import { useState } from "react";
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
  // Determine if the URL is trusted; if not, immediately use the fallback placeholder
  const isSafe = isTrustedImageUrl(src);
  const resolvedSrc = isSafe && src ? src.trim() : fallbackSrc;

  // Track if a runtime loading error occurred for this URL
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  // If the current image previously failed to load at runtime, display the fallback
  const finalSrc = failedSrc === resolvedSrc ? fallbackSrc : resolvedSrc;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setFailedSrc(resolvedSrc);
    if (onError) {
      onError(e);
    }
  };

  return (
    <Image
      {...props}
      src={finalSrc}
      alt={alt || "Event Image"}
      className={className}
      onError={handleImageError}
    />
  );
}
