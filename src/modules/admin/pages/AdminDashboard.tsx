// src/modules/admin/pages/AdminDashboard.tsx

import { useState } from "react";
import { Search, Bell } from "lucide-react";

import { useMyTransferts } from "../../transfert-client/hooks/useTransfert";
import { useRetraitHistory } from "../../retrait/hooks/useRetraitHistory";
import { useValidationList } from "../../validation/hooks/useValidation";

// TYPES
type Transfert = {
  id: string;
  montant: number | string;
  devise: string;
  exp_nom?: string;
  dest_nom?: string;
  created_at: string;
};

type Retrait = {
  id: string;
  montant: number | string;
  devise: string;
  created_at: string;
};

type Validation = {
  statut: string;
  created_at: string;
};

export default function AdminDashboard() {
  // 🔥 FILTER STATE
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔥 DATA
  const { data: transfertsData } = useMyTransferts(1, 100);
  const { data: retraitsData } = useRetraitHistory(1, 100);
  const { data: validationData } = useValidationList(1, 100);

  const transferts: Transfert[] = transfertsData?.data ?? [];
  const retraits: Retrait[] = retraitsData?.data ?? [];
  const validations: Validation[] = validationData?.data ?? [];

  // 🔥 FILTER LOGIC
  const isInRange = (date: string) => {
    if (!startDate && !endDate) return true;

    const d = new Date(date).getTime();
    const start = startDate ? new Date(startDate).getTime() : null;
    const end = endDate ? new Date(endDate).getTime() : null;

    if (start && d < start) return false;
    if (end && d > end) return false;

    return true;
  };

  const filteredTransferts = transferts.filter(t =>
    isInRange(t.created_at)
  );

  const filteredRetraits = retraits.filter(r =>
    isInRange(r.created_at)
  );

  const filteredValidations = validations.filter(v =>
    isInRange(v.created_at)
  );

  // 🔥 KPI
  const totalVolume = filteredTransferts.reduce(
    (acc, t) => acc + Number(t.montant || 0),
    0
  );

  const pending = filteredValidations.filter(
    v => v.statut === "INITIE"
  ).length;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center flex-wrap gap-4">

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Vue globale des opérations
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 text-gray-400" />
            <input
              placeholder="Rechercher..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>

          <Bell className="text-gray-500" />

        </div>

      </div>

      {/* FILTER */}
      <div className="flex flex-wrap gap-3 items-center">

        <button
          onClick={() => {
            const today = new Date().toISOString().split("T")[0];
            setStartDate(today);
            setEndDate(today);
          }}
          className="px-3 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
        >
          Aujourd’hui
        </button>

        <button
          onClick={() => {
            const d = new Date();
            const past = new Date(d.setDate(d.getDate() - 7))
              .toISOString()
              .split("T")[0];

            setStartDate(past);
            setEndDate(new Date().toISOString().split("T")[0]);
          }}
          className="px-3 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
        >
          7 jours
        </button>

        <button
          onClick={() => {
            const d = new Date();
            const past = new Date(d.setDate(d.getDate() - 30))
              .toISOString()
              .split("T")[0];

            setStartDate(past);
            setEndDate(new Date().toISOString().split("T")[0]);
          }}
          className="px-3 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
        >
          30 jours
        </button>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1 text-xs"
        />

        <span className="text-gray-400 text-xs">→</span>

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1 text-xs"
        />

        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
          className="text-xs text-red-500"
        >
          Reset
        </button>

      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <Kpi title="Volume" value={`${totalVolume.toLocaleString()} USD`} />

        <Kpi title="Transferts" value={filteredTransferts.length} />

        <Kpi title="Retraits" value={filteredRetraits.length} />

        <Kpi title="En attente" value={pending} />

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* CHART */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border">

          <p className="text-sm text-gray-500 mb-2">
            Volume filtré
          </p>

          <h2 className="text-xl font-semibold mb-4">
            {totalVolume.toLocaleString()} USD
          </h2>

          <div className="flex items-end gap-2 h-32">
            {[40, 60, 30, 80, 50, 70, 90].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-6 bg-indigo-500 rounded"
              />
            ))}
          </div>

        </div>

        {/* INFO */}
        <div className="bg-indigo-600 text-white rounded-xl p-5">
          <h3 className="font-semibold mb-2">
            Système opérationnel
          </h3>
          <p className="text-sm opacity-80">
            Toutes les opérations sont stables.
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ACTIVITÉ */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">

          <h3 className="text-sm font-semibold mb-4">
            Activités
          </h3>

          <div className="space-y-3">

            {filteredTransferts.slice(0, 5).map((t) => (
              <div key={t.id}>
                <p className="text-sm font-medium">
                  {t.exp_nom || "-"} → {t.dest_nom || "-"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(t.created_at).toLocaleString()}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* LIST */}
        <div className="bg-white p-5 rounded-xl border shadow-sm">

          <h3 className="text-sm font-semibold mb-4">
            Dernières opérations
          </h3>

          <div className="space-y-3 text-sm">

            {filteredTransferts.slice(0, 5).map((t) => (
              <div key={t.id} className="flex justify-between">
                <span>
                  {t.exp_nom || "-"} → {t.dest_nom || "-"}
                </span>

                <span className="text-green-600 font-medium">
                  {Number(t.montant).toLocaleString()}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

// 🔹 KPI COMPONENT
function Kpi({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm">
      <p className="text-xs text-gray-400">{title}</p>
      <h2 className="text-lg font-semibold">{value}</h2>
    </div>
  );
}