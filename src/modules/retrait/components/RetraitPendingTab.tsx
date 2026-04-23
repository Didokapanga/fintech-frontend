// src/modules/retrait/components/RetraitPendingTab.tsx

import { useState } from "react";
import { Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import RetraitForm from "./RetraitForm";
import { useTransfertsToWithdraw } from "../../transfert-client/hooks/useTransfertClient";

// 🔥 TYPE ENRICHI
type Transfert = {
  id: string;
  code_reference: string;

  exp_nom: string;
  exp_postnom: string;
  exp_phone: string;

  dest_nom: string;
  dest_postnom: string;
  dest_phone: string;

  montant: number | string;
  devise: string;

  exp_numero_piece: string;

  created_at: string;
};

export default function RetraitPendingTab() {
  const [page] = useState(1);
  const [selected, setSelected] = useState<Transfert | null>(null);

  const { data, isLoading } = useTransfertsToWithdraw(page, 10);

  const transferts: Transfert[] = data?.data ?? [];

  const columns: Column<Transfert>[] = [
    // 🔹 REF
    {
      header: "Référence",
      accessor: "code_reference",
      render: (value) => (
        <span className="text-xs font-mono text-gray-600">
          {value}
        </span>
      ),
    },

    // 🔹 EXPEDITEUR
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

    // 🔹 DESTINATAIRE
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

    // 🔹 MONTANT
    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => {
        const montant = Number(value);

        return (
          <span className="text-green-600 font-semibold">
            {montant.toLocaleString()} {row.devise}
          </span>
        );
      },
    },

    // 🔹 PIECE (juste affichage, plus utilisé dans selected)
    {
      header: "Pièce",
      accessor: "exp_numero_piece",
      render: (value) => (
        <span className="text-xs font-mono text-gray-600">
          {value}
        </span>
      ),
    },

    // 🔹 DATE
    {
      header: "Date",
      accessor: "created_at",
      render: (value) =>
        new Date(String(value)).toLocaleString(),
    },

    // 🔹 ACTION
    {
      header: "Action",
      accessor: "id",
      render: (_v, row) => (
        <button
          onClick={() => setSelected(row)}
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          Sélectionner
        </button>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* FORM (1/3) */}
      <div className="bg-white rounded-xl shadow p-4 lg:col-span-1">
        <RetraitForm
          selected={
            selected
              ? {
                  code_reference: selected.code_reference, // ✅ SEULEMENT ÇA
                }
              : null
          }
        />
      </div>

      {/* TABLE (2/3) */}
      <div className="bg-white rounded-xl shadow p-4 lg:col-span-2">
        <h3 className="text-md font-semibold mb-3">
          Transferts disponibles
        </h3>

        <Table<Transfert>
          data={transferts}
          columns={columns}
          loading={isLoading}
        />

        {!isLoading && transferts.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            Aucun transfert disponible
          </div>
        )}
      </div>
    </div>
  );
}