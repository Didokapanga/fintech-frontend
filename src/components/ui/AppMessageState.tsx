// src/components/ui/AppMessageState.tsx

import {
  AlertCircle,
  CheckCircle2,
  Info,
  RefreshCw,
  X,
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
  buttonText = "Fermer",
  onAction,
  fullPage = false,
}: Props) {
  const config = {
    error: {
      icon: AlertCircle,
      iconBg: "bg-red-50 border-red-100",
      iconColor: "text-red-500",
      border: "border-red-200",
    },

    success: {
      icon: CheckCircle2,
      iconBg: "bg-green-50 border-green-100",
      iconColor: "text-green-500",
      border: "border-green-200",
    },

    info: {
      icon: Info,
      iconBg: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-500",
      border: "border-blue-200",
    },

    warning: {
      icon: AlertCircle,
      iconBg: "bg-yellow-50 border-yellow-100",
      iconColor: "text-yellow-500",
      border: "border-yellow-200",
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

  /**
   * 🔥 MODE ALERT
   * compact, sans prendre toute la page
   */
  if (!fullPage) {
    return (
      <div className="w-full">
        <div
          className={`
            w-full
            rounded-2xl
            border
            bg-white
            shadow-sm
            px-5
            py-4
            ${current.border}
          `}
        >
          <div className="flex items-start gap-4">
            {/* ICON */}
            <div
              className={`
                flex-shrink-0
                w-12 h-12
                rounded-xl
                border
                flex items-center justify-center
                ${current.iconBg}
              `}
            >
              <Icon
                className={`w-6 h-6 ${current.iconColor}`}
              />
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-gray-800">
                {title}
              </h2>

              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                {message}
              </p>
            </div>

            {/* CLOSE BUTTON */}
            {onAction && (
              <button
                type="button"
                onClick={onAction}
                className="
                  flex-shrink-0
                  p-2
                  rounded-lg
                  hover:bg-gray-50
                  transition-all
                "
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* OPTIONAL ACTION BUTTON */}
          {onAction && buttonText !== "Fermer" && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onAction}
                className="
                  inline-flex items-center gap-2
                  px-4 py-2
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
            </div>
          )}
        </div>
      </div>
    );
  }

  /**
   * 🔥 MODE FULL PAGE
   * garde ton ancien rendu
   */
  return (
    <div
      className="
        min-h-[70vh]
        flex items-center justify-center
        px-4
      "
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

          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>

          <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
            {message}
          </p>

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