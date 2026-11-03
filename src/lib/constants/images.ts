/**
 * Whitelist of trusted image provider hostnames.
 * Only HTTPS URLs from these hostnames are passed to Next.js Image.
 */
export const TRUSTED_IMAGE_HOSTS = [
  "images.unsplash.com",
  "res.cloudinary.com",
  "images.pexels.com",
  "i.imgur.com",
  "lh3.googleusercontent.com",
  "avatars.githubusercontent.com",
] as const;

export type TrustedImageHost = (typeof TRUSTED_IMAGE_HOSTS)[number];

export const DEFAULT_EVENT_PLACEHOLDER = "/images/event-placeholder.svg";

/**
 * Checks whether an image URL is safe to pass to next/image without crashing.
 * Local paths starting with "/" are always safe.
 * External URLs must use HTTPS and match a trusted hostname.
 */
export function isTrustedImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;

  const trimmed = url.trim();
  if (!trimmed) return false;

  // Local static paths (e.g. /images/event-placeholder.svg) are always safe
  if (trimmed.startsWith("/")) return true;

  try {
    const parsed = new URL(trimmed);

    // Reject insecure HTTP, ftp, data URIs, javascript, etc.
    if (parsed.protocol !== "https:") {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    // Check if hostname matches or is a subdomain of trusted hosts
    return TRUSTED_IMAGE_HOSTS.some(
      (trusted) =>
        hostname === trusted.toLowerCase() ||
        hostname.endsWith(`.${trusted.toLowerCase()}`)
    );
  } catch {
    return false;
  }
}

/**
 * Validates an image URL for form submissions and returns a human-readable error if invalid.
 */
export function validateImageUrl(url?: string | null): {
  isValid: boolean;
  error?: string;
  hostname?: string;
} {
  if (!url || typeof url !== "string" || !url.trim()) {
    return {
      isValid: false,
      error: "Thumbnail image URL is required.",
    };
  }

  const trimmed = url.trim();

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      isValid: false,
      error: "Please enter a valid, well-formed URL (e.g., https://images.unsplash.com/...).",
    };
  }

  if (parsed.protocol !== "https:") {
    return {
      isValid: false,
      error: "Only secure HTTPS image URLs are permitted (http:// is not allowed).",
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const isAllowed = TRUSTED_IMAGE_HOSTS.some(
    (trusted) =>
      hostname === trusted.toLowerCase() ||
      hostname.endsWith(`.${trusted.toLowerCase()}`)
  );

  if (!isAllowed) {
    return {
      isValid: false,
      hostname,
      error: `Unsupported image provider '${hostname}'. Please use an image from a supported provider: Unsplash (images.unsplash.com), Cloudinary (res.cloudinary.com), Pexels, or Imgur.`,
    };
  }

  return { isValid: true, hostname };
}

/**
 * Returns a safe image URL to render. If the provided URL is untrusted or missing,
 * returns the default local placeholder.
 */
export function getSafeImageUrl(
  url?: string | null,
  fallback = DEFAULT_EVENT_PLACEHOLDER
): string {
  if (isTrustedImageUrl(url) && url) {
    return url.trim();
  }
  return fallback;
}

