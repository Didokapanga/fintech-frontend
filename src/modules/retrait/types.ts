export type CreateRetraitDto = {
    code_reference: string;
    code_secret: string;
    numero_piece: string;
};

export type PersonneRetrait = {
  id: string;

  nom: string;
  postnom: string;
  prenom: string;

  telephone: string;

  numero_piece: string;
  type_piece: string;
};

export type Retrait = {
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

  montant: number;
  devise: string;

  montant_source: number;
  montant_destination: number;

  devise_source: string;
  devise_destination: string;

  frais: number;
  montant_total: number;

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