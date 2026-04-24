// src/modules/validation/components/ValidationClotureCaisseTab.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import { useValidateCloture, useValidationClotureList } from "../../cloture-caisse/hooks/useClotureCaisse";
// import {
//   useValidationClotureList,
//   useValidateCloture,
// } from "../hooks/useValidationCloture";

type ClotureCaisse = {
  id: string;
  code_reference: string;

  code_caisse?: string;
  agence_libelle?: string;
  caisse_devise?: string; // ✅ FIX ICI

  solde_systeme: number;
  solde_physique: number;
  ecart: number;
  devise: string;

  motif_ecart?: string;
  observation?: string;

  statut: string;
  date_operation: string;
  created_at: string;
};

export default function ValidationClotureCaisseTab() {
  const [page, setPage] = useState(1);

  const { data, isLoading } =
    useValidationClotureList(page, 10);

  const { mutate } =
    useValidateCloture();

  const clotures: ClotureCaisse[] =
    data?.data ?? [];

  const meta = data?.meta;

  const getStatusBadge = (
    status: string
  ) => {
    switch (status) {
      case "INITIE":
        return "bg-yellow-100 text-yellow-700";

      case "VALIDE":
        return "bg-green-100 text-green-700";

      case "REJETE":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleValidate = (
    id: string
  ) => {
    mutate({
      cloture_id: id,
      decision: "APPROUVE",
    });
  };

  const handleReject = (
    id: string
  ) => {
    mutate({
      cloture_id: id,
      decision: "REJETE",
    });
  };

  const columns: Column<ClotureCaisse>[] =
    [
      {
        header: "Référence",
        accessor: "code_reference",
      },

      {
        header: "Caisse",
        accessor: "code_caisse",
        render: (_v, row) => (
            <div className="flex flex-col">
            <span className="font-medium">
                {row.code_caisse || "-"}
            </span>

            <span className="text-xs text-gray-500">
                {row.caisse_devise || row.devise || "-"}
            </span>
            </div>
        ),
     },

      {
        header: "Solde système",
        accessor: "solde_systeme",
        render: (value, row) => (
          <span className="font-medium">
            {Number(
              value
            ).toLocaleString()}{" "}
            {row.devise}
          </span>
        ),
      },

      {
        header: "Solde physique",
        accessor: "solde_physique",
        render: (value, row) => (
          <span className="font-medium">
            {Number(
              value
            ).toLocaleString()}{" "}
            {row.devise}
          </span>
        ),
      },

      {
        header: "Écart",
        accessor: "ecart",
        render: (value, row) => (
          <span
            className={`font-semibold ${
              Number(value) === 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {Number(
              value
            ).toLocaleString()}{" "}
            {row.devise}
          </span>
        ),
      },

      {
        header: "Motif",
        accessor: "motif_ecart",
        render: (value) => (
          <span className="text-sm">
            {value || "-"}
          </span>
        ),
      },

      {
        header: "Statut",
        accessor: "statut",
        render: (value) => (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(
              String(value)
            )}`}
          >
            {value}
          </span>
        ),
      },

      {
        header: "Date",
        accessor: "date_operation",
        render: (value) =>
          value
            ? new Date(
                String(value)
              ).toLocaleDateString(
                "fr-FR"
              )
            : "-",
      },

      {
        header: "Actions",
        accessor: "id",
        render: (_v, row) => (
          <div className="flex gap-2">
            <Button
              onClick={() =>
                handleValidate(
                  row.id
                )
              }
            >
              Valider
            </Button>

            <Button
              variant="danger"
              onClick={() =>
                handleReject(
                  row.id
                )
              }
            >
              Rejeter
            </Button>
          </div>
        ),
      },
    ];

  return (
    <div className="space-y-4">
      <Table<ClotureCaisse>
        data={clotures}
        columns={columns}
        loading={isLoading}
      />

      {!isLoading &&
        clotures.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            Aucune clôture à
            valider
          </div>
        )}

      {meta && (
        <div className="flex justify-center items-center gap-3">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() =>
              setPage(
                (p) => p - 1
              )
            }
          >
            ←
          </Button>

          <span className="text-sm text-gray-600">
            Page{" "}
            <strong>
              {meta.page}
            </strong>{" "}
            /{" "}
            {meta.totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={
              page >=
              meta.totalPages
            }
            onClick={() =>
              setPage(
                (p) => p + 1
              )
            }
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
}