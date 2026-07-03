// src/modules/grand-livre/hooks/useCompteGrandLivre.ts

import { useQuery } from "@tanstack/react-query";

import {
  getCompteGrandLivre,
} from "../services/grandLivre.service";

/* ========================================================= */
/* GRAND LIVRE DETAIL D'UN COMPTE
/* ========================================================= */

export const useCompteGrandLivre = (
  compteId?: string
) =>
  useQuery({
    queryKey: [
      "compte-grand-livre",
      compteId,
    ],

    enabled: !!compteId,

    queryFn: () =>
      getCompteGrandLivre(
        compteId!
      ),
  });