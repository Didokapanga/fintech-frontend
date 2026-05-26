// src/modules/transfert-client/pages/TransfertClientPage.tsx

import {
  ArrowUpRight,
  CalendarRange,
  Filter,
  Plus,
  Printer,
  RefreshCcw,
  Send,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  Button,
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import {
  useMyTransferts,
} from "../hooks/useTransfert";

import {
  getTransfertsByAgence,
  type TransfertClient,
} from "../services/transfert.service";

import {
  useAgences,
} from "../../agence/hooks/useAgences";

import {
  useAuthStore,
} from "../../../app/store";

import {
  api,
} from "../../../services/api";

import TransfertClientModal
from "../components/TransfertFormModal";

import Pagination
from "../../../components/ui/Pagination";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function TransfertClientPage() {

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
    statut,
    setStatut,
  ] = useState("");

  const [
    dateOperation,
    setDateOperation,
  ] = useState("");

  const [
    selectedAgence,
    setSelectedAgence,
  ] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                                    AUTH                                  */
  /* ------------------------------------------------------------------------ */

  const { user } =
    useAuthStore();

  const isGlobalAdmin =
    user?.role_name ===
    "ADMIN";

  const isAgenceView =
    ["N+1", "N+2"]
      .includes(
        user?.role_name || ""
      );

  /* ------------------------------------------------------------------------ */
  /*                                  AGENCES                                 */
  /* ------------------------------------------------------------------------ */

  const {
    data: agences = [],
  } = useAgences();

  /* ------------------------------------------------------------------------ */
  /*                                   QUERY                                  */
  /* ------------------------------------------------------------------------ */

  const myTransfertsQuery =
    useMyTransferts(
      page,
      10,
      {
        statut,
        date_operation:
          dateOperation,
      },

      !isGlobalAdmin &&
      !isAgenceView
    );

  const agenceTransfertsQuery =
    useQuery({
      queryKey: [
        "agence-transferts",
        user?.agence_id,
        page,
        statut,
        dateOperation,
      ],

      queryFn: () =>
        getTransfertsByAgence(
          String(
            user?.agence_id
          ),
          page,
          10,
          {
            statut,
            date_operation:
              dateOperation,
          }
        ),

      enabled:
        isAgenceView &&
        !!user?.agence_id,
    });

  const globalTransfertsQuery =
    useQuery({
      queryKey: [
        "global-transferts",
        page,
        statut,
        dateOperation,
        selectedAgence,
      ],

      queryFn: async () => {

        const params =
          new URLSearchParams();

        params.append(
          "page",
          String(page)
        );

        params.append(
          "limit",
          "10"
        );

        if (statut) {

          params.append(
            "statut",
            statut
          );
        }

        if (dateOperation) {

          params.append(
            "date_operation",
            dateOperation
          );
        }

        if (selectedAgence) {

          params.append(
            "agence_exp",
            selectedAgence
          );
        }

        const res =
          await api.get(
            `/transfert-client?${params.toString()}`
          );

        return res.data;
      },

      enabled:
        isGlobalAdmin,
    });

  /* ------------------------------------------------------------------------ */
  /*                              CURRENT QUERY                               */
  /* ------------------------------------------------------------------------ */

  const currentQuery =
    isGlobalAdmin
      ? globalTransfertsQuery
      : isAgenceView
      ? agenceTransfertsQuery
      : myTransfertsQuery;

  const {
    data,
    isLoading,
  } = currentQuery;

  /* ------------------------------------------------------------------------ */
  /*                               TRANSFERTS                                 */
  /* ------------------------------------------------------------------------ */

  const transferts =
    useMemo<
      TransfertClient[]
    >(() => {

      if (
        Array.isArray(data)
      ) {

        return data;
      }

      if (
        Array.isArray(
          data?.data
        )
      ) {

        return data.data;
      }

      return [];

    }, [data]);

  const meta =
    !Array.isArray(data)
      ? data?.meta
      : undefined;

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
      case "ANNULE":
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
  /*                               HANDLE PRINT                               */
  /* ------------------------------------------------------------------------ */

  const handlePrint =
    (
      row: TransfertClient
    ) => {

      window.open(
        `/receipt/transfert/${row.id}`,
        "_blank"
      );
    };

  /* ------------------------------------------------------------------------ */
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<TransfertClient>[] =
      [

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
                items-center
                gap-3
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
                "
              >

                <Send
                  size={16}
                  className="
                    text-indigo-600
                  "
                />

              </div>

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-900
                  "
                >
                  {value}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  Référence opération
                </p>

              </div>

            </div>
          ),
        },

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

        {
          header:
            "Montant",

          accessor:
            "montant",

          render: (
            value,
            row
          ) => {

            const amount =
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
                  {amount.toLocaleString()}{" "}
                  {
                    row.devise
                  }
                </span>

                <span
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  Frais:{" "}
                  {row.frais}
                </span>

              </div>
            );
          },
        },

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
              {String(value)}
            </span>
          ),
        },

        {
          header:
            "Date",

          accessor:
            "date_operation",

          render: (
            value,
            row
          ) => {

            const finalDate =
              value ||
              row.created_at;

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

                {new Date(
                  String(
                    finalDate
                  )
                ).toLocaleDateString(
                  "fr-FR"
                )}

              </div>
            );
          },
        },

        {
          header:
            "Action",

          accessor:
            "id",

          render: (
            _v,
            row
          ) => (

            <button
              onClick={() =>
                handlePrint(
                  row
                )
              }
              className="
                inline-flex
                items-center
                gap-2
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

              <Printer
                size={16}
              />

              Imprimer

            </button>
          ),
        },
      ];

  /* ------------------------------------------------------------------------ */
  /*                                   RESET                                  */
  /* ------------------------------------------------------------------------ */

  const handleReset =
    () => {

      setPage(1);

      setStatut("");

      setDateOperation(
        ""
      );

      setSelectedAgence(
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
      "
    >

      <div
        className="
          mx-auto
          max-w-[1700px]
          space-y-6
        "
      >

        {/* HEADER */}

        <section
          className="
            flex
            flex-col
            gap-5
            rounded-[28px]
            border
            border-slate-200/80
            bg-white
            px-7
            py-6
            lg:flex-row
            lg:items-center
            lg:justify-between
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

              <ArrowUpRight
                size={13}
              />

              Flux financiers

            </div>

            <h1
              className="
                mt-4
                text-3xl
                font-semibold
                tracking-[-0.03em]
                text-slate-900
              "
            >
              Transferts clients
            </h1>

          </div>

          <Button
            onClick={() =>
              setOpen(true)
            }
            className="
              h-12
              rounded-2xl
              bg-indigo-600
              px-5
              hover:bg-indigo-700
            "
          >

            <Plus
              size={17}
            />

            Nouveau transfert

          </Button>

        </section>

        {/* FILTERS */}

        <section
          className="
            rounded-[28px]
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

            <Filter
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
                px-4
              "
            >

              <option value="">
                Tous les statuts
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
              className="
                h-12
                rounded-2xl
                border
                border-slate-200
                px-4
              "
            />

            {isGlobalAdmin && (

              <select
                value={
                  selectedAgence
                }
                onChange={(e) => {

                  setPage(1);

                  setSelectedAgence(
                    e.target.value
                  );
                }}
                className="
                  h-12
                  rounded-2xl
                  border
                  border-slate-200
                  px-4
                "
              >

                <option value="">
                  Toutes les agences
                </option>

                {agences.map(
                  (
                    agence
                  ) => (

                    <option
                      key={
                        agence.id
                      }
                      value={
                        agence.id
                      }
                    >
                      {
                        agence.libelle
                      }
                    </option>
                  )
                )}

              </select>
            )}

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

        {/* TABLE */}

        <Table<TransfertClient>
          data={transferts}
          columns={columns}
          loading={isLoading}
          emptyTitle="Aucun transfert trouvé"
          emptyDescription="Aucun résultat ne correspond actuellement aux filtres sélectionnés."
        />

        {/* PAGINATION */}

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

      {/* MODAL */}

      {open && (

        <TransfertClientModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />
      )}

    </div>
  );
}