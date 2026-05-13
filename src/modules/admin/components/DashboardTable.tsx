// DashboardTable.tsx

type Row = {
  label: string;

  volumes: Record<
    string,
    number
  >;

  count: number;
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

export default function DashboardTable({
  data,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onReset,
}: Props) {

  /**
   * =========================================
   * 💰 FORMAT VOLUMES
   * =========================================
   */
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

    if (entries.length === 0) {
      return (
        <span className="text-gray-400">
          Aucune donnée
        </span>
      );
    }

    return (
      <div className="flex flex-col items-end gap-1">

        {entries.map(
          ([devise, montant]) => (
            <span
              key={devise}
              className="
                text-green-600
                font-semibold
              "
            >
              {Number(
                montant
              ).toLocaleString()}{" "}
              {devise}
            </span>
          )
        )}

      </div>
    );
  };

  return (
    <div className="space-y-4">

      {/* =========================================
          FILTER
      ========================================= */}
      <div className="bg-slate-300 border rounded-2xl shadow-sm p-3">

        <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between">

          {/* DATE FROM */}
          <div className="flex flex-col flex-1">

            <label className="text-xs font-medium text-gray-500 mb-1.5">
              Date début
            </label>

            <input
              type="date"
              value={dateFrom}
              onChange={(e) =>
                onDateFromChange(
                  e.target.value
                )
              }
              className="
                h-11
                px-4
                rounded-xl
                border border-gray-200
                text-sm text-gray-700
                bg-transparent
                outline-none
                transition-all
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
                hover:border-gray-300
              "
            />
          </div>

          {/* DATE TO */}
          <div className="flex flex-col flex-1">

            <label className="text-xs font-medium text-gray-500 mb-1.5">
              Date fin
            </label>

            <input
              type="date"
              value={dateTo}
              onChange={(e) =>
                onDateToChange(
                  e.target.value
                )
              }
              className="
                h-11
                px-4
                rounded-xl
                border border-gray-200
                text-sm text-gray-700
                bg-transparent
                outline-none
                transition-all
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
                hover:border-gray-300
              "
            />
          </div>

          {/* RESET */}
          <button
            type="button"
            onClick={onReset}
            className="
              h-11
              px-5
              rounded-xl
              border border-gray-200
              text-sm font-medium text-gray-700
              bg-transparent
              hover:border-gray-300
              hover:shadow-sm
              transition-all
            "
          >
            Reset
          </button>

        </div>
      </div>

      {/* =========================================
          TABLE
      ========================================= */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">

            <tr>

              <th className="text-left px-5 py-3">
                Opération
              </th>

              <th className="text-right px-5 py-3">
                Volumes
              </th>

              <th className="text-right px-5 py-3">
                Nombre
              </th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {data.length > 0 ? (

              data.map((row, i) => (

                <tr
                  key={i}
                  className="
                    border-t
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="px-5 py-4 font-medium text-gray-700">
                    {row.label}
                  </td>

                  <td className="px-5 py-4 text-right">
                    {renderVolumes(
                      row.volumes
                    )}
                  </td>

                  <td className="px-5 py-4 text-right text-gray-600">
                    {row.count}
                  </td>

                </tr>
              ))

            ) : (

              <tr>

                <td
                  colSpan={3}
                  className="
                    text-center
                    py-8
                    text-gray-400
                  "
                >
                  Aucune donnée disponible
                </td>

              </tr>
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}