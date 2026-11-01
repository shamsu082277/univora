import { Users } from "lucide-react";

interface ParticipantCounterProps {
  current: number;
  capacity?: number;
  showProgress?: boolean;
  className?: string;
}

export default function ParticipantCounter({
  current,
  capacity,
  showProgress = false,
  className = "",
}: ParticipantCounterProps) {
  const percentage = capacity ? Math.min(100, Math.round((current / capacity) * 100)) : 0;
  const isFull = capacity ? current >= capacity : false;
  const remaining = capacity ? Math.max(0, capacity - current) : null;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs font-medium text-gray-600 dark:text-gray-300">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-[#004AAD] dark:text-[#3BB3F0]" />
          <span>
            <strong className="text-gray-900 dark:text-white">{current}</strong>{" "}
            {capacity ? `/ ${capacity} volunteers` : "joined"}
          </span>
        </span>

        {capacity && (
          <span
            className={`text-[11px] font-semibold ${
              isFull
                ? "text-red-500"
                : remaining && remaining <= 10
                ? "text-amber-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {isFull ? "Event Full" : `${remaining} spots left`}
          </span>
        )}
      </div>

      {showProgress && capacity && (
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isFull
                ? "bg-red-500"
                : percentage > 75
                ? "bg-amber-500"
                : "bg-gradient-to-r from-[#3BB3F0] to-[#004AAD]"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

