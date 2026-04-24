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

  // ✅ dashboard avec filtre
  const { data } = useDashboard(
    dateOperation
  );

  const dashboard = data?.data;

  // ✅ Gestion dynamique Bonjour / Bonsoir
  const currentHour =
    new Date().getHours();

  const greeting =
    currentHour < 18
      ? "Bonjour"
      : "Bonsoir";

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
          label: "En attente validation",
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
      ]
    : [];

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

  const pendingCount = Number(
    dashboard
      ?.transfert_en_attente_validation
      ?.total_count || 0
  );

  const handleReset = () => {
    setDateOperation("");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">
          {greeting}{" "}
          {user?.user_name || "Utilisateur"} 👋
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Voici un aperçu global de vos opérations
        </p>
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
          title="En attente"
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
          dateOperation={dateOperation}
          onDateChange={setDateOperation}
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