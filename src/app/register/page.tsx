"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Check,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client";
import Logo from "@/components/shared/Logo";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl =
    searchParams.get("callbackUrl") || searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Field validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    image?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Dynamic password criteria check
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const validateForm = () => {
    const errs: typeof errors = {};

    // Name validation
    if (!name.trim()) {
      errs.name = "Full name is required.";
    }

    // Email validation
    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }

    // Profile photo URL validation
    if (!image.trim()) {
      errs.image = "Profile photo URL is required.";
    } else if (!/^https?:\/\/.+\..+/.test(image.trim())) {
      errs.image = "Please enter a valid photo URL (starting with http:// or https://).";
    }

    // Password validation
    if (!password) {
      errs.password = "Password is required.";
    } else if (!hasUpperCase || !hasLowerCase || !hasMinLength) {
      errs.password =
        "Password must be at least 6 characters with uppercase and lowercase letters.";
    }

    // Confirm password validation
    if (!confirmPassword) {
      errs.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: redirectUrl,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: image.trim(),
        callbackURL: redirectUrl,
      });

      if (error) {
        toast.error("Registration Failed", {
          description:
            error.message ||
            "Unable to register your account. The email may already be in use.",
        });
        setIsLoading(false);
        return;
      }

      toast.success("Account Created Successfully!", {
        description: "Welcome to Univora! Setting up your session...",
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

  return (
    <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg dark:border-gray-800 dark:bg-[#111A2E]">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center">
        <Logo size="md" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Join the Univora Movement
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Create an account to join volunteer initiatives, track impact, and empower communities.
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

      <div className="relative my-6 flex items-center justify-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        <span className="absolute bg-white px-3 text-xs uppercase tracking-wider text-gray-400 dark:bg-[#111A2E]">
          Or register with email
        </span>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="e.g. Sarah Jenkins"
              disabled={isLoading}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Email Address <span className="text-red-500">*</span>
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
              disabled={isLoading}
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

        {/* Profile Photo URL */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Profile Photo URL <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="url"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                if (errors.image) setErrors((prev) => ({ ...prev, image: undefined }));
              }}
              placeholder="https://images.unsplash.com/photo-..."
              disabled={isLoading}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.image
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
          </div>
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{errors.image}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Password <span className="text-red-500">*</span>
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
              placeholder="At least 6 chars with upper & lower case"
              disabled={isLoading}
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
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}

          {/* Password Criteria Feedback */}
          <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
            <div
              className={`flex items-center gap-1 ${
                hasMinLength
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-400"
              }`}
            >
              <Check className={`h-3 w-3 ${hasMinLength ? "opacity-100" : "opacity-30"}`} />
              <span>6+ characters</span>
            </div>
            <div
              className={`flex items-center gap-1 ${
                hasUpperCase
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-400"
              }`}
            >
              <Check className={`h-3 w-3 ${hasUpperCase ? "opacity-100" : "opacity-30"}`} />
              <span>1 uppercase</span>
            </div>
            <div
              className={`flex items-center gap-1 ${
                hasLowerCase
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-400"
              }`}
            >
              <Check className={`h-3 w-3 ${hasLowerCase ? "opacity-100" : "opacity-30"}`} />
              <span>1 lowercase</span>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              placeholder="Confirm your password"
              disabled={isLoading}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 pr-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#004AAD] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#004AAD]/20 transition hover:bg-[#003B8C] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              <span>Complete Registration</span>
            </>
          )}
        </button>
      </form>

      {/* Link to Login */}
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href={`/login${redirectUrl !== "/" ? `?callbackUrl=${encodeURIComponent(redirectUrl)}` : ""}`}
          className="font-semibold text-[#004AAD] hover:underline dark:text-[#3BB3F0]"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </div>
  );
}

