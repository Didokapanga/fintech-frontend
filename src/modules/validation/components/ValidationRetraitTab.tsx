// src/modules/validation/components/ValidationRetraitTab.tsx

import {
  Check,
  Clock3,
  ShieldAlert,
  UserRound,
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

import {
  useValidationRetraitList,
  useValidateRetrait,
} from "../hooks/useValidationRetrait";

import AppMessageState from "../../../components/ui/AppMessageState";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import {
  useAuthStore,
} from "../../../app/store";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type RetraitValidation = {
  id: string;

  code_reference: string;

  numero_piece: string;

  montant: number;

  devise: string;

  statut: string;

  date_operation: string;

  created_at: string;

  expediteur?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };

  destinataire?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };
};

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function ValidationRetraitTab() {

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

  const user =
    useAuthStore(
      (s) => s.user
    );

  const role =
    user
      ?.role_name
      ?.toUpperCase() || "";

  const canValidate =
    [
      "ADMIN",
      "N+1",
      "N+2",
    ].includes(role);

  /* ------------------------------------------------------------------------ */
  /*                                    DATA                                  */
  /* ------------------------------------------------------------------------ */

  const {
    data,
    isLoading,
  } =
    useValidationRetraitList(
      page,
      10
    );

  const retraits =
    useMemo(
      () =>
        data?.data ?? [],
      [data]
    );

  const meta =
    data?.meta;

  /* ------------------------------------------------------------------------ */
  /*                                VALIDATION                                */
  /* ------------------------------------------------------------------------ */

  const retraitMutation =
    useValidateRetrait();

  const {
    mutate,
    appMessage,
    clearMessage,
    isPending,
  } =
    useApiMutationWithFeedback(
      {
        mutationFn:
          retraitMutation.mutateAsync,

        successMessage:
          "Validation du retrait effectuée",

        invalidateQueries:
          [
            "validation-retrait",
          ],
      }
    );

  /* ------------------------------------------------------------------------ */
  /*                                  ACTIONS                                 */
  /* ------------------------------------------------------------------------ */

  const handleApprove =
    (
      id: string
    ) => {

      mutate({
        retrait_id:
          id,

        decision:
          "APPROUVE",
      });
    };

  const handleReject =
    (
      id: string
    ) => {

      mutate({
        retrait_id:
          id,

        decision:
          "REJETE",
      });
    };

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
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<RetraitValidation>[] = [

      {
        header:
          "Référence",

        accessor:
          "code_reference",

        render:
          (
            value
          ) => (

            <span
              className="
                font-mono
                text-xs
                text-slate-500
              "
            >
              {String(
                value
              )}
            </span>

          ),
      },

      {
        header:
          "Expéditeur",

        accessor:
          "expediteur",

        render:
          (
            _v,
            row
          ) => {

            const e =
              row.expediteur;

            return (

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
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                  "
                >

                  <UserRound
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
                    {e?.nom ??
                      "-"}{" "}

                    {e?.postnom ??
                      ""}
                  </span>

                  <span
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    {e?.phone ??
                      "-"}
                  </span>

                </div>

              </div>

            );
          },
      },

      {
        header:
          "Destinataire",

        accessor:
          "destinataire",

        render:
          (
            _v,
            row
          ) => {

            const d =
              row.destinataire;

            return (

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
                    rounded-xl
                    bg-emerald-50
                    text-emerald-600
                  "
                >

                  <UserRound
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
                    {d?.nom ??
                      "-"}{" "}

                    {d?.postnom ??
                      ""}
                  </span>

                  <span
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    {d?.phone ??
                      "-"}
                  </span>

                </div>

              </div>

            );
          },
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
          ) => (

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <Wallet2
                size={15}
                className="
                  text-emerald-600
                "
              />

              <span
                className="
                  font-semibold
                  text-emerald-600
                "
              >

                {Number(
                  value
                ).toLocaleString()}{" "}

                {row.devise}

              </span>

            </div>

          ),
      },

      {
        header:
          "Pièce",

        accessor:
          "numero_piece",

        render:
          (
            value
          ) => (

            <span
              className="
                rounded-lg
                bg-slate-100
                px-2
                py-1
                font-mono
                text-xs
                text-slate-600
              "
            >
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
          "date_operation",

        render:
          (
            value
          ) => (

            <span
              className="
                whitespace-nowrap
                text-sm
                text-slate-600
              "
            >

              {value
                ? new Date(
                    String(
                      value
                    )
                  ).toLocaleDateString(
                    "fr-FR"
                  )
                : "-"}

            </span>

          ),
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
                      handleApprove(
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

      {/* READ ONLY */}

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

        <Table<RetraitValidation>
          data={
            retraits
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
        retraits.length ===
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
              Aucun retrait
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