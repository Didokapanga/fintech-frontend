// src/modules/ledger/services/ledger.service.ts

import { api } from "../../../services/api";

export type Ledger = {
  id: string;

  type_operation: string;
  libelle_operation: string;

  montant: number;
  devise: string;
  montant_display?: string;

  sens: "ENTREE" | "SORTIE";

  created_at: string;

  code_caisse?: string;

  agence_name?: string;
  code_agence?: string;
  agence_display?: string;

  user_name?: string;
  agent_operation?: string;

  reference_type?: string;
  reference_metier?: string;

  code_reference?: string;

  expediteur_complet?: string;
  destinataire_complet?: string;

  retrait_statut?: string;
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

// 🔥 FILTRES
export type LedgerFilters = {
  type_operation?: string;
  sens?: string;
  date_from?: string;
  date_to?: string;
};

/**
 * =========================================
 * 🔥 NORMALIZE LEDGER
 * =========================================
 */
const normalizeLedger = (
  raw: LedgerApi[]
): Ledger[] => {
  return raw.map((l) => ({
    ...l,

    montant: Number(l.montant),

    /**
     * 🔥 référence métier lisible
     */
    reference_metier:
      l.code_reference ||
      l.reference_type ||
      "-",

    /**
     * 🔥 agent affichage
     */
    agent_operation:
      l.user_name ||
      "SYSTÈME",

    /**
     * 🔥 agence affichage
     */
    agence_display:
      l.code_agence && l.agence_name
        ? `${l.code_agence} - ${l.agence_name}`
        : l.agence_name || "-",

    /**
     * 🔥 nettoyage client
     */
    expediteur_complet:
      l.expediteur_complet?.trim() ||
      "-",

    destinataire_complet:
      l.destinataire_complet?.trim() ||
      "-",

    /**
     * 🔥 montant display
     */
    montant_display: `${Number(
      l.montant
    ).toLocaleString()} ${l.devise}`,
  }));
};

/**
 * =========================================
 * 🔴 LEDGER PAR CAISSE
 * =========================================
 */
export const getLedgerByCaisse = async (
  caisse_id: string,
  page = 1,
  limit = 10,
  filters?: LedgerFilters
): Promise<PaginatedResponse<Ledger>> => {

  const res = await api.get(
    `/ledger/${caisse_id}`,
    {
      params: {
        page,
        limit,
        ...filters,
      },
    }
  );

  const raw: LedgerApi[] =
    res.data.data;

  return {
    data: normalizeLedger(raw),

    meta: res.data.meta,
  };
};

/**
 * =========================================
 * 🔵 MON LEDGER
 * =========================================
 */
export const getMyLedger = async (
  page = 1,
  limit = 10,
  filters?: LedgerFilters
): Promise<PaginatedResponse<Ledger>> => {

  const res = await api.get(
    "/ledger/me",
    {
      params: {
        page,
        limit,
        ...filters,
      },
    }
  );

  const raw: LedgerApi[] =
    res.data.data;

  return {
    data: normalizeLedger(raw),

    meta: res.data.meta,
  };
};