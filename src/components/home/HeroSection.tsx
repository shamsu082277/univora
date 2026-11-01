import Image from "next/image";
import { Calendar, PlusCircle, Sparkles, Users } from "lucide-react";
import PrimaryButton from "../shared/PrimaryButton";
import SecondaryButton from "../shared/SecondaryButton";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#3BB3F0]/10 via-transparent to-transparent py-12 sm:py-18 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-start lg:col-span-7">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3BB3F0]/30 bg-[#3BB3F0]/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#004AAD] shadow-xs dark:border-[#3BB3F0]/30 dark:bg-[#3BB3F0]/15 dark:text-[#3BB3F0]">
              <Sparkles className="h-4 w-4" />
              <span>Together, We Create Change.</span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white leading-[1.12]">
              Make a Difference, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004AAD] to-[#3BB3F0]">Together.</span>
            </h1>

            {/* Platform Description */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
              Univora connects changemakers, volunteers, and grassroots communities to spark social development. Discover purposeful volunteering opportunities, organize community support, plant greener neighborhoods, and create real impact where it matters most.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <PrimaryButton
                href="/upcoming-events"
                size="lg"
                icon={<Calendar className="h-5 w-5" />}
                className="w-full sm:w-auto"
              >
                Explore Upcoming Events
              </PrimaryButton>

              <SecondaryButton
                href="/create-event"
                size="lg"
                icon={<PlusCircle className="h-5 w-5" />}
                className="w-full sm:w-auto"
              >
                Create an Event
              </SecondaryButton>
            </div>

            {/* Active Social Proof */}
            <div className="mt-10 flex items-center gap-3 pt-6 border-t border-gray-200/80 dark:border-gray-800/80">
              <div className="flex -space-x-2 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Volunteer avatar"
                  width={36}
                  height={36}
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#0B1220] object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Volunteer avatar"
                  width={36}
                  height={36}
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#0B1220] object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Volunteer avatar"
                  width={36}
                  height={36}
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#0B1220] object-cover"
                />
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#004AAD] text-[11px] font-bold text-white ring-2 ring-white dark:ring-[#0B1220]">
                  +12k
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">12,500+ passionate volunteers</span> actively creating change.
              </p>
            </div>

          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Outer decorative glow */}
              <div
                className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#3BB3F0]/30 to-[#004AAD]/20 blur-xl opacity-70"
                aria-hidden="true"
              />

              {/* Main Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xl dark:border-gray-800 dark:bg-[#111A2E]">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80"
                  alt="Univora community service volunteers working together happily"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="object-cover"
                />

                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto rounded-xl bg-white/95 p-3.5 shadow-lg backdrop-blur-md dark:bg-[#0B1220]/90 border border-gray-200/60 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3BB3F0]/20 text-[#004AAD] dark:text-[#3BB3F0]">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">
                        Next Drive: Green Canopy
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        142 volunteers confirmed
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
