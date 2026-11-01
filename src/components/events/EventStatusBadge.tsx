interface EventStatusBadgeProps {
  category: string;
  className?: string;
  isFull?: boolean;
}

export default function EventStatusBadge({
  category,
  className = "",
  isFull = false,
}: EventStatusBadgeProps) {
  if (isFull) {
    return (
      <span
        className={`inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/70 dark:text-red-400 ${className}`}
      >
        Capacity Reached
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#004AAD] shadow-xs backdrop-blur-xs dark:bg-[#0B1220]/90 dark:text-[#3BB3F0] ${className}`}
    >
      {category}
    </span>
  );
}

