// src/components/auth/PermissionGate.tsx

import type { ReactNode } from "react";
import { usePermission } from "../../hooks/usePermission";

type PermissionGateProps = {
  permissions?: string[];
  children: ReactNode;
};

export function PermissionGate({
  permissions = [],
  children,
}: PermissionGateProps) {

  const { canAny } = usePermission();

  if (!canAny(permissions)) {
    return null;
  }

  return <>{children}</>;
}