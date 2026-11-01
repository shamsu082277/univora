"use client";

import Link from "next/link";
import { ArrowLeft, CalendarRange, Sparkles } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

function ManageEventsContent() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 text-center shadow-sm dark:border-gray-800 dark:bg-[#111A2E]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          <CalendarRange className="h-8 w-8" />
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Protected Route Confirmed</span>
        </div>

        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Manage Your Events
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          You are authenticated! The organizer dashboard for editing, updating attendee lists, and deleting your created initiatives will be connected in the Event Management step.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#003B8C] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
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

