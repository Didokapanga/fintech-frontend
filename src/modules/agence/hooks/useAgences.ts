// src/modules/agence/hooks/useAgences.ts

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAgences,
  createAgence,
  deleteAgence,
} from "../services/agence.service";

import type {
  Agence,
  CreateAgenceDto,
} from "../types";

/**
 * =========================================
 * GET ALL
 * =========================================
 */
export const useAgences = () => {
  return useQuery<Agence[]>({
    queryKey: ["agences"],
    queryFn: getAgences,
  });
};

/**
 * =========================================
 * CREATE
 * =========================================
 */
export const useCreateAgence = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateAgenceDto
    ) =>
      createAgence(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["agences"],
      });
    },
  });
};

/**
 * =========================================
 * DELETE
 * =========================================
 */
export const useDeleteAgence = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string
    ) => deleteAgence(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["agences"],
      });
    },
  });
};