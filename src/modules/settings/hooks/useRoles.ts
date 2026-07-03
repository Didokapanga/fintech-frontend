import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../services/role.service";

export const useRoles =
  () =>
    useQuery({

      queryKey: [
        "roles",
      ],

      queryFn:
        getRoles,
    });

export const useCreateRole =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn:
        createRole,

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "roles",
          ],
        });

      },
    });
  };

export const useUpdateRole =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn: (
        payload: {
          id: string;
          data: {
            role_name: string;
          };
        }
      ) =>
        updateRole(
          payload.id,
          payload.data
        ),

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "roles",
          ],
        });

      },
    });
  };

export const useDeleteRole =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn:
        deleteRole,

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "roles",
          ],
        });

      },
    });
  };