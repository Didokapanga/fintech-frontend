// src/shared/components/grouped-table/GroupedTable.tsx

import {
  ChevronRight,
  Loader2,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import GroupHeader from "./GroupHeader";
import GroupRow from "./GroupRow";

import type {
  Group,
  GroupedTableProps,
} from "./GroupedTable.types";

/* -------------------------------------------------------------------------- */
/*                              GROUPED TABLE                                 */
/* -------------------------------------------------------------------------- */

export default function GroupedTable<
  T extends {
    id: string;
  },
>({
  data,
  columns,
  loading = false,
  emptyTitle =
    "Aucune donnée disponible",
  emptyDescription =
    "Les données apparaîtront ici une fois disponibles.",
  rowClassName,
  groupBy,
  groupTitle,
  defaultExpanded = true,
}: GroupedTableProps<T>) {

  /* ------------------------------------------------------------------------ */
  /*                           BUILD GROUPS                                   */
  /* ------------------------------------------------------------------------ */

  const groups =
    useMemo<
      Group<T>[]
    >(() => {

      const map =
        new Map<
          string,
          Group<T>
        >();

      for (
        const row of data
      ) {

        const key =
          typeof groupBy ===
          "function"
            ? groupBy(row)
            : String(
                row[
                  groupBy
                ]
              );

        if (
          !map.has(key)
        ) {

          map.set(
            key,
            {
              key,
              title:
                groupTitle(
                  row
                ),
              rows: [],
            }
          );

        }

        map
          .get(key)!
          .rows.push(
            row
          );

      }

      return Array.from(
        map.values()
      );

    }, [
      data,
      groupBy,
      groupTitle,
    ]);

  /* ------------------------------------------------------------------------ */
  /*                         EXPANDED GROUPS                                  */
  /* ------------------------------------------------------------------------ */

  const [
    expanded,
    setExpanded,
    ] = useState<
    Record<string, boolean>
    >(() => {

    const state: Record<
        string,
        boolean
    > = {};

    for (const group of groups) {

        state[group.key] =
        defaultExpanded;

    }

    return state;

    });

  /* ------------------------------------------------------------------------ */
  /*                             TOGGLE GROUP                                 */
  /* ------------------------------------------------------------------------ */

  const toggleGroup = (
    key: string
  ) => {

    setExpanded(
      (
        previous
      ) => ({

        ...previous,

        [key]:
          !previous[
            key
          ],

      })
    );

  };

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
  /*                                  EMPTY                                   */
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
/*                          TABLE RENDERING                                 */
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
                  column,
                  index
                ) => (

                  <th
                    key={`${String(
                      column.accessor
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
                    {column.header}
                  </th>

                )
              )}

            </tr>

          </thead>

          {/* -------------------------------------------------------------- */}
          {/* TABLE BODY                                                     */}
          {/* -------------------------------------------------------------- */}

          <tbody>

            {groups.map(
              (
                group
              ) => (

                <>
                  {/* ------------------------------------------------------ */}
                  {/* GROUP HEADER                                            */}
                  {/* ------------------------------------------------------ */}

                  <tr
                    key={`${group.key}-header`}
                  >

                    <td
                      colSpan={
                        columns.length
                      }
                      className="p-0"
                    >

                      <GroupHeader
                        title={
                          group.title
                        }
                        count={
                          group.rows
                            .length
                        }
                        expanded={
                          expanded[
                            group.key
                          ] ??
                          false
                        }
                        onToggle={() =>
                          toggleGroup(
                            group.key
                          )
                        }
                      />

                    </td>

                  </tr>

                  {/* ------------------------------------------------------ */}
                  {/* GROUP ROWS                                              */}
                  {/* ------------------------------------------------------ */}

                  {expanded[
                    group.key
                  ] &&

                    group.rows.map(
                      (
                        row
                      ) => (

                        <GroupRow
                          key={
                            row.id
                          }
                          row={
                            row
                          }
                          columns={
                            columns
                          }
                          rowClassName={
                            rowClassName
                          }
                        />

                      )
                    )}

                </>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}