// src/modules/admin/hooks/useDashboard.ts

import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../services/dashboard.service";

export const useDashboard = (
  dateOperation?: string
) =>
  useQuery({
    queryKey: [
      "dashboard",
      dateOperation,
    ],

    queryFn: () =>
      getDashboard(
        dateOperation
      ),
  });