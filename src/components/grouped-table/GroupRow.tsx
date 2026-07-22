import type {
  Column,
} from "./GroupedTable.types";

type Props<
  T extends {
    id: string;
  },
> = {

  row: T;

  columns: Column<T>[];

  rowClassName?: (
    row: T
  ) => string;

};

export default function GroupRow<
  T extends {
    id: string;
  },
>({
  row,
  columns,
  rowClassName,
}: Props<T>) {

  return (

    <tr
      className={`
        transition-all
        duration-200
        hover:bg-slate-50

        ${
          rowClassName
            ? rowClassName(row)
            : ""
        }
      `}
    >

      {columns.map(
        (
          column,
          index
        ) => {

          const value =
            row[column.accessor];

          return (

            <td
              key={`${row.id}-${String(column.accessor)}-${index}`}
              className="
                border-b
                border-slate-100
                px-6
                py-5
                text-sm
                text-slate-700
              "
            >

              {column.render
                ? column.render(
                    value,
                    row
                  )
                : String(
                    value ??
                    "-"
                  )}

            </td>

          );

        }
      )}

    </tr>

  );

}