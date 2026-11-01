"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, RefreshCw } from "lucide-react";
import { getUpcomingEvents } from "@/lib/api/events";
import { mockUpcomingEvents } from "@/data/mockData";
import { IEvent } from "@/types";
import SectionHeading from "@/components/shared/SectionHeading";
import EventFilters from "@/components/events/EventFilters";
import EventGrid from "@/components/events/EventGrid";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<"upcoming" | "recent">("upcoming");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);

  // Fetch events
  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getUpcomingEvents({
        category: selectedCategory || undefined,
        search: search || undefined,
        sort: sortBy,
      });

      if (data && Array.isArray(data) && data.length > 0) {
        setEvents(data);
        setIsUsingDemoData(false);
      } else {
        // Fallback to initial upcoming seed data if DB collection is empty
        setEvents(mockUpcomingEvents);
        setIsUsingDemoData(false);
      }
    } catch {
      // Backend API is offline
      setEvents(mockUpcomingEvents);
      setIsUsingDemoData(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Filter only events that are today or later
  const upcomingFilteredEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events.filter((evt) => {
      // Date filter: today or later
      try {
        const evtDate = new Date(evt.eventDate);
        if (!isNaN(evtDate.getTime()) && evtDate < today) {
          return false;
        }
      } catch {
        // Keep if date format is non-standard
      }

      // Category filter
      if (selectedCategory && evt.eventType !== selectedCategory) {
        return false;
      }

      // Search filter: title or location
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(query);
        const matchesLocation = evt.location.toLowerCase().includes(query);
        const matchesDescription = evt.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }, [events, selectedCategory, search]);

  // Sort events
  const sortedEvents = useMemo(() => {
    return [...upcomingFilteredEvents].sort((a, b) => {
      const dateA = new Date(a.eventDate).getTime();
      const dateB = new Date(b.eventDate).getTime();

      if (sortBy === "upcoming") {
        return dateA - dateB; // Soonest date first
      } else {
        return dateB - dateA; // Most recently created / added
      }
    });
  }, [upcomingFilteredEvents, sortBy]);

  // Visible sliced events for Load More
  const visibleEvents = sortedEvents.slice(0, visibleCount);
  const hasMore = visibleCount < sortedEvents.length;

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSortBy("upcoming");
    setVisibleCount(6);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            badge="Explore Initiatives"
            title="Upcoming Social Development Events"
            description="Find and participate in volunteer initiatives across environmental care, community aid, charity drives, and youth education."
            align="left"
            className="mb-0"
          />

          <button
            type="button"
            onClick={loadEvents}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:bg-gray-800 transition shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh Events</span>
          </button>
        </div>

        {/* Informative Demo Data Notice if backend is offline */}
        {isUsingDemoData && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                <strong>Demo Mode:</strong> Displaying initial sample events because the Express REST API (<code>localhost:5000</code>) is not connected yet.
              </span>
            </span>
          </div>
        )}

        {/* Filters & Search Component */}
        <EventFilters
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            setVisibleCount(6);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setVisibleCount(6);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleResetFilters}
          totalCount={sortedEvents.length}
        />

        {/* Event Grid with Skeletons & Empty State */}
        <EventGrid
          events={visibleEvents}
          isLoading={isLoading}
          emptyTitle="No Upcoming Events Found"
          emptyDescription="There are no upcoming events matching your selected search query or category filters. Check back soon or try clearing filters."
          emptyActionText="Clear Filters"
          emptyActionHref="#"
        />

        {/* Load More Button */}
        {hasMore && !isLoading && (
          <div className="pt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-xs sm:text-sm font-bold text-[#004AAD] shadow-xs hover:border-[#3BB3F0] hover:bg-gray-50 dark:border-gray-800 dark:bg-[#111A2E] dark:text-[#3BB3F0] dark:hover:bg-[#162035] transition cursor-pointer"
            >
              Load More Events ({sortedEvents.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
