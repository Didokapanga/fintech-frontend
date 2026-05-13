// src/modules/validation-log/services/validation-log.service.ts


import { api } from "../../../services/api";
import type {
  ValidationLogFilters,
  ValidationLogResponse,
} from "../types/validation-log.types";

export async function getValidationLogs(
  filters: ValidationLogFilters
): Promise<ValidationLogResponse> {

  const params =
    new URLSearchParams();

  Object.entries(filters)
    .forEach(([key, value]) => {

      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        params.append(
          key,
          String(value)
        );
      }
    });

  const { data } =
    await api.get(
      `/validation-log?${params.toString()}`
    );

  return data;
}