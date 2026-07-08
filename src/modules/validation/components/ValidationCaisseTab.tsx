// src/modules/validation/components/ValidationCaisseTab.tsx

import {
  Check,
  Clock3,
  ShieldAlert,
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
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import {
  useTransfertsCaisseToProcess,
} from "../../transfert-caisse/hooks/useTransfertCaisse";

import type {
  TransfertCaisse,
} from "../../transfert-caisse/types";

import {
  useValidateOperation,
} from "../hooks/useValidation";
import TransfertCaisseDetailsModal from "./TransfertCaisseDetailsModal";
import { usePermission } from "../../../hooks/usePermission";
import { PERMISSIONS } from "../../../constants/permissions";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

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

  const [
    selectedTransfert,
    setSelectedTransfert,
  ] =
    useState<
      TransfertCaisse | null
    >(null);
  /* ------------------------------------------------------------------------ */
  /*                                    USER                                  */
  /* ------------------------------------------------------------------------ */

  const { can } =
    usePermission();

  const canValidate =
    can(
      PERMISSIONS.TRANSFERT_CAISSE_PROCESS
    ) ||
    can(
      PERMISSIONS.TRANSFERT_CAISSE_PROCESS_AGENCE
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

  /* ------------------------------------------------------------------------ */
  /*                                  HELPERS                                 */
  /* ------------------------------------------------------------------------ */


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
      | "VALIDATION"
      | "EXECUTION";

      if (
        row.statut ===
        "INITIE"
      ) {

        niveau = "VALIDATION";

      } else if (
        row.statut ===
        "VALIDE"
      ) {

        niveau = "EXECUTION";

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
          row.statut === "INITIE"
            ? "VALIDATION"
            : "EXECUTION",
      });
    };

  /* ------------------------------------------------------------------------ */
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<TransfertCaisse>[] =
      [

        /* -------------------------------- */
        /* REFERENCE                        */
        /* -------------------------------- */

        {
          header:
            "Référence",

          accessor:
            "code_reference",

          render:
            (
              value,
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
                  {value}
                </span>

                <span
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  {
                    row.created_by_name
                  }
                </span>

              </div>

            ),
        },

        /* -------------------------------- */
        /* FLUX                             */
        /* -------------------------------- */

        {
          header:
            "Flux",

          accessor:
            "source_code_caisse",

          render:
            (
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
                  {
                    row.source_code_caisse
                  }
                </span>

                <span
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  {
                    row.agence_source_name
                  }
                </span>

                <span
                  className="
                    my-1
                    text-slate-300
                  "
                >
                  →
                </span>

                <span
                  className="
                    font-semibold
                    text-slate-800
                  "
                >
                  {
                    row.destination_code_caisse
                  }
                </span>

                <span
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  {
                    row.agence_destination_name
                  }
                </span>

              </div>

            ),
        },

        /* -------------------------------- */
        /* MONTANT                          */
        /* -------------------------------- */

        {
          header:
            "Montant",

          accessor:
            "montant",

          render:
            (
              value,
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
                    font-bold
                    text-emerald-600
                  "
                >
                  {Number(
                    value
                  ).toLocaleString()}
                  {" "}
                  {row.devise}
                </span>

                <span
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  {
                    row.date_operation
                      ? new Date(
                          row.date_operation
                        ).toLocaleDateString(
                          "fr-FR"
                        )
                      : "-"
                  }
                </span>

              </div>

            ),
        },

        /* -------------------------------- */
        /* STATUT                           */
        /* -------------------------------- */

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

        /* -------------------------------- */
        /* ACTIONS                          */
        /* -------------------------------- */

        {
          header:
            "Actions",

          accessor:
            "id",

          render:
            (
              _v,
              row
            ) => (

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Button
                  variant="secondary"
                  onClick={() =>
                    setSelectedTransfert(
                      row
                    )
                  }
                >
                  Détails
                </Button>

                {canValidate && (

                  <>
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
                  </>

                )}

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

      {
        selectedTransfert && (

          <TransfertCaisseDetailsModal
            open={
              !!selectedTransfert
            }
            transfert={
              selectedTransfert
            }
            onClose={() =>
              setSelectedTransfert(
                null
              )
            }
          />

        )
      }

    </div>
  );
}