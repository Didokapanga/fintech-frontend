// src/hooks/usePermission.ts

import { useAuthStore } from "../app/store";

export function usePermission() {

  const user =
    useAuthStore(
      (state) => state.user
    );

  const permissions =
    user?.permissions ?? [];

  const can = (
    permission: string
  ) =>
    permissions.includes(permission);

//     console.log(
//   useAuthStore.getState().user
// );

  const canAny = (
    permissionsList: string[]
  ) =>
    permissionsList.some(
      (p) => permissions.includes(p)
    );

  return {
    can,
    canAny,
    permissions,
  };
}