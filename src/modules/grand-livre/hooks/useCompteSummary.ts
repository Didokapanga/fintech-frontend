// src/modules/grand-livre/hooks/useCompteSummary.ts

import { useQuery } from "@tanstack/react-query";

import {
  getCompteSummary,
} from "../services/grandLivre.service";

/* ========================================================= */
/* RESUME D'UN COMPTE
/* ========================================================= */

export const useCompteSummary = (
  compteId?: string
) =>
  useQuery({
    queryKey: [
      "compte-summary",
      compteId,
    ],

    enabled: !!compteId,

    queryFn: () =>
      getCompteSummary(
        compteId!
      ),
  });