import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { IEvent } from "@/types";
import EventStatusBadge from "../events/EventStatusBadge";

interface EventCardProps {
  event: IEvent;
  priority?: boolean;
}

export default function EventCard({ event, priority = false }: EventCardProps) {
  // Format readable date
  const formatDisplayDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const isFull = !!(event.capacity && event.participantCount >= event.capacity);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#3BB3F0]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#111A2E] dark:hover:border-[#3BB3F0]/40">
      {/* Event Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category & Status Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <EventStatusBadge
            category={event.eventType}
            isFull={isFull}
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#004AAD] dark:text-[#3BB3F0]">
              <Calendar className="h-3.5 w-3.5" />
              {formatDisplayDate(event.eventDate)}
            </span>
            <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Users className="h-3.5 w-3.5" />
              {event.participantCount} {event.capacity ? `/ ${event.capacity}` : "joined"}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2.5 text-base sm:text-lg font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#004AAD] dark:text-white dark:group-hover:text-[#3BB3F0] transition-colors">
            <Link href={`/events/${event._id}`}>
              {event.title}
            </Link>
          </h3>

          {/* Location */}
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500" />
            {event.location}
          </p>

          {/* Short Description */}
          <p className="mt-2.5 text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Link
            href={`/events/${event._id}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-gray-50 py-2.5 text-xs font-semibold text-[#004AAD] transition-colors hover:bg-[#004AAD] hover:text-white dark:bg-[#162035] dark:text-[#3BB3F0] dark:hover:bg-[#3BB3F0] dark:hover:text-[#0B1220]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
