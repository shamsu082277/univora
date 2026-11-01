import Link from "next/link";
import { ReactNode } from "react";
import { CalendarX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

export default function EmptyState({
  title = "No Events Found",
  description = "There are no events matching your selected criteria. Try adjusting your search query or category filters.",
  icon,
  actionText,
  actionHref,
  onActionClick,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 sm:p-12 text-center dark:border-gray-800 dark:bg-[#111A2E]/50 ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3BB3F0]/10 text-[#004AAD] dark:text-[#3BB3F0]">
        {icon || <CalendarX className="h-7 w-7" />}
      </div>

      <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>

      {actionText && actionHref && (
        <div className="mt-6">
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center rounded-xl bg-[#004AAD] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition"
          >
            {actionText}
          </Link>
        </div>
      )}

      {actionText && onActionClick && !actionHref && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onActionClick}
            className="inline-flex items-center justify-center rounded-xl bg-[#004AAD] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition cursor-pointer"
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
}
