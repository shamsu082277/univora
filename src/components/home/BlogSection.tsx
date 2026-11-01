import { mockBlogArticles } from "@/data/mockData";
import BlogCard from "../shared/BlogCard";
import SectionHeading from "../shared/SectionHeading";

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Stories & Updates"
          title="Voices from the Community"
          description="Read real stories, actionable insights, and impact reports written by the organizers and volunteers leading change on the ground."
          align="center"
        />

        {/* 3 Editorial Articles Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockBlogArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>

      </div>
    </section>
  );
}

