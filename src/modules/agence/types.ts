// src/modules/agence/type.ts
export interface Agence {
  id: string;
  libelle: string;
  code_agence: string;
  ville: string;
  commune?: string;
  quartier?: string;
  is_activated: boolean;
}

export interface CreateAgenceDto {
  libelle: string;
  code_agence: string;
  ville: string;
  commune?: string;
  quartier?: string;
}