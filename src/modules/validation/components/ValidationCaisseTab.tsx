// src/modules/validation/components/ValidationCaisseTab.tsx

import {
  ArrowRightLeft,
  Check,
  Clock3,
  ShieldAlert,
  Wallet2,
  X,
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

import Pagination from "../../../components/ui/Pagination";

import AppMessageState from "../../../components/ui/AppMessageState";

import {
  useAuthStore,
} from "../../../app/store";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import {
  useCaisses,
} from "../../caisse/hooks/useCaisses";

import {
  useTransfertsCaisseToProcess,
} from "../../transfert-caisse/hooks/useTransfertCaisse";

import type {
  TransfertCaisse,
} from "../../transfert-caisse/services/transfertCaisse.service";

import {
  useValidateOperation,
} from "../hooks/useValidation";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Caisse = {
  id: string;

  code_caisse: string;

  devise: string;
};

type PaginatedCaissesResponse = {
  data: Caisse[];

  meta?: {
    total: number;

    page: number;

    limit: number;

    totalPages: number;
  };
};

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function ValidationCaisseTab() {

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

  const [
    page,
    setPage,
  ] = useState(1);

  /* ------------------------------------------------------------------------ */
  /*                                    USER                                  */
  /* ------------------------------------------------------------------------ */

  const user =
    useAuthStore(
      (s) => s.user
    );

  const isCaissier =
    user
      ?.role_name
      ?.toUpperCase() ===
    "CAISSIER";

  const canValidate =
    [
      "ADMIN",
      "N+1",
      "N+2",
      "CAISSIER",
    ].includes(
      user
        ?.role_name
        ?.toUpperCase() || ""
    );

  /* ------------------------------------------------------------------------ */
  /*                                TRANSFERTS                                */
  /* ------------------------------------------------------------------------ */

  const {
    data,
    isLoading,
  } =
    useTransfertsCaisseToProcess(
      page,
      10
    );

  const transferts =
    useMemo(
      () =>
        data?.data ?? [],
      [data]
    );

  const meta =
    data?.meta;

  /* ------------------------------------------------------------------------ */
  /*                                 VALIDATION                               */
  /* ------------------------------------------------------------------------ */

  const validateOperation =
    useValidateOperation();

  const {
    mutate,
    appMessage,
    clearMessage,
    isPending,
  } =
    useApiMutationWithFeedback(
      {
        mutationFn:
          validateOperation.mutateAsync,

        successMessage:
          "Validation effectuée avec succès",

        invalidateQueries:
          [
            "transferts-caisse-process",
            "transferts-caisse",
          ],
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
    ) as {
      data?: PaginatedCaissesResponse;
    };

  const caisses =
    caissesResponse
      ?.data || [];

  /* ------------------------------------------------------------------------ */
  /*                                  HELPERS                                 */
  /* ------------------------------------------------------------------------ */

  const getCaisseLabel =
    (
      id: string
    ) => {

      const caisse =
        caisses.find(
          (
            c
          ) =>
            c.id === id
        );

      return caisse
        ? `${caisse.code_caisse} (${caisse.devise})`
        : id.slice(
            0,
            8
          );
    };

  const getStatusBadge =
    (
      status: string
    ) => {

      switch (
        status
      ) {

        case "INITIE":

          return `
            bg-amber-50
            text-amber-700
            border
            border-amber-200
          `;

        case "VALIDE":

          return `
            bg-blue-50
            text-blue-700
            border
            border-blue-200
          `;

        case "EXECUTE":

          return `
            bg-emerald-50
            text-emerald-700
            border
            border-emerald-200
          `;

        case "REJETE":

          return `
            bg-red-50
            text-red-700
            border
            border-red-200
          `;

        default:

          return `
            bg-slate-100
            text-slate-600
            border
            border-slate-200
          `;
      }
    };

  /* ------------------------------------------------------------------------ */
  /*                               ACTIONS                                    */
  /* ------------------------------------------------------------------------ */

  const handleValidate =
    (
      row: TransfertCaisse
    ) => {

      let niveau:
        | "N1"
        | "N2";

      if (
        row.statut ===
        "INITIE"
      ) {

        niveau =
          "N1";

      } else if (
        row.statut ===
        "VALIDE"
      ) {

        niveau =
          "N2";

      } else {

        return;
      }

      mutate({
        operation_type:
          "TRANSFERT_CAISSE",

        reference_id:
          row.id,

        decision:
          "APPROUVE",

        niveau,
      });
    };

  const handleReject =
    (
      row: TransfertCaisse
    ) => {

      if (
        row.statut ===
        "EXECUTE"
      ) {

        return;
      }

      mutate({
        operation_type:
          "TRANSFERT_CAISSE",

        reference_id:
          row.id,

        decision:
          "REJETE",

        niveau:
          row.statut ===
          "INITIE"
            ? "N1"
            : "N2",
      });
    };

  /* ------------------------------------------------------------------------ */
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<TransfertCaisse>[] =
      [

        {
          header:
            "Caisse source",

          accessor:
            "caisse_source_id",

          render:
            (
              value
            ) => (

              <div
                className="
                  flex
                  min-w-[220px]
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
                    rounded-xl
                    bg-slate-100
                    text-slate-600
                  "
                >

                  <Wallet2
                    size={16}
                  />

                </div>

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
                    {isCaissier
                      ? "-"
                      : getCaisseLabel(
                          String(
                            value
                          )
                        )}
                  </span>

                  <span
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Source
                  </span>

                </div>

              </div>

            ),
        },

        {
          header:
            "Caisse destination",

          accessor:
            "caisse_destination_id",

          render:
            (
              value
            ) => (

              <div
                className="
                  flex
                  min-w-[220px]
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
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                  "
                >

                  <ArrowRightLeft
                    size={16}
                  />

                </div>

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
                    {getCaisseLabel(
                      String(
                        value
                      )
                    )}
                  </span>

                  <span
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Destination
                  </span>

                </div>

              </div>

            ),
        },

        {
          header:
            "Montant",

          accessor:
            "montant",

          render:
            (
              value,
              row
            ) => {

              const montant =
                typeof value ===
                "number"
                  ? value
                  : parseFloat(
                      String(
                        value
                      ) || "0"
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
                      font-bold
                      text-emerald-600
                    "
                  >
                    {montant.toLocaleString()}{" "}
                    {row.devise}
                  </span>

                  <span
                    className="
                      text-xs
                      text-slate-400
                    "
                  >
                    Transfert caisse
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

          render:
            (
              value
            ) => (

              <span
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  ${getStatusBadge(
                    String(
                      value
                    )
                  )}
                `}
              >

                <Clock3
                  size={12}
                />

                {String(
                  value
                )}

              </span>

            ),
        },

        {
          header:
            "Date",

          accessor:
            "created_at",

          render:
            (
              value
            ) => (

              <div
                className="
                  whitespace-nowrap
                  text-sm
                  text-slate-600
                "
              >
                {new Date(
                  String(
                    value
                  )
                ).toLocaleString(
                  "fr-FR"
                )}
              </div>

            ),
        },

        {
          header:
            "Actions",

          accessor:
            "id",

          render:
            (
              _v,
              row
            ) =>

              canValidate
                ? (

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Button
                      onClick={() =>
                        handleValidate(
                          row
                        )
                      }
                      loading={
                        isPending
                      }
                    >
                      <Check
                        size={15}
                      />

                      Valider
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() =>
                        handleReject(
                          row
                        )
                      }
                      loading={
                        isPending
                      }
                    >
                      <X
                        size={15}
                      />

                      Rejeter
                    </Button>

                  </div>

                )
                : (

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      italic
                      text-slate-400
                    "
                  >

                    <ShieldAlert
                      size={14}
                    />

                    Lecture seule

                  </div>

                ),
        },
      ];

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        space-y-5
      "
    >

      {/* MESSAGE */}

      {appMessage && (

        <AppMessageState
          variant={
            appMessage.variant
          }
          title={
            appMessage.title
          }
          message={
            appMessage.message
          }
          onAction={
            clearMessage
          }
        />

      )}

      {!canValidate && (

        <div
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-amber-200
            bg-amber-50
            px-4
            py-3
            text-sm
            text-amber-700
          "
        >

          <ShieldAlert
            size={16}
          />

          Vous êtes actuellement
          en mode lecture seule.

        </div>

      )}

      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-white
        "
      >

        <Table<TransfertCaisse>
          data={
            transferts
          }
          columns={
            columns
          }
          loading={
            isLoading
          }
        />

      </div>

      {/* EMPTY */}

      {!isLoading &&
        transferts.length ===
          0 && (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-200
              bg-white
              py-14
              text-center
            "
          >

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Aucun transfert caisse
              à valider.
            </p>

          </div>

        )}

      {/* PAGINATION */}

      {meta && (

        <Pagination
          page={page}
          onChange={setPage}
        />

      )}

    </div>
  );
}