"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Calendar,
  CheckCircle2,
  Image as ImageIcon,
  Info,
  Loader2,
  MapPin,
  Tag,
  Type,
  Users,
} from "lucide-react";
import { CreateEventInput, EVENT_CATEGORIES, EventCategory } from "@/types/event";
import {
  isTrustedImageUrl,
  TRUSTED_IMAGE_HOSTS,
  validateImageUrl,
} from "@/lib/constants/images";

interface EventFormProps {
  initialValues?: Partial<CreateEventInput>;
  onSubmit: (values: CreateEventInput) => Promise<void>;
  isSubmitting: boolean;
  submitButtonText?: string;
  cancelHref?: string;
}

const emptySubscribe = () => () => {};

function getMinDateTime() {
  return new Date().toISOString().slice(0, 16);
}

export default function EventForm({
  initialValues,
  onSubmit,
  isSubmitting,
  submitButtonText = "Publish Event",
  cancelHref = "/upcoming-events",
}: EventFormProps) {
  // Format initial date for <input type="datetime-local"> or "YYYY-MM-DDTHH:mm"
  const formatInitialDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().slice(0, 16);
    } catch {
      return "";
    }
  };

  const [title, setTitle] = useState(initialValues?.title || "");
  const [eventType, setEventType] = useState<EventCategory>(
    initialValues?.eventType || EVENT_CATEGORIES[0]
  );
  const [eventDate, setEventDate] = useState(
    formatInitialDate(initialValues?.eventDate)
  );
  const [location, setLocation] = useState(initialValues?.location || "");
  const [thumbnail, setThumbnail] = useState(initialValues?.thumbnail || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [capacity, setCapacity] = useState<string>(
    initialValues?.capacity ? String(initialValues.capacity) : ""
  );

  const [errors, setErrors] = useState<{
    title?: string;
    eventType?: string;
    eventDate?: string;
    location?: string;
    thumbnail?: string;
    description?: string;
    capacity?: string;
  }>({});

  // Minimum allowed date is today's start (computed on client to avoid prerendering unstable date)
  const minDate = useSyncExternalStore(
    emptySubscribe,
    getMinDateTime,
    () => ""
  );

  const validate = () => {
    const errs: typeof errors = {};

    // Title validation
    if (!title.trim()) {
      errs.title = "Event title is required.";
    } else if (title.trim().length < 5) {
      errs.title = "Event title must be at least 5 characters.";
    } else if (title.trim().length > 100) {
      errs.title = "Event title cannot exceed 100 characters.";
    }

    // Event Type validation
    if (!eventType) {
      errs.eventType = "Please select an event category.";
    }

    // Date validation
    if (!eventDate) {
      errs.eventDate = "Event date is required.";
    } else {
      const selected = new Date(eventDate);
      const now = new Date();
      // Allow current date without checking seconds
      now.setMinutes(now.getMinutes() - 10);
      if (selected < now) {
        errs.eventDate = "Event date must be today or a future date.";
      }
    }

    // Location validation
    if (!location.trim()) {
      errs.location = "Event location is required.";
    }

    // Thumbnail validation
    const imgCheck = validateImageUrl(thumbnail);
    if (!imgCheck.isValid) {
      errs.thumbnail = imgCheck.error;
    }

    // Description validation
    if (!description.trim()) {
      errs.description = "Event description is required.";
    } else if (description.trim().length < 20) {
      errs.description =
        "Please provide a meaningful description (at least 20 characters).";
    }

    // Capacity validation (optional)
    if (capacity.trim()) {
      const parsed = parseInt(capacity, 10);
      if (isNaN(parsed) || parsed <= 0 || !Number.isInteger(Number(capacity))) {
        errs.capacity = "Capacity must be a positive whole integer.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit({
      title: title.trim(),
      eventType,
      eventDate: new Date(eventDate).toISOString(),
      location: location.trim(),
      thumbnail: thumbnail.trim(),
      description: description.trim(),
      capacity: capacity.trim() ? parseInt(capacity, 10) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
          Event Title <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1.5">
          <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="e.g. Hatirjheel Lake Volunteer Cleanup Drive"
            disabled={isSubmitting}
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-gray-900 shadow-2xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
              errors.title
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
        </div>
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Event Type */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Event Category <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <select
              value={eventType}
              onChange={(e) => {
                setEventType(e.target.value as EventCategory);
                if (errors.eventType)
                  setErrors((prev) => ({ ...prev, eventType: undefined }));
              }}
              disabled={isSubmitting}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-gray-900 shadow-2xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.eventType
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {errors.eventType && (
            <p className="mt-1 text-xs text-red-500">{errors.eventType}</p>
          )}
        </div>

        {/* Event Date & Time */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Event Date & Time <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="datetime-local"
              value={eventDate}
              min={minDate || undefined}
              onChange={(e) => {
                setEventDate(e.target.value);
                if (errors.eventDate)
                  setErrors((prev) => ({ ...prev, eventDate: undefined }));
              }}
              disabled={isSubmitting}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-gray-900 shadow-2xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.eventDate
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
          </div>
          {errors.eventDate && (
            <p className="mt-1 text-xs text-red-500">{errors.eventDate}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (errors.location)
                  setErrors((prev) => ({ ...prev, location: undefined }));
              }}
              placeholder="e.g. Hatirjheel Amphitheatre, Dhaka"
              disabled={isSubmitting}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-gray-900 shadow-2xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.location
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-xs text-red-500">{errors.location}</p>
          )}
        </div>

        {/* Capacity (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Maximum Volunteer Capacity <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="relative mt-1.5">
            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="number"
              min="1"
              value={capacity}
              onChange={(e) => {
                setCapacity(e.target.value);
                if (errors.capacity)
                  setErrors((prev) => ({ ...prev, capacity: undefined }));
              }}
              placeholder="Leave empty for unlimited spots"
              disabled={isSubmitting}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-gray-900 shadow-2xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.capacity
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
          </div>
          {errors.capacity && (
            <p className="mt-1 text-xs text-red-500">{errors.capacity}</p>
          )}
        </div>
      </div>

      {/* Thumbnail URL */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
          Thumbnail Image URL <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1.5">
          <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="url"
            value={thumbnail}
            onChange={(e) => {
              setThumbnail(e.target.value);
              if (errors.thumbnail)
                setErrors((prev) => ({ ...prev, thumbnail: undefined }));
            }}
            placeholder="https://images.unsplash.com/photo-..."
            disabled={isSubmitting}
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-gray-900 shadow-2xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
              errors.thumbnail
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
        </div>
        {errors.thumbnail ? (
          <p className="mt-1 text-xs text-red-500">{errors.thumbnail}</p>
        ) : (
          <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Info className="h-3 w-3 inline text-[#3BB3F0]" />
            Supported HTTPS providers: Unsplash (images.unsplash.com), Cloudinary (res.cloudinary.com), Pexels, Imgur.
          </p>
        )}

        {/* Thumbnail Image Live Preview */}
        {thumbnail && isTrustedImageUrl(thumbnail) && (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-2.5 dark:border-gray-800 dark:bg-[#162035]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt="Thumbnail preview"
              className="h-14 w-20 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="text-xs">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Valid Image Preview
              </span>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-xs">
                {thumbnail}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
          Event Description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description)
              setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          placeholder="Describe the purpose, volunteer responsibilities, what to bring, and expectations for the drive..."
          disabled={isSubmitting}
          className={`mt-1.5 w-full rounded-xl border bg-white p-3.5 text-xs sm:text-sm text-gray-900 shadow-2xs outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
            errors.description
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Form Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <a
          href={cancelHref}
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition"
        >
          Cancel
        </a>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#004AAD] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#004AAD]/20 hover:bg-[#003B8C] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving Event...</span>
            </>
          ) : (
            <span>{submitButtonText}</span>
          )}
        </button>
      </div>
    </form>
  );
}

