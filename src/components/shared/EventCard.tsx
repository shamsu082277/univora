import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { IEvent } from "@/types";

interface EventCardProps {
  event: IEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#3BB3F0]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#111A2E] dark:hover:border-[#3BB3F0]/40">
      {/* Event Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Pill */}
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#004AAD] shadow-xs backdrop-blur-xs dark:bg-[#0B1220]/90 dark:text-[#3BB3F0]">
          {event.category}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#004AAD] dark:text-[#3BB3F0]">
              <Calendar className="h-3.5 w-3.5" />
              {event.date}
            </span>
            <span className="inline-flex items-center gap-1 text-gray-400 dark:text-gray-500">
              <Users className="h-3.5 w-3.5" />
              {event.attendeesCount} joined
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2.5 text-lg font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#004AAD] dark:text-white dark:group-hover:text-[#3BB3F0]">
            <Link href={`/upcoming-events/${event.id}`}>
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
            href={`/upcoming-events/${event.id}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-gray-50 py-2.5 text-xs font-semibold text-[#004AAD] transition-colors hover:bg-[#004AAD] hover:text-white dark:bg-[#162035] dark:text-[#3BB3F0] dark:hover:bg-[#3BB3F0] dark:hover:text-[#0B1220]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

