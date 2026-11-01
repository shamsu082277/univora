import { whatWeDoFeatures } from "@/data/mockData";
import FeatureCard from "../shared/FeatureCard";
import SectionHeading from "../shared/SectionHeading";

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Our Core Pillars"
          title="What We Do to Empower Communities"
          description="Univora organizes collective volunteer efforts across four vital pillars of social development, fostering compassion, environmental stewardship, and opportunities for all."
          align="center"
        />

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDoFeatures.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
