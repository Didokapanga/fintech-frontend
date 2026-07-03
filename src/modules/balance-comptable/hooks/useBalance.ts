import { useQuery } from "@tanstack/react-query";

import {
  getBalance,
} from "../services/balance.service";

import type {
  BalanceFilters,
} from "../types";

export const useBalance = (
  filters?: BalanceFilters
) =>
  useQuery({
    queryKey: [
      "balance",
      filters,
    ],

    queryFn: () =>
      getBalance(
        filters
      ),
  });