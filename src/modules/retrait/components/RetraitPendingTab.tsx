// src/modules/retrait/components/RetraitPendingTab.tsx

import { useState } from "react";
import { Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import RetraitForm from "./RetraitForm";
import { useTransfertsToWithdraw } from "../../transfert-client/hooks/useTransfertClient";

type Transfert = {
  id: string;
  code_reference: string;
  montant: string;
  devise: string;
  numero_piece: string;
  created_at: string;
};

export default function RetraitPendingTab() {
  const [page] = useState(1);

  const { data, isLoading } = useTransfertsToWithdraw(page, 10);

  const transferts = data?.data ?? [];

  const columns: Column<Transfert>[] = [
    {
      header: "Référence",
      accessor: "code_reference",
    },
    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => {
        const montant = parseFloat(String(value || "0"));
        return (
          <span className="text-green-600 font-semibold">
            {montant.toLocaleString()} {row.devise}
          </span>
        );
      },
    },
    {
      header: "Pièce",
      accessor: "numero_piece",
    },
    {
      header: "Date",
      accessor: "created_at",
      render: (value) =>
        new Date(String(value)).toLocaleString(),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* FORMULAIRE */}
      <div className="bg-white rounded-xl shadow p-4">
        <RetraitForm />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-4">
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