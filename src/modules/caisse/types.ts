// src/modules/caisse/types.ts

export type CaisseState = "OUVERTE" | "FERMEE" | "CLOTUREE";

export type Caisse = {
  id: string;
  agence_id: string;
  agent_id?: string;
  type: string;
  devise: string;
  code_caisse: string;
  state: CaisseState;
  solde: number;

  // 🔥 AJOUTER CECI
  agence?: {
    id?: string;
    libelle?: string;
  };

  agence_libelle?: string;

  created_at?: string;
  updated_at?: string;
};