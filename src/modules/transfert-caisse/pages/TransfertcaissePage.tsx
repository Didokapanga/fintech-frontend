// src/modules/transfert-caisse/pages/TransfertCaissePage.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import { useTransfertsCaisse } from "../hooks/useTransfertCaisse";
import type { TransfertCaisse } from "../services/transfertCaisse.service";
import TransfertCaisseModal from "../components/transfertCaisseModal";

export default function TransfertCaissePage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTransfertsCaisse(page, 10);

  // 🔥 IMPORTANT
  const transferts = data?.data ?? [];

  console.log("🔥 FRONT:", transferts);

  const columns: Column<TransfertCaisse>[] = [
    { header: "Source", accessor: "caisse_source_id" },
    { header: "Destination", accessor: "caisse_destination_id" },

    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => (
        <span className="font-semibold text-green-600">
          {value.toLocaleString()} {row.devise}
        </span>
      ),
    },

    { header: "Devise", accessor: "devise" },

    {
      header: "Statut",
      accessor: "statut",
      render: (value) => (
        <span className="px-2 py-1 rounded bg-gray-100 text-sm">
          {value}
        </span>
      ),
    },

    {
      header: "Date",
      accessor: "created_at",
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Transferts de caisse
        </h1>

        <Button onClick={() => setOpen(true)}>
          + Nouveau transfert
        </Button>
      </div>

      {/* TABLE */}
      <Table<TransfertCaisse>
        data={transferts}
        columns={columns}
        loading={isLoading}
      />

      {/* EMPTY */}
      {!isLoading && transferts.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          Aucun transfert trouvé
        </div>
      )}

      {/* PAGINATION */}
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
          onClick={() => setPage((p) => p + 1)}
        >
          →
        </Button>
      </div>

      {/* MODAL */}
      <TransfertCaisseModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}