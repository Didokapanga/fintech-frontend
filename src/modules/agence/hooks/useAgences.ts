import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAgences,
  createAgence,
  deleteAgence,
  type Agence,
} from "../services/agence.service";

export const useAgences = () =>
  useQuery<Agence[]>({
    queryKey: ["agences"],
    queryFn: getAgences,
    initialData: [],
  });

export const useCreateAgence = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createAgence,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["agences"] });
    },
  });
};

export const useDeleteAgence = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteAgence,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["agences"] });
    },
  });
};