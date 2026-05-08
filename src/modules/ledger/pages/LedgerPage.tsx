import { useState } from "react";
import { Table, Button } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import type { Ledger } from "../services/ledger.service";
import {
  exportLedgerExcel
} from "../services/ledger-export.service";
import {
  useLedgerByCaisse,
  useMyLedger,
} from "../hooks/useLeger";
import { useCaisses } from "../../caisse/hooks/useCaisses";

type Caisse = {
  id: string;
  code_caisse: string;
};

export default function LedgerPage() {
  const [page, setPage] = useState(1);
  const [caisseId, setCaisseId] = useState("");

  const [isExporting, setIsExporting] =
  useState(false);

  // 🔥 FILTERS STATE
  const [filters, setFilters] = useState({
    type_operation: "",
    sens: "",
    date_from: "",
    date_to: "",
  });

  const isAdminMode = !!caisseId;

  const { data: caisses = [] } = useCaisses() as { data: Caisse[] };

  const adminQuery = useLedgerByCaisse(caisseId, page, 10, filters);
  const userQuery = useMyLedger(page, 10, filters);

  const data = isAdminMode ? adminQuery.data : userQuery.data;
  const isLoading = isAdminMode
    ? adminQuery.isLoading
    : userQuery.isLoading;

 const meta = !Array.isArray(data) ? data?.meta : undefined;

  const getSensStyle = (sens: string) =>
    sens === "ENTREE" ? "text-green-600" : "text-red-600";

  const handleExport = async () => {
    try {

      setIsExporting(true);

      await exportLedgerExcel({

        caisse_id:
          caisseId || undefined,

        type_operation:
          filters.type_operation || undefined,

        sens:
          filters.sens || undefined,

        date_from:
          filters.date_from || undefined,

        date_to:
          filters.date_to || undefined,
      });

    } catch (err) {

      console.error(err);

    } finally {

      setIsExporting(false);
    }
  };

  const columns: Column<Ledger>[] = [

  {
    header: "Opération",
    accessor: "libelle_operation",
    render: (_, row) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">
          {row.libelle_operation}
        </span>

        <span className="text-xs text-gray-500">
          {row.reference_metier || "-"}
        </span>
      </div>
      ),
    },

    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => (
        <span className={`font-semibold ${getSensStyle(row.sens)}`}>
          {row.sens === "ENTREE" ? "+" : "-"}
          {Number(value).toLocaleString()} {row.devise}
        </span>
      ),
    },

    {
      header: "Client",
      accessor: "expediteur_complet",
      render: (_, row) => {

        // 🔥 transfert caisse
        if (
          row.type_operation === "TRANSFERT_CAISSE"
        ) {
          return (
            <span className="text-sm text-gray-500">
              Opération interne
            </span>
          );
        }

        return (
          <div className="flex flex-col text-sm">
            <span>
              <strong>Exp:</strong>{" "}
              {row.expediteur_complet || "-"}
            </span>

            <span>
              <strong>Dest:</strong>{" "}
              {row.destinataire_complet || "-"}
            </span>
          </div>
        );
      },
    },

    {
      header: "Agence / Caisse",
      accessor: "agence_display",
      render: (_, row) => (
        <div className="flex flex-col text-sm">
          <span className="font-medium">
            {row.agence_display}
          </span>

          <span className="text-gray-500">
            Caisse {row.code_caisse}
          </span>
        </div>
      ),
    },

    {
      header: "Agent",
      accessor: "agent_operation",
      render: (v) => (
        <span className="text-sm">
          {v || "-"}
        </span>
      ),
    },

    {
      header: "Date",
      accessor: "created_at",
      render: (v) => (
        <div className="text-sm">
          {new Date(String(v)).toLocaleString()}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 flex-wrap">

        <h1 className="text-xl font-semibold">
          Ledger (Journal financier)
        </h1>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="
            px-4 py-2 rounded-xl
            bg-emerald-600 text-white
            text-sm font-medium
            hover:bg-emerald-700
            transition-all
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {isExporting
            ? "Exportation..."
            : "Exporter Excel"}
        </button>

      </div>

      {/* 🔥 FILTRES */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-4 rounded-xl shadow">

        {/* CAISSE */}
        <select
          value={caisseId}
          onChange={(e) => {
            setCaisseId(e.target.value);
            setPage(1);
          }}
          className="input"
        >
          <option value="">Toutes les caisses</option>
          {caisses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code_caisse}
            </option>
          ))}
        </select>

        {/* TYPE */}
        <select
          value={filters.type_operation}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              type_operation: e.target.value,
            }))
          }
          className="input"
        >
          <option value="">Tous les types</option>

          <option value="TRANSFERT_CAISSE">
            Transfert caisse
          </option>

          <option value="TRANSFERT_CLIENT">
            Transfert client
          </option>

          <option value="ANNULATION_TRANSFERT_CLIENT">
            Annulation transfert client
          </option>

          <option value="RETRAIT">
            Retrait
          </option>

          <option value="APPROVISIONNEMENT">
            Approvisionnement
          </option>

          <option value="ECART_CAISSE">
            Écart de caisse
          </option>

          <option value="REJETE">
            Rejet
          </option>
        </select>

        {/* SENS */}
        <select
          value={filters.sens}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              sens: e.target.value,
            }))
          }
          className="input"
        >
          <option value="">Sens</option>
          <option value="ENTREE">Entrée</option>
          <option value="SORTIE">Sortie</option>
        </select>

        {/* DATE FROM */}
        <input
          type="date"
          value={filters.date_from}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              date_from: e.target.value,
            }))
          }
          className="input"
        />

        {/* DATE TO */}
        <input
          type="date"
          value={filters.date_to}
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              date_to: e.target.value,
            }))
          }
          className="input"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <Table<Ledger>
          data={data?.data || []}
          columns={columns}
          loading={isLoading}
        />
      </div>

      {/* EMPTY */}
      {!isLoading && data?.data?.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          Aucun mouvement trouvé
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
    </div>
  );
}