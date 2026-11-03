"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getEventDetails } from "@/lib/api";
import { IEvent } from "@/types";
import EventDetails from "@/components/events/EventDetails";
import EmptyState from "@/components/events/EmptyState";

function EventDetailsLoader() {
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

function EventDetailsContent() {
  const params = useParams();
  const id = params?.id as string;

  const [event, setEvent] = useState<IEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getEventDetails(id);
        if (isMounted) {
          if (data && data._id) {
            setEvent(data);
          } else {
            setError("Event not found.");
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg =
            err instanceof Error
              ? err.message
              : "Failed to load event details from the server.";
          setError(msg);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();
    return () => {
      isMounted = false;
    };
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
          description={
            error ||
            "We couldn't locate the event you requested. It may have expired or been removed by its organizer."
          }
          actionText="Browse Upcoming Events"
          actionHref="/upcoming-events"
        />
      </div>
    );
  }

  return <EventDetails event={event} />;
}

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<EventDetailsLoader />}>
      <EventDetailsContent />
    </Suspense>
  );
}
