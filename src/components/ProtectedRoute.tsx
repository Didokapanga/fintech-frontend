// src/components/ProtectedRoute.tsx

import type {
  ReactNode,
} from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useAuthStore,
} from "../app/store";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

type Props = {
  children: ReactNode;
};

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export default function ProtectedRoute({
  children,
}: Props) {

  const token =
    useAuthStore(
      (s) => s.token
    );

  const user =
    useAuthStore(
      (s) => s.user
    );

  const location =
    useLocation();

  /* ======================================================= */
  /* NOT AUTHENTICATED */
  /* ======================================================= */

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /* ======================================================= */
  /* ROLE BASED ACCESS */
  /* ======================================================= */

  const isCaissier =
    user?.role_name ===
    "CAISSIER";

  const currentPath =
    location.pathname;

  /**
   * =======================================================
   * CAISSIER ACCESS
   * =======================================================
   */
  if (isCaissier) {

    const allowed =
      currentPath.startsWith(
        "/caissier"
      );

    if (!allowed) {

      return (
        <Navigate
          to="/caissier"
          replace
        />
      );
    }
  }

  /**
   * =======================================================
   * ADMIN / N+1 / N+2 ACCESS
   * =======================================================
   */
  if (!isCaissier) {

    const allowed =
      currentPath.startsWith(
        "/admin"
      );

    if (!allowed) {

      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }
  }

  /* ======================================================= */
  /* RENDER */
  /* ======================================================= */

  return children;
}