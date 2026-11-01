import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { IBlogArticle } from "@/types";

interface BlogCardProps {
  article: IBlogArticle;
}

export default function BlogCard({ article }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#3BB3F0]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#111A2E] dark:hover:border-[#3BB3F0]/40">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#004AAD] shadow-xs backdrop-blur-xs dark:bg-[#0B1220]/90 dark:text-[#3BB3F0]">
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {article.publishedAt}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-3 text-lg font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#004AAD] dark:text-white dark:group-hover:text-[#3BB3F0] transition-colors">
            <Link href={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="mt-2.5 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
            {article.description}
          </p>
        </div>

        {/* Read More Link */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#004AAD] transition-colors hover:text-[#3BB3F0] dark:text-[#3BB3F0] dark:hover:text-blue-300"
          >
            <span>Read Full Story</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
