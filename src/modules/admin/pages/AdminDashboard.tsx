// src/modules/admin/pages/AdminDashboard.tsx

import { useState } from "react";
import { useAuthStore } from "../../../app/store";
import DashboardTable from "../components/DashboardTable";
import { useDashboard } from "../hooks/useDashboard";

export default function AdminDashboard() {
  const user = useAuthStore((s) => s.user);

  // ✅ filtre date_operation
  const [dateOperation, setDateOperation] =
    useState("");

  // ✅ dashboard avec filtre backend date_operation
  const { data } = useDashboard(
    dateOperation
  );

  const dashboard = data?.data;

  // ✅ Bonjour / Bonsoir dynamique
  const currentHour =
    new Date().getHours();

  const greeting =
    currentHour < 18
      ? "Bonjour"
      : "Bonsoir";

  /**
   * =========================================
   * 🔥 TABLE DATA
   *
   * backend ajouté :
   * - retrait en attente validation
   * =========================================
   */
  const rows = dashboard
    ? [
        {
          label: "Transfert client",
          volume: Number(
            dashboard.transfert_client
              ?.total_volume || 0
          ),
          count: Number(
            dashboard.transfert_client
              ?.total_count || 0
          ),
        },

        {
          label: "Retrait",
          volume: Number(
            dashboard.retrait
              ?.total_volume || 0
          ),
          count: Number(
            dashboard.retrait
              ?.total_count || 0
          ),
        },

        {
          label:
            "Transferts en attente validation",
          volume: Number(
            dashboard
              .transfert_en_attente_validation
              ?.total_volume || 0
          ),
          count: Number(
            dashboard
              .transfert_en_attente_validation
              ?.total_count || 0
          ),
        },

        {
          label:
            "Retraits en attente validation",
          volume: Number(
            dashboard
              .retrait_en_attente_validation
              ?.total_volume || 0
          ),
          count: Number(
            dashboard
              .retrait_en_attente_validation
              ?.total_count || 0
          ),
        },
      ]
    : [];

  /**
   * =========================================
   * 🔥 KPI GLOBAL
   * =========================================
   */
  const totalVolume = rows.reduce(
    (acc, row) =>
      acc + Number(row.volume || 0),
    0
  );

  const totalOperations = rows.reduce(
    (acc, row) =>
      acc + Number(row.count || 0),
    0
  );

  const pendingCount =
    Number(
      dashboard
        ?.transfert_en_attente_validation
        ?.total_count || 0
    ) +
    Number(
      dashboard
        ?.retrait_en_attente_validation
        ?.total_count || 0
    );

  const handleReset = () => {
    setDateOperation("");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div
        className="
          relative overflow-hidden
          bg-gradient-to-br from-white via-white to-indigo-50
          border border-gray-200
          rounded-3xl
          p-7
          shadow-sm
        "
      >
        {/* subtle glow */}
        <div
          className="
            absolute -top-10 -right-10
            w-40 h-40
            bg-indigo-100/50
            rounded-full
            blur-3xl
            pointer-events-none
          "
        />

        <div
          className="
            absolute -bottom-8 -left-8
            w-32 h-32
            bg-blue-100/40
            rounded-full
            blur-2xl
            pointer-events-none
          "
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* LEFT */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500 mb-2">
              Dashboard Administrateur
            </p>

            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              {greeting}{" "}
              <span className="text-indigo-600">
                {user?.user_name || "Utilisateur"}
              </span>{" "}
              👋
            </h1>

            <p className="text-sm text-gray-500 mt-3 max-w-xl leading-relaxed">
              Voici un aperçu global de vos opérations,
              validations et mouvements financiers.
            </p>
          </div>

          {/* RIGHT MINI BADGE */}
          <div
            className="
              self-start md:self-center
              px-4 py-3
              rounded-2xl
              bg-white/80
              border border-gray-200
              shadow-sm
              backdrop-blur-sm
            "
          >
            <p className="text-xs text-gray-400 uppercase font-medium">
              Aujourd’hui
            </p>

            <p className="text-sm font-semibold text-gray-700 mt-1">
              {new Date().toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Kpi
          title="Volume total"
          value={totalVolume}
        />

        <Kpi
          title="Total opérations"
          value={totalOperations}
        />

        <Kpi
          title="En attente validation"
          value={pendingCount}
        />
      </div>

      {/* TABLE */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-3">
          Vue détaillée
        </h2>

        <DashboardTable
          data={rows}
          dateOperation={
            dateOperation
          }
          onDateChange={
            setDateOperation
          }
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

function Kpi({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <p className="text-xs text-gray-400 uppercase tracking-wide">
        {title}
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mt-2">
        {value.toLocaleString()}
      </h2>
    </div>
  );
}