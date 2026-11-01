export default function EventSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-xs dark:border-gray-800 dark:bg-[#111A2E] animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="aspect-[16/10] w-full bg-gray-200 dark:bg-gray-800" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div>
          {/* Metadata badges */}
          <div className="flex items-center gap-3">
            <div className="h-4 w-24 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Title */}
          <div className="mt-3 space-y-2">
            <div className="h-5 w-4/5 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-5 w-2/3 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Location */}
          <div className="mt-3 h-3.5 w-1/2 rounded-md bg-gray-200 dark:bg-gray-800" />

          {/* Description */}
          <div className="mt-3 space-y-1.5">
            <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-5/6 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        {/* Button */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="h-9 w-full rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <EventSkeleton key={i} />
      ))}
    </div>
  );
}

