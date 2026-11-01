import Link from "next/link";
import { ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export default function SecondaryButton({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  size = "md",
  icon,
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs sm:text-sm font-medium",
    md: "px-5 py-2.5 text-sm sm:text-base font-semibold",
    lg: "px-6 py-3.5 text-base sm:text-lg font-semibold",
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-xs transition-all duration-200 hover:border-[#3BB3F0] hover:bg-gray-50 hover:text-[#004AAD] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer dark:border-gray-700 dark:bg-[#111A2E] dark:text-gray-200 dark:hover:border-[#3BB3F0] dark:hover:bg-[#162035] dark:hover:text-white ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

