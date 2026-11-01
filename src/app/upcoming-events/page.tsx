"use client";

import { useEffect, useState, useTransition } from "react";
import { Calendar, Filter, Loader2, MapPin, Search } from "lucide-react";
import EventCard from "@/components/shared/EventCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { getEvents } from "@/lib/api";
import { IEvent } from "@/types";

const CATEGORIES = [
  "All",
  "Community Support",
  "Environmental Care",
  "Donation & Charity",
  "Education & Awareness",
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [, startTransition] = useTransition();

  const fetchEventsData = async () => {
    setIsLoading(true);
    try {
      const data = await getEvents({
        search: search.trim() || undefined,
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        city: city.trim() || undefined,
        sort,
        page,
        limit: 9,
      });
      setEvents(data.events);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, [selectedCategory, sort, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchEventsData();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <SectionHeading
          badge="Discover Opportunities"
          title="Explore Community Events"
          description="Browse upcoming volunteer initiatives, workshops, relief drives, and gatherings across the nation."
          align="center"
        />
      </div>

      {/* Filters & Search Bar */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111A2E]">
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search initiatives by title or keywords..."
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs outline-hidden focus:border-[#3BB3F0] focus:ring-2 focus:ring-[#3BB3F0]/20 dark:border-gray-700 dark:bg-[#162035] dark:text-white"
            />
          </div>

          {/* City input */}
          <div className="relative w-full md:w-56">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Filter by city..."
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs outline-hidden focus:border-[#3BB3F0] focus:ring-2 focus:ring-[#3BB3F0]/20 dark:border-gray-700 dark:bg-[#162035] dark:text-white"
            />
          </div>

          {/* Sort select */}
          <div className="w-full md:w-48">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-xs outline-hidden focus:border-[#3BB3F0] focus:ring-2 focus:ring-[#3BB3F0]/20 dark:border-gray-700 dark:bg-[#162035] dark:text-white cursor-pointer"
            >
              <option value="asc">Date: Nearest First</option>
              <option value="desc">Date: Latest First</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#004AAD] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </form>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 mr-1">
            <Filter className="h-3.5 w-3.5" />
            Category:
          </span>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setPage(1);
              }}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
                selectedCategory === category
                  ? "bg-[#004AAD] text-white shadow-xs dark:bg-[#3BB3F0] dark:text-[#0B1220]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-[#162035] dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          Showing {events.length} of {total} initiative{total === 1 ? "" : "s"}
        </span>
      </div>

      {/* Event Grid or Empty State */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-[#111A2E]">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
            No events found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search query, city, or category filter to discover other opportunities.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold transition cursor-pointer ${
                page === p
                  ? "bg-[#004AAD] text-white shadow-xs dark:bg-[#3BB3F0] dark:text-[#0B1220]"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
