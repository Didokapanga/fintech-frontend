export type LedgerPersonne = {
  id: string;
  nom: string;
  postnom: string;
  prenom: string;
  telephone: string;
  type_piece: string;
  numero_piece: string;
  nom_complet: string;
};

export type LedgerAgent = {
  id: string | null;
  user_name: string | null;
};

export type LedgerAgence = {
  id: string;
  code_agence: string;
  libelle: string;
  display: string;
};

export type LedgerCaisse = {
  id: string;
  code_caisse: string;
};

export type Ledger = {
  id: string;

  type_operation: string;
  libelle_operation: string;

  montant: number;
  devise: string;
  montant_display: string;

  sens: "ENTREE" | "SORTIE";

  reference_type: string;
  reference_id: string;
  reference_metier: string;

  created_at: string;

  caisse_id: string;
  code_caisse: string;

  agence_id: string;
  agence_name: string;
  code_agence: string;
  agence_display: string;

  user_id?: string | null;
  user_name?: string | null;

  agent_operation?: string | null;

  transfert_client_id?: string | null;
  code_reference?: string | null;

  retrait_id?: string | null;
  retrait_statut?: string | null;
  retrait_date_operation?: string | null;

  expediteur?: LedgerPersonne | null;
  destinataire?: LedgerPersonne | null;

  caisse: LedgerCaisse;
  agence: LedgerAgence;
  agent: LedgerAgent;
};

export type LedgerFilters = {
  type_operation?: string;

  sens?: string;

  devise?: string;

  agence_id?: string;

  caisse_id?: string;

  date_from?: string;

  date_to?: string;
};