import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  assignMultiplePermissions,
  getRolePermissions,
  removeRolePermission,
} from "../services/rolePermission.service";
import type { RemoveRolePermissionDto } from "../types";

export const useRolePermissions = (
  roleId?: string
) =>
  useQuery({
    queryKey: [
      "role-permissions",
      roleId,
    ],

    enabled: !!roleId,

    queryFn: () =>
      getRolePermissions(
        roleId!
      ),
  });

export const useAssignPermissions =
  () => {

    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        assignMultiplePermissions,

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "role-permissions",
          ],
        });

      },
    });
  };

  export const useRemoveRolePermission =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn: (
        data: RemoveRolePermissionDto
      ) =>
        removeRolePermission(
          data.roleId,
          data.permissionId
        ),

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "role-permissions",
          ],
        });

      },

    });

  };