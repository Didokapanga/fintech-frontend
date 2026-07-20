// src/modules/transfert-inter-agence/pages/TransfertInterAgencePage.tsx

import {
  ArrowRightLeft,
  CalendarRange,
  Landmark,
  Plus,
  RefreshCcw,
  Wallet,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Button,
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import {
  useTransfertsInterAgence,
} from "../hooks/useTransfertInterAgence";


import Pagination from "../../../components/ui/Pagination";

import type {
  TransfertInterAgence,
} from "../types";

import {
  PermissionGate,
} from "../../../components/auth/PermissionGate";

import {
  PERMISSIONS,
} from "../../../constants/permissions";
import TransfertCaisseModal from "../../transfert-caisse/components/transfertCaisseModal";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function TransfertInterAgencePage() {

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    devise,
    setDevise,
  ] = useState("");

  const [
    statut,
    setStatut,
  ] = useState("");

  const [
    dateOperation,
    setDateOperation,
  ] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                                   QUERY                                  */
  /* ------------------------------------------------------------------------ */

  const {
    data,
    isLoading,
  } = useTransfertsInterAgence(
    page,
    10,
    {
      devise,
      statut,
      date_operation: dateOperation,
    }
  );

  /* ------------------------------------------------------------------------ */
  /*                               TRANSFERTS                                 */
  /* ------------------------------------------------------------------------ */

  const transferts = useMemo<TransfertInterAgence[]>(
    () => data?.data ?? [],
    [data]
  );

  const meta = data?.meta;

  /* ------------------------------------------------------------------------ */
  /*                              STATUS STYLE                                */
  /* ------------------------------------------------------------------------ */

  const getStatusStyle = (
    status: string
  ) => {

    switch (status) {

      case "INITIE":
        return `
          border-yellow-200
          bg-yellow-50
          text-yellow-700
        `;

      case "VALIDE":
        return `
          border-blue-200
          bg-blue-50
          text-blue-700
        `;

      case "EXECUTE":
        return `
          border-emerald-200
          bg-emerald-50
          text-emerald-700
        `;

      case "REJETE":
        return `
          border-red-200
          bg-red-50
          text-red-700
        `;

      default:
        return `
          border-slate-200
          bg-slate-100
          text-slate-600
        `;
    }

  };

  /* ------------------------------------------------------------------------ */
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns: Column<TransfertInterAgence>[] = [

    /* -------------------------------------------------------------- */
    /* REFERENCE                                                      */
    /* -------------------------------------------------------------- */

    {
        header: "Référence",

        accessor: "code_reference",

        render: (value) => (

        <div className="flex flex-col">

            <span
            className="
                font-mono
                text-sm
                font-semibold
                text-slate-800
            "
            >
            {value}
            </span>

            <span
            className="
                mt-1
                text-xs
                text-slate-400
            "
            >
            Inter-agence
            </span>

        </div>

        ),
    },

    /* -------------------------------------------------------------- */
    /* AGENCE SOURCE                                                  */
    /* -------------------------------------------------------------- */

    {
        header: "Agence source",

        accessor: "agence_source_name",

        render: (_v, row) => (

        <div className="flex flex-col">

            <span
            className="
                font-semibold
                text-slate-800
            "
            >
            {row.agence_source_name}
            </span>

            <span
            className="
                mt-1
                text-xs
                text-slate-400
            "
            >
            Caisse {row.source_code_caisse}
            {" • "}
            {row.source_caisse_type}
            </span>

        </div>

        ),
    },

    /* -------------------------------------------------------------- */
    /* AGENCE DESTINATION                                             */
    /* -------------------------------------------------------------- */

    {
        header: "Agence destination",

        accessor: "agence_destination_name",

        render: (_v, row) => (

        <div className="flex flex-col">

            <span
            className="
                font-semibold
                text-slate-800
            "
            >
            {row.agence_destination_name}
            </span>

            <span
            className="
                mt-1
                text-xs
                text-slate-400
            "
            >
            Caisse {row.destination_code_caisse}
            {" • "}
            {row.destination_caisse_type}
            </span>

        </div>

        ),
    },

    /* -------------------------------------------------------------- */
    /* MONTANT                                                        */
    /* -------------------------------------------------------------- */

    {
        header: "Montant",

        accessor: "montant",

        render: (value, row) => {

        const montant =
            typeof value === "number"
            ? value
            : Number(value);

        return (

            <div
            className="
                flex
                flex-col
            "
            >

            <span
                className="
                text-base
                font-semibold
                text-emerald-600
                "
            >
                {montant.toLocaleString()} {row.devise}
            </span>

            <span
                className="
                mt-1
                text-[11px]
                text-slate-400
                "
            >
                Mouvement inter-agence
            </span>

            </div>

        );

        },
    },

    /* -------------------------------------------------------------- */
    /* CREATEUR                                                       */
    /* -------------------------------------------------------------- */

    {
        header: "Créé par",

        accessor: "created_by_name",

        render: (value) => (

        <div className="flex flex-col">

            <span
            className="
                font-semibold
                text-slate-800
            "
            >
            {value}
            </span>

        </div>

        ),
    },

    /* -------------------------------------------------------------- */
    /* STATUT                                                         */
    /* -------------------------------------------------------------- */

    {
        header: "Statut",

        accessor: "statut",

        render: (value) => (

        <span
            className={`
            inline-flex
            items-center
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold
            ${getStatusStyle(String(value))}
            `}
        >
            {String(value)}
        </span>

        ),
    },

    /* -------------------------------------------------------------- */
    /* DATE                                                           */
    /* -------------------------------------------------------------- */

    {
        header: "Date",

        accessor: "date_operation",

        render: (value) => {

        if (!value) {

            return (

            <span
                className="
                text-sm
                text-slate-400
                "
            >
                -
            </span>

            );

        }

        const date = new Date(String(value));

        return (

            <div
            className="
                flex
                items-center
                gap-2
                text-sm
                text-slate-600
            "
            >

            <CalendarRange size={15} />

            {date.toLocaleDateString("fr-FR")}

            </div>

        );

        },
    },

    ];

    /* ------------------------------------------------------------------------ */
    /*                                   RESET                                  */
    /* ------------------------------------------------------------------------ */

    const handleReset = () => {

    setPage(1);

    setDevise("");

    setStatut("");

    setDateOperation("");

    };

    return (

  <div
    className="
      min-h-screen
    "
  >

    <div
      className="
        mx-auto
        max-w-[1700px]
        space-y-6
        px-0
        py-0
      "
    >

      {/* ================================================================ */}
      {/* HEADER */}
      {/* ================================================================ */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-slate-200/80
          bg-white
          px-8
          py-8
        "
      >

        <div
          className="
            absolute
            right-0
            top-0
            h-72
            w-72
            rounded-full
            bg-indigo-50
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-6
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-indigo-100
                bg-indigo-50
                px-3
                py-1
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-indigo-700
              "
            >

              <ArrowRightLeft size={13} />

              Flux financiers

            </div>

            <h1
              className="
                mt-5
                text-[38px]
                font-semibold
                tracking-[-0.04em]
                text-slate-900
              "
            >
              Transferts inter-agences
            </h1>

            <p
              className="
                mt-3
                max-w-3xl
                text-sm
                leading-7
                text-slate-500
              "
            >
              Gérez les transferts financiers
              entre les différentes agences
              du réseau.
            </p>

          </div>

          <div
            className="
              flex
              flex-col
              gap-4
              xl:items-end
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                px-5
                py-3
              "
            >

              <Wallet
                size={18}
                className="text-slate-400"
              />

              <div>

                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Total transferts
                </p>

                <p
                  className="
                    mt-1
                    text-lg
                    font-semibold
                    text-slate-900
                  "
                >
                  {meta?.total || 0}
                </p>

              </div>

            </div>

            <PermissionGate
              permissions={[
                PERMISSIONS.TRANSFERT_INTER_AGENCE_CREATE,
                PERMISSIONS.TRANSFERT_INTER_AGENCE_CREATE_AGENCE,
              ]}
            >

              <Button
                onClick={() => setOpen(true)}
                className="
                  h-14
                  rounded-2xl
                  bg-indigo-600
                  px-6
                  hover:bg-indigo-700
                "
              >

                <Plus size={17} />

                Nouveau transfert

              </Button>

            </PermissionGate>

          </div>

        </div>

      </section>

      {/* ================================================================ */}
      {/* FILTRES */}
      {/* ================================================================ */}

      <section
        className="
          rounded-[32px]
          border
          border-slate-200/80
          bg-white
          p-5
        "
      >

        <div
          className="
            mb-5
            flex
            items-center
            gap-2
          "
        >

          <Landmark
            size={16}
            className="text-slate-500"
          />

          <h2
            className="
              text-sm
              font-semibold
              text-slate-800
            "
          >
            Filtres avancés
          </h2>

        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            xl:grid-cols-4
          "
        >

          <select
            value={devise}
            onChange={(e) => {

              setPage(1);

              setDevise(e.target.value);

            }}
            className="h-12 rounded-2xl border border-slate-200 px-4"
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

          <select
            value={statut}
            onChange={(e) => {

              setPage(1);

              setStatut(e.target.value);

            }}
            className="h-12 rounded-2xl border border-slate-200 px-4"
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

          <input
            type="date"
            value={dateOperation}
            onChange={(e) => {

              setPage(1);

              setDateOperation(
                e.target.value
              );

            }}
            className="h-12 rounded-2xl border border-slate-200 px-4"
          />

          <Button
            variant="secondary"
            onClick={handleReset}
            className="
              h-12
              rounded-2xl
            "
          >

            <RefreshCcw size={16} />

            Réinitialiser

          </Button>

        </div>

      </section>

      {/* ================================================================ */}
      {/* TABLE */}
      {/* ================================================================ */}

      <Table<TransfertInterAgence>
        data={transferts}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucun transfert trouvé"
        emptyDescription="Aucun transfert inter-agence ne correspond aux filtres."
      />

      {/* ================================================================ */}
      {/* PAGINATION */}
      {/* ================================================================ */}

      {meta && (

        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          totalItems={meta.total}
          perPage={meta.limit}
          onChange={setPage}
        />

      )}

    </div>

    {/* ================================================================ */}
    {/* MODAL */}
    {/* ================================================================ */}

    {open && (

      <TransfertCaisseModal
        open={open}
        onClose={() => setOpen(false)}
      />

    )}

  </div>

)
}