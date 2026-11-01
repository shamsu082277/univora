import Link from "next/link";
import { ArrowRight, BookOpen, Gift, HandHeart, Trees } from "lucide-react";
import { IFeatureCard } from "@/types";

interface FeatureCardProps {
  feature: IFeatureCard;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const getIcon = (name: IFeatureCard["iconName"]) => {
    switch (name) {
      case "hand-heart":
        return <HandHeart className="h-6 w-6" />;
      case "tree-pine":
        return <Trees className="h-6 w-6" />;
      case "gift":
        return <Gift className="h-6 w-6" />;
      case "book-open":
        return <BookOpen className="h-6 w-6" />;
      default:
        return <HandHeart className="h-6 w-6" />;
    }
  };

  // Distinct accent styles per card while maintaining cohesive brand harmony
  const accentStyles = [
    {
      iconBg: "bg-blue-50 text-[#004AAD] dark:bg-blue-950/60 dark:text-[#3BB3F0]",
      borderHover: "hover:border-blue-300 dark:hover:border-blue-700",
    },
    {
      iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
      borderHover: "hover:border-emerald-300 dark:hover:border-emerald-700",
    },
    {
      iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
      borderHover: "hover:border-amber-300 dark:hover:border-amber-700",
    },
    {
      iconBg: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
      borderHover: "hover:border-purple-300 dark:hover:border-purple-700",
    },
  ];

  const currentStyle = accentStyles[index % accentStyles.length];

  return (
    <div
      className={`group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-[#111A2E] ${currentStyle.borderHover}`}
    >
      <div>
        {/* Icon */}
        <div
          className={`flex h-13 w-13 items-center justify-center rounded-xl ${currentStyle.iconBg} transition-transform duration-300 group-hover:scale-105`}
        >
          {getIcon(feature.iconName)}
        </div>

        {/* Heading */}
        <h3 className="mt-5 text-xl font-bold text-gray-900 group-hover:text-[#004AAD] dark:text-white dark:group-hover:text-[#3BB3F0] transition-colors">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {feature.description}
        </p>
      </div>

      {/* Action Link */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/80">
        <Link
          href={feature.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#004AAD] transition-colors hover:text-[#3BB3F0] dark:text-[#3BB3F0] dark:hover:text-blue-300"
        >
          <span>{feature.linkText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
