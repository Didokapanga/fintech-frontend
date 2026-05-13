export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "OPEN"
  | "VALIDATE";

export interface AuditLogUser {
  id: string;
  user_name: string;
  role: string;
}

export interface AuditLogChanges {

  old:
    | Record<
        string,
        unknown
      >
    | null;

  new:
    | Record<
        string,
        unknown
      >
    | null;
}

export interface AuditLog {
  id: string;

  action: AuditAction;

  table_name: string;

  code_reference: string | null;

  changes: AuditLogChanges;

  user: AuditLogUser | null;

  ip_address: string | null;

  user_agent: string | null;

  created_at: string;

  summary: string;
}

export interface AuditLogResponse {
  success: boolean;

  message: string;

  data: {
    data: AuditLog[];

    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface AuditLogFilters {
  page?: number;

  limit?: number;

  action?: string;

  table_name?: string;

  date_from?: string;

  date_to?: string;
}