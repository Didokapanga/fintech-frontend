// src/modules/settings/components/permissions/PermissionTab.tsx

import { useMemo, useState } from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { usePermissions } from "../hooks/usePermissions";
import type { Column } from "../../../components/ui/Table.types";
import type { Permission } from "../types";
import { Table } from "../../../components/ui";
import PermissionDeleteModal from "./PermissionDeleteModal";
import PermissionFormModal from "./PermissionFormModal";

export default function PermissionTab() {

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    openForm,
    setOpenForm,
    ] = useState(false);

  const [
    openDelete,
    setOpenDelete,
    ] = useState(false);

  const [
    selectedPermission,
    setSelectedPermission,
    ] =
    useState<Permission | null>(
        null
    );
  
  const limit = 5;

  const {
    data,
    isLoading,
  } = usePermissions(
    page,
    limit,
    search
  );

  const permissions =
    data?.data?.data ?? [];

  const columns: Column<Permission>[] =
    useMemo(
      () => [

        {
          header: "Code",
          accessor: "code",

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

              <ShieldCheck
                size={16}
                className="
                  text-indigo-500
                "
              />

              <span
                className="
                  font-semibold
                  text-slate-800
                "
              >
                {String(value)}
              </span>

            </div>

          ),
        },

        {
          header: "Nom",

          accessor:
            "permission_name",
        },

        {
          header: "Description",

          accessor:
            "description",

          render: (
            value
          ) => (

            <span
              className="
                text-slate-500
              "
            >
              {String(
                value || "-"
              )}
            </span>

          ),
        },

        {
          header: "Action",

          accessor: "id",

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

                setSelectedPermission(
                    row
                );

                setOpenForm(true);

                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-slate-700
                  hover:bg-indigo-50
                  hover:text-indigo-600
                "
              >

                <Pencil
                  size={15}
                />

              </button>

              <button
                onClick={() => {

                setSelectedPermission(
                    row
                );

                setOpenDelete(true);

                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-red-600
                  hover:bg-red-50
                "
              >

                <Trash2
                  size={15}
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
            Permissions
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Gestion des permissions
            du système
          </p>

        </div>

        <button
          onClick={() => {

            setSelectedPermission(
                null
            );

            setOpenForm(true);

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
            hover:bg-blue-700
          "
        >

          <Plus size={18} />

          Nouvelle permission

        </button>

      </div>

      {/* SEARCH */}

      <div
        className="
          relative
          max-w-md
        "
      >

        <Search
          size={18}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Rechercher une permission..."
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            py-3
            pl-10
            pr-4
            text-sm
            outline-none
            focus:border-blue-500
          "
        />

      </div>

      {/* TABLE */}

      <Table
        data={permissions}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucune permission"
        emptyDescription="Aucune permission n'est disponible pour le moment."
      />

      {/* PAGINATION */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(
              (p) => p - 1
            )
          }
          className="
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            text-sm
          "
        >
          Précédent
        </button>

        <span
          className="
            text-sm
            text-slate-500
          "
        >
          Page {page}
        </span>

        <button
          onClick={() =>
            setPage(
              (p) => p + 1
            )
          }
          className="
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            text-sm
          "
        >
          Suivant
        </button>

      </div>

        {/* ====================================== */}
        {/* CREATE / UPDATE */}
        {/* ====================================== */}

        <PermissionFormModal
        open={openForm}
        onClose={() => {

            setOpenForm(false);

            setSelectedPermission(
            null
            );

        }}
        permission={
            selectedPermission
        }
        />

        {/* ====================================== */}
        {/* DELETE */}
        {/* ====================================== */}

        <PermissionDeleteModal
        open={openDelete}
        onClose={() => {

            setOpenDelete(false);

            setSelectedPermission(
            null
            );

        }}
        permission={
            selectedPermission
        }
        />

    </div>

  );
}