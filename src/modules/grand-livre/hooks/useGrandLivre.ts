// src/modules/grand-livre/hooks/useGrandLivre.ts

import { useQuery } from "@tanstack/react-query";

import {
  getGrandLivre,
  getComptesComptables,
} from "../services/grandLivre.service";

/* ========================================================= */
/* GRAND LIVRE GLOBAL */
/* ========================================================= */

export const useGrandLivre =
  () =>
    useQuery({
      queryKey: [
        "grand-livre",
      ],

      queryFn:
        getGrandLivre,
    });

/* ========================================================= */
/* COMPTES COMPTABLES */
/* ========================================================= */

export const useComptesComptables =
  () =>
    useQuery({
      queryKey: [
        "comptes-comptables",
      ],

      queryFn:
        getComptesComptables,
    });