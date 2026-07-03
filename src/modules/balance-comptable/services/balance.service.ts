// src/modules/balance-comptable/services/balance.service.ts

import { api } from "../../../services/api";

import type {
  BalanceControl,
  BalanceFilters,
  BalanceItem,
  BalanceSummary,
} from "../types";

/* ========================================================= */
/* BALANCE COMPTABLE */
/* ========================================================= */

export const getBalance = async (
  filters?: BalanceFilters
): Promise<BalanceItem[]> => {

  const res =
    await api.get(
      "/comptabilite/balance",
      {
        params: filters,
      }
    );

  return (
    res.data.data || []
  );
};

/* ========================================================= */
/* RESUME BALANCE */
/* ========================================================= */

export const getBalanceSummary =
  async (
    filters?: BalanceFilters
  ): Promise<
    BalanceSummary[]
  > => {

    const res =
      await api.get(
        "/comptabilite/balance/summary",
        {
          params:
            filters,
        }
      );

    return (
      res.data.data || []
    );
  };

/* ========================================================= */
/* CONTROLE BALANCE */
/* ========================================================= */

export const getBalanceControl =
  async (
    filters?: BalanceFilters
  ): Promise<
    BalanceControl
  > => {

    const res =
      await api.get(
        "/comptabilite/balance/control",
        {
          params:
            filters,
        }
      );

    return (
      res.data.data
    );
  };