// src/modules/transfert-caisse/hooks/useTransfertCaisse.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransfertCaisse,
  getTransferts,
} from "../services/transfertCaisse.service";
import { api } from "../../../services/api";

// ✅ CREATE
export const useCreateTransfertCaisse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTransfertCaisse,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transferts-caisse"] });
    },
  });
};

// ✅ LIST
export const useTransfertsCaisse = (page: number, limit: number) =>
  useQuery({
    queryKey: ["transferts-caisse", page, limit],
    queryFn: () => getTransferts(page, limit),
  });

  export const useTransfertsCaisseToProcess = (
  page: number,
  limit: number
) =>
  useQuery({
    queryKey: ["transferts-caisse-process", page, limit],
    queryFn: async () => {
      const res = await api.get("/transferts/process", {
        params: { page, limit },
      });

      return {
        data: res.data.data,
        meta: res.data.meta,
      };
    },
  });