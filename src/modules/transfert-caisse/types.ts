export type CreateTransfertCaisseDto = {
  caisse_source_id: string;
  caisse_destination_id: string;
  montant: number;
  devise: string;
};

export type TransfertFilters = {
  devise?: string;
  statut?: string;
  date_operation?: string;
};

// ✅ TYPE FINAL FRONT
export type TransfertCaisse = {
  id: string;

  code_reference: string;

  caisse_source_id: string;
  caisse_destination_id: string;

  source_code_caisse: string;
  destination_code_caisse: string;

  source_caisse_type: string;
  destination_caisse_type: string;

  agence_source_id: string;
  agence_source_code: string;
  agence_source_name: string;

  agence_destination_id: string;
  agence_destination_code: string;
  agence_destination_name: string;

  created_by: string;
  created_by_name: string;

  source_agent_name?: string | null;
  destination_agent_name?: string | null;

  montant: number;
  devise: string;

  statut: string;

  date_operation: string;

  created_at: string;
  updated_at: string;
};