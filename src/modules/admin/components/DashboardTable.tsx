// src/modules/admin/components/DashboardTable.tsx

import {
  CalendarRange,
  FilterX,
  Layers3,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Row = {
  label: string;

  volumes: Record<
    string,
    number
  >;

  count: number;

  description?: string;
};

type Props = {
  data: Row[];

  dateFrom: string;

  dateTo: string;

  onDateFromChange: (
    value: string
  ) => void;

  onDateToChange: (
    value: string
  ) => void;

  onReset: () => void;
};

/* -------------------------------------------------------------------------- */
/*                              DASHBOARD TABLE                               */
/* -------------------------------------------------------------------------- */

export default function DashboardTable({
  data,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onReset,
}: Props) {

  /* ------------------------------------------------------------------------ */
  /*                             FORMAT VOLUMES                               */
  /* ------------------------------------------------------------------------ */

  const renderVolumes = (
    volumes: Record<
      string,
      number
    >
  ) => {

    const entries =
      Object.entries(
        volumes || {}
      );

    if (
      entries.length === 0
    ) {

      return (
        <div
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-slate-200
            bg-slate-50
            px-3
            py-1
            text-xs
            font-medium
            text-slate-400
          "
        >
          Aucune donnée
        </div>
      );
    }

    return (
      <div
        className="
          flex
          flex-col
          items-end
          gap-2
        "
      >

        {entries.map(
          ([
            currency,
            amount,
          ]) => (

            <div
              key={currency}
              className="
                inline-flex
                items-center
                gap-3
                rounded-2xl
                border
                border-emerald-100
                bg-emerald-50/70
                px-4
                py-2
              "
            >

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-emerald-700
                "
              >
                {currency}
              </span>

              <span
                className="
                  text-sm
                  font-semibold
                  text-emerald-950
                "
              >
                {Number(
                  amount
                ).toLocaleString()}
              </span>

            </div>
          )
        )}

      </div>
    );
  };

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        space-y-5
      "
    >

      {/* ------------------------------------------------------------------ */}
      {/* FILTER BAR                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          rounded-[24px]
          border
          border-slate-200/80
          bg-slate-50/70
          p-5
        "
      >

        <div
          className="
            flex
            flex-col
            gap-5
            xl:flex-row
            xl:items-end
            xl:justify-between
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
            "
          >

            {/* DATE FROM */}

            <DateInput
              label="Date début"
              value={dateFrom}
              onChange={
                onDateFromChange
              }
            />

            {/* DATE TO */}

            <DateInput
              label="Date fin"
              value={dateTo}
              onChange={
                onDateToChange
              }
            />

          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                hidden
                lg:flex
                items-center
                gap-2
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
              "
            >

              <Layers3
                size={16}
                className="
                  text-slate-400
                "
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-slate-500
                "
              >
                {data.length} catégorie(s)
              </span>

            </div>

            <button
              type="button"
              onClick={onReset}
              className="
                inline-flex
                h-12
                items-center
                gap-2
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                text-sm
                font-semibold
                text-slate-700
                transition-all
                duration-200
                hover:border-slate-300
                hover:bg-slate-50
                hover:shadow-sm
              "
            >

              <FilterX
                size={16}
              />

              Réinitialiser

            </button>

          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TABLE                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          overflow-hidden
          rounded-[26px]
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

            <thead>

              <tr
                className="
                  bg-slate-50/80
                "
              >

                <th
                  className="
                    border-b
                    border-slate-200
                    px-7
                    py-5
                    text-left
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                  "
                >
                  Opération
                </th>

                <th
                  className="
                    border-b
                    border-slate-200
                    px-7
                    py-5
                    text-right
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                  "
                >
                  Volume financier
                </th>

                <th
                  className="
                    border-b
                    border-slate-200
                    px-7
                    py-5
                    text-right
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                  "
                >
                  Transactions
                </th>

                <th
                  className="
                    border-b
                    border-slate-200
                    px-7
                    py-5
                    text-right
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                  "
                >
                  Devise(s)
                </th>

              </tr>

            </thead>

            {/* -------------------------------------------------------------- */}
            {/* TABLE BODY                                                     */}
            {/* -------------------------------------------------------------- */}

            <tbody>

              {data.length > 0 ? (

                data.map(
                  (
                    row,
                    index
                  ) => (

                    <tr
                      key={index}
                      className="
                        transition-colors
                        duration-200
                        hover:bg-slate-50/70
                      "
                    >

                      {/* OPERATION */}

                      <td
                        className="
                          border-b
                          border-slate-100
                          px-7
                          py-6
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-4
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
                              bg-slate-100
                            "
                          >

                            <ActivityDot />

                          </div>

                          <div>

                            <p
                              className="
                                text-sm
                                font-semibold
                                text-slate-900
                              "
                            >
                              {row.label}
                            </p>

                            <p
                              className="
                                mt-1
                                text-xs
                                text-slate-400
                              "
                            >
                              {row.description ||
                                "Flux opérationnel"}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* VOLUMES */}

                      <td
                        className="
                          border-b
                          border-slate-100
                          px-7
                          py-6
                          text-right
                        "
                      >
                        {renderVolumes(
                          row.volumes
                        )}
                      </td>

                      {/* COUNT */}

                      <td
                        className="
                          border-b
                          border-slate-100
                          px-7
                          py-6
                          text-right
                        "
                      >

                        <div
                          className="
                            inline-flex
                            items-center
                            rounded-2xl
                            border
                            border-indigo-100
                            bg-indigo-50
                            px-4
                            py-2
                          "
                        >

                          <span
                            className="
                              text-sm
                              font-semibold
                              text-indigo-700
                            "
                          >
                            {row.count.toLocaleString()}
                          </span>

                        </div>

                      </td>

                      <td
                        className="
                          border-b
                          border-slate-100
                          px-7
                          py-6
                          text-right
                        "
                      >

                        <span
                          className="
                            text-sm
                            font-semibold
                            text-slate-700
                          "
                        >
                          {
                            Object.keys(
                              row.volumes || {}
                            ).length
                          }
                        </span>

                      </td>

                    </tr>
                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan={4}
                    className="
                      px-6
                      py-20
                    "
                  >

                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
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

                        <CalendarRange
                          size={28}
                          className="
                            text-slate-400
                          "
                        />

                      </div>

                      <h3
                        className="
                          mt-5
                          text-lg
                          font-semibold
                          text-slate-800
                        "
                      >
                        Aucune donnée disponible
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-md
                          text-center
                          text-sm
                          leading-6
                          text-slate-500
                        "
                      >
                        Aucun résultat ne
                        correspond actuellement
                        aux filtres sélectionnés.
                      </p>

                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                DATE INPUT                                  */
/* -------------------------------------------------------------------------- */

function DateInput({
  label,
  value,
  onChange,
}: {
  label: string;

  value: string;

  onChange: (
    value: string
  ) => void;
}) {

  return (
    <div
      className="
        min-w-[220px]
      "
    >

      <label
        className="
          mb-2
          block
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-slate-400
        "
      >
        {label}
      </label>

      <div
        className="
          relative
        "
      >

        <input
          type="date"
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            font-medium
            text-slate-700
            outline-none
            transition-all
            duration-200
            focus:border-indigo-400
            focus:ring-4
            focus:ring-indigo-100
          "
        />

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               ACTIVITY DOT                                 */
/* -------------------------------------------------------------------------- */

function ActivityDot() {

  return (
    <div
      className="
        relative
        flex
        h-3
        w-3
      "
    >

      <span
        className="
          absolute
          inline-flex
          h-full
          w-full
          animate-ping
          rounded-full
          bg-emerald-400
          opacity-75
        "
      />

      <span
        className="
          relative
          inline-flex
          h-3
          w-3
          rounded-full
          bg-emerald-500
        "
      />

    </div>
  );
}