import Link from "next/link";

interface LogoProps {
  showTagline?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ showTagline = false, className = "", size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "h-8 w-8 text-base",
    md: "h-9 w-9 sm:h-10 sm:w-10 text-lg",
    lg: "h-12 w-12 text-2xl",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* Brand U-Icon */}
      <div
        className={`flex ${iconSizes[size]} items-center justify-center rounded-xl bg-gradient-to-br from-[#3BB3F0] to-[#004AAD] text-white font-bold shadow-md shadow-[#3BB3F0]/20 transition-transform duration-200 group-hover:scale-105 shrink-0`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 sm:h-6 sm:w-6"
        >
          <path d="M6 4v9a6 6 0 0 0 12 0V4" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-tight">
        <span className={`font-bold tracking-tight text-gray-900 dark:text-white ${textSizes[size]}`}>
          Univora
        </span>
        {showTagline && (
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 hidden sm:inline-block">
            Together, We Create Change.
          </span>
        )}
      </div>
    </Link>
  );
}

