import { useQuery } from "@tanstack/react-query";

import {
  getMyRetraits,
  type RetraitFilters,
} from "../services/retrait.service";

export const useRetraitHistory = (
  page: number,
  limit: number,
  filters?: RetraitFilters,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: [
      "retraits-history",
      page,
      limit,
      filters?.statut,
      filters?.date_operation,
    ],

    queryFn: () =>
      getMyRetraits(
        page,
        limit,
        filters
      ),

    enabled,
  });