"use client";

import { Search, X } from "lucide-react";
import { EVENT_CATEGORIES } from "@/types/event";

interface EventFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: "upcoming" | "recent";
  onSortChange: (sort: "upcoming" | "recent") => void;
  onReset: () => void;
  totalCount: number;
}

export default function EventFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onReset,
  totalCount,
}: EventFiltersProps) {
  const hasActiveFilters = Boolean(search || selectedCategory || sortBy !== "upcoming");

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xs dark:border-gray-800 dark:bg-[#111A2E]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-center">
        {/* Search Input */}
        <div className="relative sm:col-span-7 lg:col-span-8">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events by title or location..."
            className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-gray-900 shadow-2xs outline-hidden focus:border-[#3BB3F0] focus:ring-2 focus:ring-[#3BB3F0]/20 dark:border-gray-700 dark:bg-[#162035] dark:text-white"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="sm:col-span-5 lg:col-span-4 flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 shrink-0">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "upcoming" | "recent")}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm text-gray-800 shadow-2xs outline-hidden focus:border-[#3BB3F0] dark:border-gray-700 dark:bg-[#162035] dark:text-white"
          >
            <option value="upcoming">Upcoming Date (Soonest first)</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
      </div>

      {/* Category Pills (Horizontal scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
            !selectedCategory
              ? "bg-[#004AAD] text-white shadow-xs"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          All Categories
        </button>

        {EVENT_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(isSelected ? "" : category)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                isSelected
                  ? "bg-[#004AAD] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Filter summary bar */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <span>
          Showing <strong className="text-gray-900 dark:text-white">{totalCount}</strong> upcoming{" "}
          {totalCount === 1 ? "event" : "events"}
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="font-semibold text-[#004AAD] hover:underline dark:text-[#3BB3F0] cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>
    </div>
  );
}

