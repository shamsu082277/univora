import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import Logo from "@/components/shared/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      {/* Brand Icon Treatment */}
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#3BB3F0]/20 to-[#004AAD]/20 text-[#004AAD] shadow-inner dark:text-[#3BB3F0]">
        <Compass className="h-10 w-10 animate-pulse" />
      </div>

      <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#004AAD] dark:bg-blue-950/60 dark:text-[#3BB3F0]">
        404 — Page Not Found
      </div>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
        Looks Like You&apos;re Off the Beaten Path
      </h1>

      <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
        The community page or event you are looking for doesn&apos;t exist, has been rescheduled, or was moved to another location.
      </p>

      {/* Navigation CTAs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#004AAD]/20 transition hover:bg-[#003B8C]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Homepage</span>
        </Link>

        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-xs transition hover:border-[#3BB3F0] hover:text-[#004AAD] dark:border-gray-700 dark:bg-[#111A2E] dark:text-gray-200 dark:hover:text-white"
        >
          <span>Explore Upcoming Events</span>
        </Link>
      </div>

      <div className="mt-12">
        <Logo size="sm" showTagline />
      </div>
    </div>
  );
}
