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
    !!user?.is_caisse_user;

  if (isCaissier) {

    return (
      <CaissierDashboard />
    );

  }

  return (
    <AdminDashboard />
  );

}

// import { useAuthStore } from "../../app/store";
// import AdminDashboard from "../../modules/admin/pages/AdminDashboard";
// import CaissierDashboard from "../../modules/caisse/pages/CaissierDashboard";

// export default function DashboardResolver() {

//   const user =
//     useAuthStore(
//       (s) => s.user
//     );

//   const isCaissier =
//     user?.is_caisse_user === true;

//   if (isCaissier) {
//     return (
//       <CaissierDashboard />
//     );
//   }

//   return (
//     <AdminDashboard />
//   );
// }