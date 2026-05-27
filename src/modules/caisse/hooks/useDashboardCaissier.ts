import { useQuery } from "@tanstack/react-query";

import {
  getDashboardCaissier,
  type DashboardCaissierFilters,
} from "../services/dashboardCaissier.service";

export function useDashboardCaissier(
  filters?: DashboardCaissierFilters
) {
  return useQuery({
    queryKey: [
      "dashboard-caissier",
      filters,
    ],

    queryFn: () =>
      getDashboardCaissier(filters),
  });
}