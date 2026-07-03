// src/modules/retrait/services/retrait.service.ts

import { api } from "../../../services/api";
import type {
  CreateRetraitDto,
  PersonneRetrait,
  Retrait,
} from "../types";

export type RetraitFilters = {
  statut?: string;
  date_operation?: string;
};

export type TransfertRetrait = {
  id: string;

  code_reference: string;

  agence_exp: string;
  agence_exp_name: string;

  agence_dest: string;
  agence_dest_name: string;

  caisse_id: string;
  code_caisse: string;

  created_by: string;
  agent_name: string;

  expediteur_id: string;
  expediteur_name: string;
  expediteur_type_piece: string;
  expediteur_numero_piece: string;
  expediteur_telephone: string;

  destinataire_id: string;
  destinataire_name: string;
  destinataire_type_piece: string;
  destinataire_numero_piece: string;
  destinataire_telephone: string;

  devise_source: string;
  devise_destination: string;

  montant_source: string;
  montant_destination: string;

  frais: string;
  montant_total: string;

  taux_utilise: string;
  type_taux_utilise: string;

  mode_paiement: string;

  statut: string;

  date_operation: string;
  created_at: string;
  updated_at: string;
};

type RetraitApi = {
  id: string;

  agence_id: string;
  agence_name: string;
  code_agence: string;

  caisse_id: string;
  code_caisse: string;
  caisse_type: string;

  agent_name: string;

  transfert_id: string;

  code_reference: string;

  numero_piece: string;

  montant: string;
  devise: string;

  montant_source: string;
  montant_destination: string;

  devise_source: string;
  devise_destination: string;

  frais: string;
  montant_total: string;

  mode_paiement: string;

  statut: string;
  transfert_statut: string;

  created_by: string;

  date_operation: string;
  created_at: string;
  updated_at: string;

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

// ===================================
// CREATE RETRAIT
// ===================================
export const createRetrait = async (
  data: CreateRetraitDto
) => {
  const res = await api.post(
    "/retraits",
    data
  );

  return res.data.data;
};

// ===================================
// TRANSFERTS A RETIRER
// GET /transfert-client/retrait
// ===================================
export const getTransfertsRetrait =
  async (
    page = 1,
    limit = 10
  ): Promise<
    PaginatedResponse<TransfertRetrait>
  > => {

    const res = await api.get(
      "/transfert-client/retrait",
      {
        params: {
          page,
          limit,
        },
      }
    );

    return {
      data:
        res.data?.data ?? [],

      meta:
        res.data?.meta || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
        },
    };
  };

// ===================================
// MY RETRAITS
// ===================================
export const getMyRetraits = async (
  page = 1,
  limit = 10,
  filters?: RetraitFilters
): Promise<
  PaginatedResponse<Retrait>
> => {

  const res = await api.get(
    "/retraits/me",
    {
      params: {
        page,
        limit,

        statut:
          filters?.statut ||
          undefined,

        date_operation:
          filters?.date_operation ||
          undefined,
      },
    }
  );

  const raw: RetraitApi[] =
    res.data?.data ?? [];

  return {
    data: raw.map((r) => ({

      id: r.id,

      agence_id: r.agence_id,
      agence_name: r.agence_name,
      code_agence: r.code_agence,

      caisse_id: r.caisse_id,
      code_caisse: r.code_caisse,
      caisse_type: r.caisse_type,

      agent_name: r.agent_name,

      transfert_id: r.transfert_id,

      code_reference: r.code_reference,

      numero_piece: r.numero_piece,

      montant: Number(r.montant),
      devise: r.devise,

      montant_source:
        Number(r.montant_source),

      montant_destination:
        Number(r.montant_destination),

      devise_source:
        r.devise_source,

      devise_destination:
        r.devise_destination,

      frais:
        Number(r.frais),

      montant_total:
        Number(r.montant_total),

      mode_paiement:
        r.mode_paiement,

      statut:
        r.statut,

      transfert_statut:
        r.transfert_statut,

      created_by:
        r.created_by,

      date_operation:
        r.date_operation,

      created_at:
        r.created_at,

      updated_at:
        r.updated_at,

      expediteur:
        r.expediteur,

      destinataire:
        r.destinataire,

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

// ===================================
// RETRAITS BY AGENCE
// ===================================
export const getRetraitsByAgence =
  async (
    agence_id: string,
    page = 1,
    limit = 10,
    filters?: RetraitFilters
  ): Promise<
    PaginatedResponse<Retrait>
  > => {

    const res = await api.get(
      `/retraits/agence/${agence_id}`,
      {
        params: {
          page,
          limit,

          statut:
            filters?.statut ||
            undefined,

          date_operation:
            filters?.date_operation ||
            undefined,
        },
      }
    );

    const raw: RetraitApi[] =
      res.data?.data ?? [];

    return {
      data: raw.map((r) => ({

      id: r.id,

      agence_id: r.agence_id,
      agence_name: r.agence_name,
      code_agence: r.code_agence,

      caisse_id: r.caisse_id,
      code_caisse: r.code_caisse,
      caisse_type: r.caisse_type,

      agent_name: r.agent_name,

      transfert_id: r.transfert_id,

      code_reference: r.code_reference,

      numero_piece: r.numero_piece,

      montant: Number(r.montant),
      devise: r.devise,

      montant_source:
        Number(r.montant_source),

      montant_destination:
        Number(r.montant_destination),

      devise_source:
        r.devise_source,

      devise_destination:
        r.devise_destination,

      frais:
        Number(r.frais),

      montant_total:
        Number(r.montant_total),

      mode_paiement:
        r.mode_paiement,

      statut:
        r.statut,

      transfert_statut:
        r.transfert_statut,

      created_by:
        r.created_by,

      date_operation:
        r.date_operation,

      created_at:
        r.created_at,

      updated_at:
        r.updated_at,

      expediteur:
        r.expediteur,

      destinataire:
        r.destinataire,

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

// ===================================
// ALL RETRAITS
// ===================================
export const getAllRetraits =
  async (
    page = 1,
    limit = 10,
    filters?: RetraitFilters & {
      agence_id?: string;
    }
  ): Promise<
    PaginatedResponse<Retrait>
  > => {

    const res = await api.get(
      "/retraits",
      {
        params: {
          page,
          limit,

          agence_id:
            filters?.agence_id ||
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

    const raw: RetraitApi[] =
      res.data?.data ?? [];

    return {
      data: raw.map((r) => ({

      id: r.id,

      agence_id: r.agence_id,
      agence_name: r.agence_name,
      code_agence: r.code_agence,

      caisse_id: r.caisse_id,
      code_caisse: r.code_caisse,
      caisse_type: r.caisse_type,

      agent_name: r.agent_name,

      transfert_id: r.transfert_id,

      code_reference: r.code_reference,

      numero_piece: r.numero_piece,

      montant: Number(r.montant),
      devise: r.devise,

      montant_source:
        Number(r.montant_source),

      montant_destination:
        Number(r.montant_destination),

      devise_source:
        r.devise_source,

      devise_destination:
        r.devise_destination,

      frais:
        Number(r.frais),

      montant_total:
        Number(r.montant_total),

      mode_paiement:
        r.mode_paiement,

      statut:
        r.statut,

      transfert_statut:
        r.transfert_statut,

      created_by:
        r.created_by,

      date_operation:
        r.date_operation,

      created_at:
        r.created_at,

      updated_at:
        r.updated_at,

      expediteur:
        r.expediteur,

      destinataire:
        r.destinataire,

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
