// src/modules/validation/components/ValidationClientTab.tsx

import {
  Check,
  Clock3,
  Landmark,
  ShieldAlert,
  User2,
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

import AppMessageState from "../../../components/ui/AppMessageState";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import {
  useValidateOperation,
  useValidationList,
} from "../hooks/useValidation";

import Pagination from "../../../components/ui/Pagination";
import type { TransfertClientValidation } from "../types";
import TransfertClientDetailsModal from "../../transfert-client/components/TransfertClientDetailsModal";

import { usePermission }
from "../../../hooks/usePermission";

import { PERMISSIONS }
from "../../../constants/permissions";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function ValidationClientTab() {

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

  const [
    page,
    setPage,
  ] = useState(1);

  /* ------------------------------------------------------------------------ */
  /*                                    AUTH                                  */
  /* ------------------------------------------------------------------------ */

  const { can } =
    usePermission();

  const canValidate =
    can(
      PERMISSIONS.TRANSFERT_CLIENT_VALIDATE
    );

  const [
    selectedTransfert,
    setSelectedTransfert,
  ] = useState<
    TransfertClientValidation | null
  >(null);
  /* ------------------------------------------------------------------------ */
  /*                                   DATA                                   */
  /* ------------------------------------------------------------------------ */

  const {
    data,
    isLoading,
  } =
    useValidationList(
      page,
      10
    );

  const transferts =
    useMemo(
      () =>
        data?.data ?? [],
      [data]
    );

    const meta = data?.meta;

  /* ------------------------------------------------------------------------ */
  /*                                  AGENCES                                 */
  /* ------------------------------------------------------------------------ */

  /* ------------------------------------------------------------------------ */
  /*                                VALIDATION                                */
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
            "validation-client",
          ],
      }
    );

    const handleValidate = (
      id: string
    ) => {

      mutate({
        operation_type:
          "TRANSFERT_CLIENT",

        reference_id:
          id,

        decision:
          "APPROUVE",

        niveau:
          "VALIDATION",

        commentaire:
          "Validation conforme",
      });
    };

    const handleReject = (
      id: string
    ) => {

      mutate({
        operation_type:
          "TRANSFERT_CLIENT",

        reference_id:
          id,

        decision:
          "REJETE",

        niveau:
          "VALIDATION",

        commentaire:
          "Validation rejetée",
      });
    };

  /* ------------------------------------------------------------------------ */
  /*                                  HELPERS                                 */
  /* ------------------------------------------------------------------------ */

  const getStatusBadge =
    (
      status: string
    ) => {

      switch (status) {

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
        case "ANNULE":
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
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<TransfertClientValidation>[] =
      [

        {
          header: "Référence",

          accessor:
            "code_reference",

          render: (
            value,
            row
          ) => (

            <div
              className="
                flex
                flex-col
                min-w-[180px]
              "
            >

              <span
                className="
                  font-semibold
                  text-slate-900
                "
              >
                {value}
              </span>

              <span
                className="
                  text-xs
                  text-slate-500
                "
              >
                {row.code_caisse}
              </span>

            </div>

          ),
        },

        {
          header: "Expéditeur",

          accessor:
            "expediteur_name",

          render: (
            _v,
            row
          ) => (

            <div
              className="
                flex
                items-start
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

                <User2 size={16} />

              </div>

              <div>

                <p
                  className="
                    font-semibold
                    text-slate-800
                  "
                >
                  {row.expediteur_name}
                </p>

                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  {row.expediteur_telephone}
                </p>

              </div>

            </div>

          ),
        },

        {
          header: "Destinataire",

          accessor:
            "destinataire_name",

          render: (
            _v,
            row
          ) => (

            <div
              className="
                flex
                items-start
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

                <Landmark size={16} />

              </div>

              <div>

                <p
                  className="
                    font-semibold
                    text-slate-800
                  "
                >
                  {row.destinataire_name}
                </p>

                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  {row.destinataire_telephone}
                </p>

              </div>

            </div>

          ),
        },

        {
          header: "Montant",

          accessor:
            "montant_source",

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
                  font-bold
                  text-emerald-600
                "
              >
                {Number(
                  row.montant_source
                ).toLocaleString()}
                {" "}
                {row.devise_source}
              </span>

              <span
                className="
                  text-xs
                  text-slate-500
                "
              >
                Frais :
                {" "}
                {Number(
                  row.frais
                ).toLocaleString()}
              </span>

            </div>

          ),
        },

        {
          header: "Statut",

          accessor:
            "statut",

          render: (
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
                  String(value)
                )}
              `}
            >

              <Clock3
                size={12}
              />

              {String(value)}

            </span>

          ),
        },

        {
          header: "Actions",

          accessor:
            "id",

          render: (
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
                        row.id
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
                        row.id
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

      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-white
        "
      >

        <Table<TransfertClientValidation>
          data={transferts}
          columns={columns}
          loading={isLoading}
        />

      </div>

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
              Aucun transfert
              en attente de validation.
            </p>

          </div>

        )}

        {meta && (
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            totalItems={meta.total}
            perPage={meta.limit}
            onChange={setPage}
          />
        )}

        {selectedTransfert && (

          <TransfertClientDetailsModal
            transfert={selectedTransfert}
            open={!!selectedTransfert}
            onClose={() =>
              setSelectedTransfert(null)
            }
          />

        )}

    </div>
    
  );
}