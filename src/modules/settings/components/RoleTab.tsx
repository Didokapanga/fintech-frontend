// src/modules/settings/components/roles/RoleTab.tsx

import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import {
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import {
  useRoles,
} from "../hooks/useRoles";

import type {
  Role,
} from "../types";

import RoleFormModal
from "./RoleFormModal";

import RoleDeleteModal
from "./RoleDeleteModal";

export default function RoleTab() {

  const {
    data,
    isLoading,
  } = useRoles();

  const roles: Role[] =
    data?.data ?? [];

  const [
    openForm,
    setOpenForm,
  ] = useState(false);

  const [
    openDelete,
    setOpenDelete,
  ] = useState(false);

  const [
    selectedRole,
    setSelectedRole,
  ] =
    useState<Role | null>(
      null
    );

  const columns:
    Column<Role>[] =
    useMemo(
      () => [

        {
          header: "Rôle",

          accessor:
            "role_name",

          render: (
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
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-100
                "
              >

                <Users
                  size={16}
                  className="
                    text-indigo-600
                  "
                />

              </div>

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

            </div>

          ),
        },

        {
          header:
            "Statut",

          accessor:
            "is_activated",

          render: (
            value
          ) => (

            <span
              className={`
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold

                ${
                  value
                    ? `
                      bg-emerald-100
                      text-emerald-700
                    `
                    : `
                      bg-red-100
                      text-red-700
                    `
                }
              `}
            >
              {value
                ? "Actif"
                : "Inactif"}
            </span>

          ),
        },

        {
          header:
            "Création",

          accessor:
            "created_at",

          render: (
            value
          ) => (

            <span
              className="
                text-slate-500
              "
            >
              {new Date(
                String(
                  value
                )
              ).toLocaleDateString()}
            </span>

          ),
        },

        {
          header:
            "Actions",

          accessor:
            "id",

          render: (
            _,
            row
          ) => (

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <button
                onClick={() => {

                  setSelectedRole(
                    row
                  );

                  setOpenForm(
                    true
                  );

                }}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-2
                  text-slate-600
                  transition-all
                  hover:bg-indigo-50
                  hover:text-indigo-600
                "
              >

                <Pencil
                  size={16}
                />

              </button>

              <button
                onClick={() => {

                  setSelectedRole(
                    row
                  );

                  setOpenDelete(
                    true
                  );

                }}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-2
                  text-red-600
                  transition-all
                  hover:bg-red-50
                "
              >

                <Trash2
                  size={16}
                />

              </button>

            </div>

          ),
        },

      ],
      []
    );

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
              text-xl
              font-semibold
              text-slate-900
            "
          >
            Rôles
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Gestion des rôles
            du système
          </p>

        </div>

        <button
          onClick={() => {

            setSelectedRole(
              null
            );

            setOpenForm(
              true
            );

          }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            hover:bg-blue-700
          "
        >

          <Plus size={18} />

          Nouveau rôle

        </button>

      </div>

      {/* TABLE */}

      <Table
        data={roles}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucun rôle"
        emptyDescription="Aucun rôle disponible."
      />

      {/* CREATE / UPDATE */}

      <RoleFormModal
        open={openForm}
        onClose={() => {

          setOpenForm(
            false
          );

          setSelectedRole(
            null
          );

        }}
        role={
          selectedRole
        }
      />

      {/* DELETE */}

      <RoleDeleteModal
        open={openDelete}
        onClose={() => {

          setOpenDelete(
            false
          );

          setSelectedRole(
            null
          );

        }}
        role={
          selectedRole
        }
      />

    </div>

  );
}