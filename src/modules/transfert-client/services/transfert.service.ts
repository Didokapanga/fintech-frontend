// src/modules/transfert-client/services/transfert.service.ts

import { api } from "../../../services/api";

export type TransfertFilters = {
  statut?: string;
  date_operation?: string;
};

export type CreateTransfertClientDto = {
  caisse_id: string;
  agence_exp: string;
  agence_dest: string;

  exp_nom: string;
  exp_postnom: string;
  exp_prenom: string;
  exp_phone: string;
  exp_type_piece: string;
  exp_numero_piece: string;

  dest_nom: string;
  dest_postnom: string;
  dest_prenom: string;
  dest_phone: string;
  dest_type_piece: string;
  dest_numero_piece: string;

  montant: number;
  frais: number;
  commission: number;
  devise: string;

  // 🔥 NOUVEAU
  date_operation: string;
};

export type TransfertClient = {
  id: string;
  code_reference: string;

  exp_nom: string;
  exp_postnom: string;
  exp_phone: string;

  dest_nom: string;
  dest_postnom: string;
  dest_phone: string;

  montant: number | string;
  devise: string;

  frais: number;
  commission: number;

  statut: string;

  created_at: string;
  date_operation?: string; // 🔥 NOUVEAU
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

// CREATE
export const createTransfertClient = async (
  data: CreateTransfertClientDto
) => {
  const res = await api.post(
    "/transfert-client",
    data
  );

  return res.data.data;
};

// GET MY TRANSFERTS + FILTERS
export const getMyTransferts = async (
  page = 1,
  limit = 10,
  filters?: TransfertFilters
): Promise<PaginatedResponse<TransfertClient>> => {
  const res = await api.get(
    "/transfert-client/me",
    {
      params: {
        page,
        limit,
        statut:
          filters?.statut || undefined,
        date_operation:
          filters?.date_operation || undefined,
      },
    }
  );

  return res.data;
};

// GET BY AGENCE + FILTERS
export const getTransfertsByAgence = async (
  agenceId: string,
  page = 1,
  limit = 10,
  filters?: TransfertFilters
): Promise<PaginatedResponse<TransfertClient>> => {
  const res = await api.get(
    `/transfert-client/agence/${agenceId}`,
    {
      params: {
        page,
        limit,
        statut:
          filters?.statut || undefined,
        date_operation:
          filters?.date_operation || undefined,
      },
    }
  );

  return res.data;
}; 