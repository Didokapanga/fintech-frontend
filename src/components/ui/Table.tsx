import type { Column } from "./Table.types";

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
};

export default function Table<T extends { id: string }>({
  data,
  columns,
  loading,
}: Props<T>) {
  if (loading) {
    return <div className="p-4 text-gray-500">Chargement...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 text-left text-sm text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)} className="px-4 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm">
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-gray-50 transition"
            >
              {columns.map((col) => {
                const value = row[col.accessor];

                return (
                  <td key={String(col.accessor)} className="px-4 py-3">
                    {col.render
                      ? col.render(value, row)
                      : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}