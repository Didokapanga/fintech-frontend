// src/modules/validation-log/components/ValidationLogFilters.tsx

import type {
  ValidationLogFilters,
} from "../types/validation-log.types";

type Props = {
  filters: ValidationLogFilters;

  onChange: (
    values: ValidationLogFilters
  ) => void;
};

export default function ValidationLogFilters({
  filters,
  onChange,
}: Props) {

  return (
    <div
      className="
        grid grid-cols-1
        md:grid-cols-5
        gap-3
        bg-white
        p-4
        rounded-2xl
        border
      "
    >

      {/* OPERATION */}
      <select
        value={
          filters.operation_type
        }
        onChange={(e) =>
          onChange({
            ...filters,
            operation_type:
              e.target.value,
          })
        }
        className="input"
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

      {/* NIVEAU */}
      <select
        value={filters.niveau}
        onChange={(e) =>
          onChange({
            ...filters,
            niveau:
              e.target.value,
          })
        }
        className="input"
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

      {/* DECISION */}
      <select
        value={filters.decision}
        onChange={(e) =>
          onChange({
            ...filters,
            decision:
              e.target.value,
          })
        }
        className="input"
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

      {/* DATE FROM */}
      <input
        type="date"
        value={filters.date_from}
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
        value={filters.date_to}
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