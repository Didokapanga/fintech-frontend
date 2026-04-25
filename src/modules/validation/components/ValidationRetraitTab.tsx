// src/modules/validation/components/ValidationRetraitTab.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";

import {
  useValidationRetraitList,
  useValidateRetrait,
} from "../hooks/useValidationRetrait";

type RetraitValidation = {
  id: string;
  code_reference: string;
  numero_piece: string;
  montant: number;
  devise: string;
  statut: string;
  date_operation: string;
  created_at: string;

  expediteur?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };

  destinataire?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };
};

export default function ValidationRetraitTab() {
  const [page, setPage] = useState(1);

  const { data, isLoading } =
    useValidationRetraitList(
      page,
      10
    );

  const { mutate } =
    useValidateRetrait();

  const retraits: RetraitValidation[] =
    data?.data ?? [];

  const meta = data?.meta;

  const handleApprove = (
    id: string
  ) => {
    mutate({
      retrait_id: id,
      decision: "APPROUVE",
    });
  };

  const handleReject = (
    id: string
  ) => {
    mutate({
      retrait_id: id,
      decision: "REJETE",
    });
  };

  const columns: Column<RetraitValidation>[] = [
    {
      header: "Référence",
      accessor: "code_reference",
    },

    {
      header: "Expéditeur",
      accessor: "expediteur",
      render: (_v, row) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {String(
              row.expediteur?.nom || "-"
            )}{" "}
            {String(
              row.expediteur?.postnom || ""
            )}
          </span>

          <span className="text-xs text-gray-500">
            {String(
              row.expediteur?.phone || "-"
            )}
          </span>
        </div>
      ),
    },

    {
      header: "Destinataire",
      accessor: "destinataire",
      render: (_v, row) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {String(
              row.destinataire?.nom || "-"
            )}{" "}
            {String(
              row.destinataire?.postnom || ""
            )}
          </span>

          <span className="text-xs text-gray-500">
            {String(
              row.destinataire?.phone || "-"
            )}
          </span>
        </div>
      ),
    },

    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => (
        <span className="font-semibold text-green-600">
          {Number(
            value
          ).toLocaleString()}{" "}
          {String(row.devise)}
        </span>
      ),
    },

    {
      header: "Pièce",
      accessor: "numero_piece",
      render: (value) => (
        <span>
          {String(value || "-")}
        </span>
      ),
    },

    {
      header: "Date",
      accessor: "date_operation",
      render: (value) => (
        <span>
          {value
            ? new Date(
                String(value)
              ).toLocaleDateString(
                "fr-FR"
              )
            : "-"}
        </span>
      ),
    },

    {
      header: "Statut",
      accessor: "statut",
      render: (value) => (
        <span
          className="
            px-2 py-1 rounded
            text-xs font-medium
            bg-yellow-100
            text-yellow-700
          "
        >
          {String(value)}
        </span>
      ),
    },

    {
      header: "Actions",
      accessor: "id",
      render: (_v, row) => (
        <div className="flex gap-2">
          <Button
            onClick={() =>
              handleApprove(
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
      <Table<RetraitValidation>
        data={retraits}
        columns={columns}
        loading={isLoading}
      />

      {!isLoading &&
        retraits.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            Aucun retrait à valider
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