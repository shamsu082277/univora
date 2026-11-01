"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  Calendar,
  CalendarRange,
  Edit,
  Eye,
  Loader2,
  MapPin,
  PlusCircle,
  Trash2,
  Users,
  X,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { deleteEvent, getEventRegistrations, getMyEvents, updateEvent } from "@/lib/api";
import { IEvent } from "@/types";

function ManageEventsContent() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit State
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Attendees Modal State
  const [viewingAttendeesEvent, setViewingAttendeesEvent] = useState<any>(null);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [isLoadingAttendees, setIsLoadingAttendees] = useState(false);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchOwnedEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getMyEvents();
      setEvents(data);
    } catch (err: any) {
      toast.error("Failed to fetch events", {
        description: err.message || "Could not retrieve your created events.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnedEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event? This will also cancel all registrations.")) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => (e.id || e._id) !== id));
      toast.success("Event Deleted", {
        description: "The event and its records have been removed.",
      });
    } catch (err: any) {
      toast.error("Delete Error", {
        description: err.message || "Failed to delete the event.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenAttendees = async (event: any) => {
    setViewingAttendeesEvent(event);
    setIsLoadingAttendees(true);
    try {
      const res = await getEventRegistrations(event.id || event._id);
      setAttendees(res.attendees || []);
    } catch (err: any) {
      toast.error("Error", {
        description: err.message || "Could not load attendees.",
      });
    } finally {
      setIsLoadingAttendees(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    setIsUpdating(true);
    try {
      await updateEvent(editingEvent.id || editingEvent._id, {
        title: editingEvent.title,
        category: editingEvent.category,
        capacity: Number(editingEvent.capacity),
        date: editingEvent.date,
        location: editingEvent.location,
        description: editingEvent.description,
      });

      toast.success("Event Updated", {
        description: "Your changes have been saved.",
      });

      setEditingEvent(null);
      fetchOwnedEvents();
    } catch (err: any) {
      toast.error("Update Error", {
        description: err.message || "Failed to update event.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Manage Created Events
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            View attendee lists, update details, or delete initiatives you have organized.
          </p>
        </div>

        <Link
          href="/create-event"
          className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Create New Event</span>
        </Link>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-xs dark:border-gray-800 dark:bg-[#111A2E]">
          <CalendarRange className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
            No events organized yet
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            You have not organized any community initiatives yet. Start by creating your first event!
          </p>
          <div className="mt-6">
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create an Event</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-[#111A2E]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-gray-100 bg-gray-50/70 text-xs font-semibold text-gray-500 uppercase dark:border-gray-800 dark:bg-[#162035] dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4">Event Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Volunteers</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {events.map((event) => {
                  const id = event.id || event._id;
                  const attendeesCount = event.attendeesCount || event.registeredCount || 0;
                  const capacity = event.capacity || 100;

                  return (
                    <tr key={id} className="hover:bg-gray-50/50 dark:hover:bg-[#162035]/50 transition">
                      {/* Event Details */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                            <Image
                              src={event.coverImage || event.thumbnail || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/upcoming-events/${id}`}
                              className="font-bold text-gray-900 hover:text-[#004AAD] dark:text-white dark:hover:text-[#3BB3F0] line-clamp-1"
                            >
                              {event.title}
                            </Link>
                            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                              {event.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#004AAD] dark:bg-blue-950/60 dark:text-[#3BB3F0]">
                          {event.category}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {event.date}
                      </td>

                      {/* Volunteers */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {attendeesCount}
                        </span>
                        <span className="text-gray-400"> / {capacity}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenAttendees(event)}
                            title="View Attendees"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
                          >
                            <Users className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingEvent(event)}
                            title="Edit Event"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(id)}
                            disabled={deletingId === id}
                            title="Delete Event"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950/30 cursor-pointer disabled:opacity-50"
                          >
                            {deletingId === id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#111A2E] max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setEditingEvent(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Edit Event
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Update information for &quot;{editingEvent.title}&quot;
            </p>

            <form onSubmit={handleUpdateSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  value={editingEvent.title || ""}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-[#162035] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={editingEvent.category || "Community Support"}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, category: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-[#162035] dark:text-white"
                  >
                    <option value="Community Support">Community Support</option>
                    <option value="Environmental Care">Environmental Care</option>
                    <option value="Donation & Charity">Donation & Charity</option>
                    <option value="Education & Awareness">Education & Awareness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingEvent.capacity || 100}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        capacity: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-[#162035] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  value={editingEvent.location || ""}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, location: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-[#162035] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editingEvent.description || ""}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, description: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-[#162035] dark:text-white"
                />
              </div>

              <div className="mt-5 flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#004AAD] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#003B8C] disabled:opacity-50 cursor-pointer"
                >
                  {isUpdating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ATTENDEES MODAL ================= */}
      {viewingAttendeesEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#111A2E] max-h-[85vh] flex flex-col">
            <button
              type="button"
              onClick={() => setViewingAttendeesEvent(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Event Attendees
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
              {viewingAttendeesEvent.title}
            </p>

            <div className="mt-4 flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {isLoadingAttendees ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
                </div>
              ) : attendees.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500 dark:text-gray-400">
                  No volunteers have registered for this event yet.
                </div>
              ) : (
                attendees.map((attendee: any, idx: number) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {attendee.userName || "Volunteer"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {attendee.userEmail}
                      </p>
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {new Date(attendee.registeredAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs">
              <span className="font-semibold text-gray-600 dark:text-gray-300">
                Total: {attendees.length} / {viewingAttendeesEvent.capacity || 100}
              </span>
              <button
                type="button"
                onClick={() => setViewingAttendeesEvent(null)}
                className="rounded-xl bg-gray-100 px-4 py-1.5 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
