import Link from "next/link";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export default function PrimaryButton({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  size = "md",
  icon,
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs sm:text-sm font-medium",
    md: "px-5 py-2.5 text-sm sm:text-base font-semibold",
    lg: "px-6 py-3.5 text-base sm:text-lg font-semibold",
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-xl bg-[#004AAD] text-white shadow-md shadow-[#004AAD]/20 transition-all duration-200 hover:bg-[#003B8C] hover:shadow-lg hover:shadow-[#004AAD]/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${sizeClasses[size]} ${className}`;

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
