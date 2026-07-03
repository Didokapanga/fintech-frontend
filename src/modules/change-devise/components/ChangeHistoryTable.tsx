// src/modules/change-devise/components/ChangeHistoryTable.tsx

import {
  useState,
} from "react";

import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useChanges,
} from "../hooks/useChanges";

import type {
  ChangeDevise,
} from "../types";

import {
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

export default function ChangeHistoryTable() {

  const [
    page,
    setPage,
  ] = useState(1);

  const limit = 10;

  const {
    data,
    isLoading,
  } = useChanges(
    page,
    limit
  );

  const changes =
    data?.data ?? [];

  const meta =
    data?.meta;

  const columns:
    Column<ChangeDevise>[] = [

    {
      header: "Référence",

      accessor:
        "code_reference",

      render: (
        value
      ) => (

        <span
          className="
            font-semibold
            text-slate-800
          "
        >
          {String(
            value ?? "-"
          )}
        </span>

      ),
    },

    {
      header: "Conversion",

      accessor:
        "devise_source",

      render: (
        _,
        row
      ) => (

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span>
            {
              row.devise_source
            }
          </span>

          <ArrowLeftRight
            size={14}
            className="
              text-slate-400
            "
          />

          <span>
            {
              row.devise_destination
            }
          </span>

        </div>

      ),
    },

    {
      header: "Montant reçu",

      accessor:
        "montant_source",

      render: (
        value,
        row
      ) => (

        <span
          className="
            font-semibold
            text-emerald-600
          "
        >
          {Number(
            value || 0
          ).toLocaleString()}
          {" "}
          {
            row.devise_source
          }
        </span>

      ),
    },

    {
      header:
        "Montant remis",

      accessor:
        "montant_destination",

      render: (
        value,
        row
      ) => (

        <span
          className="
            font-semibold
            text-blue-600
          "
        >
          {Number(
            value || 0
          ).toLocaleString()}
          {" "}
          {
            row.devise_destination
          }
        </span>

      ),
    },

    {
      header: "Taux",

      accessor:
        "taux_applique",

      render: (
        value
      ) => (

        <span
          className="
            rounded-xl
            bg-slate-100
            px-3
            py-1
            text-xs
            font-semibold
          "
        >
          {Number(
            value || 0
          ).toLocaleString()}
        </span>

      ),
    },

    {
      header: "Mode",

      accessor:
        "mode_paiement",

      render: (
        value
      ) => (

        <span
          className="
            rounded-xl
            bg-blue-50
            px-3
            py-1
            text-xs
            font-medium
            text-blue-700
          "
        >
          {String(
            value
          )}
        </span>

      ),
    },

    {
      header: "Statut",

      accessor:
        "statut",

      render: (
        value
      ) => {

        const success =
          value ===
          "EXECUTE";

        return (

          <span
            className={`
              rounded-xl
              px-3
              py-1
              text-xs
              font-semibold

              ${
                success
                  ? `
                    bg-emerald-100
                    text-emerald-700
                  `
                  : `
                    bg-amber-100
                    text-amber-700
                  `
              }
            `}
          >
            {String(
              value
            )}
          </span>

        );
      },
    },

    {
      header: "Date",

      accessor:
        "date_operation",

      render: (
        value
      ) =>

        new Date(
          String(value)
        ).toLocaleString(
          "fr-FR"
        ),
    },

  ];

  return (

    <div
      className="
        space-y-4
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Historique des changes
          </h2>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {
              meta?.total ?? 0
            }
            {" "}
            opération(s)
          </p>

        </div>

      </div>

      <Table
        data={changes}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucun change"
        emptyDescription="Aucune opération de change disponible."
      />

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <button
          onClick={() =>
            setPage(
              (p) =>
                Math.max(
                  1,
                  p - 1
                )
            )
          }
          disabled={
            page === 1
          }
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            text-sm
            disabled:opacity-50
          "
        >

          <ChevronLeft
            size={16}
          />

          Précédent

        </button>

        <span
          className="
            text-sm
            text-slate-500
          "
        >
          Page
          {" "}
          {page}
          {" / "}
          {
            meta?.totalPages ??
            1
          }
        </span>

        <button
          onClick={() =>
            setPage(
              (p) =>
                p + 1
            )
          }
          disabled={
            page >=
            (
              meta?.totalPages ??
              1
            )
          }
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            text-sm
            disabled:opacity-50
          "
        >

          Suivant

          <ChevronRight
            size={16}
          />

        </button>

      </div>

    </div>

  );
}