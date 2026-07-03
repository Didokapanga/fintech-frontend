import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  type PermissionPayload,
} from "../services/permission.service";

type UpdatePermissionDto = {
  id: string;
  data: PermissionPayload;
};

export const usePermissions = (
  page = 1,
  limit = 20,
  search = ""
) =>
  useQuery({

    queryKey: [
      "permissions",
      page,
      limit,
      search,
    ],

    queryFn: () =>
      getPermissions(
        page,
        limit,
        search
      ),
  });

export const useCreatePermission =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn:
        createPermission,

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "permissions",
          ],
        });

      },
    });
  };

export const useUpdatePermission =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn: (
        payload: UpdatePermissionDto
        ) =>
        updatePermission(
            payload.id,
            payload.data
        ),

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "permissions",
          ],
        });

      },
    });
  };

export const useDeletePermission =
  () => {

    const qc =
      useQueryClient();

    return useMutation({

      mutationFn:
        deletePermission,

      onSuccess: () => {

        qc.invalidateQueries({
          queryKey: [
            "permissions",
          ],
        });

      },
    });
  };