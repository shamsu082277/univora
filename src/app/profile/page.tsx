"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Calendar,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserCheck,
} from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import { changePassword, updateUser, useSession } from "@/lib/auth-client";

function ProfileContent() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Profile Edit State
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileErrors, setProfileErrors] = useState<{
    name?: string;
    image?: string;
  }>({});

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Populate user data when session loads
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  // Dynamic new password criteria
  const hasMinLength = newPassword.length >= 6;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);

  // Validate Profile info
  const validateProfile = () => {
    const errs: typeof profileErrors = {};
    if (!name.trim()) {
      errs.name = "Full name cannot be empty.";
    }

    if (!image.trim()) {
      errs.image = "Photo URL cannot be empty.";
    } else if (!/^https?:\/\/.+\..+/.test(image.trim())) {
      errs.image = "Please enter a valid image URL (http:// or https://).";
    }

    setProfileErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Password change
  const validatePasswordChange = () => {
    const errs: typeof passwordErrors = {};
    if (!currentPassword) {
      errs.currentPassword = "Current password is required.";
    }

    if (!newPassword) {
      errs.newPassword = "New password is required.";
    } else if (!hasMinLength || !hasUpperCase || !hasLowerCase) {
      errs.newPassword =
        "Password must be at least 6 characters with uppercase and lowercase letters.";
    }

    if (!confirmPassword) {
      errs.confirmPassword = "Confirm password is required.";
    } else if (newPassword !== confirmPassword) {
      errs.confirmPassword = "New passwords do not match.";
    }

    setPasswordErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Profile Update
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateProfile()) return;

    setIsUpdatingProfile(true);
    try {
      const { data, error } = await updateUser({
        name: name.trim(),
        image: image.trim(),
      });

      if (error) {
        toast.error("Profile Update Failed", {
          description: error.message || "Could not update your profile.",
        });
        setIsUpdatingProfile(false);
        return;
      }

      toast.success("Profile Updated!", {
        description: "Your display name and photo have been updated.",
      });
      setIsUpdatingProfile(false);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to reach the authentication server.";
      toast.error("Update Error", { description: msg });
      setIsUpdatingProfile(false);
    }
  };

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePasswordChange()) return;

    setIsChangingPassword(true);
    try {
      const { data, error } = await changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error("Password Change Failed", {
          description:
            error.message ||
            "Unable to change password. Please verify your current password.",
        });
        setIsChangingPassword(false);
        return;
      }

      toast.success("Password Changed Successfully!", {
        description: "Your security credentials have been updated.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to connect to the authentication server.";
      toast.error("Security Error", { description: msg });
      setIsChangingPassword(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#004AAD] dark:text-[#3BB3F0]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* ================= USER BANNER ================= */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-[#111A2E]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Profile Avatar */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[#3BB3F0] bg-gradient-to-br from-[#3BB3F0] to-[#004AAD] shadow-md">
              {image ? (
                <img
                  src={image}
                  alt={name || "User avatar"}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                  {(name || "U").charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* User Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {name || "Univora Volunteer"}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <UserCheck className="h-3 w-3" />
                  Active Volunteer
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
              <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
                Together, We Create Change.
              </p>
            </div>
          </div>

          {/* Account Badge */}
          <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2.5 text-xs text-gray-600 dark:bg-[#162035] dark:text-gray-300">
            <ShieldCheck className="h-4 w-4 text-[#004AAD] dark:text-[#3BB3F0]" />
            <span>BetterAuth Protected</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ================= LEFT 2 COLS: EDIT FORMS ================= */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Card 1: Edit Profile Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111A2E]">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3BB3F0]/10 text-[#004AAD] dark:text-[#3BB3F0]">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Personal Information
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Update your public display name and profile picture URL.
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="mt-5 space-y-4">
              {/* Display Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Full Display Name <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (profileErrors.name)
                        setProfileErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Sarah Jenkins"
                    disabled={isUpdatingProfile}
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                      profileErrors.name
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  />
                </div>
                {profileErrors.name && (
                  <p className="mt-1 text-xs text-red-500">{profileErrors.name}</p>
                )}
              </div>

              {/* Photo URL */}
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
                      if (profileErrors.image)
                        setProfileErrors((prev) => ({ ...prev, image: undefined }));
                    }}
                    placeholder="https://images.unsplash.com/photo-..."
                    disabled={isUpdatingProfile}
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                      profileErrors.image
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  />
                </div>
                {profileErrors.image && (
                  <p className="mt-1 text-xs text-red-500">{profileErrors.image}</p>
                )}
              </div>

              {/* Email (Read Only per requirement) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 pl-10 text-sm text-gray-500 shadow-xs dark:border-gray-800 dark:bg-[#0B1220] dark:text-gray-400"
                  />
                </div>
                <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
                  Email address cannot be changed directly for security integrity.
                </p>
              </div>

              {/* Save Profile Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#004AAD] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#004AAD]/20 transition hover:bg-[#003B8C] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isUpdatingProfile ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Profile Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Card 2: Change Password */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111A2E]">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Change Password
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ensure your account remains safe with an updated strong password.
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      if (passwordErrors.currentPassword)
                        setPasswordErrors((prev) => ({
                          ...prev,
                          currentPassword: undefined,
                        }));
                    }}
                    placeholder="Enter current password"
                    disabled={isChangingPassword}
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 pr-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                      passwordErrors.currentPassword
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (passwordErrors.newPassword)
                        setPasswordErrors((prev) => ({
                          ...prev,
                          newPassword: undefined,
                        }));
                    }}
                    placeholder="At least 6 chars with uppercase & lowercase"
                    disabled={isChangingPassword}
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 pr-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                      passwordErrors.newPassword
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {passwordErrors.newPassword}
                  </p>
                )}

                {/* Validation checklist */}
                <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
                  <div
                    className={`flex items-center gap-1 ${
                      hasMinLength
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-400"
                    }`}
                  >
                    <Check className={`h-3 w-3 ${hasMinLength ? "opacity-100" : "opacity-30"}`} />
                    <span>6+ chars</span>
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

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (passwordErrors.confirmPassword)
                        setPasswordErrors((prev) => ({
                          ...prev,
                          confirmPassword: undefined,
                        }));
                    }}
                    placeholder="Repeat new password"
                    disabled={isChangingPassword}
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 pr-10 text-sm text-gray-900 shadow-xs transition outline-hidden focus:ring-2 focus:ring-[#3BB3F0] dark:bg-[#162035] dark:text-white ${
                      passwordErrors.confirmPassword
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-black dark:bg-[#162035] dark:hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <span>Update Password</span>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* ================= RIGHT 1 COL: ACCOUNT SUMMARY ================= */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#111A2E]">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Account Overview
            </h3>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Status</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Verified Member
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Account Type</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Volunteer
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Security</span>
                <span className="font-semibold text-[#004AAD] dark:text-[#3BB3F0]">
                  Session Active
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Platform</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Univora Web
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#3BB3F0]/20 bg-gradient-to-br from-[#3BB3F0]/10 to-transparent p-5 text-xs text-gray-700 dark:text-gray-300">
            <h4 className="font-bold text-[#004AAD] dark:text-[#3BB3F0]">
              Volunteer Guidelines
            </h4>
            <p className="mt-2 leading-relaxed">
              Keep your profile picture clear and recognizable so fellow volunteers and project organizers can connect with you during events.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}

