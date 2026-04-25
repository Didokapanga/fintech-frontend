// src/components/ui/AppMessageState.tsx

import {
  AlertCircle,
  CheckCircle2,
  Info,
  RefreshCw,
} from "lucide-react";

type Variant =
  | "error"
  | "success"
  | "info"
  | "warning"
  | "empty";

type Props = {
  variant?: Variant;
  title?: string;
  message?: string;
  buttonText?: string;
  onAction?: () => void;
  fullPage?: boolean;
};

export default function AppMessageState({
  variant = "info",
  title = "Information",
  message = "Aucune information disponible pour le moment.",
  buttonText = "Réessayer",
  onAction,
  fullPage = false,
}: Props) {
  const config = {
    error: {
      icon: AlertCircle,
      iconBg: "bg-red-50 border-red-100",
      iconColor: "text-red-500",
      border: "border-red-100",
    },

    success: {
      icon: CheckCircle2,
      iconBg: "bg-green-50 border-green-100",
      iconColor: "text-green-500",
      border: "border-green-100",
    },

    info: {
      icon: Info,
      iconBg: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-500",
      border: "border-blue-100",
    },

    warning: {
      icon: AlertCircle,
      iconBg: "bg-yellow-50 border-yellow-100",
      iconColor: "text-yellow-500",
      border: "border-yellow-100",
    },

    empty: {
      icon: Info,
      iconBg: "bg-gray-50 border-gray-200",
      iconColor: "text-gray-500",
      border: "border-gray-200",
    },
  };

  const current =
    config[variant];

  const Icon =
    current.icon;

  return (
    <div
      className={`
        ${
          fullPage
            ? "min-h-[70vh]"
            : "min-h-[280px]"
        }
        flex items-center justify-center
        px-4
      `}
    >
      <div
        className={`
          relative overflow-hidden
          w-full max-w-xl
          rounded-3xl
          border
          bg-white
          shadow-sm
          p-8
          ${current.border}
        `}
      >
        {/* Glow */}
        <div
          className="
            absolute -top-10 -right-10
            w-40 h-40
            rounded-full
            bg-gray-50
            blur-3xl
            pointer-events-none
          "
        />

        <div className="relative z-10 text-center">

          {/* ICON */}
          <div
            className={`
              mx-auto mb-5
              w-16 h-16
              rounded-2xl
              flex items-center justify-center
              border
              ${current.iconBg}
            `}
          >
            <Icon
              className={`w-8 h-8 ${current.iconColor}`}
            />
          </div>

          {/* TITLE */}
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>

          {/* MESSAGE */}
          <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
            {message}
          </p>

          {/* ACTION */}
          {onAction && (
            <button
              type="button"
              onClick={onAction}
              className="
                mt-6 inline-flex items-center gap-2
                px-5 py-3
                rounded-xl
                border border-gray-200
                text-sm font-medium
                text-gray-700
                hover:shadow-sm
                hover:border-gray-300
                transition-all
              "
            >
              <RefreshCw className="w-4 h-4" />
              {buttonText}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}