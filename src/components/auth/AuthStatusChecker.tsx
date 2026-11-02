"use client";

import { useState } from "react";
import { CheckCircle2, KeyRound, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { getAuthToken } from "@/lib/auth/token";
import { API_BASE_URL } from "@/lib/api/client";

interface VerifiedUser {
  id: string;
  name: string;
  email: string;
}

export default function AuthStatusChecker() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    status: "idle" | "success" | "error";
    user?: VerifiedUser;
    message?: string;
  }>({ status: "idle" });

  const handleCheckAuth = async () => {
    setIsLoading(true);
    setResult({ status: "idle" });

    try {
      // 1. Retrieve the JWT from BetterAuth client plugin
      const token = await getAuthToken();

      if (!token) {
        setResult({
          status: "error",
          message:
            "No active JWT token found in session. Please sign in with email/password or Google first.",
        });
        setIsLoading(false);
        return;
      }

      // 2. Transmit the JWT to the Express backend
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setResult({
          status: "error",
          message:
            data?.message ||
            `Backend rejected token with HTTP status ${response.status}`,
        });
        setIsLoading(false);
        return;
      }

      // 3. Authentication succeeded: store verified user data (without exposing raw JWT)
      setResult({
        status: "success",
        user: {
          id: data.id || "N/A",
          name: data.name || "Authenticated Volunteer",
          email: data.email || "N/A",
        },
        message: "JWT signature and claims verified successfully by Express JWKS.",
      });
    } catch (err: unknown) {
      setResult({
        status: "error",
        message:
          err instanceof Error
            ? err.message
            : "Could not connect to the Express authentication server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-[#111A2E]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#004AAD] dark:text-[#3BB3F0]" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Backend JWT Verification
            </h3>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Verify client JWT retrieval and Express JWKS middleware authorization.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckAuth}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-[#004AAD] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#003882] disabled:opacity-50 transition cursor-pointer shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Verifying JWT...</span>
            </>
          ) : (
            <>
              <KeyRound className="h-4 w-4" />
              <span>Check Backend Authentication</span>
            </>
          )}
        </button>
      </div>

      {/* Result Display */}
      {result.status === "success" && result.user && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs dark:border-emerald-900/50 dark:bg-emerald-950/40">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-semibold">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Authentication Succeeded</span>
          </div>
          <p className="mt-1 text-emerald-800/80 dark:text-emerald-300/80">
            {result.message}
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-emerald-200/60 pt-3 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200 font-medium">
            <div>
              <span className="text-emerald-600 dark:text-emerald-400">Name: </span>
              {result.user.name}
            </div>
            <div>
              <span className="text-emerald-600 dark:text-emerald-400">Email: </span>
              {result.user.email}
            </div>
          </div>
        </div>
      )}

      {result.status === "error" && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50/80 p-4 text-xs dark:border-red-900/50 dark:bg-red-950/40">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-semibold">
            <XCircle className="h-4 w-4 shrink-0" />
            <span>Authentication Failed</span>
          </div>
          <p className="mt-1 text-red-800/90 dark:text-red-300/90">
            {result.message}
          </p>
        </div>
      )}
    </div>
  );
}

