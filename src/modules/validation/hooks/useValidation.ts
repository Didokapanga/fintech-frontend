// src/modules/validation/hooks/useValidation.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTransfertsToValidate,
  getTransfertsCaisseToProcess,
  validateOperation,
} from "../services/validation.service";

/* =========================================
   VALIDATE OPERATION
========================================= */

export const useValidateOperation =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn:
        validateOperation,

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "validation-client",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "transfert-caisse-validation",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "transferts-process",
          ],
        });

      },
    });
  };

/* =========================================
   VALIDATION TRANSFERT CLIENT
========================================= */

export const useValidationList = (
  page = 1,
  limit = 10
) =>
  useQuery({

    queryKey: [
      "validation-client",
      page,
      limit,
    ],

    queryFn: () =>
      getTransfertsToValidate(
        page,
        limit
      ),
  });

/* =========================================
   VALIDATION TRANSFERT CAISSE
========================================= */

export const useTransfertCaisseValidation =
  (
    page = 1,
    limit = 10
  ) =>
    useQuery({

      queryKey: [
        "transfert-caisse-validation",
        page,
        limit,
      ],

      queryFn: () =>
        getTransfertsCaisseToProcess(
          page,
          limit
        ),
    });