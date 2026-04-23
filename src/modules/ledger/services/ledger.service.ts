// src/modules/ledger/services/ledger.service.ts
import { api } from "../../../services/api";

export type Ledger = {
  id: string;
  type_operation: string;
  montant: number;
  devise: string;
  sens: "ENTREE" | "SORTIE";
  caisse_id: string;
  reference_id: string;
  reference_type: string;
  created_at: string;
};

// 🔥 API RAW
type LedgerApi = Omit<Ledger, "montant"> & {
  montant: string;
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

// 🔴 ADMIN (par caisse)
export type LedgerFilters = {
  type_operation?: string;
  sens?: string;
  date_from?: string;
  date_to?: string;
};

export const getLedgerByCaisse = async (
  caisse_id: string,
  page = 1,
  limit = 10,
  filters?: LedgerFilters
): Promise<PaginatedResponse<Ledger>> => {
  const res = await api.get(`/ledger/${caisse_id}`, {
    params: {
      page,
      limit,
      ...filters, // 🔥 important
    },
  });

  const raw: LedgerApi[] = res.data.data;

  return {
    data: raw.map((l) => ({
      ...l,
      montant: Number(l.montant),
    })),
    meta: res.data.meta,
  };
};

export const getMyLedger = async (
  page = 1,
  limit = 10,
  filters?: LedgerFilters
): Promise<PaginatedResponse<Ledger>> => {
  const res = await api.get("/ledger/me", {
    params: {
      page,
      limit,
      ...filters, // 🔥 important
    },
  });

  const raw: LedgerApi[] = res.data.data;

  return {
    data: raw.map((l) => ({
      ...l,
      montant: Number(l.montant),
    })),
    meta: res.data.meta,
  };
};