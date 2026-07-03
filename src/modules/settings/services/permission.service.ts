import { api } from "../../../services/api";

export type PermissionPayload = {
  code: string;

  permission_name: string;

  description?: string;
};

export const getPermissions =
  async (
    page = 1,
    limit = 20,
    search = ""
  ) => {

    const offset =
      (page - 1) * limit;

    const res =
      await api.get(
        "/permissions",
        {
          params: {
            limit,
            offset,
            search,
          },
        }
      );

    return res.data;
  };

export const createPermission =
  async (
    data: PermissionPayload
  ) => {

    const res =
      await api.post(
        "/permissions",
        data
      );

    return res.data;
  };

export const updatePermission =
  async (
    id: string,
    data: PermissionPayload
  ) => {

    const res =
      await api.put(
        `/permissions/${id}`,
        data
      );

    return res.data;
  };

export const deletePermission =
  async (
    id: string
  ) => {

    const res =
      await api.delete(
        `/permissions/${id}`
      );

    return res.data;
  };

export const getPermissionById =
  async (
    id: string
  ) => {

    const res =
      await api.get(
        `/permissions/${id}`
      );

    return res.data.data;
  };