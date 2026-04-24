// src/modules/mouvement/services/mouvement.service.ts

import { api } from "../../../services/api";
import type { CreateMouvementDto } from "../types";

export interface MouvementFilters {
  type_mouvement?: string;
  devise?: string;
  statut?: string;
  date_operation?: string;
}

export interface MouvementCaisse {
  id: string;
  caisse_id: string;
  montant: number;
  devise: string;
  type_mouvement: string;
  statut: string;
  code_reference: string;
  date_operation: string;
  created_at: string;
  updated_at: string;
  agence_id?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const createMouvement = async (
  data: CreateMouvementDto
) => {
  const res = await api.post(
    "/mouvements",
    data
  );

  return res.data;
};

export const getMouvements = async (
  page = 1,
  limit = 10,
  filters?: MouvementFilters
): Promise<PaginatedResponse<MouvementCaisse>> => {
  const res = await api.get(
    "/mouvements/agence",
    {
      params: {
        page,
        limit,
        type_mouvement:
          filters?.type_mouvement || undefined,
        devise:
          filters?.devise || undefined,
        statut:
          filters?.statut || undefined,
        date_operation:
          filters?.date_operation || undefined,
      },
    }
  );

  // console.log(
  //   "🔥 API MOUVEMENTS =>",
  //   res.data
  // );

  return {
    // ✅ vrai chemin
    data:
      res.data?.data?.data ?? [],

    // ✅ vrai chemin
    meta:
      res.data?.data?.pagination ?? {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
  };
};