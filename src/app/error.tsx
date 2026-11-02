"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to client monitoring
    console.error("Univora Application Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/60 dark:text-red-400">
        Application Error
      </div>

      <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Something Went Wrong
      </h1>

      <p className="mx-auto mt-3 max-w-md text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {error.message ||
          "An unexpected error occurred while communicating with the platform. Our team has been notified."}
      </p>

      {error.digest && (
        <p className="mt-1 text-[11px] text-gray-400 font-mono">
          Digest: {error.digest}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#004AAD]/20 transition hover:bg-[#003B8C] cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 shadow-xs transition hover:border-[#3BB3F0] dark:border-gray-700 dark:bg-[#111A2E] dark:text-gray-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
