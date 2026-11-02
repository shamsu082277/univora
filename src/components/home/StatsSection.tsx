import { CalendarCheck, Globe, Heart, Users } from "lucide-react";
import { communityStats } from "@/data/mockData";
import { IStatItem } from "@/types";

export default function StatsSection() {
  const getStatIcon = (name: IStatItem["iconName"]) => {
    switch (name) {
      case "users":
        return <Users className="h-5 w-5 text-[#004AAD] dark:text-[#3BB3F0]" />;
      case "calendar-check":
        return <CalendarCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case "heart":
        return <Heart className="h-5 w-5 text-rose-500 dark:text-rose-400" />;
      case "globe":
        return <Globe className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
      default:
        return <Users className="h-5 w-5 text-[#004AAD] dark:text-[#3BB3F0]" />;
    }
  };

  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {communityStats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-[#111A2E]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 dark:bg-[#162035]">
                  {getStatIcon(stat.iconName)}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                {stat.highlight && (
                  <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
                    {stat.highlight}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
