// src/modules/retrait/components/RetraitHistoryTab.tsx

import {
  CalendarRange,
  Filter,
  RefreshCcw,
} from "lucide-react";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  useAuthStore,
} from "../../../app/store";

import {
  useAgences,
} from "../../agence/hooks/useAgences";

import {
  Button,
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import {
  useRetraitHistory,
} from "../hooks/useRetraitHistory";

import {
  type Retrait,
  getAllRetraits,
  getRetraitsByAgence,
} from "../services/retrait.service";
import Pagination from "../../../components/ui/Pagination";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function RetraitHistoryTab() {

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

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
  } =
    useAgences();

  /* ------------------------------------------------------------------------ */
  /*                                   QUERY                                  */
  /* ------------------------------------------------------------------------ */

  const myRetraitsQuery =
    useRetraitHistory(
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

  const agenceRetraitsQuery =
    useQuery({
      queryKey: [
        "agence-retraits",
        user?.agence_id,
        page,
        statut,
        dateOperation,
      ],

      queryFn: () =>
        getRetraitsByAgence(
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

  const globalRetraitsQuery =
    useQuery({
      queryKey: [
        "global-retraits",
        page,
        statut,
        dateOperation,
        selectedAgence,
      ],

      queryFn: () =>
        getAllRetraits(
          page,
          10,
          {
            agence_id:
              selectedAgence,

            statut,

            date_operation:
              dateOperation,
          }
        ),

      enabled:
        isGlobalAdmin,
    });

  /* ------------------------------------------------------------------------ */
  /*                              CURRENT QUERY                               */
  /* ------------------------------------------------------------------------ */

  const currentQuery =
    isGlobalAdmin
      ? globalRetraitsQuery
      : isAgenceView
      ? agenceRetraitsQuery
      : myRetraitsQuery;

  const {
    data,
    isLoading,
  } =
    currentQuery;

  const retraits:
    Retrait[] =
      data?.data || [];

  const meta =
    !Array.isArray(data)
      ? data?.meta
      : undefined;

  /* ------------------------------------------------------------------------ */
  /*                              STATUS STYLE                                */
  /* ------------------------------------------------------------------------ */

  const getStatusStyle = (
    statut: string
  ) => {

    switch (statut) {

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
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<Retrait>[] =
      [

        /* -------------------------------------------------------------- */
        /* EXPEDITEUR                                                     */
        /* -------------------------------------------------------------- */

        {
          header:
            "Expéditeur",

          accessor:
            "id",

          render: (
            _v,
            row
          ) => {

            const exp =
              row.expediteur;

            return (
              <div
                className="
                  flex
                  flex-col
                "
              >

                {exp ? (

                  <>

                    <span
                      className="
                        font-semibold
                        text-slate-800
                      "
                    >
                      {exp.nom}{" "}
                      {
                        exp.postnom
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
                        exp.phone
                      }
                    </span>

                  </>

                ) : (

                  <span
                    className="
                      text-sm
                      italic
                      text-slate-400
                    "
                  >
                    Non disponible
                  </span>
                )}

              </div>
            );
          },
        },

        /* -------------------------------------------------------------- */
        /* DESTINATAIRE                                                   */
        /* -------------------------------------------------------------- */

        {
          header:
            "Destinataire",

          accessor:
            "numero_piece",

          render: (
            _v,
            row
          ) => {

            const dest =
              row.destinataire;

            return (
              <div
                className="
                  flex
                  flex-col
                "
              >

                {dest ? (

                  <>

                    <span
                      className="
                        font-semibold
                        text-slate-800
                      "
                    >
                      {dest.nom}{" "}
                      {
                        dest.postnom
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
                        dest.phone
                      }
                    </span>

                  </>

                ) : (

                  <span
                    className="
                      text-sm
                      italic
                      text-slate-400
                    "
                  >
                    Non disponible
                  </span>
                )}

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
            "montant",

          render: (
            _v,
            row
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
              {
                row.numero_piece
              }
            </span>
          ),
        },

        /* -------------------------------------------------------------- */
        /* MONTANT                                                        */
        /* -------------------------------------------------------------- */

        {
          header:
            "Montant",

          accessor:
            "statut",

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
                  text-base
                  font-semibold
                  text-emerald-600
                "
              >
                {Number(
                  row.montant ||
                    0
                ).toLocaleString()}{" "}
                {row.devise}
              </span>

              <span
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                Retrait validé
              </span>

            </div>
          ),
        },

        /* -------------------------------------------------------------- */
        /* STATUT                                                         */
        /* -------------------------------------------------------------- */

        {
          header:
            "Statut",

          accessor:
            "created_at",

          render: (
            _v,
            row
          ) => {

            const s =
              String(
                row.statut ||
                  ""
              );

            return (
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
                    s
                  )}
                `}
              >
                {s}
              </span>
            );
          },
        },

        /* -------------------------------------------------------------- */
        /* DATE                                                           */
        /* -------------------------------------------------------------- */

        {
          header:
            "Date",

          accessor:
            "devise",

          render: (
            _v,
            row
          ) => (

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
                  row.date_operation ||
                    row.created_at
                )
              ).toLocaleDateString(
                "fr-FR"
              )}

            </div>
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
        space-y-6
      "
    >

      {/* -------------------------------------------------------------- */}
      {/* FILTERS                                                        */}
      {/* -------------------------------------------------------------- */}

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
              focus:border-red-400
              focus:ring-4
              focus:ring-red-100
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

          {/* DATE */}

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
              bg-white
              px-4
              text-sm
              text-slate-700
              outline-none
              transition-all
              focus:border-red-400
              focus:ring-4
              focus:ring-red-100
            "
          />

          {/* AGENCE */}

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
                bg-white
                px-4
                text-sm
                text-slate-700
                outline-none
                transition-all
                focus:border-red-400
                focus:ring-4
                focus:ring-red-100
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

      <Table<Retrait>
        data={retraits}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucun retrait trouvé"
        emptyDescription="Aucun retrait ne correspond actuellement aux filtres sélectionnés."
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
  );
}