// src/shared/components/table/Table.tsx

import {
  ChevronRight,
  Loader2,
} from "lucide-react";

import type {
  Column,
} from "./Table.types";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Props<T> = {
  data: T[];

  columns: Column<T>[];

  loading?: boolean;

  emptyTitle?: string;

  emptyDescription?: string;

  rowClassName?: (
    row: T
  ) => string;
};

/* -------------------------------------------------------------------------- */
/*                                   TABLE                                    */
/* -------------------------------------------------------------------------- */

export default function Table<
  T extends {
    id: string;
  },
>({
  data,
  columns,
  loading,
  emptyTitle =
    "Aucune donnée disponible",
  emptyDescription =
    "Les données apparaîtront ici une fois disponibles.",
  rowClassName,
}: Props<T>) {

  /* ------------------------------------------------------------------------ */
  /*                                  LOADING                                 */
  /* ------------------------------------------------------------------------ */

  if (loading) {

    return (
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200/80
          bg-white
        "
      >

        <div
          className="
            flex
            h-[320px]
            flex-col
            items-center
            justify-center
            gap-4
          "
        >

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-slate-100
            "
          >

            <Loader2
              size={24}
              className="
                animate-spin
                text-slate-500
              "
            />

          </div>

          <div
            className="
              text-center
            "
          >

            <h3
              className="
                text-sm
                font-semibold
                text-slate-800
              "
            >
              Chargement des données
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Synchronisation des
              informations en cours...
            </p>

          </div>

        </div>

      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                   EMPTY                                  */
  /* ------------------------------------------------------------------------ */

  if (
    !loading &&
    data.length === 0
  ) {

    return (
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200/80
          bg-white
        "
      >

        <div
          className="
            flex
            h-[320px]
            flex-col
            items-center
            justify-center
            px-6
            text-center
          "
        >

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-[22px]
              bg-slate-100
            "
          >

            <ChevronRight
              size={28}
              className="
                text-slate-400
              "
            />

          </div>

          <h3
            className="
              mt-6
              text-lg
              font-semibold
              tracking-[-0.02em]
              text-slate-900
            "
          >
            {emptyTitle}
          </h3>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-500
            "
          >
            {emptyDescription}
          </p>

        </div>

      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                   TABLE                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200/80
        bg-white
      "
    >

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            min-w-full
            border-separate
            border-spacing-0
          "
        >

          {/* -------------------------------------------------------------- */}
          {/* TABLE HEAD                                                     */}
          {/* -------------------------------------------------------------- */}

          <thead
            className="
              bg-slate-50/80
            "
          >

            <tr>

              {columns.map(
                (
                  col,
                  index
                ) => (

                  <th
                    key={`${String(
                      col.accessor
                    )}-${index}`}
                    className="
                      border-b
                      border-slate-200
                      px-6
                      py-5
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-slate-400
                      whitespace-nowrap
                    "
                  >
                    {col.header}
                  </th>
                )
              )}

            </tr>

          </thead>

          {/* -------------------------------------------------------------- */}
          {/* TABLE BODY                                                     */}
          {/* -------------------------------------------------------------- */}

          <tbody>

            {data.map(
              (row) => (

                <tr
                  key={row.id}
                  className={`
                    transition-all
                    duration-200
                    hover:bg-slate-50/70
                    ${
                      rowClassName
                        ? rowClassName(
                            row
                          )
                        : ""
                    }
                  `}
                >

                  {columns.map(
                    (
                      col,
                      index
                    ) => {

                      const value =
                        row[
                          col.accessor
                        ];

                      return (
                        <td
                          key={`${row.id}-${String(
                            col.accessor
                          )}-${index}`}
                          className="
                            border-b
                            border-slate-100
                            px-6
                            py-5
                            align-middle
                            text-sm
                            text-slate-700
                          "
                        >

                          <div
                            className="
                              font-medium
                            "
                          >

                            {col.render
                              ? col.render(
                                  value,
                                  row
                                )
                              : String(
                                  value ??
                                    "-"
                                )}

                          </div>

                        </td>
                      );
                    }
                  )}

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}