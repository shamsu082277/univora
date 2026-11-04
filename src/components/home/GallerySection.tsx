import EventImage from "../events/EventImage";
import { galleryItems } from "@/data/mockData";
import SectionHeading from "../shared/SectionHeading";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gray-50/60 dark:bg-[#0B1220]/60 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Impact In Action"
          title="Moments of Change: Community Gallery"
          description="A glimpse into the heartfelt initiatives, hands-on field drives, and collaborative spirit that power Univora every single week."
          align="center"
        />

        {/* 6 Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <figure
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-[#111A2E]"
            >
              <EventImage
                src={item.imageUrl}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-[#0B1220]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Caption */}
              <figcaption className="absolute bottom-0 inset-x-0 p-5 text-white">
                <span className="inline-block rounded-full bg-[#3BB3F0]/90 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white">
                  {item.category}
                </span>
                <h3 className="mt-1.5 text-base font-bold leading-snug">
                  {item.title}
                </h3>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}

