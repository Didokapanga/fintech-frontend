// src/modules/admin/services/dashboard.service.ts

import { api } from "../../../services/api";

export type DashboardFilters = {
  date_from?: string;
  date_to?: string;
};

export const getDashboard = async (
  filters?: DashboardFilters
) => {

  const res = await api.get(
    "/dashboard/overview",
    {
      params: {
        date_from:
          filters?.date_from ||
          undefined,

        date_to:
          filters?.date_to ||
          undefined,
      },
    }
  );

  return res.data;
};