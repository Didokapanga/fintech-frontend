import { api } from "../../../services/api";

export type CreateTransfertClientDto = {
  caisse_id: string;
  agence_exp: string;
  agence_dest: string;
  client_exp: string;
  client_dest: string;
  montant: number;
  devise: string;
  type_piece: string;
  numero_piece: string;
};

export type TransfertClient = {
  id: string;
  montant: number;
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
export const createTransfertClient = async (
  data: CreateTransfertClientDto
) => {
  const res = await api.post("/transfert-client", data);
  return res.data.data;
};

// ✅ GET BY AGENT (ME)
export const getMyTransferts = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<TransfertClient>> => {
  const res = await api.get("/transfert-client/me", {
    params: { page, limit },
  });

  return res.data;
};

// ✅ GET BY AGENCE
export const getTransfertsByAgence = async (
  agenceId: string,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<TransfertClient>> => {
  const res = await api.get(`/transfert-client/agence/${agenceId}`, {
    params: { page, limit },
  });

  return res.data;
};