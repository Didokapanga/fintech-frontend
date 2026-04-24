// src/modules/retrait/services/retrait.service.ts

import { api } from "../../../services/api";

export type RetraitFilters = {
  statut?: string;
  date_operation?: string;
};

export type CreateRetraitDto = {
  code_reference: string;
  code_secret: string;
  caisse_id: string;
  numero_piece: string;
  date_operation?: string;
  created_by: string;
  user_agent: string;
};

export type PersonneRetrait = {
  nom: string;
  postnom: string;
  prenom: string;
  phone: string;
};

export type Retrait = {
  id: string;
  caisse_id: string;
  numero_piece: string;
  montant: number;
  devise: string;
  statut: string;
  created_at: string;
  date_operation?: string;

  expediteur?: PersonneRetrait;
  destinataire?: PersonneRetrait;
};

type RetraitApi = {
  id: string;
  caisse_id: string;
  numero_piece: string;
  montant: string | number;
  devise: string;
  statut: string;
  created_at: string;
  date_operation?: string;

  // ✅ backend réel
  expediteur?: PersonneRetrait;
  destinataire?: PersonneRetrait;
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

// ========================
// CREATE RETRAIT
// ========================
export const createRetrait = async (
  data: CreateRetraitDto
) => {
  const res = await api.post(
    "/retraits",
    data
  );

  return res.data.data;
};

// ========================
// GET MY RETRAITS
// ========================
export const getMyRetraits = async (
  page = 1,
  limit = 10,
  filters?: RetraitFilters
): Promise<PaginatedResponse<Retrait>> => {
  const res = await api.get(
    "/retraits/me",
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

  console.log(
    "🔥 RETRAITS API:",
    res.data
  );

  const raw: RetraitApi[] =
    res.data?.data ?? [];

  return {
    data: raw.map((r) => ({
      id: r.id,
      caisse_id: r.caisse_id,
      numero_piece: r.numero_piece,
      montant: Number(r.montant || 0),
      devise: r.devise,
      statut: r.statut,
      created_at: r.created_at,
      date_operation: r.date_operation,

      // ✅ utiliser directement ce que le backend renvoie
      expediteur: r.expediteur,
      destinataire: r.destinataire,
    })),

    meta:
      res.data?.meta || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
      },
  };
};