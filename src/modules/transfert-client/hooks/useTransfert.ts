// src/modules/transfert-client/hooks/useTransfert.ts

import { useAuthStore } from "../../../app/store";
import { usePermission } from "../../../hooks/usePermission";
import { PERMISSIONS } from "../../../constants/permissions";

import {
  createTransfertClient,
  getMyTransferts,
  getTransfertsByAgence,
  getAllTransferts,
  type CreateTransfertClientDto,
  type TransfertFilters,
} from "../services/transfert.service";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


// ✅ CREATE
export const useCreateTransfertClient = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateTransfertClientDto
    ) => createTransfertClient(data),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["my-transferts"],
      });

      qc.invalidateQueries({
        queryKey: ["transferts-retrait"],
      });

      qc.invalidateQueries({
        queryKey: ["validation-list"],
      });
    },
  });
};

// ✅ GET MY TRANSFERTS + FILTERS
export const useMyTransferts = (
  page: number,
  limit: number,
  filters?: TransfertFilters,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: [
      "my-transferts",
      page,
      limit,
      filters?.statut,
      filters?.date_operation,
    ],

    queryFn: () =>
      getMyTransferts(
        page,
        limit,
        filters
      ),
      enabled,
  });

  export const useTransferts = (
  page: number,
  limit: number,
  filters?: TransfertFilters
) => {

  const user =
    useAuthStore(
      (s) => s.user
    );

  const { can } =
    usePermission();

  const canReadAll =
    can(
      PERMISSIONS.TRANSFERT_CLIENT_READ
    );

  const canReadAgence =
    can(
      PERMISSIONS.TRANSFERT_CLIENT_READ_AGENCE
    );

  const canReadMe =
    can(
      PERMISSIONS.TRANSFERT_CLIENT_READ_ME
    );

  return useQuery({

    queryKey: [
      "transferts",
      page,
      limit,
      filters?.statut,
      filters?.date_operation,
      user?.agence_id,
    ],

    queryFn: async () => {

      if (canReadAll) {

        return getAllTransferts(
          page,
          limit,
          filters
        );
      }

      if (
        canReadAgence &&
        user?.agence_id
      ) {

        return getTransfertsByAgence(
          user.agence_id,
          page,
          limit,
          filters
        );
      }

      if (canReadMe) {

        return getMyTransferts(
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