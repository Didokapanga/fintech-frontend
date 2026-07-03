import { useQuery } from "@tanstack/react-query";

import {
  getBalanceSummary,
} from "../services/balance.service";

import type {
  BalanceFilters,
} from "../types";

export const useBalanceSummary = (
  filters?: BalanceFilters
) =>
  useQuery({
    queryKey: [
      "balance-summary",
      filters,
    ],

    queryFn: () =>
      getBalanceSummary(
        filters
      ),
  });