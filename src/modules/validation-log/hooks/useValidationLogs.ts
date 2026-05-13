// src/modules/validation-log/hooks/useValidationLogs.ts

import { useQuery } from "@tanstack/react-query";

import { getValidationLogs }
from "../services/validation-log.service";

import type {
  ValidationLogFilters,
} from "../types/validation-log.types";

export function useValidationLogs(
  filters: ValidationLogFilters
) {

  return useQuery({

    queryKey: [
      "validation-logs",
      filters,
    ],

    queryFn: () =>
      getValidationLogs(filters),
  });
}