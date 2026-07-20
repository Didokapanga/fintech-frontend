export interface CreateTransfertInterAgenceDto {
  caisse_source_id: string;
  caisse_destination_id: string;
  montant: number;
  devise: string;
}

export interface TransfertInterAgence {
  id: string;

  code_reference: string;

  caisse_source_id: string;
  caisse_destination_id: string;

  montant: number;
  devise: string;

  statut:
    | "INITIE"
    | "VALIDE"
    | "EXECUTE"
    | "REJETE";

  created_by: string;

  created_at: string;
  updated_at: string;
  date_operation: string;

  /* ==========================
     CAISSE SOURCE
  ========================== */

  source_code_caisse: string;
  source_caisse_type: string;
  source_support: string;
  source_devise_principale: string;

  /* ==========================
     CAISSE DESTINATION
  ========================== */

  destination_code_caisse: string;
  destination_caisse_type: string;
  destination_support: string;
  destination_devise_principale: string;

  /* ==========================
     AGENCE SOURCE
  ========================== */

  agence_source_id: string;
  agence_source_code: string;
  agence_source_name: string;
  agence_source_ville: string;

  /* ==========================
     AGENCE DESTINATION
  ========================== */

  agence_destination_id: string;
  agence_destination_code: string;
  agence_destination_name: string;
  agence_destination_ville: string;

  /* ==========================
     CREATEUR
  ========================== */

  created_by_name: string;
}

export interface TransfertInterAgenceFilters {
  devise?: string;
  statut?: string;
  date_operation?: string;
}

export interface TransfertInterAgenceResponse {
  success: boolean;
  message: string;
  data: TransfertInterAgence[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}