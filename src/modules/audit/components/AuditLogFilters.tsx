import type {
  AuditLogFilters as AuditLogFiltersType,
} from "../types/audit-log.types";

type Props = {
  filters: AuditLogFiltersType;

  onChange: (
    values: AuditLogFiltersType
  ) => void;
};

export default function AuditLogFilters({
  filters,
  onChange,
}: Props) {

  return (
    <div
      className="
        grid grid-cols-1
        md:grid-cols-4
        gap-3
        bg-white
        p-4
        rounded-2xl
        border
      "
    >

      {/* ACTION */}
      <select
        value={filters.action || ""}
        onChange={(e) =>
          onChange({
            ...filters,

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

        <option value="VALIDATE">
          VALIDATE
        </option>

      </select>

      {/* TABLE */}
      <input
        type="text"
        placeholder="Table"
        value={
          filters.table_name || ""
        }
        onChange={(e) =>
          onChange({
            ...filters,

            table_name:
              e.target.value,
          })
        }
        className="input"
      />

      {/* DATE FROM */}
      <input
        type="date"
        value={
          filters.date_from || ""
        }
        onChange={(e) =>
          onChange({
            ...filters,

            date_from:
              e.target.value,
          })
        }
        className="input"
      />

      {/* DATE TO */}
      <input
        type="date"
        value={
          filters.date_to || ""
        }
        onChange={(e) =>
          onChange({
            ...filters,

            date_to:
              e.target.value,
          })
        }
        className="input"
      />

    </div>
  );
}