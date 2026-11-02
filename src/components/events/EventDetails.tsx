"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  HeartHandshake,
  Loader2,
  Mail,
  MapPin,
  Share2,
  ShieldCheck,
  User,
} from "lucide-react";
import { IEvent } from "@/types";
import { useSession } from "@/lib/auth-client";
import { joinEvent } from "@/lib/api/events";
import EventStatusBadge from "./EventStatusBadge";
import ParticipantCounter from "./ParticipantCounter";

interface EventDetailsProps {
  event: IEvent;
}

export default function EventDetails({ event: initialEvent }: EventDetailsProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [event, setEvent] = useState<IEvent>(initialEvent);
  const [isJoining, setIsJoining] = useState(false);

  // Check if current user already joined
  const currentUserId = session?.user?.id;
  const currentUserEmail = session?.user?.email;
  const isJoined = Boolean(
    (currentUserId && event.joinedUsers?.includes(currentUserId)) ||
    (currentUserEmail && event.joinedUsers?.includes(currentUserEmail))
  );

  const isFull = Boolean(event.capacity && event.participantCount >= event.capacity);
  const isOwner = Boolean(
    currentUserId &&
    (event.organizerId === currentUserId || event.organizerEmail === currentUserEmail)
  );

  // Format readable full date
  const formatFullDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Format time
  const formatTime = (dateString: string) => {
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return "9:00 AM";
      return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "9:00 AM";
    }
  };

  const handleJoinClick = async () => {
    // If logged out: redirect to login preserving this URL
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/events/${event._id}`)}`);
      return;
    }

    if (isJoined) {
      toast.info("Already Registered", {
        description: "You have already joined this community event.",
      });
      return;
    }

    if (isFull) {
      toast.error("Event Full", {
        description: "This event has reached its maximum volunteer capacity.",
      });
      return;
    }

    setIsJoining(true);

    try {
      // Call join event API
      await joinEvent(event._id);

      // Optimistically update participant count and local joined state
      setEvent((prev) => ({
        ...prev,
        participantCount: prev.participantCount + 1,
        joinedUsers: [...(prev.joinedUsers || []), currentUserId || currentUserEmail || ""],
      }));

      toast.success("Successfully Joined!", {
        description: `You are confirmed for ${event.title}. We look forward to seeing you!`,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to register for this event.";

      toast.error("Could Not Join Event", {
        description: message,
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link Copied!", {
        description: "Event link copied to clipboard. Share it with your friends!",
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#004AAD] dark:text-gray-400 dark:hover:text-[#3BB3F0] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Upcoming Events</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:bg-gray-800 transition cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Event Card */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-[#111A2E]">
        {/* Large Thumbnail Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <EventStatusBadge category={event.eventType} isFull={isFull} />
            {isOwner && (
              <span className="rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white">
                Your Created Event
              </span>
            )}
          </div>

          {/* Title Overlay for high contrast */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Event Body Content */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            
            {/* Left 8 cols: Detailed Description & Logistics */}
            <div className="space-y-8 lg:col-span-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  About this Initiative
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* Event Logistics Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl bg-gray-50 p-5 dark:bg-[#162035]/60 border border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3BB3F0]/15 text-[#004AAD] dark:text-[#3BB3F0]">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Date
                    </span>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatFullDate(event.eventDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3BB3F0]/15 text-[#004AAD] dark:text-[#3BB3F0]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Scheduled Time
                    </span>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatTime(event.eventDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3BB3F0]/15 text-[#004AAD] dark:text-[#3BB3F0]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </span>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Organizer Information */}
              <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Organized By
                </h3>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3BB3F0] to-[#004AAD] text-white font-bold">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {event.organizerEmail.split("@")[0].toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {event.organizerEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Registration Action Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-gray-200 bg-gray-50/70 p-6 shadow-xs dark:border-gray-800 dark:bg-[#162035]/80">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Volunteer Registration
                </h3>

                <div className="mt-4">
                  <ParticipantCounter
                    current={event.participantCount}
                    capacity={event.capacity}
                    showProgress
                  />
                </div>

                {/* Primary Join Action Button */}
                <div className="mt-6">
                  {isJoined ? (
                    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3 text-sm font-bold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>You have joined this event!</span>
                    </div>
                  ) : isFull ? (
                    <button
                      type="button"
                      disabled
                      className="w-full rounded-xl bg-gray-300 py-3 text-sm font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed"
                    >
                      Capacity Reached
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleJoinClick}
                      disabled={isJoining}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#004AAD] py-3 text-sm font-bold text-white shadow-md shadow-[#004AAD]/25 transition hover:bg-[#003B8C] active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isJoining ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Joining Event...</span>
                        </>
                      ) : (
                        <>
                          <HeartHandshake className="h-4 w-4" />
                          <span>{session ? "Join this Event" : "Sign In to Join Event"}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {!session && (
                  <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                    You will be prompted to log in to confirm your volunteer badge.
                  </p>
                )}

                {/* Manage event link if owner */}
                {isOwner && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href="/manage-events"
                      className="inline-flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-[#004AAD] hover:underline dark:text-[#3BB3F0]"
                    >
                      <span>Manage this event in your Organizer Dashboard</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Free & verified community development initiative.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

