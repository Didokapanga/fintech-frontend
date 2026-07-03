// src/modules/ledger/pages/LedgerPage.tsx

import {
  useMemo,
  useState,
} from "react";

import {
  Download,
  FileText,
  Filter,
  Landmark,
} from "lucide-react";

import {
  Table,
  Button,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import {
  exportLedgerExcel,
} from "../services/ledger-export.service";

import {
  useLedger,
} from "../hooks/useLeger";

import {
  useCaisses,
} from "../../caisse/hooks/useCaisses";
import Pagination from "../../../components/ui/Pagination";
import type { Ledger } from "../types";
import LedgerDetailsModal from "../components/LedgerDetailsModal";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Caisse = {
  id: string;
  code_caisse: string;
};

type LedgerResponse = {
  data: Ledger[];

  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function LedgerPage() {

  /* ---------------------------------------------------------------------- */
  /* STATE                                                                  */
  /* ---------------------------------------------------------------------- */

  const [page, setPage] =
    useState(1);

  const [caisseId, setCaisseId] =
    useState("");

  const [
    isExporting,
    setIsExporting,
  ] = useState(false);

  const [filters, setFilters] =
    useState({
      type_operation: "",
      sens: "",
      date_from: "",
      date_to: "",
    });

  const [selectedLedger, setSelectedLedger] =
    useState<Ledger | null>(null);
  /* ---------------------------------------------------------------------- */
  /* MODE                                                                   */
  /* ---------------------------------------------------------------------- */


  /* ---------------------------------------------------------------------- */
  /* CAISSES                                                                */
  /* ---------------------------------------------------------------------- */

  const {
    data: caisseResponse,
  } = useCaisses(
    1,
    100
  );

  const caisses: Caisse[] =
    useMemo(
      () =>
        caisseResponse?.data ||
        [],
      [caisseResponse]
    );

  /* ---------------------------------------------------------------------- */
  /* LEDGER                                                                 */
  /* ---------------------------------------------------------------------- */

  const ledgerQuery =
    useLedger(
      page,
      10,
      {
        caisse_id:
          caisseId || undefined,

        type_operation:
          filters.type_operation ||
          undefined,

        sens:
          filters.sens ||
          undefined,

        date_from:
          filters.date_from ||
          undefined,

        date_to:
          filters.date_to ||
          undefined,
      }
    );

  const response =
    ledgerQuery.data as
      | LedgerResponse
      | undefined;

    // console.log("QUERY", ledgerQuery);

    // console.log(
    //   "QUERY DATA",
    //   ledgerQuery.data
    // );

    // console.log(
    //   "RESPONSE",
    //   response
    // );

  const data =
    response?.data || [];

  const meta =
    response?.meta;

  const isLoading =
    ledgerQuery.isLoading;

  /* ---------------------------------------------------------------------- */
  /* HELPERS                                                                */
  /* ---------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------- */
  /* EXPORT                                                                 */
  /* ---------------------------------------------------------------------- */

  const handleExport =
    async () => {

      try {

        setIsExporting(
          true
        );

        await exportLedgerExcel(
          {
            caisse_id:
              caisseId ||
              undefined,

            type_operation:
              filters.type_operation ||
              undefined,

            sens:
              filters.sens ||
              undefined,

            date_from:
              filters.date_from ||
              undefined,

            date_to:
              filters.date_to ||
              undefined,
          }
        );

      } catch (
        err
      ) {

        console.error(
          err
        );

      } finally {

        setIsExporting(
          false
        );
      }
    };

  /* ---------------------------------------------------------------------- */
  /* COLUMNS                                                                */
  /* ---------------------------------------------------------------------- */

  const columns: Column<Ledger>[] = [

  /* ---------------------------------------------------------- */
  /* REFERENCE                                                  */
  /* ---------------------------------------------------------- */

    {
      header: "Référence",

      accessor: "reference_metier",

      render: (_v, row) => (

        <div className="flex flex-col gap-1">

          <span
            className="
              font-semibold
              text-slate-800
            "
          >
            {row.reference_metier}
          </span>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <span
              className="
                text-xs
                text-slate-400
              "
            >
              {row.libelle_operation}
            </span>

            <span
              className={`
                rounded-full
                px-2
                py-0.5
                text-[10px]
                font-semibold

                ${
                  row.reference_type ===
                  "TRANSFERT_CAISSE"
                    ? "bg-blue-100 text-blue-700"
                    : row.reference_type ===
                      "TRANSFERT_CLIENT"
                    ? "bg-violet-100 text-violet-700"
                    : "bg-amber-100 text-amber-700"
                }
              `}
            >
              {row.reference_type ===
              "TRANSFERT_CAISSE"
                ? "Transfert caisse"
                : row.reference_type ===
                  "TRANSFERT_CLIENT"
                ? "Transfert client"
                : "Retrait"}
            </span>

          </div>

        </div>
      ),
    },

    /* ---------------------------------------------------------- */
    /* MONTANT                                                    */
    /* ---------------------------------------------------------- */

    {
      header: "Montant",

      accessor: "montant",

      render: (value, row) => (

        <div className="flex flex-col">

          <span
            className={`
              text-base
              font-semibold
              ${
                row.sens === "ENTREE"
                  ? "text-emerald-600"
                  : "text-red-600"
              }
            `}
          >
            {row.sens === "ENTREE"
              ? "+"
              : "-"}

            {Number(value).toLocaleString()}

            {" "}

            {row.devise}
          </span>

          <span
            className={`
              mt-1
              inline-flex
              w-fit
              rounded-full
              px-2
              py-0.5
              text-[10px]
              font-semibold

              ${
                row.sens === "ENTREE"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {row.sens}
          </span>

        </div>
      ),
    },

    /* ---------------------------------------------------------- */
    /* PARTIES                                                    */
    /* ---------------------------------------------------------- */

    {
      header: "Parties",

      accessor: "id",

      render: (_v, row) => (

        <div className="flex flex-col">

          <span
            className="
              font-medium
              text-slate-800
            "
          >
            {row.expediteur
              ? row.expediteur.nom_complet
              : "Opération interne"}
          </span>

          {row.destinataire && (

            <span
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              →
              {" "}
              {row.destinataire.nom_complet}
            </span>

          )}

        </div>
      ),
    },

    /* ---------------------------------------------------------- */
    /* AGENCE / CAISSE                                            */
    /* ---------------------------------------------------------- */

    {
      header: "Agence",

      accessor: "agence_display",

      render: (_v, row) => (

        <div className="flex flex-col">

          <span
            className="
              font-medium
              text-slate-800
            "
          >
            {row.agence_display}
          </span>

          <span
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            Caisse {row.code_caisse}
          </span>

        </div>
      ),
    },

    /* ---------------------------------------------------------- */
    /* AGENT                                                      */
    /* ---------------------------------------------------------- */

    {
      header: "Agent",

      accessor: "id",

      render: (_v, row) => (

        <span
          className="
            text-sm
            text-slate-700
          "
        >
          {row.agent?.user_name ??
            "SYSTEME"}
        </span>
      ),
    },

    /* ---------------------------------------------------------- */
    /* ACTION                                                     */
    /* ---------------------------------------------------------- */

    {
      header: "Action",

      accessor: "id",

      render: (_v, row) => (

        <button
          onClick={() =>
            setSelectedLedger(
              row
            )
          }
          className="
            inline-flex
            items-center
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-sm
            font-medium
            text-slate-700
            transition-all
            hover:bg-indigo-50
            hover:text-indigo-600
          "
        >
          Détails
        </button>
      ),
    },

  ];

  /* ---------------------------------------------------------------------- */
  /* RENDER                                                                 */
  /* ---------------------------------------------------------------------- */

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <section
        className="
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >

        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* LEFT */}

          <div className="flex items-start gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-indigo-50
                text-indigo-600
              "
            >

              <Landmark
                size={24}
              />

            </div>

            <div>

              <h1
                className="
                  text-2xl
                  font-semibold
                  text-slate-900
                "
              >
                Journal financier
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Historique détaillé des
                mouvements financiers
                et opérations caisse.
              </p>

            </div>

          </div>

          {/* ACTION */}

          <Button
            onClick={
              handleExport
            }
            loading={
              isExporting
            }
            className="
              h-11
              px-5
            "
          >

            <Download
              size={16}
            />

            <span>
              Exporter Excel
            </span>

          </Button>

        </div>

      </section>

      {/* FILTERS */}

      <section
        className="
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
        "
      >

        <div className="mb-5 flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-slate-100
              text-slate-600
            "
          >

            <Filter
              size={18}
            />

          </div>

          <div>

            <h2
              className="
                text-base
                font-semibold
                text-slate-900
              "
            >
              Filtres
            </h2>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Affinez votre recherche
              sur les écritures du ledger.
            </p>

          </div>

        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
            xl:grid-cols-5
          "
        >

          {/* CAISSE */}

          <select
            value={caisseId}
            onChange={(e) => {

              setCaisseId(
                e.target.value
              );

              setPage(1);

            }}
            className="input"
          >

            <option value="">
              Toutes les caisses
            </option>

            {caisses.map(
              (c) => (

                <option
                  key={c.id}
                  value={c.id}
                >
                  {
                    c.code_caisse
                  }
                </option>
              )
            )}

          </select>

          {/* TYPE */}

          <select
            value={
              filters.type_operation
            }
            onChange={(e) => {

              setPage(1);

              setFilters(
                (
                  f
                ) => ({
                  ...f,

                  type_operation:
                    e.target
                      .value,
                })
              );

            }}
            className="input"
          >

            <option value="">
              Tous les types
            </option>

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
            value={
              filters.sens
            }
            onChange={(e) => {

              setPage(1);

              setFilters(
                (
                  f
                ) => ({
                  ...f,

                  sens:
                    e.target
                      .value,
                })
              );

            }}
            className="input"
          >

            <option value="">
              Sens
            </option>

            <option value="ENTREE">
              Entrée
            </option>

            <option value="SORTIE">
              Sortie
            </option>

          </select>

          {/* DATE FROM */}

          <input
            type="date"
            value={
              filters.date_from
            }
            onChange={(e) => {

              setPage(1);

              setFilters(
                (
                  f
                ) => ({
                  ...f,

                  date_from:
                    e.target
                      .value,
                })
              );

            }}
            className="input"
          />

          {/* DATE TO */}

          <input
            type="date"
            value={
              filters.date_to
            }
            onChange={(e) => {

              setPage(1);

              setFilters(
                (
                  f
                ) => ({
                  ...f,

                  date_to:
                    e.target
                      .value,
                })
              );

            }}
            className="input"
          />

        </div>

      </section>

      {/* TABLE */}

      <section
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-slate-100
            px-6
            py-5
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-indigo-50
              text-indigo-600
            "
          >

            <FileText
              size={18}
            />

          </div>

          <div>

            <h2
              className="
                text-base
                font-semibold
                text-slate-900
              "
            >
              Historique des opérations
            </h2>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Vue consolidée des mouvements
              financiers enregistrés.
            </p>

          </div>

        </div>

        <Table<Ledger>
          data={data}
          columns={
            columns
          }
          loading={
            isLoading
          }
        />

      </section>

      {/* EMPTY */}

      {!isLoading &&
        data.length ===
          0 && (

        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            py-14
            text-center
            text-sm
            text-slate-500
          "
        >

          Aucun mouvement trouvé

        </div>
      )}

      {/* PAGINATION */}

      {meta && (

        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={setPage}
        />
      )}

      <LedgerDetailsModal
        ledger={selectedLedger}
        open={!!selectedLedger}
        onClose={() =>
          setSelectedLedger(null)
        }
      />

    </div>
  );
}