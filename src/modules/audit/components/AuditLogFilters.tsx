// src/modules/audit/components/AuditLogFilters.tsx

import {
  CalendarDays,
  Filter,
  Search,
} from "lucide-react";

import {
  Button,
} from "../../../components/ui";

import type {
  AuditLogFilters as AuditLogFiltersType,
} from "../types/audit-log.types";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Props = {
  filters: AuditLogFiltersType;

  onChange: (
    values: AuditLogFiltersType
  ) => void;
};

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function AuditLogFilters({
  filters,
  onChange,
}: Props) {

  const handleReset = () => {

    onChange({
      ...filters,

      page: 1,

      action: "",

      table_name: "",

      date_from: "",

      date_to: "",
    });
  };

  return (

    <div className="space-y-5">

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-indigo-50
            text-indigo-600
          "
        >

          <Filter
            size={18}
          />

        </div>

        <div>

          <h2
            className="
              text-base
              font-semibold
              text-slate-900
            "
          >
            Filtres audit
          </h2>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Recherchez et filtrez
            les événements système.
          </p>

        </div>

      </div>

      {/* FILTERS */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
          xl:grid-cols-5
        "
      >

        {/* ACTION */}

        <div className="space-y-2">

          <label
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            Action
          </label>

          <select
            value={
              filters.action || ""
            }
            onChange={(e) =>
              onChange({
                ...filters,

                page: 1,

                action:
                  e.target.value,
              })
            }
            className="input"
          >

            <option value="">
              Toutes actions
            </option>

            <option value="CREATE">
              CREATE
            </option>

            <option value="UPDATE">
              UPDATE
            </option>

            <option value="DELETE">
              DELETE
            </option>

            <option value="OPEN">
              OPEN
            </option>

            <option value="CLOSE">
              CLOSE
            </option>

            <option value="VALIDATE">
              VALIDATE
            </option>

          </select>

        </div>

        {/* TABLE */}

        <div className="space-y-2">

          <label
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            Table
          </label>

          <div className="relative">

            <Search
              size={16}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Nom table..."
              value={
                filters.table_name || ""
              }
              onChange={(e) =>
                onChange({
                  ...filters,

                  page: 1,

                  table_name:
                    e.target.value,
                })
              }
              className="
                input
                pl-10
              "
            />

          </div>

        </div>

        {/* DATE FROM */}

        <div className="space-y-2">

          <label
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            Date début
          </label>

          <div className="relative">

            <CalendarDays
              size={16}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="date"
              value={
                filters.date_from || ""
              }
              onChange={(e) =>
                onChange({
                  ...filters,

                  page: 1,

                  date_from:
                    e.target.value,
                })
              }
              className="
                input
                pl-10
              "
            />

          </div>

        </div>

        {/* DATE TO */}

        <div className="space-y-2">

          <label
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            Date fin
          </label>

          <div className="relative">

            <CalendarDays
              size={16}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="date"
              value={
                filters.date_to || ""
              }
              onChange={(e) =>
                onChange({
                  ...filters,

                  page: 1,

                  date_to:
                    e.target.value,
                })
              }
              className="
                input
                pl-10
              "
            />

          </div>

        </div>

        {/* RESET */}

        <div
          className="
            flex
            items-end
          "
        >

          <Button
            variant="secondary"
            onClick={
              handleReset
            }
            className="w-full"
          >
            Réinitialiser
          </Button>

        </div>

      </div>

    </div>
  );
}