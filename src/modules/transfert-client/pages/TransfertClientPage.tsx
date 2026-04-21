import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import { useMyTransferts } from "../hooks/useTransfert";
import type { TransfertClient } from "../services/transfert.service";
import TransfertClientModal from "../components/TransfertFormModal";

export default function TransfertClientPage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useMyTransferts(page, 10);

  const columns: Column<TransfertClient>[] = [
    { header: "Montant", accessor: "montant" },
    { header: "Devise", accessor: "devise" },
    { header: "Statut", accessor: "statut" },
    {
      header: "Date",
      accessor: "created_at",
      render: (value) =>
        new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Transferts clients
        </h1>

        <Button onClick={() => setOpen(true)}>
          + Nouveau transfert
        </Button>
      </div>

      {/* TABLE */}
      <Table<TransfertClient>
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
      />

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
      <TransfertClientModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}