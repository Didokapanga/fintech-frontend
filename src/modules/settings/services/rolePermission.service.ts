import { api } from "../../../services/api";

import type {
  AssignPermissionsDto,
  RolePermission,
} from "../types";

export const getRolePermissions =
  async (
    roleId: string
  ): Promise<RolePermission[]> => {

    const res =
      await api.get(
        `/role-permissions/${roleId}`
      );

    return res.data.data;
  };

export const assignMultiplePermissions =
  async (
    data: AssignPermissionsDto
  ) => {

    const res =
      await api.post(
        "/role-permissions/assign-multiple",
        data
      );

    return res.data;
  };

export const removeRolePermission =
  async (
    roleId: string,
    permissionId: string
  ) => {

    const res =
      await api.delete(
        `/role-permissions/${roleId}/${permissionId}`
      );

    return res.data;
  };