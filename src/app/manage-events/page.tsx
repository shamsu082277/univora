"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Calendar,
  CalendarRange,
  Edit3,
  ExternalLink,
  MapPin,
  PlusCircle,
  RefreshCw,
  Trash2,
  Users,
  X,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useSession } from "@/lib/auth-client";
import { deleteEvent, getMyCreatedEvents, updateEvent } from "@/lib/api";
import { CreateEventInput, IEvent } from "@/types";
import SectionHeading from "@/components/shared/SectionHeading";
import EventStatusBadge from "@/components/events/EventStatusBadge";
import DeleteConfirmationDialog from "@/components/events/DeleteConfirmationDialog";
import EventForm from "@/components/events/EventForm";
import EmptyState from "@/components/events/EmptyState";
import { EventGridSkeleton } from "@/components/events/EventSkeleton";
import EventImage from "@/components/events/EventImage";

function ManageEventsContent() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit Modal State
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete Dialog State
  const [deletingEvent, setDeletingEvent] = useState<IEvent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchMyEvents() {
      setError(null);
      try {
        const data = await getMyCreatedEvents();
        if (isMounted) {
          if (Array.isArray(data)) {
            setEvents(data);
          } else {
            setEvents([]);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg =
            err instanceof Error
              ? err.message
              : "Failed to load your created events from the server.";
          setError(msg);
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchMyEvents();
    return () => {
      isMounted = false;
    };
  }, [session]);

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyCreatedEvents();
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setEvents([]);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to load your created events from the server.";
      setError(msg);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Edit Submit
  const handleUpdate = async (values: CreateEventInput) => {
    if (!editingEvent) return;

    setIsUpdating(true);
    try {
      await updateEvent(editingEvent._id, values);

      // Optimistically update list
      setEvents((prev) =>
        prev.map((evt) =>
          evt._id === editingEvent._id
            ? { ...evt, ...values, updatedAt: new Date().toISOString() }
            : evt
        )
      );

      toast.success("Event Updated!", {
        description: `"${values.title}" has been updated successfully.`,
      });
      setEditingEvent(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update event.";
      toast.error("Update Failed", { description: message });
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!deletingEvent) return;

    setIsDeleting(true);
    try {
      await deleteEvent(deletingEvent._id);

      setEvents((prev) => prev.filter((e) => e._id !== deletingEvent._id));
      toast.success("Event Deleted", {
        description: `"${deletingEvent.title}" has been removed.`,
      });
      setDeletingEvent(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete event.";
      toast.error("Delete Failed", { description: message });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <SectionHeading
          badge="Organizer Dashboard"
          title="Manage Your Created Events"
          description="View, edit details, track volunteer registrations, or cancel your hosted community initiatives."
          align="left"
          className="mb-0"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create New Event</span>
          </Link>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 sm:p-5 text-xs sm:text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p>{error}</p>
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {isLoading ? (
        <EventGridSkeleton count={4} />
      ) : events.length === 0 ? (
        <EmptyState
          title="No Created Events Yet"
          description="You haven't organized any community events yet. Create your first initiative to start rallying volunteers!"
          icon={<CalendarRange className="h-8 w-8" />}
          actionText="Create an Event Now"
          actionHref="/create-event"
        />
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition hover:border-[#3BB3F0]/40 dark:border-gray-800 dark:bg-[#111A2E]"
            >
              {/* Event Info */}
              <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                <div className="relative h-20 w-28 sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <EventImage
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 112px, 144px"
                    className="object-cover"
                  />
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
                    <span className="inline-flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200">
                      <Users className="h-3.5 w-3.5 text-[#004AAD] dark:text-[#3BB3F0]" />
                      {event.participantCount}{" "}
                      {event.capacity ? `/ ${event.capacity}` : "registered"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:self-center border-t border-gray-100 pt-3 sm:border-0 sm:pt-0 shrink-0">
                <Link
                  href={`/events/${event._id}`}
                  title="View Public Details"
                  className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#162035] dark:text-gray-300 dark:hover:bg-gray-800 transition"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden md:inline">View</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setEditingEvent(event)}
                  className="inline-flex items-center gap-1 rounded-xl bg-[#004AAD]/10 px-3.5 py-2 text-xs font-semibold text-[#004AAD] hover:bg-[#004AAD]/20 dark:bg-[#3BB3F0]/15 dark:text-[#3BB3F0] transition cursor-pointer"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingEvent(event)}
                  className="inline-flex items-center gap-1 rounded-xl bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40 transition cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= EDIT EVENT MODAL ================= */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="my-8 w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-gray-800 dark:bg-[#111A2E]">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3BB3F0]/15 text-[#004AAD] dark:text-[#3BB3F0]">
                  <Edit3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Edit Event Details
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs sm:max-w-md">
                    {editingEvent.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              <EventForm
                initialValues={editingEvent}
                onSubmit={handleUpdate}
                isSubmitting={isUpdating}
                submitButtonText="Save Changes"
                cancelHref="#"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION DIALOG ================= */}
      <DeleteConfirmationDialog
        isOpen={Boolean(deletingEvent)}
        eventTitle={deletingEvent?.title || ""}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingEvent(null)}
      />
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <AuthGuard>
      <ManageEventsContent />
    </AuthGuard>
  );
}
