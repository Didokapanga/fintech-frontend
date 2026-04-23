// src/modules/validation/components/ValidationCaisseTab.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";

import type { TransfertCaisse } from "../../transfert-caisse/services/transfertCaisse.service";
import { useValidateOperation } from "../hooks/useValidation";
import { useTransfertsCaisseToProcess } from "../../transfert-caisse/hooks/useTransfertCaisse";
import { useCaisses } from "../../caisse/hooks/useCaisses";

// ✅ TYPE CAISSE
type Caisse = {
  id: string;
  code_caisse: string;
  devise: string;
};

export default function ValidationCaisseTab() {
  const [page] = useState(1);

  const { data, isLoading } = useTransfertsCaisseToProcess(page, 10);
  const { mutate } = useValidateOperation();

  const { data: caisses = [] } = useCaisses() as { data: Caisse[] };

  const transferts = data?.data ?? [];

  // 🔥 helper affichage lisible
  const getCaisseLabel = (id: string) => {
    const caisse = caisses.find((c) => c.id === id);
    return caisse
      ? `${caisse.code_caisse} (${caisse.devise})`
      : id.slice(0, 8); // fallback propre
  };

  // 🎨 BADGE
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "INITIE":
        return "bg-yellow-100 text-yellow-700";
      case "VALIDE":
        return "bg-blue-100 text-blue-700";
      case "EXECUTE":
        return "bg-green-100 text-green-700";
      case "REJETE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ACTIONS
  const handleValidate = (row: TransfertCaisse) => {
    let niveau: "N1" | "N2";

    if (row.statut === "INITIE") {
      niveau = "N1";
    } else if (row.statut === "VALIDE") {
      niveau = "N2";
    } else {
      return; // déjà traité
    }

    mutate({
      operation_type: "TRANSFERT_CAISSE",
      reference_id: row.id,
      decision: "APPROUVE",
      niveau,
    });
  };

  const handleReject = (row: TransfertCaisse) => {
    if (row.statut === "EXECUTE") return;

    mutate({
      operation_type: "TRANSFERT_CAISSE",
      reference_id: row.id,
      decision: "REJETE",
      niveau: row.statut === "INITIE" ? "N1" : "N2",
    });
  };

  // COLUMNS
  const columns: Column<TransfertCaisse>[] = [
    {
      header: "Caisse source",
      accessor: "caisse_source_id",
      render: (value) => getCaisseLabel(String(value)),
    },
    {
      header: "Caisse destination",
      accessor: "caisse_destination_id",
      render: (value) => getCaisseLabel(String(value)),
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
          <Button onClick={() => handleValidate(row)}>
            Valider
          </Button>

          <Button
            variant="danger"
            onClick={() => handleReject(row)}
          >
            Rejeter
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Table<TransfertCaisse>
        data={transferts}
        columns={columns}
        loading={isLoading}
      />

      {!isLoading && transferts.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          Aucun transfert caisse à valider
        </div>
      )}
    </div>
  );
}