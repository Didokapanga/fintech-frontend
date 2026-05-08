// src/modules/transfert-client/hooks/useTransfert.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTransfertClient,
  getMyTransferts,
  type CreateTransfertClientDto,
  type TransfertFilters,
} from "../services/transfert.service";

// ✅ CREATE
export const useCreateTransfertClient = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateTransfertClientDto
    ) => createTransfertClient(data),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["my-transferts"],
      });

      qc.invalidateQueries({
        queryKey: ["transferts-retrait"],
      });

      qc.invalidateQueries({
        queryKey: ["validation-list"],
      });
    },
  });
};

// ✅ GET MY TRANSFERTS + FILTERS
export const useMyTransferts = (
  page: number,
  limit: number,
  filters?: TransfertFilters,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: [
      "my-transferts",
      page,
      limit,
      filters?.statut,
      filters?.date_operation,
    ],

    queryFn: () =>
      getMyTransferts(
        page,
        limit,
        filters
      ),
      enabled,
  });