// src/modules/validation/components/ValidationClientTab.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";

import { useAgences } from "../../agence/hooks/useAgences";
import {
  useValidateOperation,
  useValidationList,
} from "../hooks/useValidation";
import type { TransfertClient } from "../services/validation.service";
import { useAuthStore } from "../../../app/store";

type Agence = {
  id: string;
  libelle: string;
};

export default function ValidationClientTab() {
  const [page] = useState(1);

  // 🔥 FIX PRINCIPAL : utiliser Zustand (PAS localStorage)
  const user = useAuthStore((s) => s.user);

  const role = user?.role_name?.toUpperCase() || "";

  const canValidate = ["ADMIN", "N+1", "N+2"].includes(role);

  // ✅ DATA
  const { data, isLoading } = useValidationList(page, 10);
  const { mutate } = useValidateOperation();

  const transferts = data?.data ?? [];

  // const { data: clientsData } = useClients();
  const { data: agencesData } = useAgences();

  // const clients: Client[] = (clientsData as Client[]) ?? [];
  const agences: Agence[] = (agencesData as Agence[]) ?? [];

  const getAgenceName = (id: string) => {
    const a = agences.find((a) => a.id === id);
    return a?.libelle || "-";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "INITIE":
        return "bg-yellow-100 text-yellow-700";
      case "APPROUVE":
      case "EXECUTE":
        return "bg-green-100 text-green-700";
      case "REJETE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ACTIONS
  const handleValidate = (id: string) => {
    mutate({
      operation_type: "TRANSFERT_CLIENT",
      reference_id: id,
      decision: "APPROUVE",
      niveau: "N1",
    });
  };

  const handleReject = (id: string) => {
    mutate({
      operation_type: "TRANSFERT_CLIENT",
      reference_id: id,
      decision: "REJETE",
      niveau: "N1",
    });
  };

  // COLUMNS
  const columns: Column<TransfertClient>[] = [
    {
      header: "Expéditeur",
      accessor: "id",
      render: (_v, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            {row.exp_nom || "-"} {row.exp_postnom || ""}
          </span>
          <span className="text-xs text-gray-500">
            {row.exp_phone || "-"}
          </span>
        </div>
      ),
    },

    {
      header: "Destinataire",
      accessor: "client_exp", // ✅ UNIQUE
      render: (_v, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            {row.dest_nom || "-"} {row.dest_postnom || ""}
          </span>
          <span className="text-xs text-gray-500">
            {row.dest_phone || "-"}
          </span>
        </div>
      ),
    },

    {
      header: "Agence",
      accessor: "agence_exp",
      render: (value) => getAgenceName(String(value)),
    },

    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => {
        const montant =
          typeof value === "number"
            ? value
            : parseFloat(String(value) || "0");

        return (
          <span className="text-green-600 font-semibold">
            {montant.toLocaleString()} {row.devise}
          </span>
        );
      },
    },

    {
      header: "Statut",
      accessor: "statut",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs ${getStatusBadge(
            String(value)
          )}`}
        >
          {value}
        </span>
      ),
    },

    {
      header: "Date",
      accessor: "created_at",
      render: (value) =>
        new Date(String(value)).toLocaleString(),
    },

    {
      header: "Actions",
      accessor: "client_dest", // ✅ UNIQUE
      render: (_v, row) =>
        canValidate ? (
          <div className="flex gap-2">
            <Button onClick={() => handleValidate(String(row.id))}>
              Valider
            </Button>

            <Button
              variant="danger"
              onClick={() => handleReject(String(row.id))}
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

      {/* INFO DROITS */}
      {!canValidate && (
        <div className="text-xs text-gray-400">
          Vous êtes en mode lecture seule
        </div>
      )}

      <Table<TransfertClient>
        data={transferts}
        columns={columns}
        loading={isLoading}
      />

      {!isLoading && transferts.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          Aucun transfert à afficher
        </div>
      )}
    </div>
  );
}