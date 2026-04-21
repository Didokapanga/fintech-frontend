import { api } from "../../../services/api";
import type { Caisse } from "../types";

export interface CreateCaisseDto {
  agence_id: string;
  agent_id?: string;
  type: string;
  devise: string;
  code_caisse: string;
}

// ✅ GET ALL
export const getCaisses = async (): Promise<Caisse[]> => {
  const res = await api.get("/caisses");
  return res.data?.data ?? [];
};

// ✅ GET ONE
export const getCaisse = async (id: string): Promise<Caisse> => {
  const res = await api.get(`/caisses/${id}`);
  return res.data?.data;
};

// ✅ BY AGENCE
export const getCaissesByAgence = async (agenceId: string) => {
  const res = await api.get(`/caisses/agence/${agenceId}`);
  return res.data?.data ?? [];
};

// ✅ CREATE
export const createCaisse = async (data: CreateCaisseDto) => {
  return api.post("/caisses", data);
};

// ✅ UPDATE
export const updateCaisse = async (id: string, data: CreateCaisseDto) => {
  return api.put(`/caisses/${id}`, data);
};

// ✅ DELETE
export const deleteCaisse = async (id: string) => {
  return api.delete(`/caisses/${id}`);
};

// ✅ OPEN
export const openCaisse = async (id: string) => {
  return api.post(`/caisses/${id}/open`);
};

// ✅ CLOSE
export const closeCaisse = async (id: string) => {
  return api.post(`/caisses/${id}/close`);
};