// src/components/ProtectedRoute.tsx

import type { ReactNode } from "react";
import { useAuthStore } from "../app/store";
import { Navigate, useLocation } from "react-router-dom";
import { CAISSIER_ALLOWED_ROUTES } from "../configs/roles";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  // 🔐 PAS CONNECTÉ
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 PROTECTION PAR RÔLE
  if (user?.role_name === "CAISSIER") {
    const currentPath = location.pathname;

    const isAllowed = CAISSIER_ALLOWED_ROUTES.includes(currentPath);

    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}