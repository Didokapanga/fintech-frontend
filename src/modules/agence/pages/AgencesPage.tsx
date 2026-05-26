// src/modules/agence/pages/AgencesPage.tsx

import {
  Building2,
  Globe2,
  Landmark,
  MapPin,
  Plus,
  ShieldCheck,
  Trash2,
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

import ConfirmModal from "../../../components/ui/ConfirmModal";

import AgenceFormModal from "../components/AgenceFormModal";

import {
  useAgences,
  useDeleteAgence,
} from "../hooks/useAgences";

import type {
  Agence,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function AgencesPage() {

  /* ------------------------------------------------------------------------ */
  /*                                   QUERY                                  */
  /* ------------------------------------------------------------------------ */

  const {
    data,
    isLoading,
  } =
    useAgences();

  const agences =
    useMemo(
      () => data ?? [],
      [data]
    );

  /* ------------------------------------------------------------------------ */
  /*                                  DELETE                                  */
  /* ------------------------------------------------------------------------ */

  const {
    mutate:
      deleteAgence,

    isPending,
  } =
    useDeleteAgence();

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

  const [
    open,
    setOpen,
  ] =
    useState(false);

  const [
    selectedId,
    setSelectedId,
  ] =
    useState<string | null>(
      null
    );

  /* ------------------------------------------------------------------------ */
  /*                                  ACTIONS                                 */
  /* ------------------------------------------------------------------------ */

  const handleDelete =
    () => {

      if (!selectedId)
        return;

      deleteAgence(
        selectedId,
        {
          onSuccess:
            () =>
              setSelectedId(
                null
              ),
        }
      );
    };

  /* ------------------------------------------------------------------------ */
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<Agence>[] =
      [

        /* -------------------------------------------------------------- */
        /* AGENCE                                                        */
        /* -------------------------------------------------------------- */

        {
          header:
            "Agence",

          accessor:
            "libelle",

          render: (
            value,
            row
          ) => (

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-50
                  text-indigo-600
                "
              >

                <Building2
                  size={20}
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
                  {value}
                </span>

                <span
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  {row.code_agence}
                </span>

              </div>

            </div>
          ),
        },

        /* -------------------------------------------------------------- */
        /* CODE                                                           */
        /* -------------------------------------------------------------- */

        {
          header:
            "Code",

          accessor:
            "code_agence",

          render: (
            value
          ) => (

            <span
              className="
                rounded-xl
                bg-slate-100
                px-3
                py-2
                font-mono
                text-xs
                font-semibold
                tracking-wide
                text-slate-700
              "
            >
              {value}
            </span>
          ),
        },

        /* -------------------------------------------------------------- */
        /* VILLE                                                          */
        /* -------------------------------------------------------------- */

        {
          header:
            "Ville",

          accessor:
            "ville",

          render: (
            value
          ) => (

            <div
              className="
                flex
                items-center
                gap-2
                text-slate-700
              "
            >

              <Globe2
                size={15}
                className="
                  text-slate-400
                "
              />

              <span
                className="
                  font-medium
                "
              >
                {value}
              </span>

            </div>
          ),
        },

        /* -------------------------------------------------------------- */
        /* COMMUNE                                                        */
        /* -------------------------------------------------------------- */

        {
          header:
            "Commune",

          accessor:
            "commune",

          render: (
            value
          ) => (

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <MapPin
                size={15}
                className="
                  text-slate-400
                "
              />

              <span
                className="
                  text-slate-600
                "
              >
                {value || "-"}
              </span>

            </div>
          ),
        },

        /* -------------------------------------------------------------- */
        /* STATUS                                                         */
        /* -------------------------------------------------------------- */

        {
          header:
            "Statut",

          accessor:
            "id",

          render: () => (

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

              <ShieldCheck
                size={14}
              />

              Active

            </div>
          ),
        },

        /* -------------------------------------------------------------- */
        /* ACTIONS                                                        */
        /* -------------------------------------------------------------- */

        {
          header:
            "Actions",

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
                justify-end
              "
            >

              <button
                onClick={() =>
                  setSelectedId(
                    row.id
                  )
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-red-700
                  transition-all
                  hover:bg-red-100
                "
              >

                <Trash2
                  size={15}
                />

                Supprimer

              </button>

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
        min-h-screen
      "
    >

      <div
        className="
          mx-auto
          max-w-[1700px]
          space-y-6
          px-0
          py-0
        "
      >

        {/* -------------------------------------------------------------- */}
        {/* HEADER                                                         */}
        {/* -------------------------------------------------------------- */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            px-8
            py-8
            shadow-[0_1px_2px_rgba(16,24,40,0.04)]
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              right-0
              top-0
              h-72
              w-72
              rounded-full
              bg-indigo-50
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-6
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >

            {/* LEFT */}

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

                <Landmark
                  size={13}
                />

                Réseau d’agences

              </div>

              <h1
                className="
                  mt-5
                  text-[38px]
                  font-semibold
                  tracking-[-0.04em]
                  text-slate-900
                "
              >
                Gestion des agences
              </h1>

              <p
                className="
                  mt-3
                  max-w-3xl
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                Administrez les agences,
                les structures régionales
                et les points financiers
                de votre réseau.
              </p>

            </div>

            {/* RIGHT */}

            <div
              className="
                flex
                flex-col
                gap-4
                xl:items-end
              "
            >

              {/* COUNT */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  py-3
                "
              >

                <Building2
                  size={18}
                  className="
                    text-slate-400
                  "
                />

                <div>

                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Total agences
                  </p>

                  <p
                    className="
                      mt-1
                      text-lg
                      font-semibold
                      text-slate-900
                    "
                  >
                    {
                      agences.length
                    }
                  </p>

                </div>

              </div>

              {/* ACTION */}

              <Button
                onClick={() =>
                  setOpen(true)
                }
                className="
                  h-14
                  rounded-2xl
                  bg-indigo-600
                  px-6
                  hover:bg-indigo-700
                "
              >

                <Plus
                  size={17}
                />

                Nouvelle agence

              </Button>

            </div>

          </div>

        </section>

        {/* -------------------------------------------------------------- */}
        {/* TABLE                                                          */}
        {/* -------------------------------------------------------------- */}

        <Table<Agence>
          data={agences}
          columns={columns}
          loading={isLoading}
          emptyTitle="Aucune agence trouvée"
          emptyDescription="Aucune agence n’a encore été enregistrée dans le système."
        />

      </div>

      {/* -------------------------------------------------------------- */}
      {/* CREATE MODAL                                                   */}
      {/* -------------------------------------------------------------- */}

      <AgenceFormModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />

      {/* -------------------------------------------------------------- */}
      {/* DELETE MODAL                                                   */}
      {/* -------------------------------------------------------------- */}

      <ConfirmModal
        open={
          !!selectedId
        }
        onClose={() =>
          setSelectedId(
            null
          )
        }
        onConfirm={
          handleDelete
        }
        loading={
          isPending
        }
        title="Supprimer agence"
        description="Cette action est irréversible et supprimera définitivement l’agence sélectionnée."
      />

    </div>
  );
}