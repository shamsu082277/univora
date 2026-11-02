"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { getRecentEvents } from "@/lib/api";
import { IEvent } from "@/types";
import EventCard from "../shared/EventCard";
import SectionHeading from "../shared/SectionHeading";
import { EventGridSkeleton } from "../events/EventSkeleton";
import EmptyState from "../events/EmptyState";

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getRecentEvents();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setEvents(data.slice(0, 6));
          } else {
            setEvents([]);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg =
            err instanceof Error
              ? err.message
              : "Unable to load events from the API.";
          setError(msg);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLatest();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="upcoming-events" className="py-16 sm:py-24 bg-gray-50/60 dark:bg-[#0B1220]/60 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with action button */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16 gap-4">
          <SectionHeading
            badge="Join an Initiative"
            title="Latest Community Events"
            description="Explore the newest grassroots volunteering activities, hands-on community projects, and social development drives."
            align="left"
            className="mb-0"
          />

          <Link
            href="/upcoming-events"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#004AAD] shadow-xs border border-gray-200 hover:border-[#3BB3F0] hover:bg-gray-50 dark:border-gray-800 dark:bg-[#111A2E] dark:text-[#3BB3F0] dark:hover:bg-[#162035] transition-all shrink-0"
          >
            <span>View All Events</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content State: Loading Skeleton / Error / Empty / Grid */}
        {isLoading ? (
          <EventGridSkeleton count={6} />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50/60 p-8 text-center dark:border-red-900/40 dark:bg-red-950/20">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              {error}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Ensure the backend Express REST API is running at <code>{process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}</code>.
            </p>
          </div>
        ) : events.length === 0 ? (
          <EmptyState
            title="No Recent Events Scheduled"
            description="There are currently no scheduled events in the system. Be the first changemaker to organize an event!"
            actionText="Create an Event"
            actionHref="/create-event"
            icon={<Sparkles className="h-7 w-7 text-[#004AAD] dark:text-[#3BB3F0]" />}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/upcoming-events"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#004AAD] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition-colors"
          >
            <Calendar className="h-4 w-4" />
            <span>View All Events</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
