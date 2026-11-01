"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Share2,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { getEventById, joinEvent, cancelJoinEvent, getMyJoinedEvents } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { IEvent } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;
  const router = useRouter();
  const { data: session } = useSession();

  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventData = async () => {
    setIsLoading(true);
    try {
      const data = await getEventById(eventId);
      setEvent(data);

      // Check if current user is already registered
      if (session?.user) {
        try {
          const joinedList = await getMyJoinedEvents();
          const match = joinedList.some(
            (e: any) => e.id === eventId || e._id === eventId
          );
          setIsJoined(match);
        } catch {
          // Ignore
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to load event details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [eventId, session?.user]);

  const handleJoinToggle = async () => {
    if (!session?.user) {
      toast.info("Authentication Required", {
        description: "Please sign in to volunteer for this event.",
      });
      router.push(`/login?redirect=/upcoming-events/${eventId}`);
      return;
    }

    setIsJoining(true);
    try {
      if (isJoined) {
        await cancelJoinEvent(eventId);
        setIsJoined(false);
        setEvent((prev: any) =>
          prev ? { ...prev, attendeesCount: Math.max(0, (prev.attendeesCount || 0) - 1) } : prev
        );
        toast.success("Registration Cancelled", {
          description: "You have cancelled your volunteer registration for this event.",
        });
      } else {
        await joinEvent(eventId);
        setIsJoined(true);
        setEvent((prev: any) =>
          prev ? { ...prev, attendeesCount: (prev.attendeesCount || 0) + 1 } : prev
        );
        toast.success("Successfully Registered!", {
          description: "Thank you for volunteering! Your spot is confirmed.",
        });
      }
    } catch (err: any) {
      toast.error("Registration Error", {
        description: err.message || "Could not complete event registration.",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Link Copied!", {
        description: "Event link copied to your clipboard.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Event Not Found
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The event you are looking for may have been removed or does not exist.
        </p>
        <div className="mt-6">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Events</span>
          </Link>
        </div>
      </div>
    );
  }

  const capacity = event.capacity || 100;
  const attendeesCount = event.attendeesCount || event.registeredCount || 0;
  const isFull = attendeesCount >= capacity;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#004AAD] dark:text-gray-400 dark:hover:text-[#3BB3F0] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Events</span>
        </Link>
      </div>

      {/* Main Event Card */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-[#111A2E]">
        {/* Cover Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={event.coverImage || event.thumbnail || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"}
            alt={event.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold text-[#004AAD] shadow-md backdrop-blur-xs dark:bg-[#0B1220]/90 dark:text-[#3BB3F0]">
              {event.category}
            </span>
          </div>
        </div>

        {/* Event Body */}
        <div className="p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4 lg:max-w-2xl">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {event.title}
              </h1>

              {/* Meta information tags */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-300">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#004AAD] dark:text-[#3BB3F0]">
                  <Calendar className="h-4 w-4" />
                  {event.date}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {event.startTime || "09:00 AM"} - {event.endTime || "05:00 PM"}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {event.location}
                </span>

                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <Users className="h-4 w-4" />
                  {attendeesCount} / {capacity} volunteers joined
                </span>
              </div>
            </div>

            {/* Actions: Join & Share */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={handleJoinToggle}
                disabled={isJoining || (!isJoined && isFull)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-md transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                  isJoined
                    ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/50"
                    : isFull
                    ? "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    : "bg-[#004AAD] text-white hover:bg-[#003B8C] dark:bg-[#3BB3F0] dark:text-[#0B1220] dark:hover:bg-[#2fa3de]"
                }`}
              >
                {isJoining ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : isJoined ? (
                  <>
                    <XCircle className="h-4 w-4" />
                    <span>Cancel Registration</span>
                  </>
                ) : isFull ? (
                  <span>Event Full</span>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Volunteer For Event</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 dark:border-gray-800 dark:bg-[#162035] dark:text-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Event</span>
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              About This Initiative
            </h2>
            <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {event.description}
            </div>
          </div>

          {/* Organizer Card */}
          <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-[#162035]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#3BB3F0] to-[#004AAD] text-white shadow-xs">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Organized by
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {event.organizer || "Univora Community Alliance"}
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold text-[#004AAD] dark:text-[#3BB3F0]">
              Verified Initiative
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
