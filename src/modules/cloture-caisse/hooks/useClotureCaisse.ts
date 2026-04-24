// src/modules/cloture-caisse/hooks/useClotureCaisse.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createClotureCaisse,
  type CreateClotureCaisseDto,
} from "../services/clotureCaisse.service";
import { getCloturesToValidate, validateClotureCaisse } from "../../validation/services/validation.service";

// ==============================
// CREATE CLOTURE
// ==============================
export const useClotureCaisse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateClotureCaisseDto
    ) => createClotureCaisse(data),

    onSuccess: () => {
      // 🔥 refresh global
      qc.invalidateQueries({
        queryKey: ["caisses"],
      });

      qc.invalidateQueries({
        queryKey: ["ledger"],
      });

      qc.invalidateQueries({
        queryKey: ["dashboard"],
      });

      qc.invalidateQueries({
        queryKey: ["mouvements"],
      });

      qc.invalidateQueries({
        queryKey: ["clotures-validation"],
      });
    },
  });
};

// ==============================
// LISTE DES CLOTURES A VALIDER
// GET /clotures/validation
// ==============================
export const useValidationClotureList = (
  page = 1,
  limit = 10
) =>
  useQuery({
    queryKey: [
      "clotures-validation",
      page,
      limit,
    ],
    queryFn: () =>
      getCloturesToValidate(
        page,
        limit
      ),
  });

// ==============================
// VALIDER / REJETER CLOTURE
// POST /clotures/validate
// ==============================
export const useValidateCloture = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (
      data: {
        cloture_id: string;
        decision:
          | "APPROUVE"
          | "REJETE";
      }
    ) =>
      validateClotureCaisse(
        data
      ),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: [
          "clotures-validation",
        ],
      });

      qc.invalidateQueries({
        queryKey: ["caisses"],
      });

      qc.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};