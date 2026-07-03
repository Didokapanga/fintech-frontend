// src/modules/validation/services/validation.service.ts

import { api } from "../../../services/api";
import type { PaginatedResponse } from "../../transfert-client/services/transfert.service";

import type {
  TransfertClientValidation,
  ValidateOperationDto,
} from "../types";

export const validateOperation =
  async (
    data: ValidateOperationDto
  ) => {

    const res =
      await api.post(
        "/validations",
        data
      );

    return res.data;
  };

export const getTransfertsToValidate = async (
  page = 1,
  limit = 10
): Promise<
  PaginatedResponse<
    TransfertClientValidation
  >
> => {

  const res =
    await api.get(
      "/transfert-client/validation",
      {
        params: {
          page,
          limit,
        },
      }
    );

  return {
    data:
      res.data.data,

    meta:
      res.data.meta,
  };
};

export const getTransfertsCaisseToProcess =
  async (
    page = 1,
    limit = 10
  ) => {

    const res =
      await api.get(
        "/transferts/process",
        {
          params: {
            page,
            limit,
          },
        }
      );

    return res.data;
  };

/* =========================================================
 * CLOTURES A VALIDER
 * ========================================================= */

export const getCloturesToValidate =
  async (
    page = 1,
    limit = 10
  ) => {

    const res =
      await api.get(
        "/clotures/validation",
        {
          params: {
            page,
            limit,
          },
        }
      );

    return {
      data:
        res.data.data,

      meta:
        res.data.meta,
    };
  };

/* =========================================================
 * VALIDATION CLOTURE
 * ========================================================= */

export const validateClotureCaisse =
  async (
    data: {
      cloture_id: string;

      decision:
        | "APPROUVE"
        | "REJETE";
    }
  ) => {

    const res =
      await api.post(
        "/clotures/validate",
        data
      );

    return res.data;
  };

