import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  footer,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative w-full max-w-lg mx-4">
        <div className="bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">

          {/* HEADER */}
          {title && (
            <div className="p-4 border-b font-semibold">
              {title}
            </div>
          )}

          {/* BODY (SCROLL) */}
          <div className="p-4 overflow-y-auto flex-1">
            {children}
          </div>

          {/* FOOTER */}
          {footer && (
            <div className="p-4 border-t flex justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}