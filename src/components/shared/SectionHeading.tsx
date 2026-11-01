import { ReactNode } from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}

export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className = "",
  action,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col ${
        isCenter
          ? "items-center text-center mx-auto"
          : "items-start text-left"
      } max-w-3xl mb-12 sm:mb-16 ${className}`}
    >
      {badge && (
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#3BB3F0]/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#004AAD] uppercase dark:bg-[#3BB3F0]/20 dark:text-[#3BB3F0]">
          {badge}
        </div>
      )}

      <div className={`w-full flex ${isCenter ? "flex-col items-center" : "flex-col sm:flex-row sm:items-end sm:justify-between"} gap-4`}>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
