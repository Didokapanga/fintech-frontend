import { api } from "../../../services/api";

export type CreateRoleDto = {
  role_name: string;
};

export const getRoles =
  async () => {

    const res =
      await api.get(
        "/roles"
      );

    return res.data;
  };

export const createRole =
  async (
    data: CreateRoleDto
  ) => {

    const res =
      await api.post(
        "/roles",
        data
      );

    return res.data;
  };

export const updateRole =
  async (
    id: string,
    data: CreateRoleDto
  ) => {

    const res =
      await api.put(
        `/roles/${id}`,
        data
      );

    return res.data;
  };

export const deleteRole =
  async (
    id: string
  ) => {

    const res =
      await api.delete(
        `/roles/${id}`
      );

    return res.data;
  };