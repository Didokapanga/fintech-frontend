// src/modules/validation/components/ValidationClientTab.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";

import { useClients } from "../../clients/hooks/useClients";
import { useAgences } from "../../agence/hooks/useAgences";
import {
  useValidateOperation,
  useValidationList,
} from "../../validation/hooks/useValidation";
import type { TransfertClient } from "../../validation/services/validation.service";

// TYPES
type Client = {
  id: string;
  name: string;
  first_name: string;
  second_name: string;
};

type Agence = {
  id: string;
  libelle: string;
};

export default function ValidationClientTab() {
  // ✅ FIX: suppression de setPage inutilisé
  const [page] = useState(1);

  const { data, isLoading } = useValidationList(page, 10);
  const { mutate } = useValidateOperation();

  const transferts = data?.data ?? [];

  const { data: clientsData } = useClients();
  const { data: agencesData } = useAgences();

  const clients: Client[] = (clientsData as Client[]) ?? [];
  const agences: Agence[] = (agencesData as Agence[]) ?? [];

  // HELPERS
  const getClientName = (id: string) => {
    const c = clients.find((c) => c.id === id);
    if (!c) return "-";
    return `${c.name} ${c.first_name} ${c.second_name}`;
  };

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
      accessor: "client_exp",
      render: (value) => (
        <span>{getClientName(String(value))}</span>
      ),
    },
    {
      header: "Destinataire",
      accessor: "client_dest",
      render: (value) => (
        <span>{getClientName(String(value))}</span>
      ),
    },
    {
      header: "Agence",
      accessor: "agence_exp" as keyof TransfertClient,
      render: (value) => (
        <span>{getAgenceName(String(value))}</span>
      ),
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
      accessor: "id",
      render: (_v, row) => (
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
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Table<TransfertClient>
        data={transferts}
        columns={columns}
        loading={isLoading}
      />
    </div>
  );
}