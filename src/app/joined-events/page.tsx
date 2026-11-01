"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Loader2,
  MapPin,
  XCircle,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { cancelJoinEvent, getMyJoinedEvents } from "@/lib/api";

function JoinedEventsContent() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchJoined = async () => {
    setIsLoading(true);
    try {
      const data = await getMyJoinedEvents();
      setEvents(data);
    } catch (err: any) {
      toast.error("Failed to load joined events", {
        description: err.message || "Could not retrieve your registered events.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJoined();
  }, []);

  const handleCancelRegistration = async (eventId: string, title: string) => {
    if (!window.confirm(`Are you sure you want to cancel your volunteer spot for "${title}"?`)) {
      return;
    }

    setCancellingId(eventId);
    try {
      await cancelJoinEvent(eventId);
      setEvents((prev) => prev.filter((e) => (e.id || e._id) !== eventId));
      toast.success("Volunteer Registration Cancelled", {
        description: `You have successfully cancelled your spot for "${title}".`,
      });
    } catch (err: any) {
      toast.error("Cancellation Error", {
        description: err.message || "Failed to cancel your event registration.",
      });
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Your Joined Community Initiatives
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Track upcoming volunteering activities and initiatives you have registered to support.
        </p>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-xs dark:border-gray-800 dark:bg-[#111A2E]">
          <CalendarCheck className="mx-auto h-12 w-12 text-amber-500" />
          <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
            No joined initiatives yet
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            You have not registered for any upcoming volunteer drives. Discover opportunities near you!
          </p>
          <div className="mt-6">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition"
            >
              <Calendar className="h-4 w-4" />
              <span>Browse Upcoming Events</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const id = event.id || event._id;
            return (
              <div
                key={id}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition hover:shadow-md dark:border-gray-800 dark:bg-[#111A2E]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={event.coverImage || event.thumbnail || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-white/95 px-3 py-0.5 text-[11px] font-bold text-[#004AAD] shadow-xs backdrop-blur-xs dark:bg-[#0B1220]/90 dark:text-[#3BB3F0]">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                      <CheckCircle2 className="h-3 w-3" />
                      Confirmed Spot
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3.5 w-3.5 text-[#004AAD] dark:text-[#3BB3F0]" />
                      <span>{event.date}</span>
                    </div>

                    <h3 className="mt-2 text-base font-bold text-gray-900 dark:text-white line-clamp-2">
                      <Link
                        href={`/upcoming-events/${id}`}
                        className="hover:text-[#004AAD] dark:hover:text-[#3BB3F0] transition"
                      >
                        {event.title}
                      </Link>
                    </h3>

                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      <span>{event.location}</span>
                    </p>

                    {event.registeredAt && (
                      <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500">
                        Registered on: {new Date(event.registeredAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                      href={`/upcoming-events/${id}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-50 py-2 text-xs font-semibold text-[#004AAD] hover:bg-[#004AAD] hover:text-white dark:bg-[#162035] dark:text-[#3BB3F0] dark:hover:bg-[#3BB3F0] dark:hover:text-[#0B1220] transition"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleCancelRegistration(id, event.title)}
                      disabled={cancellingId === id}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:bg-[#111A2E] dark:text-red-400 dark:hover:bg-red-950/30 transition cursor-pointer disabled:opacity-50"
                    >
                      {cancellingId === id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5" />
                      )}
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
