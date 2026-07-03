// src/modules/grand-livre/types.ts

export interface GrandLivreEntry {
  id: string;

  date_operation: string;

  reference_piece: string;

  journal_code: string;

  journal_libelle: string;

  compte_id: string;

  numero: string;

  compte_libelle: string;

  type_compte: string;

  debit: string;

  credit: string;

  mouvement: string;

  sens_mouvement: string;

  montant_mouvement: string;

  mouvement_signe: string;

  devise: string;

  reference_id: string;

  reference_type: string;

  code_agence: string;

  agence_libelle: string;

  code_caisse: string;

  created_at: string;
}

export interface CompteComptable {
  id: string;

  numero: string;

  libelle: string;

  type_compte: string;

  total_ecritures: string;

  total_debit: string;

  total_credit: string;

  solde: string;
}

export interface CompteSummary {
  id: string;

  numero: string;

  libelle: string;

  type_compte: string;

  total_debit: string;

  total_credit: string;

  solde: string;
}