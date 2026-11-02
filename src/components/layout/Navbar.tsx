"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  CalendarCheck,
  CalendarRange,
  LogIn,
  LogOut,
  Menu,
  PlusCircle,
  User,
  X,
} from "lucide-react";
import Logo from "../shared/Logo";
import ThemeToggle from "../shared/ThemeToggle";
import UserNavDropdown from "./UserNavDropdown";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const isEventsActive = pathname?.startsWith("/upcoming-events");

  const handleMobileSignOut = async () => {
    setIsMenuOpen(false);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully");
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("Failed to sign out. Please try again.");
    }
  };

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

          {!isPending && session ? (
            <UserNavDropdown />
          ) : !isPending && !session ? (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#004AAD]/20 transition-all duration-200 hover:bg-[#003B8C] hover:shadow-md active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          ) : (
            <div className="h-9 w-20 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
          )}
        </div>

        {/* ================= MOBILE CONTROLS ================= */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          {!isPending && session && (
            <div className="sm:hidden">
              <UserNavDropdown />
            </div>
          )}

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
            
            {/* If logged in: User header badge in mobile menu */}
            {session?.user && (
              <div className="mb-2 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-[#111A2E]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3BB3F0] to-[#004AAD] text-sm font-bold text-white overflow-hidden">
                  {session.user.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    session.user.name?.charAt(0) || "U"
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                    {session.user.name}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {session.user.email}
                  </p>
                </div>
              </div>
            )}

            <Link
              href="/upcoming-events"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <Calendar className="h-4 w-4 text-[#004AAD] dark:text-[#3BB3F0]" />
              <span>Upcoming Events</span>
            </Link>

            {/* Authenticated Links */}
            {session ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <User className="h-4 w-4 text-[#004AAD] dark:text-[#3BB3F0]" />
                  <span>Profile</span>
                </Link>

                <Link
                  href="/create-event"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <PlusCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Create an Event</span>
                </Link>

                <Link
                  href="/manage-events"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <CalendarRange className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Manage Events</span>
                </Link>

                <Link
                  href="/joined-events"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <CalendarCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>Joined Events</span>
                </Link>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={handleMobileSignOut}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40 transition cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </>
            ) : (
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
            )}

          </div>
        </div>
      )}
    </header>
  );
}
