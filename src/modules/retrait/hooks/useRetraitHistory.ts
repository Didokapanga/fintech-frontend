// src/modules/retrait/hooks/useRetraitHistory.ts

import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "../../../app/store";
import { usePermission } from "../../../hooks/usePermission";
import { PERMISSIONS } from "../../../constants/permissions";

import {
  getMyRetraits,
  getRetraitsByAgence,
  getAllRetraits,
  type RetraitFilters,
} from "../services/retrait.service";

export const useRetraitHistory = (
  page: number,
  limit: number,
  filters?: RetraitFilters,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: [
      "retraits-history",
      page,
      limit,
      filters?.statut,
      filters?.date_operation,
    ],

    queryFn: () =>
      getMyRetraits(
        page,
        limit,
        filters
      ),

    enabled,
  });

export const useRetraits = (
  page: number,
  limit: number,
  filters?: RetraitFilters & {
    agence_id?: string;
  }
) => {

  const user =
    useAuthStore(
      (s) => s.user
    );

  const { can } =
    usePermission();

  const canReadAll =
    can(
      PERMISSIONS.RETRAIT_READ
    );

  const canReadAgence =
    can(
      PERMISSIONS.RETRAIT_READ_AGENCY
    );

  const canReadMe =
    can(
      PERMISSIONS.RETRAIT_READ_MINE
    );

  return useQuery({

    queryKey: [
      "retraits",
      page,
      limit,
      filters?.agence_id,
      filters?.statut,
      filters?.date_operation,
      user?.agence_id,
    ],

    queryFn: async () => {

      if (canReadAll) {

        return getAllRetraits(
          page,
          limit,
          filters
        );
      }

      if (
        canReadAgence &&
        user?.agence_id
      ) {

        return getRetraitsByAgence(
          user.agence_id,
          page,
          limit,
          filters
        );
      }

      if (canReadMe) {

        return getMyRetraits(
          page,
          limit,
          filters
        );
      }

      return {
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      };
    },

    enabled:
      canReadAll ||
      canReadAgence ||
      canReadMe,
  });
};

// import { useQuery } from "@tanstack/react-query";

// import {
//   getMyRetraits,
//   type RetraitFilters,
// } from "../services/retrait.service";

// export const useRetraitHistory = (
//   page: number,
//   limit: number,
//   filters?: RetraitFilters,
//   enabled: boolean = true
// ) =>
//   useQuery({
//     queryKey: [
//       "retraits-history",
//       page,
//       limit,
//       filters?.statut,
//       filters?.date_operation,
//     ],

//     queryFn: () =>
//       getMyRetraits(
//         page,
//         limit,
//         filters
//       ),

//     enabled,
//   });