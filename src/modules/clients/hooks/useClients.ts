import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClients,
  createClient,
  deleteClient,
} from "../services/client.service";

export const useClients = (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["clients", params],
    queryFn: () => getClients(params),
    placeholderData: (prev) => prev, // ✅ FIX v5
  });
};

export const useCreateClient = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export const useDeleteClient = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};