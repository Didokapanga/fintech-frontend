// src/modules/transfert-caisse/services/transfertCaisse.service.ts

import { useAuthStore } from "../../../app/store";
import { api } from "../../../services/api";
import type { CreateTransfertCaisseDto, TransfertCaisse, TransfertFilters } from "../types";

type TransfertCaisseApi = {
  id: string;

  code_reference: string;

  caisse_source_id: string;
  caisse_destination_id: string;

  source_code_caisse: string;
  destination_code_caisse: string;

  source_caisse_type: string;
  destination_caisse_type: string;

  agence_source_id: string;
  agence_source_code: string;
  agence_source_name: string;

  agence_destination_id: string;
  agence_destination_code: string;
  agence_destination_name: string;

  created_by: string;
  created_by_name: string;

  source_agent_name?: string | null;
  destination_agent_name?: string | null;

  montant: string;
  devise: string;

  statut: string;

  date_operation: string;

  created_at: string;
  updated_at: string;
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

  const user =
    useAuthStore.getState().user;

  const permissions =
    user?.permissions ?? [];

  /**
   * =====================================
   * GLOBAL
   * transfert_caisse.read
   * =====================================
   */
  if (
    permissions.includes(
      "transfert_caisse.read"
    )
  ) {

    const res =
      await api.get(
        "/transferts",
        {
          params: {
            page,
            limit,
            devise:
              filters?.devise ||
              undefined,
            statut:
              filters?.statut ||
              undefined,
            date_operation:
              filters?.date_operation ||
              undefined,
          },
        }
      );

    return {
      data:
        res.data.data.map(
          (
            t: TransfertCaisseApi
          ) => ({
            ...t,
            montant:
              Number(
                t.montant
              ),
          })
        ),

      meta:
        res.data.meta,
    };
  }

  /**
   * =====================================
   * MES TRANSFERTS
   * transfert_caisse.me
   * =====================================
   */
  if (
    permissions.includes(
      "transfert_caisse.me"
    )
  ) {

    const res =
      await api.get(
        "/transferts/me",
        {
          params: {
            page,
            limit,
            devise:
              filters?.devise ||
              undefined,
            statut:
              filters?.statut ||
              undefined,
            date_operation:
              filters?.date_operation ||
              undefined,
          },
        }
      );

    return {
      data:
        res.data.data.map(
          (
            t: TransfertCaisseApi
          ) => ({
            ...t,
            montant:
              Number(
                t.montant
              ),
          })
        ),

      meta:
        res.data.meta,
    };
  }

  return {
    data: [],
    meta: {
      page: 1,
      limit,
      total: 0,
      totalPages: 0,
    },
  };
};