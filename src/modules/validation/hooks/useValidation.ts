// src/modules/validation/hooks/useValidation.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTransfertsToValidate,
  validateOperation,
} from "../services/validation.service";
import type { TransfertClient } from "../services/validation.service";

// ✅ RESPONSE
type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ✅ DTO VALIDATION
type ValidateOperationDto = {
  operation_type: "TRANSFERT_CLIENT" | "RETRAIT" | "TRANSFERT_CAISSE";
  reference_id: string;
  decision: "APPROUVE" | "REJETE";
  niveau: "N1" | "N2";
};

// LIST
export const useValidationList = (
  page: number,
  limit: number
) =>
  useQuery<PaginatedResponse<TransfertClient>>({
    queryKey: ["validation", page, limit],
    queryFn: () => getTransfertsToValidate(page, limit),
  });

// VALIDATE
export const useValidateOperation = () => {
  const qc = useQueryClient();

  return useMutation<
    {
      message: string;
      statut: string;
      code_secret?: string | null;
    },
    Error,
    ValidateOperationDto
  >({
    mutationFn: async (payload) => {
      const res = await validateOperation(payload);

      return res.data; // 🔥 flatten propre
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["validation"] });
      qc.invalidateQueries({ queryKey: ["transferts-caisse-process"] });
      qc.invalidateQueries({ queryKey: ["transferts-caisse"] });
    },
  });
};


// // src/modules/validation/hooks/useValidation.ts

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   getTransfertsToValidate,
//   validateOperation,
// } from "../services/validation.service";
// import type { TransfertClient } from "../services/validation.service";

// // ✅ TYPE RESPONSE
// type PaginatedResponse<T> = {
//   data: T[];
//   meta: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// };

// // ✅ OPTIONS TYPE SAFE
// type QueryOptions = {
//   enabled?: boolean;
// };

// // LIST
// export const useValidationList = (
//   page: number,
//   limit: number,
//   options?: QueryOptions
// ) =>
//   useQuery<PaginatedResponse<TransfertClient>>({
//     queryKey: ["validation", page, limit],
//     queryFn: () => getTransfertsToValidate(page, limit),
//     ...options,
//   });

// // VALIDATE
// export const useValidateOperation = () => {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: validateOperation,
//     onSuccess: () => {
//       qc.invalidateQueries({
//         queryKey: ["validation"],
//       });

//       qc.invalidateQueries({
//         queryKey: ["transferts-caisse-process"],
//       });

//       qc.invalidateQueries({
//         queryKey: ["transferts-caisse"],
//       });
//     },
//   });
// };