import { api } from "../../../services/api";

export type CreateRetraitDto = {
  code_reference: string;
  code_secret: string;
  caisse_id: string;
};

export type Retrait = {
  id: string;
  caisse_id: string;
  numero_piece: string;
  montant: number;
  devise: string;
  statut: string;
  created_at: string;
};

// ✅ type brut venant API
type RetraitApi = {
  id: string;
  caisse_id: string;
  numero_piece: string;
  montant: string; // ⚠️ string côté backend
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

export const createRetrait = async (data: CreateRetraitDto) => {
  const res = await api.post("/retraits", data);
  return res.data.data;
};

// 🔥 HISTORIQUE
export const getMyRetraits = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Retrait>> => {
  const res = await api.get("/retraits/me", {
    params: { page, limit },
  });

  console.log("🔥 API RETRAITS:", res.data);

  const raw: RetraitApi[] = res.data.data;

  return {
    data: raw.map((r) => ({
      ...r,
      montant: Number(r.montant), // ✅ conversion propre
    })),
    meta: res.data.meta,
  };
};