"use client";

import { Suspense, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

function RedirectLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-7 w-7 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
        <p className="text-xs text-gray-500">Redirecting to event...</p>
      </div>
    </div>
  );
}

function UpcomingEventRedirectContent({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  useEffect(() => {
    if (resolvedParams?.id) {
      router.replace(`/events/${resolvedParams.id}`);
    }
  }, [resolvedParams, router]);

  return <RedirectLoader />;
}

export default function UpcomingEventRedirectPage({ params }: PageProps) {
  return (
    <Suspense fallback={<RedirectLoader />}>
      <UpcomingEventRedirectContent params={params} />
    </Suspense>
  );
}
