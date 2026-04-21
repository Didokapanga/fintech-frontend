import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMouvement } from "../services/mouvement.service";

export const useCreateMouvement = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createMouvement,
    onSuccess: () => {
      // 🔥 refresh caisses (solde change)
      qc.invalidateQueries({ queryKey: ["caisses"] });
    },
  });
};