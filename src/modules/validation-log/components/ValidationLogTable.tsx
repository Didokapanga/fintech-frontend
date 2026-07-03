// src/modules/validation-log/components/ValidationLogTable.tsx

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { Table }
from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import type {
  ValidationLog,
} from "../types/validation-log.types";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Props = {
  data: ValidationLog[];

  onDetails: (
    log: ValidationLog
  ) => void;
};

/* -------------------------------------------------------------------------- */
/*                                HELPERS                                     */
/* -------------------------------------------------------------------------- */

const getDecisionStyle = (
  decision: string
) => {

  switch (
    decision?.toUpperCase()
  ) {

    case "APPROUVE":
      return {
        className:
          "bg-emerald-100 text-emerald-700",

        icon:
          <CheckCircle2
            size={14}
          />,
      };

    case "REJETE":
      return {
        className:
          "bg-red-100 text-red-700",

        icon:
          <XCircle
            size={14}
          />,
      };

    default:
      return {
        className:
          "bg-slate-100 text-slate-700",

        icon:
          <ShieldCheck
            size={14}
          />,
      };
  }
};

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function ValidationLogTable({
  data,
  onDetails,
}: Props) {

  const columns:
  Column<ValidationLog>[] = [

    /* -------------------------------------------------------------- */
    /* DECISION                                                       */
    /* -------------------------------------------------------------- */

    {
      header: "Décision",

      accessor: "decision",

      render: (v) => {

        const style =
          getDecisionStyle(
            String(v)
          );

        return (

          <span
            className={`
              inline-flex
              items-center
              gap-2
              rounded-full
              px-3
              py-1
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.08em]
              ${style.className}
            `}
          >

            {style.icon}

            {String(v)}

          </span>
        );
      },
    },

    /* -------------------------------------------------------------- */
    /* OPERATION                                                      */
    /* -------------------------------------------------------------- */

    {
      header: "Opération",

      accessor: "operation_type",

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
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-indigo-50
              text-indigo-600
            "
          >

            <ShieldCheck
              size={15}
            />

          </div>

          <span
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >
            {String(v)}
          </span>

        </div>
      ),
    },

    /* -------------------------------------------------------------- */
    /* NIVEAU                                                         */
    /* -------------------------------------------------------------- */

    {
      header: "Niveau",

      accessor: "niveau",

      render: (v) => (

        <span
          className="
            inline-flex
            rounded-xl
            bg-slate-100
            px-3
            py-1
            text-xs
            font-semibold
            text-slate-700
          "
        >
          {String(v)}
        </span>
      ),
    },

    /* -------------------------------------------------------------- */
    /* TRANSITION                                                     */
    /* -------------------------------------------------------------- */

    {
      header: "Transition",

      accessor: "statut_apres",

      render: (
        _,
        row
      ) => (

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
          "
        >

          <span
            className="
              rounded-lg
              bg-slate-100
              px-2.5
              py-1
              font-medium
              text-slate-700
            "
          >
            {row.statut_avant}
          </span>

          <ArrowRight
            size={14}
            className="
              text-slate-400
            "
          />

          <span
            className="
              rounded-lg
              bg-indigo-100
              px-2.5
              py-1
              font-semibold
              text-indigo-700
            "
          >
            {row.statut_apres}
          </span>

        </div>
      ),
    },

    /* -------------------------------------------------------------- */
    /* VALIDATEUR                                                     */
    /* -------------------------------------------------------------- */

    {
      header: "Validateur",

      accessor: "validator",

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
            {row.validator
              ?.user_name || "-"}
          </span>

          <span
            className="
              text-xs
              text-slate-500
            "
          >
            {row.validator
              ?.role || "-"}
          </span>

        </div>
      ),
    },

    /* -------------------------------------------------------------- */
    /* RESUME                                                         */
    /* -------------------------------------------------------------- */

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

    /* -------------------------------------------------------------- */
    /* ACTIONS                                                        */
    /* -------------------------------------------------------------- */

    {
      header: "Actions",

      accessor: "id",

      render: (
        _,
        row
      ) => (

        <button
          onClick={() =>
            onDetails(row)
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

          Voir

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

      <Table<ValidationLog>
        data={data}
        columns={columns}
      />

    </div>
  );
}