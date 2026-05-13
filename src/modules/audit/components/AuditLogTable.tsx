import { Table } from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import type {
  AuditLog,
} from "../types/audit-log.types";

type Props = {
  data: AuditLog[];

  onDetails: (
    log: AuditLog
  ) => void;
};

export default function AuditLogTable({
  data,
  onDetails,
}: Props) {

  const columns: Column<AuditLog>[] = [

    /**
     * =========================================
     * ACTION
     * =========================================
     */
    {
      header: "Action",

      accessor: "action",

      render: (v) => (

        <span className="font-semibold">
          {String(v)}
        </span>
      ),
    },

    /**
     * =========================================
     * TABLE
     * =========================================
     */
    {
      header: "Table",

      accessor: "table_name",

      render: (v) => (

        <span>
          {String(v)}
        </span>
      ),
    },

    /**
     * =========================================
     * REFERENCE
     * =========================================
     */
    {
      header: "Référence",

      accessor: "code_reference",

      render: (v) => (

        <span>
          {String(v || "-")}
        </span>
      ),
    },

    /**
     * =========================================
     * UTILISATEUR
     * =========================================
     */
    {
      header: "Utilisateur",

      accessor: "user",

      render: (_, row) => (

        <div className="flex flex-col">

          <span>
            {row.user?.user_name ||
              "-"}
          </span>

          <span className="text-xs text-gray-500">
            {row.user?.role ||
              "-"}
          </span>

        </div>
      ),
    },

    /**
     * =========================================
     * RESUME
     * =========================================
     */
    {
      header: "Résumé",

      accessor: "summary",

      render: (v) => (

        <span>
          {String(v)}
        </span>
      ),
    },

    /**
     * =========================================
     * DATE
     * =========================================
     */
    {
      header: "Date",

      accessor: "created_at",

      render: (v) => (

        <span>
          {new Date(
            String(v)
          ).toLocaleString()}
        </span>
      ),
    },

    /**
     * =========================================
     * ACTIONS
     * =========================================
     */
    {
      header: "Actions",

      accessor: "id",

      render: (_, row) => (

        <button
          onClick={() =>
            onDetails(row)
          }
          className="
            px-3 py-1
            rounded-lg
            bg-indigo-50
            text-indigo-600
            text-xs
            font-medium
            hover:bg-indigo-100
            transition-all
          "
        >
          Voir détails
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

      <Table<AuditLog>
        data={data}
        columns={columns}
      />

    </div>
  );
}