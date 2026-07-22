// src/modules/change-devise/hooks/useChanges.ts

import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "../../../app/store";

import { PERMISSIONS } from "../../../constants/permissions";

import {
  getAgencyChanges,
  getChanges,
  getMyChanges,
} from "../services/changeDevise.service";

export const useChanges = (
  page = 1,
  limit = 20
) => {
  const user = useAuthStore(
    (state) => state.user
  );

  return useQuery({
    queryKey: [
      "changes",
      page,
      limit,
      user?.id,
    ],

    queryFn: () => {
      if (
        user?.permissions.includes(
          PERMISSIONS.CHANGE_DEVISE_READ
        )
      ) {
        return getChanges(
          page,
          limit
        );
      }

      if (
        user?.permissions.includes(
          PERMISSIONS.CHANGE_DEVISE_READ_AGENCE
        )
      ) {
        return getAgencyChanges(
          page,
          limit
        );
      }

      if (
        user?.permissions.includes(
          PERMISSIONS.CHANGE_DEVISE_READ_AGENT
        )
      ) {
        return getMyChanges(
          page,
          limit
        );
      }

      throw new Error(
        "Vous ne disposez d'aucune permission de lecture des opérations de change."
      );
    },

    enabled: !!user,
  });
};