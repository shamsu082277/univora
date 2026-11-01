import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  eventTitle: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationDialog({
  isOpen,
  eventTitle,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#111A2E]">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Delete Community Event
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Are you sure you want to permanently delete{" "}
          <strong className="text-gray-900 dark:text-white font-semibold">
            &ldquo;{eventTitle}&rdquo;
          </strong>
          ? All associated volunteer registrations will be removed.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-xl border border-gray-200 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:opacity-50 transition cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Confirm Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

