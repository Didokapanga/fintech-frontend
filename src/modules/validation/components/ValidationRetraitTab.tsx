// src/modules/validation/components/ValidationRetraitTab.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";

import {
  useValidationRetraitList,
  useValidateRetrait,
} from "../hooks/useValidationRetrait";

import AppMessageState from "../../../components/ui/AppMessageState";
import { useApiMutationWithFeedback } from "../../../hooks/useApiMutationWithFeedback";
import { useAuthStore } from "../../../app/store";

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

  const user = useAuthStore((s) => s.user);
  const role = user?.role_name?.toUpperCase() || "";

  const canValidate = ["ADMIN", "N+1", "N+2"].includes(role);

  const { data, isLoading } =
    useValidationRetraitList(page, 10);

  const retraits: RetraitValidation[] =
    data?.data ?? [];

  const meta = data?.meta;

  const retraitMutation = useValidateRetrait();

  const {
    mutate,
    appMessage,
    clearMessage,
    isPending,
  } = useApiMutationWithFeedback({
    mutationFn: retraitMutation.mutateAsync,
    successMessage: "Validation du retrait effectuée",
    invalidateQueries: ["validation-retrait"],
  });

  const handleApprove = (id: string) => {
    mutate({
      retrait_id: id,
      decision: "APPROUVE",
    });
  };

  const handleReject = (id: string) => {
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

    // 🔥 FIX ICI (IMPORTANT)
    {
      header: "Expéditeur",
      accessor: "expediteur", // ✅ UNIQUE
      render: (_v, row) => {
        const e = row.expediteur;

        return (
          <div className="flex flex-col">
            <span className="font-medium">
              {e?.nom ?? "-"} {e?.postnom ?? ""}
            </span>

            <span className="text-xs text-gray-500">
              {e?.phone ?? "-"}
            </span>
          </div>
        );
      },
    },

    {
      header: "Destinataire",
      accessor: "destinataire", // ✅ UNIQUE
      render: (_v, row) => {
        const d = row.destinataire;

        return (
          <div className="flex flex-col">
            <span className="font-medium">
              {d?.nom ?? "-"} {d?.postnom ?? ""}
            </span>

            <span className="text-xs text-gray-500">
              {d?.phone ?? "-"}
            </span>
          </div>
        );
      },
    },

    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => (
        <span className="font-semibold text-green-600">
          {Number(value).toLocaleString()} {row.devise}
        </span>
      ),
    },

    {
      header: "Pièce",
      accessor: "numero_piece",
    },

    {
      header: "Date",
      accessor: "date_operation",
      render: (value) =>
        value
          ? new Date(String(value)).toLocaleDateString("fr-FR")
          : "-",
    },

    {
      header: "Statut",
      accessor: "statut",
    },

    {
      header: "Actions",
      accessor: "id",
      render: (_v, row) =>
        canValidate ? (
          <div className="flex gap-2">
            <Button
              onClick={() => handleApprove(row.id)}
              loading={isPending}
            >
              Valider
            </Button>

            <Button
              variant="danger"
              onClick={() => handleReject(row.id)}
              loading={isPending}
            >
              Rejeter
            </Button>
          </div>
        ) : (
          <span className="text-gray-400 text-sm italic">
            Lecture seule
          </span>
        ),
    },
  ];

  return (
    <div className="space-y-4">
      {appMessage && (
        <AppMessageState
          variant={appMessage.variant}
          title={appMessage.title}
          message={appMessage.message}
          onAction={clearMessage}
        />
      )}

      {!canValidate && (
        <div className="text-xs text-gray-400">
          Vous êtes en mode lecture seule
        </div>
      )}

      <Table<RetraitValidation>
        data={retraits}
        columns={columns}
        loading={isLoading}
      />

      {!isLoading && retraits.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          Aucun retrait à valider
        </div>
      )}

      {meta && (
        <div className="flex justify-center items-center gap-3">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ←
          </Button>

          <span className="text-sm text-gray-600">
            Page <strong>{meta.page}</strong> / {meta.totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={page >= meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
}