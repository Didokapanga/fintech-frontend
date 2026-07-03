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
import type { TransfertRetrait } from "../services/retrait.service";

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
    useState<TransfertRetrait | null>(
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
    useMemo<TransfertRetrait[]>(
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

          item.expediteur_name
            ?.toLowerCase()
            .includes(q) ||

          item.destinataire_name
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

  const columns: Column<TransfertRetrait>[] = [

    {
      header: "Bénéficiaire",

      accessor: "destinataire_name",

      render: (_v, row) => (

        <div className="flex flex-col">

          <span
            className="
              font-semibold
              text-slate-800
            "
          >
            {row.destinataire_name}
          </span>

          <span
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            {row.destinataire_telephone}
          </span>

        </div>
      ),
    },

    {
      header: "Montant",

      accessor: "montant_destination",

      render: (_v, row) => (

        <div className="flex flex-col">

          <span
            className="
              text-base
              font-semibold
              text-emerald-600
            "
          >
            {Number(
              row.montant_destination
            ).toLocaleString()}
            {" "}
            {row.devise_destination}
          </span>

          <span
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            Réf. {row.code_reference}
          </span>

        </div>
      ),
    },

    {
      header: "Date",

      accessor: "created_at",

      render: (value) => (

        <div
          className="
            text-sm
            text-slate-600
          "
        >
          {new Date(
            String(value)
          ).toLocaleDateString(
            "fr-FR"
          )}
        </div>
      ),
    },

    {
      header: "Action",

      accessor: "id",

      render: (_v, row) => {

        const active =
          selected?.id === row.id;

        return (

          <button
            onClick={() =>
              setSelected(row)
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
              <BadgeCheck size={15} />
            ) : (
              <ArrowRight size={15} />
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

                  devise_destination:
                    selected.devise_destination,

                  montant_destination:
                    selected.montant_destination,

                  destinataire_name:
                    selected.destinataire_name,

                  destinataire_telephone:
                    selected.destinataire_telephone,
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

        <Table<TransfertRetrait>
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