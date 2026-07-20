// src/modules/transfert-client/services/transfert.service.ts

import { api } from "../../../services/api";

export type TransfertFilters = {
  statut?: string;
  date_operation?: string;

  devise_source?: string;
  devise_destination?: string;

  prestataire?: string;
};

export type CreateTransfertClientDto = {
  agence_dest: string;

  expediteur_id: string;
  destinataire_id: string;

  devise_source: string;
  devise_destination: string;

  montant_destination: number;

  type_calcul_frais:
    | "FORFAITAIRE"
    | "POURCENTAGE";

  pourcentage_frais?: number;

  mode_paiement:
    | "ESPECE"
    | "MOBILE_MONEY"
    | "COMPTE_CLIENT"
    | "CARTE"
    | "CHEQUE";

  prestataire?: string;
};

export type TransfertClient = {
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

  type_calcul_frais:
    | "FORFAITAIRE"
    | "POURCENTAGE";

  pourcentage_frais: string | null;

  taux_utilise: string;
  type_taux_utilise: string;

  mode_paiement: string;

  prestataire: string | null;

  statut: string;

  date_operation: string;
  created_at: string;
  updated_at: string;
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

// GET MY TRANSFERTS

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

        statut: filters?.statut || undefined,

        date_operation:
          filters?.date_operation || undefined,

        devise_source:
          filters?.devise_source || undefined,

        devise_destination:
          filters?.devise_destination || undefined,

        prestataire:
          filters?.prestataire || undefined,
      },
    }
  );

  return res.data;
};

// GET BY AGENCE

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

        statut: filters?.statut || undefined,

        date_operation:
          filters?.date_operation || undefined,

        devise_source:
          filters?.devise_source || undefined,

        devise_destination:
          filters?.devise_destination || undefined,

        prestataire:
          filters?.prestataire || undefined,
      },
    }
  );

  return res.data;
};

// ADMIN

export const getAllTransferts = async (
  page = 1,
  limit = 10,
  filters?: TransfertFilters
): Promise<PaginatedResponse<TransfertClient>> => {
  const res = await api.get(
    "/transfert-client",
    {
      params: {
        page,
        limit,

        statut: filters?.statut,

        date_operation:
          filters?.date_operation,

        devise_source:
          filters?.devise_source,

        devise_destination:
          filters?.devise_destination,

        prestataire:
          filters?.prestataire,
      },
    }
  );

  return res.data;
};