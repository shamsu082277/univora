"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Calendar,
  CalendarPlus,
  Clock,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { createEvent } from "@/lib/api";

const CATEGORIES = [
  "Community Support",
  "Environmental Care",
  "Donation & Charity",
  "Education & Awareness",
] as const;

function CreateEventForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("Community Support");
  const [coverImage, setCoverImage] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("Dhaka");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("01:00 PM");
  const [capacity, setCapacity] = useState(100);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!title.trim() || title.length < 3) {
      errs.title = "Title must be at least 3 characters long.";
    }

    if (!coverImage.trim()) {
      errs.coverImage = "Cover image URL is required.";
    } else if (!/^https?:\/\/.+\..+/.test(coverImage.trim())) {
      errs.coverImage = "Please enter a valid image URL (http:// or https://).";
    }

    if (!venue.trim()) {
      errs.venue = "Venue name or street address is required.";
    }

    if (!city.trim()) {
      errs.city = "City is required.";
    }

    if (!date) {
      errs.date = "Event date is required.";
    }

    if (!capacity || capacity < 1) {
      errs.capacity = "Capacity must be at least 1.";
    }

    if (!description.trim() || description.length < 10) {
      errs.description = "Description must be at least 10 characters long.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        category,
        coverImage: coverImage.trim(),
        location: {
          venue: venue.trim(),
          address: `${venue.trim()}, ${city.trim()}`,
          city: city.trim(),
        },
        date,
        startTime,
        endTime,
        capacity: Number(capacity),
        description: description.trim(),
        status: "published",
      };

      const result = await createEvent(payload);

      toast.success("Event Created Successfully!", {
        description: "Your volunteer initiative is now live in the community catalog.",
      });

      router.push(`/upcoming-events/${result.insertedId || result.event?.id || ""}`);
    } catch (err: any) {
      toast.error("Failed to Create Event", {
        description: err.message || "An error occurred while creating the event.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3BB3F0]/15 text-[#004AAD] dark:text-[#3BB3F0]">
          <CalendarPlus className="h-7 w-7" />
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#004AAD] dark:bg-blue-950/60 dark:text-[#3BB3F0]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Organizer Dashboard</span>
        </div>
        <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Create a Community Initiative
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Publish a new grassroots volunteer drive, cleanup, or charity event.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm dark:border-gray-800 dark:bg-[#111A2E]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              placeholder="e.g. Green Canopy: Urban Tree Plantation Drive"
              className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.title ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Category & Capacity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:border-gray-700 dark:bg-[#162035] dark:text-white cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Volunteer Capacity <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:border-gray-700 dark:bg-[#162035] dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Cover Image URL <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1.5">
              <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="url"
                value={coverImage}
                onChange={(e) => {
                  setCoverImage(e.target.value);
                  if (errors.coverImage) setErrors((prev) => ({ ...prev, coverImage: "" }));
                }}
                placeholder="https://images.unsplash.com/photo-..."
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                  errors.coverImage ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                }`}
              />
            </div>
            {errors.coverImage && (
              <p className="mt-1 text-xs text-red-500">{errors.coverImage}</p>
            )}
          </div>

          {/* Location: Venue and City */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Venue / Area <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Ramna Park & Hatirjheel"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:border-gray-700 dark:bg-[#162035] dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                City / District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Dhaka, Chittagong, Sylhet"
                className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:border-gray-700 dark:bg-[#162035] dark:text-white"
              />
            </div>
          </div>

          {/* Date, Start Time, End Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:border-gray-700 dark:bg-[#162035] dark:text-white cursor-pointer"
                />
              </div>
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Start Time
              </label>
              <div className="relative mt-1.5">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="09:00 AM"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:border-gray-700 dark:bg-[#162035] dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                End Time
              </label>
              <div className="relative mt-1.5">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="01:00 PM"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:border-gray-700 dark:bg-[#162035] dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Event Description & Volunteer Instructions <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the initiative, volunteer roles, meeting location, and items to bring..."
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white p-3.5 text-sm text-gray-900 shadow-xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:border-gray-700 dark:bg-[#162035] dark:text-white"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004AAD] py-3 text-sm font-semibold text-white shadow-md shadow-[#004AAD]/20 transition hover:bg-[#003B8C] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Publishing Event to MongoDB...</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="h-4 w-4" />
                  <span>Publish Community Event</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <AuthGuard>
      <CreateEventForm />
    </AuthGuard>
  );
}
