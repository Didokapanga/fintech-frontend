// src/modules/caisse/hooks/useCaisses.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCaisses,
  getCaisse,
  getCaissesByAgence,
  createCaisse,
  updateCaisse,
  deleteCaisse,
  openCaisse,
  closeCaisse,
  type CreateCaisseDto,
} from "../services/caisse.service";


type UpdateCaisseParams = {
  id: string;
  data: CreateCaisseDto;
};

// ✅ ALL
export const useCaisses = (
  page = 1,
  limit = 10
) =>
  useQuery({
    queryKey: [
      "caisses",
      page,
      limit
    ],

    queryFn: () =>
      getCaisses(
        page,
        limit
      ),

    placeholderData: (
      previousData
    ) => previousData,
  });

// ✅ DETAIL
export const useCaisse = (id: string) =>
  useQuery({
    queryKey: ["caisse", id],
    queryFn: () => getCaisse(id),
    enabled: !!id,
  });

// ✅ BY AGENCE
export const useCaissesByAgence = (agenceId: string) =>
  useQuery({
    queryKey: ["caisses", "agence", agenceId],
    queryFn: () => getCaissesByAgence(agenceId),
    enabled: !!agenceId,
  });

// ✅ CREATE
export const useCreateCaisse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createCaisse,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caisses"] }),
  });
};

// ✅ UPDATE
export const useUpdateCaisse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCaisseParams) =>
      updateCaisse(id, data),

    onSuccess: () => qc.invalidateQueries({ queryKey: ["caisses"] }),
  });
};

// ✅ DELETE
export const useDeleteCaisse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteCaisse,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caisses"] }),
  });
};

// ✅ OPEN
export const useOpenCaisse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: openCaisse,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caisses"] }),
  });
};

// ✅ CLOSE
export const useCloseCaisse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: closeCaisse,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caisses"] }),
  });
};