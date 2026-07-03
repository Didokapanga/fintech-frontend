// src/modules/grand-livre/services/grandLivre.service.ts

import { api } from "../../../services/api";

import type {
  GrandLivreEntry,
  CompteComptable,
  CompteSummary,
} from "../types";

/* ========================================================= */
/* LISTE COMPLETE GRAND LIVRE */
/* ========================================================= */

export const getGrandLivre =
  async (): Promise<
    GrandLivreEntry[]
  > => {

    const res =
      await api.get(
        "/comptabilite/grand-livre"
      );

    return res.data.data;
  };

/* ========================================================= */
/* LISTE DES COMPTES */
/* ========================================================= */

export const getComptesComptables =
  async (): Promise<
    CompteComptable[]
  > => {

    const res =
      await api.get(
        "/comptabilite/grand-livre/comptes"
      );

    return res.data.data;
  };

/* ========================================================= */
/* GRAND LIVRE D'UN COMPTE */
/* ========================================================= */

export const getCompteGrandLivre =
  async (
    compteId: string
  ): Promise<
    GrandLivreEntry[]
  > => {

    const res =
      await api.get(
        `/comptabilite/grand-livre/${compteId}`
      );

    return res.data.data;
  };

/* ========================================================= */
/* RESUME COMPTE */
/* ========================================================= */

export const getCompteSummary =
  async (
    compteId: string
  ): Promise<
    CompteSummary
  > => {

    const res =
      await api.get(
        `/comptabilite/grand-livre/${compteId}/summary`
      );

    return res.data.data;
  };