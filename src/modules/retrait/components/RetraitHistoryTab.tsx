import { useState } from "react";
import { Table, Button } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import { useRetraitHistory } from "../hooks/useRetraitHistory";
import type { Retrait } from "../services/retrait.service";

export default function RetraitHistoryTab() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useRetraitHistory(page, 10);

  console.log("🔥 FRONT RETRAITS:", data);

  const getStatusStyle = (statut: string) => {
    switch (statut) {
      case "INITIE":
        return "bg-green-100 text-green-700";
      case "VALIDE":
        return "bg-blue-100 text-blue-700";
      case "EXECUTE":
        return "bg-yellow-100 text-yellow-700";
      case "ANNULE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const columns: Column<Retrait>[] = [
    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => {
        const montant =
          typeof value === "number" ? value : Number(value);

        return (
          <span className="font-semibold text-green-600">
            {montant.toLocaleString()} {row.devise}
          </span>
        );
      },
    },
    {
      header: "Numéro pièce",
      accessor: "numero_piece",
    },
    {
      header: "Statut",
      accessor: "statut",
      render: (value) => {
        const statut = String(value); // ✅ FIX TS

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(
              statut
            )}`}
          >
            {statut}
          </span>
        );
      },
    },
    {
      header: "Date",
      accessor: "created_at",
      render: (value) =>
        new Date(String(value)).toLocaleString(), // ✅ FIX TS
    },
  ];

  return (
    <div className="space-y-4">
      <Table<Retrait>
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
      />

      {!isLoading && data?.data?.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          Aucun retrait trouvé
        </div>
      )}

      <div className="flex justify-center gap-2">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ←
        </Button>

        <span className="px-3 py-2 text-sm">
          Page {data?.meta?.page || 1}
        </span>

        <Button
          variant="secondary"
          disabled={page === data?.meta?.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          →
        </Button>
      </div>
    </div>
  );
}