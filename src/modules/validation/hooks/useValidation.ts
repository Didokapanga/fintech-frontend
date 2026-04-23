// src/modules/validation/hooks/useValidation.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTransfertsToValidate,
  validateOperation,
} from "../services/validation.service";
import type { TransfertClient } from "../services/validation.service";

// ✅ TYPE RESPONSE
type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ✅ OPTIONS TYPE SAFE
type QueryOptions = {
  enabled?: boolean;
};

// LIST
export const useValidationList = (
  page: number,
  limit: number,
  options?: QueryOptions
) =>
  useQuery<PaginatedResponse<TransfertClient>>({
    queryKey: ["validation", page, limit],
    queryFn: () => getTransfertsToValidate(page, limit),
    ...options,
  });

// VALIDATE
export const useValidateOperation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: validateOperation,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["validation"] });
    },
  });
};