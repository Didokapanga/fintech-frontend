
import { api } from "../../../services/api";
import type {
  AuditLogFilters,
  AuditLogResponse,
} from "../types/audit-log.types";

export async function getAuditLogs(
  filters: AuditLogFilters
): Promise<AuditLogResponse> {

  const params =
    new URLSearchParams();

  if (filters.page) {
    params.append(
      "page",
      String(filters.page)
    );
  }

  if (filters.limit) {
    params.append(
      "limit",
      String(filters.limit)
    );
  }

  if (filters.action) {
    params.append(
      "action",
      filters.action
    );
  }

  if (filters.table_name) {
    params.append(
      "table_name",
      filters.table_name
    );
  }

  if (filters.date_from) {
    params.append(
      "date_from",
      filters.date_from
    );
  }

  if (filters.date_to) {
    params.append(
      "date_to",
      filters.date_to
    );
  }

  const { data } =
    await api.get(
      `/audit-log?${params.toString()}`
    );

  return data;
}