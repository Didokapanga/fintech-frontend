// src/modules/admin/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query";

import {
  getDashboard
} from "../services/dashboard.service";

/**
 * =========================================
 * 📅 DASHBOARD FILTERS
 * =========================================
 */
type DashboardFilters = {
  date_from?: string;
  date_to?: string;
};

/**
 * =========================================
 * 📊 DASHBOARD QUERY
 * =========================================
 */
export const useDashboard = (
  filters?: DashboardFilters
) =>
  useQuery({

    queryKey: [
      "dashboard",
      filters,
    ],

    queryFn: () =>
      getDashboard(
        filters
      ),
  });