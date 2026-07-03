// src/modules/mouvement/services/mouvement.service.ts

import { api } from "../../../services/api";
import type { CreateMouvementDto, MouvementCaisse } from "../types";

export interface MouvementFilters {
  type_mouvement?: string;
  devise?: string;
  statut?: string;
  date_operation?: string;
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
    "/mouvements/agence/me",
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
    data: res.data?.data ?? [],

    meta:
      res.data?.meta ?? {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
  };
};