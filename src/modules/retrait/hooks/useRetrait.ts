// src/modules/retrait/hooks/useRetrait.ts

import { useMutation } from "@tanstack/react-query";
import { createRetrait } from "../services/retrait.service";

export const useRetrait = () => {
  return useMutation({
    mutationFn: createRetrait,
  });
};