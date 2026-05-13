// src/modules/validation-log/components/ValidationLogTable.tsx

import { Table }
from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import type {
  ValidationLog,
} from "../types/validation-log.types";

type Props = {
  data: ValidationLog[];

  onDetails: (
    log: ValidationLog
  ) => void;
};

export default function ValidationLogTable({
  data,
  onDetails,
}: Props) {

  const columns:
  Column<ValidationLog>[] = [

    {
      header: "Décision",

      accessor: "decision",

      render: (v) => (

        <span
          className={
            v === "APPROUVE"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {String(v)}
        </span>
      ),
    },

    {
      header: "Opération",

      accessor: "operation_type",
    },

    {
      header: "Niveau",

      accessor: "niveau",
    },

    {
      header: "Transition",

      accessor: "statut_apres",

      render: (_, row) => (
        <div className="text-sm">

          <span className="font-medium">
            {row.statut_avant}
          </span>

          {" → "}

          <span className="font-semibold">
            {row.statut_apres}
          </span>

        </div>
      ),
    },

    {
      header: "Validateur",

      accessor: "validator",

      render: (_, row) => (
        <div className="flex flex-col">

          <span>
            {row.validator
              ?.user_name || "-"}
          </span>

          <span className="text-xs text-gray-500">
            {row.validator
              ?.role || "-"}
          </span>

        </div>
      ),
    },

    {
      header: "Résumé",

      accessor: "summary",
    },

    {
      header: "Date",

      accessor: "created_at",

      render: (v) =>
        new Date(
          String(v)
        ).toLocaleString(),
    },

    {
      header: "",

      accessor: "id",

      render: (_, row) => (

        <button
          onClick={() =>
            onDetails(row)
          }
          className="
            text-indigo-600
            hover:underline
            text-sm
          "
        >
          Voir
        </button>
      ),
    },
  ];

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        overflow-hidden
      "
    >
      <Table<ValidationLog>
        data={data}
        columns={columns}
      />
    </div>
  );
}