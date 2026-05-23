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

import type {
  Ledger,
} from "../services/ledger.service";

import {
  exportLedgerExcel,
} from "../services/ledger-export.service";

import {
  useLedgerByCaisse,
  useMyLedger,
} from "../hooks/useLeger";

import {
  useCaisses,
} from "../../caisse/hooks/useCaisses";
import Pagination from "../../../components/ui/Pagination";

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

  /* ---------------------------------------------------------------------- */
  /* MODE                                                                   */
  /* ---------------------------------------------------------------------- */

  const isAdminMode =
    !!caisseId;

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

  const adminQuery =
    useLedgerByCaisse(
      caisseId,
      page,
      10,
      filters
    );

  const userQuery =
    useMyLedger(
      page,
      10,
      filters
    );

  const response =
    (
      isAdminMode
        ? adminQuery.data
        : userQuery.data
    ) as
      | LedgerResponse
      | undefined;

  const data =
    response?.data || [];

  const meta =
    response?.meta;

  const isLoading =
    isAdminMode
      ? adminQuery.isLoading
      : userQuery.isLoading;

  /* ---------------------------------------------------------------------- */
  /* HELPERS                                                                */
  /* ---------------------------------------------------------------------- */

  const getSensStyle = (
    sens: string
  ) =>

    sens === "ENTREE"
      ? "text-emerald-600"
      : "text-red-600";

  const getSensBadge = (
    sens: string
  ) =>

    sens === "ENTREE"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-red-100 text-red-700";

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

  const columns:
    Column<Ledger>[] = [

    {
      header:
        "Opération",

      accessor:
        "libelle_operation",

      render: (
        _,
        row
      ) => (

        <div className="flex flex-col">

          <span className="font-medium text-slate-800">

            {
              row.libelle_operation
            }

          </span>

          <span className="text-xs text-slate-500">

            {
              row.reference_metier ||
              "-"
            }

          </span>

        </div>
      ),
    },

    {
      header:
        "Montant",

      accessor:
        "montant",

      render: (
        value,
        row
      ) => (

        <div className="flex flex-col">

          <span
            className={`font-semibold ${getSensStyle(
              row.sens
            )}`}
          >

            {row.sens ===
            "ENTREE"
              ? "+"
              : "-"}

            {Number(
              value
            ).toLocaleString()}{" "}

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
              ${getSensBadge(
                row.sens
              )}
            `}
          >

            {row.sens}

          </span>

        </div>
      ),
    },

    {
      header:
        "Client",

      accessor:
        "expediteur_complet",

      render: (
        _,
        row
      ) => {

        const isClientOperation =

          row.type_operation ===
            "TRANSFERT_CLIENT" ||

          row.type_operation ===
            "RETRAIT";

        if (
          !isClientOperation
        ) {

          return (

            <span className="text-sm text-slate-400">

              Opération interne

            </span>
          );
        }

        return (

          <div className="flex flex-col text-sm gap-1">

            <span>

              <strong>
                Exp:
              </strong>{" "}

              {row.expediteur_complet ||
                "-"}

            </span>

            <span>

              <strong>
                Dest:
              </strong>{" "}

              {row.destinataire_complet ||
                "-"}

            </span>

          </div>
        );
      },
    },

    {
      header:
        "Agence / Caisse",

      accessor:
        "agence_display",

      render: (
        _,
        row
      ) => (

        <div className="flex flex-col">

          <span className="font-medium text-slate-800">

            {
              row.agence_display
            }

          </span>

          <span className="text-xs text-slate-500">

            Caisse{" "}

            {
              row.code_caisse
            }

          </span>

        </div>
      ),
    },

    {
      header:
        "Agent",

      accessor:
        "agent_operation",

      render: (
        value
      ) => (

        <span className="text-sm text-slate-700">

          {value || "-"}

        </span>
      ),
    },

    {
      header:
        "Date",

      accessor:
        "created_at",

      render: (
        value
      ) => (

        <div className="text-sm text-slate-600">

          {new Date(
            String(value)
          ).toLocaleString(
            "fr-FR"
          )}

        </div>
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

    </div>
  );
}