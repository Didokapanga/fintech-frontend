// src/modules/audit/components/AuditLogTable.tsx

import {
  Eye,
  ShieldCheck,
} from "lucide-react";

import {
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import type {
  AuditLog,
} from "../types/audit-log.types";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Props = {
  data: AuditLog[];

  onDetails: (
    log: AuditLog
  ) => void;
};

/* -------------------------------------------------------------------------- */
/*                                HELPERS                                     */
/* -------------------------------------------------------------------------- */

const getActionStyle = (
  action: string
) => {

  switch (
    action?.toUpperCase()
  ) {

    case "CREATE":
      return "bg-emerald-100 text-emerald-700";

    case "UPDATE":
      return "bg-blue-100 text-blue-700";

    case "DELETE":
      return "bg-red-100 text-red-700";

    case "VALIDATE":
      return "bg-indigo-100 text-indigo-700";

    case "OPEN":
      return "bg-green-100 text-green-700";

    case "CLOSE":
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function AuditLogTable({
  data,
  onDetails,
}: Props) {

  const columns:
    Column<AuditLog>[] = [

    /**
     * =========================================
     * ACTION
     * =========================================
     */
    {
      header: "Action",

      accessor: "action",

      render: (v) => (

        <span
          className={`
            inline-flex
            items-center
            rounded-full
            px-2.5
            py-1
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.08em]
            ${getActionStyle(
              String(v)
            )}
          `}
        >
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

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-600
            "
          >

            <ShieldCheck
              size={14}
            />

          </div>

          <span
            className="
              font-medium
              text-slate-700
            "
          >
            {String(v)}
          </span>

        </div>
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

        <span
          className="
            text-xs
            font-mono
            text-slate-500
          "
        >
          {String(
            v || "-"
          )}
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

      render: (
        _,
        row
      ) => (

        <div className="flex flex-col">

          <span
            className="
              font-medium
              text-slate-800
            "
          >
            {row.user?.user_name ||
              "-"}
          </span>

          <span
            className="
              text-xs
              text-slate-500
            "
          >
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

        <div
          className="
            max-w-[320px]
            text-sm
            leading-6
            text-slate-600
            line-clamp-2
          "
        >
          {String(v)}
        </div>
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

        <div className="flex flex-col">

          <span
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >
            {new Date(
              String(v)
            ).toLocaleDateString(
              "fr-FR"
            )}
          </span>

          <span
            className="
              text-xs
              text-slate-500
            "
          >
            {new Date(
              String(v)
            ).toLocaleTimeString(
              "fr-FR"
            )}
          </span>

        </div>
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

      render: (
        _,
        row
      ) => (

        <button
          onClick={() =>
            onDetails(
              row
            )
          }
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-indigo-100
            bg-indigo-50
            px-3
            py-2
            text-xs
            font-semibold
            text-indigo-600
            transition-all
            hover:bg-indigo-100
          "
        >

          <Eye
            size={14}
          />

          Voir détails

        </button>
      ),
    },
  ];

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

      <Table<AuditLog>
        data={data}
        columns={columns}
      />

    </div>
  );
}