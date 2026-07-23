// src/modules/caisse/components/CaisseTab.tsx

import {
  Building2,
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
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import Pagination from "../../../components/ui/Pagination";

import ConfirmModal from "../../../components/ui/ConfirmModal";

import AppMessageState from "../../../components/ui/AppMessageState";

import CaisseStatusBadge from "./CaisseStatusBadge";

import CaisseFormModal from "./CaisseFormModal";
import { PermissionGate } from "../../../components/auth/PermissionGate";
import { PERMISSIONS } from "../../../constants/permissions";
import GroupedTable from "../../../components/grouped-table";

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

  type CaisseGroupee = {

    id: string;

    agence_name: string;

    code_agence: string;

    prestataire: string | null;

    support: string;

    type: Caisse["type"];

    state: Caisse["state"];

    lignes: {

      code_caisse: string;

      devise: string;

      solde: number;

      proprietaire: string;

    }[];

    caisses: Caisse[];

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

  const caissesGroupees = useMemo<CaisseGroupee[]>(() => {

    const map = new Map<string, CaisseGroupee>();

    for (const caisse of response?.data ?? []) {

      const key = [
          caisse.code_agence,
          caisse.support,
          caisse.prestataire ?? "",
          caisse.type,
      ].join("-");

      if (!map.has(key)) {

        map.set(key, {

          id: key,

          agence_name: caisse.agence_name,

          code_agence: caisse.code_agence,

          support: caisse.support,

          prestataire: caisse.prestataire,

          type: caisse.type,

          state: caisse.state,

          lignes: [],

          caisses: [],

        });

      }

      const groupe = map.get(key)!;

      const devise =
      caisse.devises?.find(
          d => d.devise === caisse.devise_principale
      ) ?? caisse.devises?.[0];

    groupe.caisses.push(caisse);

    if (devise) {

        groupe.lignes.push({
          code_caisse: caisse.code_caisse,
          devise: devise.devise,
          solde: Number(devise.solde),
          proprietaire:
              caisse.type === "AGENCE"
                  ? caisse.agence_name
                  : caisse.agent_name ?? "Agent inconnu",
      });

    }

    }

    return Array.from(map.values());

  }, [response]);

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

  const columns: Column<CaisseGroupee>[] = [

    {
        header: "Support",
        accessor: "support",

        render: (_, row) => (

          <div className="flex flex-col gap-1">

              <span className="font-semibold text-slate-800">
                  {row.prestataire ?? "Caisse Agence"}
              </span>

              <span
                  className={`
                      inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-medium
                      ${
                          row.type === "AGENCE"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                      }
                  `}
              >
                  {row.type === "AGENCE"
                      ? "🏦 Caisse Agence"
                      : "👤 Caisse Agent"}
              </span>

              <span className="text-xs text-slate-500">
                  {row.support.replaceAll("_", " ")}
              </span>

          </div>

      ),
    },

    {
      header: "Caisses",
      accessor: "lignes",

      render: (_, row) => (

          <div className="space-y-2">

              {row.lignes.map((ligne) => (

                  <div
                      key={`${ligne.code_caisse}-${ligne.devise}`}
                      className="flex items-center justify-between gap-4"
                  >

                      <div className="min-w-0">

                          <div className="font-medium text-slate-800 leading-none">
                              {ligne.code_caisse}
                          </div>

                          <div className="text-[11px] text-slate-500 truncate">
                              {ligne.proprietaire}
                          </div>

                      </div>

                      <div className="text-right">

                          <div className="text-sm text-slate-500 leading-none">
                              {ligne.devise}
                          </div>

                          <div className="font-semibold text-slate-900 leading-none mt-1">
                              {ligne.solde.toLocaleString("fr-FR")}
                          </div>

                      </div>

                  </div>

              ))}

          </div>

        ),
    },

    {
        header: "Prestataire",
        accessor: "prestataire",

        render: (_value, row) => (

            <span className="text-sm text-slate-700 font-medium">
                {row.prestataire ?? "PHYSIQUE"}
            </span>

        ),
    },

    {
      header: "Type",
      accessor: "type",

      render: (value) => (

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

          <Building2 size={13} />

          {value === "AGENCE"
            ? "PRINCIPALE"
            : "SECONDAIRE"}

        </div>

      ),
    },

    {
      header: "Statut",
      accessor: "state",

      render: (value) =>

        value ? (

          <CaisseStatusBadge
            state={
              value as Caisse["state"]
            }
          />

        ) : (

          <span>-</span>

        ),
    },

    {
      header: "Actions",
      accessor: "id",

      render: (_v, row) => (

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >

          {/* OPEN */}

          {row.state === "FERMEE" && (

            <PermissionGate
              permissions={[
                PERMISSIONS.CAISSE_OPEN,
                PERMISSIONS.CAISSE_OPEN_AGENCE,
                PERMISSIONS.CAISSE_OPEN_USER,
              ]}
            >

              <Button
                onClick={() =>
                  openCaisse(row.id, {
                    onSuccess: () => {
                      setAppMessage({
                        variant: "success",
                        title: "Succès",
                        message: "Caisse ouverte avec succès",
                      });
                    },
                    onError: (error) =>
                      handleError(
                        error,
                        "Impossible d’ouvrir cette caisse",
                        "Ouverture refusée"
                      ),
                  })
                }
                className="h-9 rounded-xl px-3 text-xs"
              >
                <LockOpen size={14} />
                
              </Button>

            </PermissionGate>

          )}

          {/* CLOSE */}

          {row.state === "OUVERTE" && (

            <PermissionGate
              permissions={[
                PERMISSIONS.CAISSE_CLOSE,
                PERMISSIONS.CAISSE_CLOSE_AGENCE,
                PERMISSIONS.CAISSE_CLOSE_USER,
              ]}
            >

              <Button
                variant="secondary"
                onClick={() =>
                  closeCaisse(row.id, {
                    onSuccess: () => {
                      setAppMessage({
                        variant: "success",
                        title: "Succès",
                        message: "Caisse fermée avec succès",
                      });
                    },
                    onError: (error) =>
                      handleError(
                        error,
                        "Impossible de fermer cette caisse",
                        "Fermeture refusée"
                      ),
                  })
                }
                className="h-9 rounded-xl px-3 text-xs"
              >
                <Lock size={14} />
                
              </Button>

            </PermissionGate>

          )}

          <PermissionGate
            permissions={[
              PERMISSIONS.CAISSE_UPDATE,
            ]}
          >

            <Button
              variant="secondary"
              onClick={() =>
                alert("Edition bientôt disponible")
              }
              className="h-9 rounded-xl px-3 text-xs"
            >
              <Pencil size={14} />
              
            </Button>

          </PermissionGate>

          <PermissionGate
            permissions={[
              PERMISSIONS.CAISSE_DELETE,
            ]}
          >

            <Button
              variant="danger"
              onClick={() =>
                setSelectedId(row.id)
              }
              className="h-9 rounded-xl px-3 text-xs"
            >
              <Trash2 size={14} />
              
            </Button>

          </PermissionGate>

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

          <PermissionGate
            permissions={[
              PERMISSIONS.CAISSE_CREATE
            ]}
          >
            <Button
              onClick={() =>
                setOpenCreate(true)
              }
            >
              <Plus size={16} />
              Nouvelle caisse
            </Button>
          </PermissionGate>

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

        <GroupedTable<CaisseGroupee>
            data={caissesGroupees}
            columns={columns}
            loading={isLoading}
            groupBy="code_agence"
            groupTitle={(row) => (
                <div className="flex flex-col">

                    <span className="font-semibold text-slate-800">
                        {row.agence_name}
                    </span>

                    <span className="text-xs text-slate-500">
                        {row.code_agence}
                    </span>

                </div>
            )}
        />

      </div>

      {/* EMPTY */}

      {!isLoading &&
        caissesGroupees.length ===
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

      {meta && (

        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          totalItems={meta.total}
          perPage={meta.limit}
          onChange={setPage}
        />

      )}

      {/* MOVEMENT MODAL */}

      {/* CREATE MODAL */}

      {openCreate && (

        <CaisseFormModal
          open={openCreate}
          onClose={() =>
            setOpenCreate(false)
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