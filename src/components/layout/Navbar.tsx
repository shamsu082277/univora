"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, LogIn, Menu, X } from "lucide-react";
import Logo from "../shared/Logo";
import ThemeToggle from "../shared/ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isEventsActive = pathname?.startsWith("/upcoming-events");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-gray-800/80 dark:bg-[#0B1220]/90">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ================= LEFT: LOGO ================= */}
        <div className="flex items-center">
          <Logo showTagline size="md" />
        </div>

        {/* ================= MIDDLE: DESKTOP NAVIGATION ================= */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/upcoming-events"
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              isEventsActive
                ? "bg-[#3BB3F0]/15 text-[#004AAD] dark:text-[#3BB3F0]"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800/60 dark:hover:text-white"
            }`}
          >
            <Calendar className="h-4 w-4 text-[#004AAD] dark:text-[#3BB3F0]" />
            <span>Upcoming Events</span>
          </Link>
        </nav>

        {/* ================= RIGHT: DESKTOP ACTIONS ================= */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#004AAD]/20 transition-all duration-200 hover:bg-[#003B8C] hover:shadow-md active:scale-95"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </Link>
        </div>

        {/* ================= MOBILE CONTROLS ================= */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE DROPDOWN MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden dark:border-gray-800 dark:bg-[#0B1220]">
          <div className="flex flex-col gap-2">
            <Link
              href="/upcoming-events"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <Calendar className="h-4 w-4 text-[#004AAD] dark:text-[#3BB3F0]" />
              <span>Upcoming Events</span>
            </Link>

            <Link
              href="/create-event"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3BB3F0]/20 text-[#004AAD] text-xs dark:text-[#3BB3F0]">
                +
              </span>
              <span>Create an Event</span>
            </Link>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004AAD] py-2.5 text-sm font-semibold text-white transition hover:bg-[#003B8C]"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

