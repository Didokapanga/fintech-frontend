type Row = {
  label: string;
  volume: number;
  count: number;
};

type Props = {
  data: Row[];
  dateOperation: string;
  onDateChange: (
    value: string
  ) => void;
  onReset: () => void;
};

export default function DashboardTable({
  data,
  dateOperation,
  onDateChange,
  onReset,
}: Props) {
  return (
    <div className="space-y-4">

      {/* FILTER */}
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1 font-medium">
              Filtrer par date
            </label>

            <input
              type="date"
              value={dateOperation}
              onChange={(e) =>
                onDateChange(
                  e.target.value
                )
              }
              className="
                border rounded-xl px-3 py-2
                text-sm bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          <button
            type="button"
            onClick={onReset}
            className="
              px-4 py-2 rounded-xl
              border text-sm font-medium
              bg-gray-50 hover:bg-gray-100
              transition
            "
          >
            Reset
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3">
                Opération
              </th>

              <th className="text-right px-5 py-3">
                Volume
              </th>

              <th className="text-right px-5 py-3">
                Nombre
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4 font-medium text-gray-700">
                    {row.label}
                  </td>

                  <td className="px-5 py-4 text-right text-green-600 font-semibold">
                    {row.volume.toLocaleString()} USD
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
                  className="text-center py-8 text-gray-400"
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