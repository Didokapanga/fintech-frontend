// src/modules/transfert-client/pages/TransfertClientPage.tsx

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

  const transferts: TransfertClient[] = Array.isArray(data)
    ? data
    : data?.data ?? [];

  const meta = !Array.isArray(data) ? data?.meta : undefined;

  // 🎨 STYLE STATUT
  const getStatusStyle = (status: string) => {
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

  const columns: Column<TransfertClient>[] = [
    {
      header: "Référence",
      accessor: "code_reference",
      render: (value) => (
        <span className="text-xs font-mono text-gray-600">
          {value}
        </span>
      ),
    },

    {
      header: "Expéditeur",
      accessor: "exp_nom",
      render: (_v, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            {row.exp_nom} {row.exp_postnom}
          </span>
          <span className="text-xs text-gray-500">
            {row.exp_phone}
          </span>
        </div>
      ),
    },

    {
      header: "Destinataire",
      accessor: "dest_nom",
      render: (_v, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            {row.dest_nom} {row.dest_postnom}
          </span>
          <span className="text-xs text-gray-500">
            {row.dest_phone}
          </span>
        </div>
      ),
    },

    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => {
        const montant =
          typeof value === "number"
            ? value
            : Number(value);

        return (
          <div className="flex flex-col">
            <span className="font-semibold text-green-600">
              {montant.toLocaleString()} {row.devise}
            </span>
            <span className="text-xs text-gray-400">
              Frais: {row.frais} • Comm: {row.commission}
            </span>
          </div>
        );
      },
    },

    {
      header: "Statut",
      accessor: "statut",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(
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
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Transferts clients
          </h1>
          <p className="text-sm text-gray-500">
            Historique des opérations envoyées
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          + Nouveau transfert
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table<TransfertClient>
          data={transferts}
          columns={columns}
          loading={isLoading}
        />
      </div>

      {/* EMPTY */}
      {!isLoading && transferts.length === 0 && (
        <div className="text-center text-gray-400 py-10">
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
      {open && (
        <TransfertClientModal
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}