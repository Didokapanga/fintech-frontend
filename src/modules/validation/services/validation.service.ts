// src/modules/validation/services/validation.service.ts

import { api } from "../../../services/api";

export type TransfertClient = {
  id: string;
  client_exp: string;
  client_dest: string;
  montant: number;
  devise: string;
  statut: string;
  created_at: string;
};

type TransfertClientApi = {
  id: string;
  client_exp: string;
  client_dest: string;
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

// ✅ GET VALIDATION LIST
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
    })),
    meta: res.data.meta,
  };
};

// ✅ VALIDATE / REJECT
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