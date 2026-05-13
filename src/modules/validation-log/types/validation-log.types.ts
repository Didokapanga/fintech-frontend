// src/modules/validation-log/types/validation-log.types.ts

export type ValidationDecision =
  | "APPROUVE"
  | "REJETE";

export interface ValidationValidator {
  id: string;
  user_name: string;
  role: string;
}

export interface ValidationLog {
  id: string;

  operation_type: string;

  reference_id: string;

  niveau: string;

  decision: ValidationDecision;

  commentaire: string | null;

  statut_avant: string;

  statut_apres: string;

  created_at: string;

  summary: string;

  validator:
    | ValidationValidator
    | null;
}

export interface ValidationLogResponse {
  success: boolean;

  message: string;

  data: {
    data: ValidationLog[];

    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface ValidationLogFilters {
  page?: number;

  limit?: number;

  operation_type?: string;

  niveau?: string;

  decision?: string;

  date_from?: string;

  date_to?: string;
}