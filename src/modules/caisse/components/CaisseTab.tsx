// src/modules/caisse/components/CaisseTab.tsx

import {
  Building2,
  CircleDollarSign,
  Lock,
  LockOpen,
  Pencil,
  Plus,
  Trash2,
  Wallet2,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  useCaisses,
  useCloseCaisse,
  useDeleteCaisse,
  useOpenCaisse,
} from "../hooks/useCaisses";

import type {
  Caisse,
} from "../types";

import {
  Button,
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import Pagination from "../../../components/ui/Pagination";

import ConfirmModal from "../../../components/ui/ConfirmModal";

import AppMessageState from "../../../components/ui/AppMessageState";

import CaisseStatusBadge from "./CaisseStatusBadge";

import MouvementFormModal from "../../mouvement/components/MouvementFormModal";

import CaisseFormModal from "./CaisseFormModal";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type MessageState = {
  variant:
    | "error"
    | "success"
    | "info"
    | "warning";

  title: string;

  message: string;
};

type ErrorWithResponse =
  Error & {
    response?: {
      data?: {
        message?: string;
      };
    };
  };

type PaginatedCaissesResponse =
  {
    data: Caisse[];

    meta?: {
      total: number;

      page: number;

      limit: number;

      totalPages: number;
    };
  };

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function CaisseTab() {

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

  const [
    page,
    setPage,
  ] = useState(1);

  const limit =
    10;

  const [
    selectedId,
    setSelectedId,
  ] = useState<
    string | null
  >(null);

  const [
    openMouvement,
    setOpenMouvement,
  ] = useState(false);

  const [
    openCreate,
    setOpenCreate,
  ] = useState(false);

  const [
    appMessage,
    setAppMessage,
  ] =
    useState<MessageState | null>(
      null
    );

  /* ------------------------------------------------------------------------ */
  /*                                   QUERY                                  */
  /* ------------------------------------------------------------------------ */

  const {
    data: response,
    isLoading,
  } = useCaisses(
    page,
    limit
  ) as {
    data?: PaginatedCaissesResponse;

    isLoading: boolean;
  };

  const caisses =
    useMemo(
      () =>
        response?.data ||
        [],
      [response]
    );

  const meta =
    response?.meta;

  /* ------------------------------------------------------------------------ */
  /*                                MUTATIONS                                 */
  /* ------------------------------------------------------------------------ */

  const {
    mutate:
      deleteCaisse,
  } =
    useDeleteCaisse();

  const {
    mutate:
      openCaisse,
  } =
    useOpenCaisse();

  const {
    mutate:
      closeCaisse,
  } =
    useCloseCaisse();

  /* ------------------------------------------------------------------------ */
  /*                                  HELPERS                                 */
  /* ------------------------------------------------------------------------ */

  const handleError =
    (
      error: unknown,
      fallback: string,
      title: string
    ) => {

      const apiError =
        error as ErrorWithResponse;

      setAppMessage({
        variant:
          "error",

        title,

        message:
          apiError
            ?.response
            ?.data
            ?.message ||
          fallback,
      });
    };

  /* ------------------------------------------------------------------------ */
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<Caisse>[] =
    [

      {
        header:
          "Caisse",

        accessor:
          "code_caisse",

        render:
          (
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
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-50
                  text-indigo-600
                "
              >

                <Wallet2
                  size={18}
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
                  {String(
                    value
                  )}
                </span>

                <span
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  Identifiant
                  caisse
                </span>

              </div>

            </div>

          ),
      },

      {
        header:
          "Devise",

        accessor:
          "devise",

        render:
          (
            value
          ) => (

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-700
              "
            >

              <CircleDollarSign
                size={13}
              />

              {String(
                value
              )}

            </div>

          ),
      },

      {
        header:
          "Type",

        accessor:
          "type",

        render:
          (
            value
          ) => (

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-200
                bg-slate-100
                px-3
                py-1
                text-xs
                font-medium
                text-slate-700
              "
            >

              <Building2
                size={13}
              />

              {String(
                value ||
                  "-"
              )}

            </div>

          ),
      },

      {
        header:
          "Solde",

        accessor:
          "solde",

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
                  text-emerald-600
                "
              >

                {value !==
                undefined
                  ? `${Number(
                      value
                    ).toLocaleString()} ${row.devise}`
                  : "-"}

              </span>

              <span
                className="
                  text-xs
                  text-slate-400
                "
              >
                Solde actuel
              </span>

            </div>

          ),
      },

      {
        header:
          "Statut",

        accessor:
          "state",

        render:
          (
            value
          ) =>

            value
              ? (

                <CaisseStatusBadge
                  state={
                    value as Caisse["state"]
                  }
                />

              )
              : (
                <span>
                  -
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
          ) => (

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >

              {/* OPEN */}

              {row.state ===
                "FERMEE" && (

                <Button
                  onClick={() =>

                    openCaisse(
                      row.id,
                      {
                        onSuccess:
                          () => {

                            setAppMessage(
                              {
                                variant:
                                  "success",

                                title:
                                  "Succès",

                                message:
                                  "Caisse ouverte avec succès",
                              }
                            );
                          },

                        onError:
                          (
                            error
                          ) =>

                            handleError(
                              error,
                              "Impossible d’ouvrir cette caisse",
                              "Ouverture refusée"
                            ),
                      }
                    )
                  }
                  className="
                    h-9
                    rounded-xl
                    px-3
                    text-xs
                  "
                >

                  <LockOpen
                    size={14}
                  />

                  Ouvrir

                </Button>

              )}

              {/* CLOSE */}

              {row.state ===
                "OUVERTE" && (

                <Button
                  variant="secondary"
                  onClick={() =>

                    closeCaisse(
                      row.id,
                      {
                        onSuccess:
                          () => {

                            setAppMessage(
                              {
                                variant:
                                  "success",

                                title:
                                  "Succès",

                                message:
                                  "Caisse fermée avec succès",
                              }
                            );
                          },

                        onError:
                          (
                            error
                          ) =>

                            handleError(
                              error,
                              "Impossible de fermer cette caisse",
                              "Fermeture refusée"
                            ),
                      }
                    )
                  }
                  className="
                    h-9
                    rounded-xl
                    px-3
                    text-xs
                  "
                >

                  <Lock
                    size={14}
                  />

                  Fermer

                </Button>

              )}

              {/* EDIT */}

              <Button
                variant="secondary"
                onClick={() =>
                  alert(
                    "Edition bientôt disponible"
                  )
                }
                className="
                  h-9
                  rounded-xl
                  px-3
                  text-xs
                "
              >

                <Pencil
                  size={14}
                />

                Modifier

              </Button>

              {/* DELETE */}

              <Button
                variant="danger"
                onClick={() =>
                  setSelectedId(
                    row.id
                  )
                }
                className="
                  h-9
                  rounded-xl
                  px-3
                  text-xs
                "
              >

                <Trash2
                  size={14}
                />

                Supprimer

              </Button>

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

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-semibold
              tracking-[-0.03em]
              text-slate-900
            "
          >
            Gestion des caisses
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Administration et suivi
            des caisses
            opérationnelles.
          </p>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Button
            onClick={() =>
              setOpenCreate(
                true
              )
            }
          >

            <Plus
              size={16}
            />

            Nouvelle caisse

          </Button>

        </div>

      </div>

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
          buttonText="Fermer"
          onAction={() =>
            setAppMessage(
              null
            )
          }
        />

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

        <Table<Caisse>
          data={
            caisses
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
        caisses.length ===
          0 && (

          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-slate-200
              bg-white
              py-16
              text-center
            "
          >

            <Wallet2
              size={38}
              className="
                mx-auto
                mb-4
                text-slate-300
              "
            />

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Aucune caisse
              disponible.
            </p>

          </div>

        )}

      {/* PAGINATION */}

      {meta && meta.totalPages > 1 && (

        <div className="pt-2">

          <Pagination
            page={page}
            totalPages={meta.totalPages}
            onChange={setPage}
          />

        </div>

      )}

      {/* MOVEMENT MODAL */}

      {openMouvement && (

        <MouvementFormModal
          open={
            openMouvement
          }
          onClose={() =>
            setOpenMouvement(
              false
            )
          }
        />

      )}

      {/* CREATE MODAL */}

      {openCreate && (

        <CaisseFormModal
          open={
            openCreate
          }
          onClose={() =>
            setOpenCreate(
              false
            )
          }
        />

      )}

      {/* DELETE MODAL */}

      <ConfirmModal
        open={
          !!selectedId
        }
        onClose={() =>
          setSelectedId(
            null
          )
        }
        onConfirm={() => {

          if (
            !selectedId
          ) return;

          deleteCaisse(
            selectedId,
            {
              onSuccess:
                () => {

                  setAppMessage(
                    {
                      variant:
                        "success",

                      title:
                        "Succès",

                      message:
                        "Caisse supprimée avec succès",
                    }
                  );
                },

              onError:
                (
                  error
                ) =>

                  handleError(
                    error,
                    "Impossible de supprimer cette caisse",
                    "Suppression refusée"
                  ),
            }
          );

          setSelectedId(
            null
          );
        }}
        title="Supprimer caisse"
        description="Cette action est irréversible."
      />

    </div>

  );
}