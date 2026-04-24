// src/modules/mouvement/hooks/useMouvements.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createMouvement,
  getMouvements,
  type MouvementFilters,
} from "../services/mouvement.service";

export const useCreateMouvement = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createMouvement,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["caisses"],
      });

      qc.invalidateQueries({
        queryKey: ["mouvements"],
      });
    },
  });
};

// ✅ LIST + FILTERS
export const useMouvements = (
  page: number,
  limit: number,
  filters?: MouvementFilters
) =>
  useQuery({
    queryKey: [
      "mouvements",
      page,
      limit,
      filters?.type_mouvement,
      filters?.devise,
      filters?.statut,
      filters?.date_operation,
    ],

    queryFn: () =>
      getMouvements(
        page,
        limit,
        filters
      ),
  });