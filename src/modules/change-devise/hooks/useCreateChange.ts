import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createChangeDevise,
} from "../services/changeDevise.service";

export const useCreateChange =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn:
        createChangeDevise,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "changes",
          ],
        });

      },

    });

  };