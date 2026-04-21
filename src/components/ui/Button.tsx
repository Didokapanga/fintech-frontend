import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  loading,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
        "flex items-center justify-center gap-2",
        "active:scale-95",
        {
          "bg-indigo-600 text-white hover:bg-indigo-700": variant === "primary",
          "bg-gray-200 text-gray-800 hover:bg-gray-300":
            variant === "secondary",
          "bg-red-500 text-white hover:bg-red-600": variant === "danger",
        },
        className
      )}
    >
      {loading && <span className="animate-spin">⏳</span>}
      {children}
    </button>
  );
}