import { api } from "../../../services/api";
import type {
  Agence,
  CreateAgenceDto,
} from "../types";

/**
 * =========================================
 * GET AGENCES
 * =========================================
 */
export const getAgences = async (): Promise<
  Agence[]
> => {
  const res = await api.get(
    "/agences"
  );

  return (
    res.data.data ||
    res.data
  );
};

/**
 * =========================================
 * CREATE AGENCE
 * =========================================
 */
export const createAgence = async (
  data: CreateAgenceDto
) => {
  const res = await api.post(
    "/agences",
    data
  );

  return res.data;
};

/**
 * =========================================
 * DELETE AGENCE
 * =========================================
 */
export const deleteAgence = async (
  id: string
) => {
  const res = await api.delete(
    `/agences/${id}`
  );

  return res.data;
};