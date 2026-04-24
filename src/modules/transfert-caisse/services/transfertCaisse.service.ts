// src/modules/transfert-caisse/services/transfertCaisse.service.ts

import { api } from "../../../services/api";

export type CreateTransfertCaisseDto = {
  caisse_source_id: string;
  caisse_destination_id: string;
  montant: number;
  devise: string;
  date_operation: string;
};

export type TransfertFilters = {
  devise?: string;
  statut?: string;
  date_operation?: string;
};

// ✅ TYPE FINAL FRONT
export type TransfertCaisse = {
  id: string;
  caisse_source_id: string;
  caisse_destination_id: string;
  montant: number;
  devise: string;
  statut: string;
  date_operation: string;
  created_at: string;
};

type TransfertCaisseApi = {
  id: string;
  caisse_source_id: string;
  caisse_destination_id: string;
  montant: string;
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

// ✅ LIST + FILTERS
export const getTransferts = async (
  page = 1,
  limit = 10,
  filters?: TransfertFilters
): Promise<PaginatedResponse<TransfertCaisse>> => {
  const res = await api.get("/transferts", {
    params: {
      page,
      limit,
      devise: filters?.devise || undefined,
      statut: filters?.statut || undefined,
      date_operation: filters?.date_operation || undefined,
    },
  });

  return {
    data: res.data.data.map((t: TransfertCaisseApi) => ({
      ...t,
      montant: Number(t.montant),
    })),
    meta: res.data.meta,
  };
};