import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";
import BlogSection from "@/components/home/BlogSection";
import GallerySection from "@/components/home/GallerySection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      {/* A. Hero Section */}
      <HeroSection />

      {/* B. Community Impact Statistics */}
      <StatsSection />

      {/* C. What We Do */}
      <WhatWeDoSection />

      {/* D. Upcoming Events */}
      <UpcomingEventsSection />

      {/* E. Community Blog / News */}
      <BlogSection />

      {/* F. Community Gallery */}
      <GallerySection />

      {/* G. Newsletter Section */}
      <NewsletterSection />
    </>
  );
}
