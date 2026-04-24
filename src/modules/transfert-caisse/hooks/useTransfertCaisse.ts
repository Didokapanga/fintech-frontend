// src/modules/transfert-caisse/hooks/useTransfertCaisse.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTransfertCaisse,
  getTransferts,
  type TransfertFilters,
} from "../services/transfertCaisse.service";

import { api } from "../../../services/api";

// ✅ CREATE
export const useCreateTransfertCaisse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTransfertCaisse,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["transferts-caisse"],
      });
    },
  });
};

// ✅ LIST + FILTERS
export const useTransfertsCaisse = (
  page: number,
  limit: number,
  filters?: TransfertFilters
) =>
  useQuery({
    queryKey: [
      "transferts-caisse",
      page,
      limit,
      filters?.devise,
      filters?.statut,
      filters?.date_operation,
    ],

    queryFn: () =>
      getTransferts(
        page,
        limit,
        filters
      ),
  });

// ✅ TRANSFERTS À TRAITER
export const useTransfertsCaisseToProcess = (
  page: number,
  limit: number
) =>
  useQuery({
    queryKey: [
      "transferts-caisse-process",
      page,
      limit,
    ],

    queryFn: async () => {
      const res = await api.get(
        "/transferts/process",
        {
          params: {
            page,
            limit,
          },
        }
      );

      return {
        data: res.data.data,
        meta: res.data.meta,
      };
    },
  });