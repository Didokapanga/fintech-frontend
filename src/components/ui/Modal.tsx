// src/components/ui/Modal.tsx

import type {
  ReactNode,
} from "react";

type Props = {
  open: boolean;

  onClose: () => void;

  title?: string;

  footer?: ReactNode;

  children: ReactNode;

  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
};

/* -------------------------------------------------------------------------- */
/*                                   MODAL                                    */
/* -------------------------------------------------------------------------- */

export default function Modal({
  open,
  onClose,
  title,
  footer,
  children,
  size = "xl",
}: Props) {

  if (!open)
    return null;

  /* ------------------------------------------------------------------------ */
  /*                                   SIZES                                  */
  /* ------------------------------------------------------------------------ */

  const sizes = {
    sm: "max-w-md",

    md: "max-w-xl",

    lg: "max-w-2xl",

    xl: "max-w-4xl",

    "2xl":
      "max-w-5xl",

    "3xl":
      "max-w-6xl",

    "4xl":
      "max-w-7xl",

    "5xl":
      "max-w-[1400px]",

    full:
      "max-w-[96vw]",
  };

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        overflow-y-auto
        p-4
        md:p-6
      "
    >

      {/* -------------------------------------------------------------- */}
      {/* BACKDROP                                                       */}
      {/* -------------------------------------------------------------- */}

      <div
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-slate-950/50
          backdrop-blur-[6px]
          transition-opacity
        "
      />

      {/* -------------------------------------------------------------- */}
      {/* MODAL                                                          */}
      {/* -------------------------------------------------------------- */}

      <div
        className={`
          relative
          w-full
          ${sizes[size]}
          animate-in
          fade-in-0
          zoom-in-95
          duration-200
        `}
      >

        <div
          className="
            flex
            max-h-[96vh]
            flex-col
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            shadow-[0_24px_80px_rgba(15,23,42,0.18)]
          "
        >

          {/* ---------------------------------------------------------- */}
          {/* HEADER                                                     */}
          {/* ---------------------------------------------------------- */}

          {title && (

            <div
              className="
                border-b
                border-slate-200
                px-10
                py-7
              "
            >

              <h2
                className="
                  text-xl
                  font-semibold
                  tracking-[-0.02em]
                  text-slate-900
                "
              >
                {title}
              </h2>

            </div>
          )}

          {/* ---------------------------------------------------------- */}
          {/* BODY                                                       */}
          {/* ---------------------------------------------------------- */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-10
              py-8
            "
          >
            {children}
          </div>

          {/* ---------------------------------------------------------- */}
          {/* FOOTER                                                     */}
          {/* ---------------------------------------------------------- */}

          {footer && (

            <div
              className="
                flex
                items-center
                justify-end
                gap-3
                border-t
                border-slate-200
                bg-slate-50/70
                px-10
                py-5
              "
            >
              {footer}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}