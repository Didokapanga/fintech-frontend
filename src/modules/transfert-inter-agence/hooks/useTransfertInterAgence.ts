import { useQuery } from "@tanstack/react-query";

import {
  getTransfertsInterAgence,
} from "../services/transfertInterAgence.service";

import type {
  TransfertInterAgenceFilters,
} from "../types";

export function useTransfertsInterAgence(
  page = 1,
  limit = 10,
  filters: TransfertInterAgenceFilters = {}
) {
  return useQuery({
    queryKey: [
      "transferts-inter-agence",
      page,
      limit,
      filters,
    ],

    queryFn: () =>
      getTransfertsInterAgence(
        page,
        limit,
        filters
      ),

    staleTime: 1000 * 60,
  });
}