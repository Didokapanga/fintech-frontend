// src/modules/retrait/services/retrait.service.ts

import { api } from "../../../services/api";

export type CreateRetraitDto = {
  code_reference: string;
  code_secret: string;
  caisse_id: string;
  numero_piece: string;
  created_by: string;
  user_agent: string;
};

export type Retrait = {
  id: string;
  caisse_id: string;
  numero_piece: string;
  montant: number;
  devise: string;
  statut: string;
  created_at: string;

  expediteur?: {
    nom: string;
    postnom: string;
    prenom: string;
    phone: string;
  };

  destinataire?: {
    nom: string;
    postnom: string;
    prenom: string;
    phone: string;
  };
};

type RetraitApi = {
  id: string;
  caisse_id: string;
  numero_piece: string;
  montant: string;
  devise: string;
  statut: string;
  created_at: string;

  // 🔥 optionnel si backend enrichi
  exp_nom?: string;
  exp_postnom?: string;
  exp_phone?: string;

  dest_nom?: string;
  dest_postnom?: string;
  dest_phone?: string;
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

export const createRetrait = async (data: CreateRetraitDto) => {
  const res = await api.post("/retraits", data);
  return res.data.data;
};

export const getMyRetraits = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Retrait>> => {
  const res = await api.get("/retraits/me", {
    params: { page, limit },
  });

  const raw: RetraitApi[] = res.data.data;

  return {
    data: raw.map((r) => ({
      ...r,
      montant: Number(r.montant),
    })),
    meta: res.data.meta,
  };
};