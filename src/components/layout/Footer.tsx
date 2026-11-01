import Link from "next/link";
import { Heart } from "lucide-react";
import Logo from "../shared/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0B1220] transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Logo showTagline size="lg" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Univora connects people through volunteering, community support, environmental activities, charity, and social development initiatives. Together, we create lasting change.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-[#3BB3F0] hover:text-[#004AAD] dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:text-white"
                aria-label="X (formerly Twitter)"
              >
                {/* Modern X Logo */}
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-[#3BB3F0] hover:text-[#004AAD] dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:text-white"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-[#3BB3F0] hover:text-[#004AAD] dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:text-white"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-[#3BB3F0] hover:text-[#004AAD] dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-[#3BB3F0] hover:text-[#004AAD] dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:text-white"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/upcoming-events" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Create an Event
                </Link>
              </li>
              <li>
                <Link href="#what-we-do" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Community Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Impact Areas */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              Impact Areas
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/upcoming-events?category=Community" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Community Support
                </Link>
              </li>
              <li>
                <Link href="/upcoming-events?category=Environment" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Environmental Care
                </Link>
              </li>
              <li>
                <Link href="/upcoming-events?category=Charity" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Donation & Charity
                </Link>
              </li>
              <li>
                <Link href="/upcoming-events?category=Education" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Education & Awareness
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              Community
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="#blog" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Stories & News
                </Link>
              </li>
              <li>
                <Link href="/login" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Volunteer Login
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-[#004AAD] dark:hover:text-[#3BB3F0]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} Univora. All rights reserved. Together, We Create Change.
          </p>
          <p className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            Built with <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> for community development
          </p>
        </div>
      </div>
    </footer>
  );
}


