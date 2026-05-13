import { useQuery } from "@tanstack/react-query";

import { getAuditLogs } from "../services/audit-log.service";

import type {
  AuditLogFilters,
} from "../types/audit-log.types";

export function useAuditLogs(
  filters: AuditLogFilters
) {
  return useQuery({

    queryKey: [
      "audit-logs",
      filters,
    ],

    queryFn: () =>
      getAuditLogs(filters),
  });
}