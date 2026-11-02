"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarPlus } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useSession } from "@/lib/auth-client";
import { createEvent } from "@/lib/api/events";
import { CreateEventInput } from "@/types/event";
import EventForm from "@/components/events/EventForm";
import SectionHeading from "@/components/shared/SectionHeading";

function CreateEventContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (values: CreateEventInput) => {
    if (!session?.user) {
      toast.error("Authentication Required", {
        description: "You must be signed in to create an event.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // The organizer's email and ID come from authenticated session
      const payload: CreateEventInput & {
        organizerId: string;
        organizerEmail: string;
      } = {
        ...values,
        organizerId: session.user.id,
        organizerEmail: session.user.email,
      };

      await createEvent(payload);

      toast.success("Event Created Successfully!", {
        description: `"${values.title}" has been published to the community calendar.`,
      });

      router.push("/upcoming-events");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to publish event to the API.";

      toast.error("Could Not Create Event", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <SectionHeading
          badge="Organizer Portal"
          title="Create a New Community Event"
          description="Mobilize volunteers, set project goals, and coordinate impactful drives in your neighborhood or city."
          align="left"
          className="mb-0"
        />
      </div>

      {/* Form Container */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm dark:border-gray-800 dark:bg-[#111A2E]">
        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5 dark:border-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3BB3F0]/15 text-[#004AAD] dark:text-[#3BB3F0]">
            <CalendarPlus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Initiative Details
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Publishing as {session?.user?.name || "Organizer"} ({session?.user?.email})
            </p>
          </div>
        </div>

        <EventForm
          onSubmit={handleCreate}
          isSubmitting={isSubmitting}
          submitButtonText="Publish Event"
          cancelHref="/upcoming-events"
        />
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <AuthGuard>
      <CreateEventContent />
    </AuthGuard>
  );
}
