// src/components/layout/Layout.tsx

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuthStore } from "../../app/store";
import CaissierDashboard from "../../modules/caisse/pages/CaissierDashboard";

export default function Layout() {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();
  const navigate = useNavigate();

  const isCaissier = user?.role_name === "CAISSIER";
  const isDashboard = location.pathname === "/";

  return (
    <div
      className="
        flex h-screen relative
        bg-[url('/src/assets/bg-pattern.svg')]
        bg-cover bg-center
      "
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/40" />

      <div className="relative flex w-full">

        {!isCaissier && <Sidebar />}

        <div className="flex-1 flex flex-col">

          <Header />

          <main className="p-6 overflow-auto space-y-4">

            {/* 🔥 BOUTON RETOUR (SEULEMENT SI PAS DASHBOARD) */}
            {isCaissier && !isDashboard && (
              <button
                onClick={() => navigate("/")}
                className="
                  inline-flex items-center gap-2
                  px-3 py-1.5 rounded-lg
                  bg-indigo-50 text-indigo-600
                  hover:bg-indigo-100
                  text-sm font-medium
                  transition
                "
              >
                ← Retour au dashboard
              </button>
            )}

            {/* CONTENU */}
            {isCaissier && isDashboard ? (
              <CaissierDashboard />
            ) : (
              <Outlet />
            )}

          </main>

        </div>
      </div>
    </div>
  );
}