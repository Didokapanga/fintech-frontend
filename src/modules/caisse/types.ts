// src/modules/caisse/types.ts

export type CaisseState =
  | "OUVERTE"
  | "FERMEE"
  | "CLOTUREE";

export type CaisseType =
  | "AGENCE"
  | "AGENT";

export type CaisseSupport =
  | "ESPECE"
  | "MOBILE_MONEY"
  | "BANQUE"
  | "IMF"
  | "SMF"
  | "AUTRE";

export type CaisseDevise = {
  id: string;
  devise: string;
  solde: string;
  is_activated: boolean;
};

export type Caisse = {
  id: string;

  agence_id: string;
  agent_id: string | null;

  type: CaisseType;

  state: CaisseState;

  support: CaisseSupport;

  prestataire: string | null;

  devise_principale: string;

  code_caisse: string;

  is_activated: boolean;

  created_at: string;
  updated_at: string;

  last_cloture_at: string | null;

  agence_name: string;
  code_agence: string;
  ville: string;

  agent_name: string | null;

  devises: CaisseDevise[];
};

export interface CaisseReference {
  support: string;
  prestataires: string[];
}