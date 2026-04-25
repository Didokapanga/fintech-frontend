// src/modules/retrait/components/RetraitHistoryTab.tsx

import { useState } from "react";
import { Table, Button } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import { useRetraitHistory } from "../hooks/useRetraitHistory";
import type { Retrait } from "../services/retrait.service";

export default function RetraitHistoryTab() {
  const [page, setPage] = useState(1);

  // 🔥 FILTERS
  const [statut, setStatut] = useState("");
  const [dateOperation, setDateOperation] =
    useState("");

  const { data, isLoading } =
    useRetraitHistory(page, 10, {
      statut,
      date_operation: dateOperation,
    });

  const retraits: Retrait[] =
    data?.data || [];

  const meta = !Array.isArray(data)
    ? data?.meta
    : undefined;

  const getStatusStyle = (
    statut: string
  ) => {
    switch (statut) {
      case "INITIE":
        return "bg-yellow-100 text-yellow-700";
      case "VALIDE":
        return "bg-blue-100 text-blue-700";
      case "EXECUTE":
        return "bg-green-100 text-green-700";
      case "ANNULE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const columns: Column<Retrait>[] = [
    {
      header: "Expéditeur",
      accessor: "id",
      render: (_v, row) => {
        const exp = row.expediteur;

        return (
          <div className="flex flex-col">
            {exp ? (
              <>
                <span className="font-medium text-gray-800">
                  {exp.nom}{" "}
                  {exp.postnom}
                </span>
                <span className="text-xs text-gray-500">
                  {exp.phone}
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400 italic">
                Non disponible
              </span>
            )}
          </div>
        );
      },
    },

    {
      header: "Destinataire",
      accessor: "numero_piece",
      render: (_v, row) => {
        const dest =
          row.destinataire;

        return (
          <div className="flex flex-col">
            {dest ? (
              <>
                <span className="font-medium text-gray-800">
                  {dest.nom}{" "}
                  {dest.postnom}
                </span>
                <span className="text-xs text-gray-500">
                  {dest.phone}
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400 italic">
                Non disponible
              </span>
            )}
          </div>
        );
      },
    },

    {
      header: "Numéro pièce",
      accessor: "montant",
      render: (_v, row) => (
        <span className="text-xs font-mono text-gray-600">
          {row.numero_piece}
        </span>
      ),
    },

    {
      header: "Montant",
      accessor: "statut",
      render: (_v, row) => (
        <span className="font-semibold text-green-600">
          {Number(
            row.montant || 0
          ).toLocaleString()}{" "}
          {row.devise}
        </span>
      ),
    },

    {
      header: "Statut",
      accessor: "created_at",
      render: (_v, row) => {
        const s = String(
          row.statut || ""
        );

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(
              s
            )}`}
          >
            {s}
          </span>
        );
      },
    },

    {
      header: "Date",
      accessor: "devise",
      render: (_v, row) => (
        <span>
          {new Date(
            String(
              row.date_operation ||
                row.created_at
            )
          ).toLocaleDateString(
            "fr-FR"
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      {/* FILTERS */}
      <div className="bg-white rounded-xl border p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <select
            value={statut}
            onChange={(e) => {
              setPage(1);
              setStatut(
                e.target.value
              );
            }}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">
              Statut
            </option>
            <option value="INITIE">
              INITIE
            </option>
            <option value="VALIDE">
              VALIDE
            </option>
            <option value="EXECUTE">
              EXECUTE
            </option>
            <option value="ANNULE">
              ANNULE
            </option>
          </select>

          <input
            type="date"
            value={dateOperation}
            onChange={(e) => {
              setPage(1);
              setDateOperation(
                e.target.value
              );
            }}
            className="w-full border rounded-lg px-3 py-2"
          />

          <Button
            variant="secondary"
            onClick={() => {
              setPage(1);
              setStatut("");
              setDateOperation("");
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table<Retrait>
          data={retraits}
          columns={columns}
          loading={isLoading}
        />
      </div>

      {!isLoading &&
        retraits.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            Aucun retrait trouvé
          </div>
        )}

      {meta && (
        <div className="flex justify-center items-center gap-3">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() =>
              setPage((p) => p - 1)
            }
          >
            ←
          </Button>

          <span className="text-sm text-gray-600">
            Page{" "}
            <strong>
              {meta.page}
            </strong>{" "}
            / {meta.totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={
              page >=
              meta.totalPages
            }
            onClick={() =>
              setPage((p) => p + 1)
            }
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
}