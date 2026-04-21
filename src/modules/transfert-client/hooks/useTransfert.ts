import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransfertClient,
  getMyTransferts,
} from "../services/transfert.service";

// ✅ CREATE
export const useCreateTransfertClient = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTransfertClient,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transferts-client"] });
    },
  });
};

// ✅ LIST (agent connecté)
export const useMyTransferts = (page: number, limit: number) =>
  useQuery({
    queryKey: ["transferts-client", page, limit],
    queryFn: () => getMyTransferts(page, limit),
  });