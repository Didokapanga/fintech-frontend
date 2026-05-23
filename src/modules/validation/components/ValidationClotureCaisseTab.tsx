// src/modules/validation/components/ValidationClotureCaisseTab.tsx

import {
  Building2,
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
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import {
  useAuthStore,
} from "../../../app/store";

import {
  useValidationClotureList,
  useValidateCloture,
} from "../../cloture-caisse/hooks/useClotureCaisse";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type ClotureCaisse = {
  id: string;

  code_reference: string;

  code_caisse?: string;

  agence_libelle?: string;

  caisse_devise?: string;

  solde_systeme: number;

  solde_physique: number;

  ecart: number;

  devise: string;

  motif_ecart?: string;

  observation?: string;

  statut: string;

  date_operation: string;

  created_at: string;
};

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function ValidationClotureCaisseTab() {

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
    useValidationClotureList(
      page,
      10
    );

  const clotures =
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

  const validateMutation =
    useValidateCloture();

  const {
    mutate,
    appMessage,
    clearMessage,
    isPending,
  } =
    useApiMutationWithFeedback(
      {
        mutationFn:
          validateMutation.mutateAsync,

        successMessage:
          "Validation effectuée avec succès",

        invalidateQueries:
          [
            "validation-cloture",
          ],
      }
    );

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
  /*                                  ACTIONS                                 */
  /* ------------------------------------------------------------------------ */

  const handleValidate =
    (
      id: string
    ) => {

      mutate({
        cloture_id:
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
        cloture_id:
          id,

        decision:
          "REJETE",
      });
    };

  /* ------------------------------------------------------------------------ */
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<ClotureCaisse>[] =
      [

        {
          header:
            "Référence",

          accessor:
            "code_reference",

          render:
            (
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
                    text-slate-500
                  "
                >
                  {String(
                    value
                  )}
                </span>

              </div>

            ),
        },

        {
          header:
            "Caisse",

          accessor:
            "code_caisse",

          render:
            (
              _v,
              row
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
                    {row.code_caisse ||
                      "-"}
                  </span>

                  <span
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    {
                      row.caisse_devise ||
                      row.devise ||
                      "-"
                    }
                  </span>

                </div>

              </div>

            ),
        },

        {
          header:
            "Agence",

          accessor:
            "agence_libelle",

          render:
            (
              value
            ) => (

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
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

                <Building2
                  size={14}
                />

                {String(
                  value || "-"
                )}

              </div>

            ),
        },

        {
          header:
            "Solde système",

          accessor:
            "solde_systeme",

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
                  {Number(
                    value
                  ).toLocaleString()}{" "}

                  {row.devise}
                </span>

                <span
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  Théorique
                </span>

              </div>

            ),
        },

        {
          header:
            "Solde physique",

          accessor:
            "solde_physique",

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
                  {Number(
                    value
                  ).toLocaleString()}{" "}

                  {row.devise}
                </span>

                <span
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  Compté
                </span>

              </div>

            ),
        },

        {
          header:
            "Écart",

          accessor:
            "ecart",

          render:
            (
              value,
              row
            ) => {

              const ecart =
                Number(
                  value
                );

              return (

                <span
                  className={`
                    inline-flex
                    rounded-full
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    ${
                      ecart === 0
                        ? `
                          bg-emerald-50
                          text-emerald-700
                          border
                          border-emerald-200
                        `
                        : `
                          bg-red-50
                          text-red-700
                          border
                          border-red-200
                        `
                    }
                  `}
                >

                  {ecart.toLocaleString()}{" "}
                  {row.devise}

                </span>

              );
            },
        },

        {
          header:
            "Motif",

          accessor:
            "motif_ecart",

          render:
            (
              value
            ) => (

              <div
                className="
                  max-w-[220px]
                  text-sm
                  leading-6
                  text-slate-600
                "
              >
                {String(
                  value || "-"
                )}
              </div>

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
            "Date",

          accessor:
            "date_operation",

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

                {value
                  ? new Date(
                      String(
                        value
                      )
                    ).toLocaleDateString(
                      "fr-FR"
                    )
                  : "-"}

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

        <Table<ClotureCaisse>
          data={
            clotures
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
        clotures.length ===
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
              Aucune clôture
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