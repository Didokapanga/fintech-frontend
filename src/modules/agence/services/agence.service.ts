// src/modules/agence/services/agence.service.ts
import { api } from "../../../services/api";
import type { CreateAgenceDto } from "../types";

export type Agence = {
  id: string;
  libelle: string;
  code_agence: string;
};

export const getAgences = async (): Promise<Agence[]> => {
  const res = await api.get("/agences");
  return res.data.data || res.data; // selon ton backend
};

export const createAgence = async (data: CreateAgenceDto) => {
  return api.post("/agences", data);
};

export const deleteAgence = async (id: string) => {
  return api.delete(`/agences/${id}`);
};



// export const getAgences = async (): Promise<Agence[]> => {
//   const res = await api.get("/agences");
//   return res.data.data ?? res.data; // selon ton backend
// };