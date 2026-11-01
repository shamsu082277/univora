import Link from "next/link";
import { Facebook, Github, Heart, Instagram, Linkedin } from "lucide-react";
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
                {/* Modern X Logo SVG */}
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
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-[#3BB3F0] hover:text-[#004AAD] dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-[#3BB3F0] hover:text-[#004AAD] dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-[#3BB3F0] hover:text-[#004AAD] dark:border-gray-800 dark:bg-[#111A2E] dark:text-gray-300 dark:hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
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
