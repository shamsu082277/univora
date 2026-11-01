"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  MapPin,
  RefreshCw,
  User,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { getMyJoinedEvents } from "@/lib/api/events";
import { mockUpcomingEvents } from "@/data/mockData";
import { IEvent } from "@/types";
import SectionHeading from "@/components/shared/SectionHeading";
import EventStatusBadge from "@/components/events/EventStatusBadge";
import EmptyState from "@/components/events/EmptyState";
import { EventGridSkeleton } from "@/components/events/EventSkeleton";

function JoinedEventsContent() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadJoinedEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getMyJoinedEvents();
      if (data && Array.isArray(data)) {
        // Sort ascending by event date
        const sorted = [...data].sort(
          (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
        setEvents(sorted);
      } else {
        // Fallback demo for joined events
        const sorted = [...mockUpcomingEvents.slice(0, 3)].sort(
          (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
        setEvents(sorted);
      }
    } catch {
      // Backend offline fallback demo
      const sorted = [...mockUpcomingEvents.slice(0, 3)].sort(
        (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
      );
      setEvents(sorted);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJoinedEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <SectionHeading
          badge="Volunteer Dashboard"
          title="Your Joined Community Initiatives"
          description="View your upcoming volunteer commitments, project dates, and meetup locations."
          align="left"
          className="mb-0"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadJoinedEvents}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition"
          >
            <span>Explore More Events</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <EventGridSkeleton count={3} />
      ) : events.length === 0 ? (
        <EmptyState
          title="No Joined Events Yet"
          description="You haven't registered for any community volunteer events yet. Explore upcoming drives and make an impact!"
          icon={<CalendarCheck className="h-8 w-8" />}
          actionText="Find Events to Join"
          actionHref="/upcoming-events"
        />
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition hover:border-[#3BB3F0]/40 dark:border-gray-800 dark:bg-[#111A2E]"
            >
              {/* Event details */}
              <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                <div className="relative h-20 w-28 sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 112px, 144px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/95 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      <CheckCircle2 className="h-3 w-3" />
                      Joined
                    </span>
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <EventStatusBadge category={event.eventType} />
                    <span className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-1 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-[#004AAD] dark:text-[#3BB3F0]" />
                      {formatDate(event.eventDate)}
                    </span>
                  </div>

                  <h3 className="truncate text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    <Link
                      href={`/events/${event._id}`}
                      className="hover:text-[#004AAD] dark:hover:text-[#3BB3F0] transition"
                    >
                      {event.title}
                    </Link>
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      {event.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-gray-400" />
                      Organized by {event.organizerEmail}
                    </span>
                  </div>
                </div>
              </div>

              {/* View Action */}
              <div className="flex items-center gap-3 sm:self-center border-t border-gray-100 pt-3 sm:border-0 sm:pt-0 shrink-0">
                <Link
                  href={`/events/${event._id}`}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl bg-gray-50 px-4 py-2.5 text-xs font-semibold text-[#004AAD] hover:bg-[#004AAD] hover:text-white dark:bg-[#162035] dark:text-[#3BB3F0] dark:hover:bg-[#3BB3F0] dark:hover:text-[#0B1220] transition"
                >
                  <span>View Details</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <AuthGuard>
      <JoinedEventsContent />
    </AuthGuard>
  );
}
