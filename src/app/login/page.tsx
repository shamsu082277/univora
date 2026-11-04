"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Logo from "@/components/shared/Logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl =
    searchParams.get("callbackUrl") || searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!password) {
      errs.password = "Password is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      const { error } = await signIn.email({
        email: email.trim().toLowerCase(),
        password,
        callbackURL: redirectUrl,
      });

      if (error) {
        toast.error("Authentication Failed", {
          description:
            error.message ||
            "Invalid email or password. Please check your credentials.",
        });
        setIsLoading(false);
        return;
      }

      toast.success("Welcome back!", {
        description: "Successfully signed in to Univora.",
      });

      router.push(redirectUrl);
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not reach the authentication server. Please ensure the backend is running.";
      toast.error("Connection Error", {
        description: message,
      });
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const origin =
        typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : "http://localhost:3000";

      const targetUrl =
        redirectUrl.startsWith("http://") || redirectUrl.startsWith("https://")
          ? redirectUrl
          : `${origin}${redirectUrl.startsWith("/") ? redirectUrl : `/${redirectUrl}`}`;

      const { error } = await signIn.social({
        provider: "google",
        callbackURL: targetUrl,
      });

      if (error) {
        toast.error("Google Sign-In Failed", {
          description:
            error.message || "Failed to initiate Google authentication.",
        });
        setIsGoogleLoading(false);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not reach the authentication server. Please check backend OAuth configuration.";
      toast.error("Connection Error", {
        description: message,
      });
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg dark:border-gray-800 dark:bg-[#111A2E]">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center">
        <Logo size="md" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to Univora
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Sign in to join community drives, manage projects, and create change.
        </p>
      </div>

      {/* Social Google Login Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || isGoogleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-xs transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-[#162035] dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {isGoogleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          )}
          <span>Continue with Google</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-gray-400 dark:bg-[#111A2E] dark:text-gray-500">
            or sign in with email
          </span>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="you@example.com"
              disabled={isLoading || isGoogleLoading}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="••••••••"
              disabled={isLoading || isGoogleLoading}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 pr-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#004AAD] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#004AAD]/20 transition hover:bg-[#003B8C] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      {/* Link to Register */}
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        Don&apos;t have an account yet?{" "}
        <Link
          href={`/register${redirectUrl !== "/" ? `?callbackUrl=${encodeURIComponent(redirectUrl)}` : ""}`}
          className="font-semibold text-[#004AAD] hover:underline dark:text-[#3BB3F0]"
        >
          Register for free
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}

