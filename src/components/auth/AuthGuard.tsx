"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isPending && !session) {
      const fullPath = searchParams?.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(fullPath)}`);
    }
  }, [isPending, session, pathname, searchParams, router]);

  // Loading state while restoring/checking session
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3BB3F0]/10 text-[#004AAD] dark:text-[#3BB3F0]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            Verifying your session...
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Please wait while we secure your account connection.
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated, do not render protected children while redirecting
  if (!session) {
    return null;
  }

  return <>{children}</>;
}

