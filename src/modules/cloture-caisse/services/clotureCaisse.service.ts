// src/modules/cloture-caisse/services/clotureCaisse.service.ts

import { api } from "../../../services/api";

export type CreateClotureCaisseDto = {
  caisse_id: string;
  solde_physique: number;
  motif_ecart?: string;
  observation?: string;
  date_operation: string;
};

export type ClotureCaisse = {
  id: string;
  code_reference: string;
  code_caisse?: string;
  caisse_id: string;
  solde_systeme: number;
  solde_physique: number;
  ecart: number;
  devise: string;
  statut: string;
  motif_ecart?: string;
  observation?: string;
  date_operation: string;
  created_at: string;
};

export const createClotureCaisse = async (
  data: CreateClotureCaisseDto
) => {
  const res = await api.post(
    "/clotures",
    data
  );

  return res.data.data;
};