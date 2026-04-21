import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  variant?: "success" | "danger" | "warning" | "info";
};

export default function Badge({ children, variant = "info" }: Props) {
  return (
    <span
      className={clsx(
        "px-2 py-1 text-xs rounded-full font-medium",
        {
          "bg-green-100 text-green-700": variant === "success",
          "bg-red-100 text-red-700": variant === "danger",
          "bg-yellow-100 text-yellow-700": variant === "warning",
          "bg-blue-100 text-blue-700": variant === "info",
        }
      )}
    >
      {children}
    </span>
  );
}