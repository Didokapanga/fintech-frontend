// src/modules/admin/services/dashboard.service.ts

import { api } from "../../../services/api";

export const getDashboard = async (
  dateOperation?: string
) => {
  const res = await api.get(
    "/dashboard/overview",
    {
      params: {
        date_operation:
          dateOperation || undefined,
      },
    }
  );

  return res.data;
};