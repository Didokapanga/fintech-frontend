// src/modules/transfert-caisse/pages/TransfertCaissePage.tsx

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
  useCaisses,
} from "../../caisse/hooks/useCaisses";

import {
  useTransfertsCaisse,
} from "../hooks/useTransfertCaisse";

import type {
  TransfertCaisse,
} from "../services/transfertCaisse.service";

import TransfertCaisseModal from "../components/transfertCaisseModal";
import Pagination from "../../../components/ui/Pagination";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function TransfertCaissePage() {

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

  const [
    open,
    setOpen,
  ] =
    useState(false);

  const [
    page,
    setPage,
  ] =
    useState(1);

  const [
    devise,
    setDevise,
  ] =
    useState("");

  const [
    statut,
    setStatut,
  ] =
    useState("");

  const [
    dateOperation,
    setDateOperation,
  ] =
    useState("");

  /* ------------------------------------------------------------------------ */
  /*                                   QUERY                                  */
  /* ------------------------------------------------------------------------ */

  const {
    data,
    isLoading,
  } =
    useTransfertsCaisse(
      page,
      10,
      {
        devise,
        statut,
        date_operation:
          dateOperation,
      }
    );

  /* ------------------------------------------------------------------------ */
  /*                                  CAISSES                                 */
  /* ------------------------------------------------------------------------ */

  const {
    data:
      caissesResponse,
  } =
    useCaisses(
      1,
      100
    );

  const caissesData =
    useMemo(
      () =>
        caissesResponse?.data ||
        [],
      [caissesResponse]
    );

  /* ------------------------------------------------------------------------ */
  /*                               TRANSFERTS                                 */
  /* ------------------------------------------------------------------------ */

  const transferts =
    useMemo<
      TransfertCaisse[]
    >(
      () =>
        data?.data ?? [],
      [data]
    );

  const meta =
    data?.meta;

  /* ------------------------------------------------------------------------ */
  /*                             HELPER CAISSE                                */
  /* ------------------------------------------------------------------------ */

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
        caisse.code_caisse ||
        "-",

      agence:
        caisse.agence
          ?.libelle ||
        caisse.agence_libelle ||
        "-",
    };
  };

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

  const columns:
    Column<TransfertCaisse>[] =
      [

        /* -------------------------------------------------------------- */
        /* REF                                                            */
        /* -------------------------------------------------------------- */

        {
          header:
            "Référence",

          accessor:
            "code_reference",

          render: (
            value
          ) => (

            <div
              className="
                flex
                flex-col
              "
            >

              <span
                className="
                  font-mono
                  text-xs
                  font-semibold
                  tracking-wide
                  text-slate-700
                "
              >
                {value}
              </span>

              <span
                className="
                  mt-1
                  text-[11px]
                  text-slate-400
                "
              >
                Transaction
              </span>

            </div>
          ),
        },

        /* -------------------------------------------------------------- */
        /* SOURCE                                                         */
        /* -------------------------------------------------------------- */

        {
          header:
            "Caisse source",

          accessor:
            "caisse_source_id",

          render: (
            value
          ) => {

            const info =
              getCaisseInfo(
                String(value)
              );

            return (
              <div
                className="
                  flex
                  flex-col
                "
              >

                <span
                  className="
                    font-semibold
                    text-slate-800
                  "
                >
                  {info.code}
                </span>

                <span
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  {
                    info.agence
                  }
                </span>

              </div>
            );
          },
        },

        /* -------------------------------------------------------------- */
        /* DESTINATION                                                    */
        /* -------------------------------------------------------------- */

        {
          header:
            "Caisse destination",

          accessor:
            "caisse_destination_id",

          render: (
            value
          ) => {

            const info =
              getCaisseInfo(
                String(value)
              );

            return (
              <div
                className="
                  flex
                  flex-col
                "
              >

                <span
                  className="
                    font-semibold
                    text-slate-800
                  "
                >
                  {info.code}
                </span>

                <span
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  {
                    info.agence
                  }
                </span>

              </div>
            );
          },
        },

        /* -------------------------------------------------------------- */
        /* MONTANT                                                        */
        /* -------------------------------------------------------------- */

        {
          header:
            "Montant",

          accessor:
            "montant",

          render: (
            value,
            row
          ) => {

            const montant =
              typeof value ===
              "number"
                ? value
                : Number(
                    value
                  );

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
                  {montant.toLocaleString()}{" "}
                  {row.devise}
                </span>

                <span
                  className="
                    mt-1
                    text-[11px]
                    text-slate-400
                  "
                >
                  Mouvement caisse
                </span>

              </div>
            );
          },
        },

        /* -------------------------------------------------------------- */
        /* STATUS                                                         */
        /* -------------------------------------------------------------- */

        {
          header:
            "Statut",

          accessor:
            "statut",

          render: (
            value
          ) => (

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
                ${getStatusStyle(
                  String(
                    value
                  )
                )}
              `}
            >
              {String(
                value
              )}
            </span>
          ),
        },

        /* -------------------------------------------------------------- */
        /* DATE                                                           */
        /* -------------------------------------------------------------- */

        {
          header:
            "Date",

          accessor:
            "date_operation",

          render: (
            value
          ) => {

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

            const date =
              new Date(
                String(
                  value
                )
              );

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

                <CalendarRange
                  size={15}
                />

                {date.toLocaleDateString(
                  "fr-FR"
                )}

              </div>
            );
          },
        },
      ];

  /* ------------------------------------------------------------------------ */
  /*                                   RESET                                  */
  /* ------------------------------------------------------------------------ */

  const handleReset =
    () => {

      setPage(1);

      setDevise("");

      setStatut("");

      setDateOperation(
        ""
      );
    };

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        min-h-screen
        bg-[#f5f7fb]
      "
    >

      <div
        className="
          mx-auto
          max-w-[1700px]
          space-y-6
          px-4
          py-4
        "
      >

        {/* -------------------------------------------------------------- */}
        {/* HEADER                                                         */}
        {/* -------------------------------------------------------------- */}

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

          {/* GLOW */}

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

            {/* LEFT */}

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

                <ArrowRightLeft
                  size={13}
                />

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
                Transferts caisse
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
                Supervisez les mouvements
                financiers entre les
                différentes caisses du
                réseau.
              </p>

            </div>

            {/* RIGHT */}

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
                  className="
                    text-slate-400
                  "
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
                    {
                      meta?.total || 0
                    }
                  </p>

                </div>

              </div>

              <Button
                onClick={() =>
                  setOpen(true)
                }
                className="
                  h-14
                  rounded-2xl
                  bg-indigo-600
                  px-6
                  hover:bg-indigo-700
                "
              >

                <Plus
                  size={17}
                />

                Nouveau transfert

              </Button>

            </div>

          </div>

        </section>

        {/* -------------------------------------------------------------- */}
        {/* FILTERS                                                        */}
        {/* -------------------------------------------------------------- */}

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
              className="
                text-slate-500
              "
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

            {/* DEVISE */}

            <select
              value={devise}
              onChange={(e) => {

                setPage(1);

                setDevise(
                  e.target.value
                );
              }}
              className="
                h-12
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                text-slate-700
                outline-none
                transition-all
                focus:border-indigo-400
                focus:ring-4
                focus:ring-indigo-100
              "
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

            {/* STATUS */}

            <select
              value={statut}
              onChange={(e) => {

                setPage(1);

                setStatut(
                  e.target.value
                );
              }}
              className="
                h-12
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                text-slate-700
                outline-none
                transition-all
                focus:border-indigo-400
                focus:ring-4
                focus:ring-indigo-100
              "
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
              value={
                dateOperation
              }
              onChange={(e) => {

                setPage(1);

                setDateOperation(
                  e.target.value
                );
              }}
              className="
                h-12
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                text-slate-700
                outline-none
                transition-all
                focus:border-indigo-400
                focus:ring-4
                focus:ring-indigo-100
              "
            />

            {/* RESET */}

            <Button
              variant="secondary"
              onClick={
                handleReset
              }
              className="
                h-12
                rounded-2xl
              "
            >

              <RefreshCcw
                size={16}
              />

              Réinitialiser

            </Button>

          </div>

        </section>

        {/* -------------------------------------------------------------- */}
        {/* TABLE                                                          */}
        {/* -------------------------------------------------------------- */}

        <Table<TransfertCaisse>
          data={transferts}
          columns={columns}
          loading={isLoading}
          emptyTitle="Aucun transfert trouvé"
          emptyDescription="Aucun mouvement de caisse ne correspond actuellement aux filtres sélectionnés."
        />

        {/* -------------------------------------------------------------- */}
        {/* PAGINATION                                                     */}
        {/* -------------------------------------------------------------- */}

        {meta && (

          <Pagination
            page={meta.page}
            totalPages={
              meta.totalPages
            }
            totalItems={
              meta.total
            }
            perPage={
              meta.limit
            }
            onChange={
              setPage
            }
          />

        )}

      </div>

      {/* -------------------------------------------------------------- */}
      {/* MODAL                                                          */}
      {/* -------------------------------------------------------------- */}

      {open && (

        <TransfertCaisseModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />

      )}

    </div>
  );
}