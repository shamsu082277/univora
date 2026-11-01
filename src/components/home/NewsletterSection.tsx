"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Mail, Send } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribed(true);
    toast.success("Thank you for subscribing!", {
      description: "You'll receive monthly community highlights and upcoming event alerts.",
    });
    setEmail("");
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#004AAD] via-[#003B8C] to-[#0B1220] p-8 sm:p-12 lg:p-16 text-white shadow-xl">
          
          {/* Subtle background decoration */}
          <div
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#3BB3F0]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#3BB3F0]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            
            {/* Icon badge */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xs text-[#3BB3F0] mb-5">
              <Mail className="h-6 w-6" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Stay Connected to Local Community Action
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-blue-100">
              Subscribe to the Univora newsletter to get first access to upcoming volunteer drives, community stories, and environmental impact updates directly in your inbox.
            </p>

            {/* Subscription Form */}
            {isSubscribed ? (
              <div className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white/15 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xs">
                <CheckCircle2 className="h-5 w-5 text-[#3BB3F0]" />
                <span>You are subscribed! We look forward to creating change together.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full rounded-xl bg-white px-4 py-3.5 pl-11 text-sm text-gray-900 placeholder-gray-500 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#3BB3F0]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#3BB3F0] px-6 py-3.5 text-sm font-bold text-gray-900 shadow-md transition-all duration-200 hover:bg-[#60c5f5] active:scale-95 shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-blue-200/80">
              Zero spam. Unsubscribe at any time with one click.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}

