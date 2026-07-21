import { useQuery } from "@tanstack/react-query";

import {
  getTransfertsInterAgence,
  getTransfertsInterAgenceByAgence,
} from "../services/transfertInterAgence.service";

import type {
  TransfertInterAgenceFilters,
} from "../types";

export function useTransfertsInterAgence(
  page = 1,
  limit = 10,
  filters: TransfertInterAgenceFilters = {},
  agenceId?: string
) {
  return useQuery({
    queryKey: [
      "transferts-inter-agence",
      agenceId ?? "all",
      page,
      limit,
      filters,
    ],

    queryFn: () =>

      agenceId
        ? getTransfertsInterAgenceByAgence(
            agenceId,
            page,
            limit,
            filters
          )
        : getTransfertsInterAgence(
            page,
            limit,
            filters
          ),

    staleTime: 1000 * 60,
  });
}