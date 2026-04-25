// src/modules/validation/hooks/useValidationRetrait.ts

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { api } from "../../../services/api";

import {
  getRetraitsToValidate,
} from "../services/validation.service";

/* =========================================
   TYPES
========================================= */

type RetraitValidation = {
  id: string;
  code_reference: string;
  numero_piece: string;
  montant: number;
  devise: string;
  statut: string;
  date_operation: string;
  created_at: string;

  expediteur?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };

  destinataire?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };
};

type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type QueryOptions = {
  enabled?: boolean;
};

/* =========================================
   LISTE RETRAITS À VALIDER
========================================= */

export const useValidationRetraitList = (
  page: number,
  limit: number,
  options?: QueryOptions
) =>
  useQuery<
    PaginatedResponse<RetraitValidation>
  >({
    queryKey: [
      "validation-retrait",
      page,
      limit,
    ],

    queryFn: () =>
      getRetraitsToValidate(
        page,
        limit
      ),

    ...options,
  });

/* =========================================
   VALIDATE RETRAIT API
========================================= */

const validateRetrait = async (
  data: {
    retrait_id: string;
    decision:
      | "APPROUVE"
      | "REJETE";
  }
) => {
  const res = await api.post(
    "/retraits/validate",
    data
  );

  return res.data;
};

/* =========================================
   HOOK VALIDATION RETRAIT
========================================= */

export const useValidateRetrait = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: validateRetrait,

    onSuccess: () => {
      // refresh validation retrait
      qc.invalidateQueries({
        queryKey: [
          "validation-retrait",
        ],
      });

      // refresh retraits
      qc.invalidateQueries({
        queryKey: ["retraits"],
      });

      // refresh ledger
      qc.invalidateQueries({
        queryKey: ["ledger"],
      });

      // refresh dashboard
      qc.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};