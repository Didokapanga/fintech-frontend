import { useQuery } from "@tanstack/react-query";

import {
  getBalanceControl,
} from "../services/balance.service";

import type {
  BalanceFilters,
} from "../types";

export const useBalanceControl = (
  filters?: BalanceFilters
) =>
  useQuery({
    queryKey: [
      "balance-control",
      filters,
    ],

    queryFn: () =>
      getBalanceControl(
        filters
      ),
  });