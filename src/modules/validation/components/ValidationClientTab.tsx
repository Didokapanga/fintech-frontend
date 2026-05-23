// src/modules/validation/components/ValidationClientTab.tsx

import {
  Check,
  Clock3,
  Landmark,
  Phone,
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
  useAuthStore,
} from "../../../app/store";

import {
  useAgences,
} from "../../agence/hooks/useAgences";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import {
  useValidateOperation,
  useValidationList,
} from "../hooks/useValidation";

import type {
  TransfertClient,
} from "../services/validation.service";

import Pagination from "../../../components/ui/Pagination";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Agence = {
  id: string;

  libelle: string;
};

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

  const {
    data:
      agencesData,
  } =
    useAgences();

  const agences:
    Agence[] =
      (
        agencesData as
          Agence[]
      ) ?? [];

  const getAgenceName =
    (
      id: string
    ) => {

      const agence =
        agences.find(
          (
            a
          ) =>
            a.id === id
        );

      return (
        agence
          ?.libelle ||
        "-"
      );
    };

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

  const handleValidate =
    (
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
          "N1",
      });
    };

  const handleReject =
    (
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
          "N1",
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

        case "APPROUVE":
          return `
            bg-emerald-50
            text-emerald-700
            border
            border-emerald-200
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
    Column<TransfertClient>[] =
      [
        {
          header:
            "Expéditeur",

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
                  min-w-[220px]
                  items-start
                  gap-3
                "
              >

                <div
                  className="
                    mt-0.5
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

                  <User2
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
                    {row.exp_nom ||
                      "-"}{" "}

                    {
                      row.exp_postnom ||
                      ""
                    }
                  </span>

                  <span
                    className="
                      mt-1
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      text-slate-500
                    "
                  >

                    <Phone
                      size={12}
                    />

                    {row.exp_phone ||
                      "-"}

                  </span>

                </div>

              </div>

            ),
        },

        {
          header:
            "Destinataire",

          accessor:
            "client_exp",

          render:
            (
              _v,
              row
            ) => (

              <div
                className="
                  flex
                  min-w-[220px]
                  items-start
                  gap-3
                "
              >

                <div
                  className="
                    mt-0.5
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

                  <Landmark
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
                    {row.dest_nom ||
                      "-"}{" "}

                    {
                      row.dest_postnom ||
                      ""
                    }
                  </span>

                  <span
                    className="
                      mt-1
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      text-slate-500
                    "
                  >

                    <Phone
                      size={12}
                    />

                    {row.dest_phone ||
                      "-"}

                  </span>

                </div>

              </div>

            ),
        },

        {
          header:
            "Agence",

          accessor:
            "agence_exp",

          render:
            (
              value
            ) => (

              <div
                className="
                  inline-flex
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                {getAgenceName(
                  String(
                    value
                  )
                )}
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
                      ) ||
                        "0"
                    );

              return (
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
            "client_dest",

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
                          String(
                            row.id
                          )
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
                          String(
                            row.id
                          )
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
                      text-sm
                      italic
                      text-slate-400
                    "
                  >
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

        <Table<TransfertClient>
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
          page={page}
          onChange={setPage}
        />

      )}

    </div>
  );
}