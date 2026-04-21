import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTransfertsToValidate,
  validateOperation,
} from "../services/validation.service";

// LIST
export const useValidationList = (page: number, limit: number) =>
  useQuery({
    queryKey: ["validation", page, limit],
    queryFn: () => getTransfertsToValidate(page, limit),
  });

// VALIDATE
export const useValidateOperation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: validateOperation,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["validation"] });
    },
  });
};