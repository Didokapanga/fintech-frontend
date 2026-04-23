import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import { useTransfertsCaisse } from "../hooks/useTransfertCaisse";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import type { TransfertCaisse } from "../services/transfertCaisse.service";
import TransfertCaisseModal from "../components/transfertCaisseModal";

// ✅ TYPE CAISSE
type Caisse = {
  id: string;
  code_caisse: string;
  devise: string;
};

export default function TransfertCaissePage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTransfertsCaisse(page, 10);
  const { data: caisses = [] } = useCaisses() as { data: Caisse[] };

  const transferts = data?.data ?? [];

  const meta = !Array.isArray(data) ? data?.meta : undefined;

  // console.log("🔥 FRONT:", transferts);

  // 🔥 MAP ID → LIBELLÉ
  const getCaisseLabel = (id: string) => {
    const caisse = caisses.find((c) => c.id === id);
    return caisse
      ? `${caisse.code_caisse} (${caisse.devise})`
      : "—";
  };

  const columns: Column<TransfertCaisse>[] = [
    {
      header: "Source",
      accessor: "caisse_source_id",
      render: (value) => getCaisseLabel(String(value)),
    },
    {
      header: "Destination",
      accessor: "caisse_destination_id",
      render: (value) => getCaisseLabel(String(value)),
    },

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

    { header: "Devise", accessor: "devise" },

    {
      header: "Statut",
      accessor: "statut",
      render: (value) => (
        <span className="px-2 py-1 rounded bg-gray-100 text-sm">
          {String(value)}
        </span>
      ),
    },

    {
      header: "Date",
      accessor: "created_at",
      render: (value) =>
        new Date(String(value)).toLocaleString(),
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

      {/* MODAL */}
      <TransfertCaisseModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}