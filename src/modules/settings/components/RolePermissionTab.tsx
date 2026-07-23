// src/modules/settings/components/RolePermissionTab.tsx

import {
  useMemo,
  useState,
} from "react";

import {
  Users,
  Search,
} from "lucide-react";

import {
  useRoles,
} from "../hooks/useRoles";

import {
  usePermissions,
} from "../hooks/usePermissions";

import {
  useAssignPermissions,
  useRolePermissions,
  useRemoveRolePermission,
} from "../hooks/useRolePermissions";

import type {
  Role,
  Permission,
} from "../types";

import AppMessageState
from "../../../components/ui/AppMessageState";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";


export default function RolePermissionTab() {

  const [
    selectedRole,
    setSelectedRole,
  ] = useState<Role | null>(
    null
  );

  const [
    search,
    setSearch,
  ] = useState("");

  /* ===================================== */
  /* ROLES                                 */
  /* ===================================== */

  const {
    data: rolesResponse,
  } = useRoles();

  const roles: Role[] =
    rolesResponse?.data ?? [];

  /* ===================================== */
  /* PERMISSIONS                           */
  /* ===================================== */

  const {
    data: permissionsResponse,
  } = usePermissions(
    1,
    1000,
    search
  );

  const permissions =
    useMemo(
      () =>
        permissionsResponse
          ?.data?.data ?? [],
      [permissionsResponse]
    ) as Permission[];

  /* ===================================== */
  /* ROLE PERMISSIONS                      */
  /* ===================================== */

  const {
    data:
      rolePermissions,
  } =
    useRolePermissions(
      selectedRole?.id
    );

//     console.log(
//   "ROLE PERMISSIONS",
//   rolePermissions
// );

  const rolePermissionIds =
    useMemo(
        () =>
        rolePermissions?.map(
            (
            permission
            ) =>
            permission.permission_id
        ) ?? [],
        [rolePermissions]
    );

  const selectedPermissions = rolePermissionIds;
  

  /* ===================================== */
  /* MUTATIONS                             */
  /* ===================================== */

  const assignMutation =
  useAssignPermissions();

  const {
    mutate: savePermissions,
    appMessage,
    clearMessage,
  } =
    useApiMutationWithFeedback({

      mutationFn:
        assignMutation.mutateAsync,

      successMessage:
        "Permissions enregistrées avec succès",

      errorMessage:
        "Impossible d'enregistrer les permissions",

      invalidateQueries: [
        "role-permissions",
      ],

    });

  const removeMutation =
    useRemoveRolePermission();

  /* ===================================== */
  /* FILTER                                */
  /* ===================================== */

  const filteredPermissions =
    useMemo(
      () =>
        permissions.filter(
          (
            permission
          ) =>
            permission.permission_name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            permission.code
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        ),
      [
        permissions,
        search,
      ]
    );

  /* ===================================== */
  /* TOGGLE                                */
  /* ===================================== */

  const togglePermission = (
    permissionId: string
  ) => {

    if (!selectedRole) {
      return;
    }

    const alreadyAssigned =
      selectedPermissions.includes(permissionId);

    if (alreadyAssigned) {

      removeMutation.mutate({
        roleId: selectedRole.id,
        permissionId,
      });

      return;
    }

    savePermissions({
      role_id: selectedRole.id,
      permission_ids: [permissionId],
    });

  };

  /* ===================================== */
  /* SAVE                                  */
  /* ===================================== */

  return (

    <div
      className="
        grid
        gap-6
        xl:grid-cols-[300px_1fr]
      "
    >

      {/* ROLES */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-4
        "
      >

        <div
          className="
            mb-4
            flex
            items-center
            gap-2
          "
        >

          <Users size={18} />

          <h3
            className="
              font-semibold
            "
          >
            Rôles
          </h3>

        </div>

        <div
          className="
            space-y-2
          "
        >

          {roles.map(
            (
              role
            ) => (

              <button
                key={role.id}
                onClick={() => {

                setSelectedRole(role);

                }}
                className={`
                  w-full
                  rounded-2xl
                  px-4
                  py-3
                  text-left
                  transition-all

                  ${
                    selectedRole?.id ===
                    role.id
                      ? `
                        bg-blue-600
                        text-white
                      `
                      : `
                        bg-slate-50
                        hover:bg-slate-100
                      `
                  }
                `}
              >

                <div
                  className="
                    font-semibold
                  "
                >
                  {role.role_name}
                </div>

              </button>

            )
          )}

        </div>

      </div>

      {/* PERMISSIONS */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
        "
      >
        {appMessage && (

        <div className="mb-4">

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

        </div>

      )}

        {!selectedRole ? (

          <div
            className="
              flex
              h-72
              items-center
              justify-center
              text-slate-400
            "
          >
            Sélectionnez un rôle
          </div>

        ) : (

          <>

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
                    font-bold
                  "
                >
                  {
                    selectedRole.role_name
                  }
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Gestion des permissions
                </p>

              </div>

            </div>

            <div
              className="
                relative
                mt-5
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
                "
              />

            </div>

            <div
              className="
                mt-6
                max-h-[650px]
                overflow-y-auto
                pr-2
                grid
                grid-cols-1
                gap-3
                lg:grid-cols-2
              "
            >

              {filteredPermissions.map(
                (
                  permission
                ) => {

                  const checked =
                    selectedPermissions.includes(
                      permission.id
                    );

                  return (

                    <label
                      key={
                        permission.id
                      }
                      className={`
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        p-3
                        cursor-pointer
                        transition-all

                        ${
                          checked
                            ? `
                              border-blue-500
                              bg-blue-50
                            `
                            : `
                              border-slate-200
                              hover:bg-slate-50
                            `
                        }
                      `}
                    >

                      <input
                        type="checkbox"
                        checked={
                          checked
                        }
                        onChange={() =>
                          togglePermission(
                            permission.id
                          )
                        }
                        className="
                          mt-1
                          h-4
                          w-4
                        "
                      />

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        <div
                          className="
                            truncate
                            text-sm
                            font-semibold
                            text-slate-800
                          "
                        >
                          {
                            permission.permission_name
                          }
                        </div>

                        <div
                          className="
                            mt-1
                            truncate
                            text-xs
                            text-slate-500
                          "
                        >
                          {
                            permission.code
                          }
                        </div>

                      </div>

                    </label>

                  );
                }
              )}

            </div>

          </>

        )}

      </div>

    </div>

  );
}