// src/modules/validation-log/components/ValidationLogFilters.tsx

import {
  CalendarDays,
  Filter,
  ShieldCheck,
} from "lucide-react";

import type {
  ValidationLogFilters,
} from "../types/validation-log.types";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Props = {
  filters: ValidationLogFilters;

  onChange: (
    values: ValidationLogFilters
  ) => void;
};

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function ValidationLogFilters({
  filters,
  onChange,
}: Props) {

  const handleReset = () => {

    onChange({
      ...filters,

      page: 1,

      operation_type: "",

      niveau: "",

      decision: "",

      date_from: "",

      date_to: "",
    });
  };

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

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-100
          px-5
          py-4
        "
      >

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

            <h3
              className="
                text-sm
                font-semibold
                text-slate-900
              "
            >
              Filtres avancés
            </h3>

            <p
              className="
                text-xs
                text-slate-500
              "
            >
              Filtrez les logs
              de validation
            </p>

          </div>

        </div>

        <button
          onClick={handleReset}
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2
            text-xs
            font-semibold
            text-slate-600
            transition-all
            hover:bg-slate-50
          "
        >
          Réinitialiser
        </button>

      </div>

      {/* FILTERS */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          p-5
          md:grid-cols-5
        "
      >

        {/* -------------------------------------------------------------- */}
        {/* OPERATION                                                      */}
        {/* -------------------------------------------------------------- */}

        <div className="space-y-2">

          <label
            className="
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >

            <ShieldCheck
              size={13}
            />

            Opération

          </label>

          <select
            value={
              filters.operation_type
            }
            onChange={(e) =>
              onChange({
                ...filters,

                page: 1,

                operation_type:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-700
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          >

            <option value="">
              Toutes opérations
            </option>

            <option value="TRANSFERT_CLIENT">
              TRANSFERT CLIENT
            </option>

            <option value="TRANSFERT_CAISSE">
              TRANSFERT CAISSE
            </option>

            <option value="RETRAIT">
              RETRAIT
            </option>

            <option value="CLOTURE_CAISSE">
              CLÔTURE CAISSE
            </option>

          </select>

        </div>

        {/* -------------------------------------------------------------- */}
        {/* NIVEAU                                                         */}
        {/* -------------------------------------------------------------- */}

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
            Niveau
          </label>

          <select
            value={filters.niveau}
            onChange={(e) =>
              onChange({
                ...filters,

                page: 1,

                niveau:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-700
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          >

            <option value="">
              Tous niveaux
            </option>

            <option value="N1">
              N1
            </option>

            <option value="N2">
              N2
            </option>

          </select>

        </div>

        {/* -------------------------------------------------------------- */}
        {/* DECISION                                                       */}
        {/* -------------------------------------------------------------- */}

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
            Décision
          </label>

          <select
            value={filters.decision}
            onChange={(e) =>
              onChange({
                ...filters,

                page: 1,

                decision:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-700
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          >

            <option value="">
              Toutes décisions
            </option>

            <option value="APPROUVE">
              APPROUVÉ
            </option>

            <option value="REJETE">
              REJETÉ
            </option>

          </select>

        </div>

        {/* -------------------------------------------------------------- */}
        {/* DATE FROM                                                      */}
        {/* -------------------------------------------------------------- */}

        <div className="space-y-2">

          <label
            className="
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >

            <CalendarDays
              size={13}
            />

            Date début

          </label>

          <input
            type="date"
            value={filters.date_from}
            onChange={(e) =>
              onChange({
                ...filters,

                page: 1,

                date_from:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-700
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          />

        </div>

        {/* -------------------------------------------------------------- */}
        {/* DATE TO                                                        */}
        {/* -------------------------------------------------------------- */}

        <div className="space-y-2">

          <label
            className="
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >

            <CalendarDays
              size={13}
            />

            Date fin

          </label>

          <input
            type="date"
            value={filters.date_to}
            onChange={(e) =>
              onChange({
                ...filters,

                page: 1,

                date_to:
                  e.target.value,
              })
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              text-slate-700
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          />

        </div>

      </div>

    </div>
  );
}