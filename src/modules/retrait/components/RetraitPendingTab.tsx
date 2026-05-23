// src/modules/retrait/components/RetraitPendingTab.tsx

import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Search,
  Wallet,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import RetraitForm from "./RetraitForm";

import {
  useTransfertsToWithdraw,
} from "../../transfert-client/hooks/useTransfertClient";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Transfert = {
  id: string;

  code_reference: string;

  exp_nom: string;

  exp_postnom: string;

  exp_phone: string;

  dest_nom: string;

  dest_postnom: string;

  dest_phone: string;

  montant:
    | number
    | string;

  devise: string;

  exp_numero_piece: string;

  created_at: string;
};

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function RetraitPendingTab() {

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

  const [
    page,
  ] = useState(1);

  const [
    selected,
    setSelected,
  ] =
    useState<Transfert | null>(
      null
    );

  const [
    search,
    setSearch,
  ] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                                   QUERY                                  */
  /* ------------------------------------------------------------------------ */

  const {
    data,
    isLoading,
  } =
    useTransfertsToWithdraw(
      page,
      10
    );

  const transferts =
    useMemo<Transfert[]>(
      () => data?.data ?? [],
      [data]
    );

  /* ------------------------------------------------------------------------ */
  /*                                  FILTERED                                */
  /* ------------------------------------------------------------------------ */

  const filtered =
    useMemo(() => {

      if (!search)
        return transferts;

      const q =
        search.toLowerCase();

      return transferts.filter(
        (item) =>
          item.code_reference
            ?.toLowerCase()
            .includes(q) ||

          item.exp_nom
            ?.toLowerCase()
            .includes(q) ||

          item.exp_postnom
            ?.toLowerCase()
            .includes(q) ||

          item.dest_nom
            ?.toLowerCase()
            .includes(q) ||

          item.dest_postnom
            ?.toLowerCase()
            .includes(q)
      );

    }, [
      transferts,
      search,
    ]);

  /* ------------------------------------------------------------------------ */
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<Transfert>[] =
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
        /* EXPEDITEUR                                                     */
        /* -------------------------------------------------------------- */

        {
          header:
            "Expéditeur",

          accessor:
            "exp_nom",

          render: (
            _v,
            row
          ) => (

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
                {row.exp_nom}{" "}
                {
                  row.exp_postnom
                }
              </span>

              <span
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                {
                  row.exp_phone
                }
              </span>

            </div>
          ),
        },

        /* -------------------------------------------------------------- */
        /* DESTINATAIRE                                                   */
        /* -------------------------------------------------------------- */

        {
          header:
            "Destinataire",

          accessor:
            "dest_nom",

          render: (
            _v,
            row
          ) => (

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
                {row.dest_nom}{" "}
                {
                  row.dest_postnom
                }
              </span>

              <span
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                {
                  row.dest_phone
                }
              </span>

            </div>
          ),
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
              Number(value);

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
                  Disponible
                  au retrait
                </span>

              </div>
            );
          },
        },

        /* -------------------------------------------------------------- */
        /* PIECE                                                          */
        /* -------------------------------------------------------------- */

        {
          header:
            "Pièce",

          accessor:
            "exp_numero_piece",

          render: (
            value
          ) => (

            <span
              className="
                rounded-xl
                bg-slate-100
                px-3
                py-2
                font-mono
                text-xs
                text-slate-600
              "
            >
              {value}
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
            "created_at",

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
                  text-sm
                  text-slate-700
                "
              >
                {new Date(
                  String(
                    value
                  )
                ).toLocaleDateString(
                  "fr-FR"
                )}
              </span>

              <span
                className="
                  mt-1
                  text-[11px]
                  text-slate-400
                "
              >
                En attente
              </span>

            </div>
          ),
        },

        /* -------------------------------------------------------------- */
        /* ACTION                                                         */
        /* -------------------------------------------------------------- */

        {
          header:
            "Action",

          accessor:
            "id",

          render: (
            _v,
            row
          ) => {

            const active =
              selected?.id ===
              row.id;

            return (

              <button
                onClick={() =>
                  setSelected(
                    row
                  )
                }
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  transition-all

                  ${
                    active
                      ? `
                        border-red-200
                        bg-red-50
                        text-red-700
                      `
                      : `
                        border-slate-200
                        bg-white
                        text-slate-700
                        hover:border-red-200
                        hover:bg-red-50
                        hover:text-red-700
                      `
                  }
                `}
              >

                {active ? (

                  <BadgeCheck
                    size={15}
                  />

                ) : (

                  <ArrowRight
                    size={15}
                  />

                )}

                {
                  active
                    ? "Sélectionné"
                    : "Retirer"
                }

              </button>
            );
          },
        },
      ];

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        2xl:grid-cols-[480px_1fr]
      "
    >

      {/* -------------------------------------------------------------- */}
      {/* LEFT FORM                                                      */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          h-fit
          rounded-[32px]
          border
          border-slate-200/80
          bg-white
          p-5
        "
      >

        <RetraitForm
          selected={
            selected
              ? {
                  code_reference:
                    selected.code_reference,
                }
              : null
          }
        />

      </div>

      {/* -------------------------------------------------------------- */}
      {/* RIGHT TABLE                                                     */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          space-y-5
        "
      >

        {/* ---------------------------------------------------------- */}
        {/* HEADER                                                     */}
        {/* ---------------------------------------------------------- */}

        <section
          className="
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            p-6
          "
        >

          <div
            className="
              flex
              flex-col
              gap-5
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
                  border-red-100
                  bg-red-50
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-red-700
                "
              >

                <Clock3
                  size={13}
                />

                En attente de retrait

              </div>

              <h2
                className="
                  mt-4
                  text-2xl
                  font-semibold
                  tracking-[-0.03em]
                  text-slate-900
                "
              >
                Transferts disponibles
              </h2>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                Sélectionnez un transfert
                afin d’initier une
                opération de retrait.
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

              {/* SEARCH */}

              <div
                className="
                  relative
                  w-full
                  xl:w-[320px]
                "
              >

                <Search
                  size={16}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  placeholder="Recherche..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    pl-11
                    pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition-all
                    focus:border-red-400
                    focus:ring-4
                    focus:ring-red-100
                  "
                />

              </div>

              {/* STATS */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-2
                  "
                >

                  <Wallet
                    size={15}
                    className="
                      text-slate-400
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-600
                    "
                  >
                    {
                      filtered.length
                    } transfert(s)
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ---------------------------------------------------------- */}
        {/* TABLE                                                      */}
        {/* ---------------------------------------------------------- */}

        <Table<Transfert>
          data={filtered}
          columns={columns}
          loading={isLoading}
          emptyTitle="Aucun transfert disponible"
          emptyDescription="Aucun transfert n’est actuellement prêt pour retrait."
        />

      </div>

    </div>
  );
}