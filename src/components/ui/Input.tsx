import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useState,
} from "react";
import clsx from "clsx";
import { Eye, EyeOff, X } from "lucide-react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  loading?: boolean;
  clearable?: boolean;
  variant?: "outline" | "ghost";
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      icon,
      prefix,
      suffix,
      loading,
      clearable,
      variant = "outline",
      className,
      type,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType =
      isPassword && !showPassword ? "password" : "text";

    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { value: "" },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div className="w-full">
        {/* LABEL */}
        {label && (
          <label className="block text-sm font-medium mb-1 text-gray-700">
            {label}
          </label>
        )}

        {/* INPUT WRAPPER */}
        <div
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
            "focus-within:ring-2",
            {
              "border bg-white":
                variant === "outline",
              "bg-gray-100":
                variant === "ghost",
              "border-red-500 focus-within:ring-red-500":
                error,
              "border-gray-300 focus-within:ring-indigo-500":
                !error,
              "opacity-50 cursor-not-allowed":
                disabled,
            }
          )}
        >
          {/* LEFT ICON */}
          {icon && <span className="text-gray-400">{icon}</span>}

          {/* PREFIX */}
          {prefix && (
            <span className="text-gray-500 text-sm">
              {prefix}
            </span>
          )}

          {/* INPUT */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
            className={clsx(
              "w-full outline-none text-sm bg-transparent",
              "placeholder:text-gray-400",
              className
            )}
          />

          {/* CLEAR BUTTON */}
          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}

          {/* PASSWORD TOGGLE */}
          {isPassword && (
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          )}

          {/* LOADING */}
          {loading && (
            <span className="animate-spin text-gray-400">
              ⏳
            </span>
          )}

          {/* SUFFIX */}
          {suffix && (
            <span className="text-gray-500 text-sm">
              {suffix}
            </span>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-xs mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;