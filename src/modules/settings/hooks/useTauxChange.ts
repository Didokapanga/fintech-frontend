import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTauxChange,
  deactivateTauxChange,
  getTauxChangeById,
  getTauxChanges,
  updateTauxChange,
} from "../services/tauxChange.service";

import type {
  CreateTauxChangeDto,
  UpdateTauxChangeDto,
} from "../types";

// LISTE

export const useTauxChanges =
  () =>
    useQuery({
      queryKey: [
        "taux-change",
      ],

      queryFn:
        getTauxChanges,
    });

// DETAIL

export const useTauxChange =
  (id: string) =>
    useQuery({
      queryKey: [
        "taux-change",
        id,
      ],

      queryFn: () =>
        getTauxChangeById(
          id
        ),

      enabled: !!id,
    });

// CREATE

export const useCreateTauxChange =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn: (
        data: CreateTauxChangeDto
      ) =>
        createTauxChange(
          data
        ),

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "taux-change",
          ],
        });

      },

    });

  };

// UPDATE

export const useUpdateTauxChange =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn: ({
        id,
        data,
      }: {
        id: string;
        data: UpdateTauxChangeDto;
      }) =>
        updateTauxChange(
          id,
          data
        ),

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "taux-change",
          ],
        });

      },

    });

  };

// DELETE LOGIQUE

export const useDeactivateTauxChange =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn: (
        id: string
      ) =>
        deactivateTauxChange(
          id
        ),

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "taux-change",
          ],
        });

      },

    });

  };