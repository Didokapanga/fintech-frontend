// src/components/layout/DashboardResolver.tsx

import { useAuthStore } from "../../app/store";
import AdminDashboard from "../../modules/admin/pages/AdminDashboard";
import CaissierDashboard from "../../modules/caisse/pages/CaissierDashboard";

export default function DashboardResolver() {

  const user =
    useAuthStore(
      (s) => s.user
    );

  const isCaissier =
    user?.role_name ===
    "CAISSIER";

  if (isCaissier) {
    return (
      <CaissierDashboard />
    );
  }

  return (
    <AdminDashboard />
  );
}