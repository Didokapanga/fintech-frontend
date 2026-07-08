// src/modules/settings/hooks/useTransfertTarif.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTransfertTarif,
  deactivateTransfertTarif,
  getTransfertTarifById,
  getTransfertTarifs,
  updateTransfertTarif,
} from "../services/transfertTarif.service";

import type {
  CreateTransfertTarifDto,
  UpdateTransfertTarifDto,
} from "../types";

/* ====================================== */
/* GET ALL                                */
/* ====================================== */

export const useTransfertTarifs = (
  devise?: string
) =>
  useQuery({
    queryKey: [
      "transfert-tarifs",
      devise,
    ],

    queryFn: () =>
      getTransfertTarifs(
        devise
      ),
  });

/* ====================================== */
/* GET BY ID                              */
/* ====================================== */

export const useTransfertTarif = (
  id: string
) =>
  useQuery({
    queryKey: [
      "transfert-tarif",
      id,
    ],

    queryFn: () =>
      getTransfertTarifById(
        id
      ),

    enabled: !!id,
  });

/* ====================================== */
/* CREATE                                 */
/* ====================================== */

export const useCreateTransfertTarif =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn: (
        data: CreateTransfertTarifDto
      ) =>
        createTransfertTarif(
          data
        ),

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "transfert-tarifs",
          ],
        });

      },

    });

  };

/* ====================================== */
/* UPDATE                                 */
/* ====================================== */

export const useUpdateTransfertTarif =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn: ({
        id,
        data,
      }: {
        id: string;
        data: UpdateTransfertTarifDto;
      }) =>
        updateTransfertTarif(
          id,
          data
        ),

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "transfert-tarifs",
          ],
        });

      },

    });

  };

/* ====================================== */
/* DEACTIVATE                             */
/* ====================================== */

export const useDeactivateTransfertTarif =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn: (
        id: string
      ) =>
        deactivateTransfertTarif(
          id
        ),

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "transfert-tarifs",
          ],
        });

      },

    });

  };