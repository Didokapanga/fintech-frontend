// src/modules/transfert-caisse/services/transfertCaisse.service.ts

import { api } from "../../../services/api";

export type CreateTransfertCaisseDto = {
  caisse_source_id: string;
  caisse_destination_id: string;
  montant: number;
  devise: string;
};

// ✅ TYPE FINAL (frontend)
export type TransfertCaisse = {
  id: string;
  caisse_source_id: string;
  caisse_destination_id: string;
  montant: number;
  devise: string;
  statut: string;
  created_at: string;
};

// 🔥 TYPE BACKEND
type TransfertCaisseApi = {
  id: string;
  caisse_source_id: string;
  caisse_destination_id: string;
  montant: string; // 👈 IMPORTANT
  devise: string;
  statut: string;
  created_at: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ✅ CREATE
export const createTransfertCaisse = async (
  data: CreateTransfertCaisseDto
) => {
  const res = await api.post("/transferts", data);
  return res.data.data;
};

// ✅ LIST
export const getTransferts = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<TransfertCaisse>> => {
  const res = await api.get("/transferts", {
    params: { page, limit },
  });

  // console.log("🔥 API RAW:", res.data);

  return {
    data: res.data.data.map((t: TransfertCaisseApi) => ({
      ...t,
      montant: Number(t.montant), // ✅ conversion propre
    })),
    meta: res.data.meta,
  };
};