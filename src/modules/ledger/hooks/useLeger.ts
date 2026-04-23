import { useQuery } from "@tanstack/react-query";
import {
  getLedgerByCaisse,
  getMyLedger,
  type LedgerFilters,
} from "../services/ledger.service";

// 🔴 ADMIN
export const useLedgerByCaisse = (
  caisse_id: string,
  page: number,
  limit: number,
  filters: LedgerFilters
) =>
  useQuery({
    queryKey: ["ledger", caisse_id, page, limit, filters],
    queryFn: () =>
      getLedgerByCaisse(caisse_id, page, limit, filters),
    enabled: !!caisse_id,
  });

export const useMyLedger = (
  page: number,
  limit: number,
  filters: LedgerFilters
) =>
  useQuery({
    queryKey: ["ledger-me", page, limit, filters],
    queryFn: () => getMyLedger(page, limit, filters),
  });