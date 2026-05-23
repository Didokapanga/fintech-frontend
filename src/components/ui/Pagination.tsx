// src/shared/components/table/Pagination.tsx

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Props = {
  page: number;

  onChange: (
    page: number
  ) => void;

  totalPages?: number;

  totalItems?: number;

  perPage?: number;
};

/* -------------------------------------------------------------------------- */
/*                                PAGINATION                                  */
/* -------------------------------------------------------------------------- */

export default function Pagination({
  page,
  onChange,
  totalPages,
  totalItems,
  perPage,
}: Props) {

  /* ------------------------------------------------------------------------ */
  /*                                  HELPERS                                 */
  /* ------------------------------------------------------------------------ */

  const canGoPrevious =
    page > 1;

  const canGoNext =
    totalPages
      ? page < totalPages
      : true;

  const startItem =
    totalItems &&
    perPage
      ? (page - 1) *
          perPage +
        1
      : null;

  const endItem =
    totalItems &&
    perPage
      ? Math.min(
          page *
            perPage,
          totalItems
        )
      : null;

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-[24px]
        border
        border-slate-200/80
        bg-white
        px-5
        py-4
        md:flex-row
        md:items-center
        md:justify-between
      "
    >

      {/* ------------------------------------------------------------------ */}
      {/* LEFT                                                               */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex
          flex-col
          gap-1
        "
      >

        <span
          className="
            text-sm
            font-semibold
            text-slate-800
          "
        >
          Pagination
        </span>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-slate-500
          "
        >

          <span>
            Page{" "}
            <span
              className="
                font-semibold
                text-slate-700
              "
            >
              {page}
            </span>
          </span>

          {totalPages && (

            <>
              <span>
                •
              </span>

              <span>
                sur{" "}
                <span
                  className="
                    font-semibold
                    text-slate-700
                  "
                >
                  {totalPages}
                </span>
              </span>
            </>
          )}

          {startItem &&
            endItem &&
            totalItems && (

              <>
                <span>
                  •
                </span>

                <span>
                  {startItem}-
                  {endItem} sur{" "}
                  <span
                    className="
                      font-semibold
                      text-slate-700
                    "
                  >
                    {totalItems}
                  </span>
                </span>
              </>
            )}

        </div>

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* RIGHT                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        {/* PREVIOUS */}

        <button
          type="button"
          onClick={() =>
            onChange(
              page - 1
            )
          }
          disabled={
            !canGoPrevious
          }
          className="
            inline-flex
            h-11
            items-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            font-semibold
            text-slate-700
            transition-all
            duration-200
            hover:border-slate-300
            hover:bg-slate-50
            hover:shadow-sm
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:bg-white
            disabled:hover:shadow-none
          "
        >

          <ChevronLeft
            size={16}
          />

          Précédent

        </button>

        {/* CURRENT PAGE */}

        <div
          className="
            flex
            h-11
            min-w-[56px]
            items-center
            justify-center
            rounded-2xl
            border
            border-indigo-100
            bg-indigo-50
            px-4
          "
        >

          <span
            className="
              text-sm
              font-semibold
              text-indigo-700
            "
          >
            {page}
          </span>

        </div>

        {/* NEXT */}

        <button
          type="button"
          onClick={() =>
            onChange(
              page + 1
            )
          }
          disabled={
            !canGoNext
          }
          className="
            inline-flex
            h-11
            items-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            font-semibold
            text-slate-700
            transition-all
            duration-200
            hover:border-slate-300
            hover:bg-slate-50
            hover:shadow-sm
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:bg-white
            disabled:hover:shadow-none
          "
        >

          Suivant

          <ChevronRight
            size={16}
          />

        </button>

      </div>

    </div>
  );
}