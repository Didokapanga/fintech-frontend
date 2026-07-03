// src/modules/admin/hooks/useDashboard.ts

import { useQuery } from "@tanstack/react-query";

import {
  getDashboard,
  type DashboardFilters,
  type DashboardResponse,
} from "../services/dashboard.service";

/**
 * =========================================
 * 📊 DASHBOARD QUERY
 * =========================================
 */
export const useDashboard = (
  filters?: DashboardFilters
) =>
  useQuery<DashboardResponse>({

    queryKey: [
      "dashboard",
      filters?.date_from,
      filters?.date_to,
    ],

    queryFn: () =>
      getDashboard(
        filters
      ),

    staleTime:
      1000 * 60 * 5, // 5 min

    refetchOnWindowFocus:
      false,
  });