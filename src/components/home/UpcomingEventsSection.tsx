import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { mockUpcomingEvents } from "@/data/mockData";
import { getFeaturedEvents } from "@/lib/api";
import EventCard from "../shared/EventCard";
import SectionHeading from "../shared/SectionHeading";

export default async function UpcomingEventsSection() {
  let events = mockUpcomingEvents;
  try {
    const data = await getFeaturedEvents();
    if (data && data.length > 0) {
      events = data;
    }
  } catch (error) {
    // Graceful fallback to mock data if backend is unavailable during build
    events = mockUpcomingEvents;
  }

  return (
    <section id="upcoming-events" className="py-16 sm:py-24 bg-gray-50/60 dark:bg-[#0B1220]/60 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with action button */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16 gap-4">
          <SectionHeading
            badge="Join an Initiative"
            title="Upcoming Social Development Events"
            description="Find local grassroots volunteering activities, hands-on community projects, and awareness campaigns happening near you."
            align="left"
            className="mb-0 sm:mb-0"
          />

          <Link
            href="/upcoming-events"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#004AAD] shadow-xs border border-gray-200 hover:border-[#3BB3F0] hover:bg-gray-50 dark:border-gray-800 dark:bg-[#111A2E] dark:text-[#3BB3F0] dark:hover:bg-[#162035] transition-all shrink-0"
          >
            <span>View All Events</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 6 Upcoming Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/upcoming-events"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#004AAD] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition-colors"
          >
            <Calendar className="h-4 w-4" />
            <span>View All Events</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
