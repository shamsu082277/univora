"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarCheck,
  CalendarRange,
  ChevronDown,
  LogOut,
  PlusCircle,
  User,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function UserNavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  const userName = user?.name || "Volunteer";
  const userEmail = user?.email || "";
  const userImage = user?.image;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
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
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button with Avatar and Display Name on hover */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title={userName}
        aria-label={`User menu for ${userName}`}
        aria-expanded={isOpen}
        className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 pr-2.5 shadow-xs transition hover:border-[#3BB3F0] hover:bg-gray-50 focus:outline-hidden dark:border-gray-800 dark:bg-[#111A2E] dark:hover:border-[#3BB3F0] dark:hover:bg-[#162035]"
      >
        {/* Avatar */}
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#3BB3F0] to-[#004AAD] text-white">
          {userImage ? (
            <img
              src={userImage}
              alt={userName}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="text-xs font-bold uppercase">
              {userName.charAt(0)}
            </span>
          )}
        </div>

        {/* Display name with subtle hover */}
        <span className="hidden sm:inline-block max-w-[120px] truncate text-xs font-semibold text-gray-800 group-hover:text-[#004AAD] dark:text-gray-200 dark:group-hover:text-[#3BB3F0]">
          {userName}
        </span>

        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-64 origin-top-right overflow-hidden rounded-2xl border border-gray-200 bg-white py-1 shadow-xl transition-all dark:border-gray-800 dark:bg-[#111A2E]">
          {/* User Details Header */}
          <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
            <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
              {userName}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {userEmail}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="p-1 space-y-0.5">
            {/* 1. Profile */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition"
            >
              <User className="h-4 w-4 text-[#004AAD] dark:text-[#3BB3F0]" />
              <span>Profile</span>
            </Link>

            {/* 2. Create Event */}
            <Link
              href="/create-event"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition"
            >
              <PlusCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Create Event</span>
            </Link>

            {/* 3. Manage Events */}
            <Link
              href="/manage-events"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition"
            >
              <CalendarRange className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Manage Events</span>
            </Link>

            {/* 4. Joined Events */}
            <Link
              href="/joined-events"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition"
            >
              <CalendarCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Joined Events</span>
            </Link>
          </div>

          {/* 5. Log Out */}
          <div className="border-t border-gray-100 p-1 dark:border-gray-800">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

