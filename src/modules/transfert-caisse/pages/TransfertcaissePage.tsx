// src/modules/transfert-caisse/pages/TransfertCaissePage.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";

import { useTransfertsCaisse } from "../hooks/useTransfertCaisse";
import type {
  TransfertCaisse,
} from "../services/transfertCaisse.service";
import TransfertCaisseModal from "../components/transfertCaisseModal";
import { useCaisses } from "../../caisse/hooks/useCaisses";


export default function TransfertCaissePage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  // 🔥 FILTERS
  const [devise, setDevise] = useState("");
  const [statut, setStatut] = useState("");
  const [dateOperation, setDateOperation] = useState("");

  // ✅ QUERY AVEC FILTRES
  const { data, isLoading } = useTransfertsCaisse(
    page,
    10,
    {
      devise,
      statut,
      date_operation: dateOperation,
    }
  );
 
  const {
    data: caissesResponse,
  } = useCaisses(1, 100);

  const caissesData =
    caissesResponse?.data || [];

  // 🔥 helper affichage caisse
  const getCaisseInfo = (
    caisseId: string
  ) => {

    const caisse =
      caissesData.find(
        (c: {
          id: string;
          code_caisse?: string;
          agence?: {
            libelle?: string;
          };
          agence_libelle?: string;
        }) =>
          String(c.id) ===
          String(caisseId)
      );

    if (!caisse) {
      return {
        code: "-",
        agence: "-",
      };
    }

    return {
      code:
        caisse.code_caisse || "-",

      agence:
        caisse.agence?.libelle ||
        caisse.agence_libelle ||
        "-",
    };
  };

  const transferts: TransfertCaisse[] =
    data?.data ?? [];

  const meta = data?.meta;

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

  const columns: Column<TransfertCaisse>[] = [
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
      header: "Caisse source",
      accessor: "caisse_source_id",
      render: (value) => {
        const info = getCaisseInfo(String(value));

        return (
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              {info.code}
            </span>

            {/* <span className="text-xs text-gray-500">
              {info.agence}
            </span> */}
          </div>
        );
      },
    },

    {
      header: "Caisse destination",
      accessor: "caisse_destination_id",
      render: (value) => {
        const info = getCaisseInfo(String(value));

        return (
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              {info.code}
            </span>

            {/* <span className="text-xs text-gray-500">
              {info.agence}
            </span> */}
          </div>
        );
      },
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
          <span className="font-semibold text-green-600">
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
          className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(
            String(value)
          )}`}
        >
          {String(value)}
        </span>
      ),
    },

    {
      header: "Date",
      accessor: "date_operation",
        render: (value) => {
          if (!value) {
            return (
              <span className="text-sm text-gray-400">
                -
              </span>
            );
          }

          const date = new Date(String(value));

          return (
            <span className="text-sm text-gray-600">
              {date.toLocaleDateString("fr-FR")}
            </span>
          );
        },
    },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Transferts caisse
          </h1>

          <p className="text-sm text-gray-500">
            Historique des transferts entre caisses
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          + Nouveau transfert
        </Button>
      </div>

      {/* 🔥 FILTRES */}
      <div className="bg-white rounded-xl border shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* DEVISE */}
          <select
            value={devise}
            onChange={(e) => {
              setPage(1);
              setDevise(e.target.value);
            }}
            className="input"
          >
            <option value="">
              Toutes devises
            </option>

            <option value="USD">
              USD
            </option>

            <option value="CDF">
              CDF
            </option>
          </select>

          {/* STATUT */}
          <select
            value={statut}
            onChange={(e) => {
              setPage(1);
              setStatut(e.target.value);
            }}
            className="input"
          >
            <option value="">
              Tous statuts
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

            <option value="REJETE">
              REJETE
            </option>
          </select>

          {/* DATE */}
          <input
            type="date"
            value={dateOperation}
            onChange={(e) => {
              setPage(1);
              setDateOperation(e.target.value);
            }}
            className="input"
          />

          {/* RESET */}
          <Button
            variant="secondary"
            onClick={() => {
              setPage(1);
              setDevise("");
              setStatut("");
              setDateOperation("");
            }}
          >
            Reset
          </Button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table<TransfertCaisse>
          data={transferts}
          columns={columns}
          loading={isLoading}
        />
      </div>

      {/* EMPTY */}
      {!isLoading &&
        transferts.length === 0 && (
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
            onClick={() =>
              setPage((p) => p - 1)
            }
          >
            ←
          </Button>

          <span className="text-sm text-gray-600">
            Page <strong>{meta.page}</strong>
            {" / "}
            {meta.totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={
              page >= meta.totalPages
            }
            onClick={() =>
              setPage((p) => p + 1)
            }
          >
            →
          </Button>

        </div>
      )}

      {/* MODAL */}
      {open && (
        <TransfertCaisseModal
          open={open}
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
}