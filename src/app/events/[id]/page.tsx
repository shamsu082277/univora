"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getEventDetails } from "@/lib/api/events";
import { mockUpcomingEvents } from "@/data/mockData";
import { IEvent } from "@/types";
import EventDetails from "@/components/events/EventDetails";
import EmptyState from "@/components/events/EmptyState";

export default function EventDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [event, setEvent] = useState<IEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getEventDetails(id);
        if (data && data._id) {
          setEvent(data);
        } else {
          // Look in mock data if backend returned empty
          const fallback = mockUpcomingEvents.find((e) => e._id === id);
          if (fallback) {
            setEvent(fallback);
          } else {
            setError("Event not found.");
          }
        }
      } catch {
        // Fallback to mock data if backend is offline
        const fallback = mockUpcomingEvents.find((e) => e._id === id);
        if (fallback) {
          setEvent(fallback);
        } else {
          setError("Event not found or could not be retrieved.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Event Not Found"
          description="We couldn't locate the event you requested. It may have expired or been removed by its organizer."
          actionText="Browse Upcoming Events"
          actionHref="/upcoming-events"
        />
      </div>
    );
  }

  return <EventDetails event={event} />;
}

