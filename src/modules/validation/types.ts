export type ValidateOperationDto = {
  operation_type:
    | "TRANSFERT_CLIENT"
    | "TRANSFERT_CAISSE"
    | "RETRAIT";

  reference_id: string;

  decision:
    | "APPROUVE"
    | "REJETE";

  niveau:
    | "VALIDATION"
    | "EXECUTION";

  commentaire?: string;
};

export type TransfertClientValidation = {
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

export type TransfertCaisseValidation = {
  id: string;

  code_reference: string;

  montant: string;
  devise: string;

  statut: string;

  created_by: string;
  created_by_name: string;

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

  date_operation: string;

  created_at: string;
  updated_at: string;
};