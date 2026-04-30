// src/hooks/useApiMutationWithFeedback.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type MessageState = {
  variant: "error" | "success" | "info" | "warning";
  title: string;
  message: string;
};

type ErrorWithResponse = Error & {
  response?: {
    data?: {
      message?: string;
    };
  };
};

type Options<TData, TVariables> = {
  mutationFn: (variables: TVariables) => Promise<TData>;

  successMessage?: string;
  errorMessage?: string;

  invalidateQueries?: string[]; // 🔥 auto refresh

  onSuccess?: (data: TData) => void;
};

export function useApiMutationWithFeedback<
  TData = unknown,
  TVariables = void
>({
  mutationFn,
  successMessage = "Opération réussie",
  errorMessage = "Une erreur est survenue",
  invalidateQueries = [],
  onSuccess,
}: Options<TData, TVariables>) {
  const qc = useQueryClient();

  const [appMessage, setAppMessage] =
    useState<MessageState | null>(null);

  const mutation = useMutation<TData, Error, TVariables>({
    mutationFn,

    onSuccess: (data) => {
      // ✅ message succès
      setAppMessage({
        variant: "success",
        title: "Succès",
        message: successMessage,
      });

      // 🔥 auto refresh cache
      invalidateQueries.forEach((key) => {
        qc.invalidateQueries({ queryKey: [key] });
      });

      onSuccess?.(data);
    },

    onError: (error) => {
      const apiError =
        error as ErrorWithResponse;

      setAppMessage({
        variant: "error",
        title: "Erreur",
        message:
          apiError?.response?.data?.message ||
          errorMessage,
      });
    },
  });

  return {
    ...mutation,
    appMessage,
    clearMessage: () =>
      setAppMessage(null),
  };
}