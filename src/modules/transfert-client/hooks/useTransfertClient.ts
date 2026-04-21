// src/modules/transfert-client/hooks/useTransfertClient.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";

export const useTransfertsToWithdraw = (page: number, limit: number) =>
  useQuery({
    queryKey: ["transferts-retrait", page, limit],
    queryFn: async () => {
      const res = await api.get("/transfert-client/retrait", {
        params: { page, limit },
      });

      return {
        data: res.data.data,
        meta: res.data.meta,
      };
    },
  });