// src/modules/validation/services/validation.service.ts

import { api } from "../../../services/api";

export type TransfertClient = {
  id: string;
  client_exp: string;
  client_dest: string;
  agence_exp: string;
  montant: number;
  devise: string;
  statut: string;
  exp_nom: string;
  exp_postnom: string;
  exp_phone: string;
  dest_nom: string;
  dest_postnom: string;
  dest_phone: string;
  created_at: string;
};

type TransfertClientApi = {
  id: string;
  client_exp: string;
  client_dest: string;
  agence_exp: string;
  montant: string;
  devise: string;
  statut: string;

  exp_nom?: string;
  exp_postnom?: string;
  exp_phone?: string;

  dest_nom?: string;
  dest_postnom?: string;
  dest_phone?: string;

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

// GET LIST
export const getTransfertsToValidate = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<TransfertClient>> => {
  const res = await api.get("/transfert-client/validation", {
    params: { page, limit },
  });

  return {
    data: res.data.data.map((t: TransfertClientApi) => ({
      ...t,
      montant: Number(t.montant),

      exp_nom: t.exp_nom ?? "",
      exp_postnom: t.exp_postnom ?? "",
      exp_phone: t.exp_phone ?? "",

      dest_nom: t.dest_nom ?? "",
      dest_postnom: t.dest_postnom ?? "",
      dest_phone: t.dest_phone ?? "",
    })),
    meta: res.data.meta,
  };
};

// VALIDATE
export const validateOperation = async (data: {
  operation_type: string;
  reference_id: string;
  decision: "APPROUVE" | "REJETE";
  niveau: string;
  commentaire?: string;
}) => {
  const res = await api.post("/validations", data);
  return res.data;
};