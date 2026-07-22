// src/modules/change-devise/types.ts

/* ===================================================== */
/* MODE PAIEMENT */
/* ===================================================== */

export type ModePaiement =
  | "ESPECE"
  | "MOBILE_MONEY"
  | "COMPTE_CLIENT"
  | "CARTE"
  | "CHEQUE";

/* ===================================================== */
/* CREATE DTO */
/* ===================================================== */

export interface CreateChangeDeviseDto {
  client_id: string;

  devise_source: string;
  devise_destination: string;

  montant_source: number;

  mode_paiement: ModePaiement;
}

/* ===================================================== */
/* CHANGE DEVISE */
/* ===================================================== */

export interface ChangeDevise {
  id: string;

  agence_id: string;

  caisse_id: string;

  client_id: string;

  taux_echange_id: string;

  devise_source: string;
  devise_destination: string;

  montant_source: string;
  montant_destination: string;

  taux_applique: string;

  frais: string;

  mode_paiement: ModePaiement;

  statut: string;

  date_operation: string;

  created_by: string;

  created_at: string;
  updated_at: string;

  code_reference: string;

  type_taux_utilise: string;

  montant_total: string;

  reference_id: string | null;

  reference_type: string | null;
}

/* ===================================================== */
/* PAGINATION */
/* ===================================================== */

export interface ChangeDeviseMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/* ===================================================== */
/* LIST RESPONSE */
/* ===================================================== */

export interface ChangeDeviseResponse {
  success: boolean;

  message: string;

  data: ChangeDevise[];

  meta: ChangeDeviseMeta;
}