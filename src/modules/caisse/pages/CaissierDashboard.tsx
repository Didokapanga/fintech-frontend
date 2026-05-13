// src/modules/caissier/CaissierDashboard.tsx

import { useNavigate } from "react-router-dom";
import {
  Send,
  Banknote,
  Inbox,
  Wallet,
  Repeat,
  Lock,
  FileText,
} from "lucide-react";
import { useState } from "react";

import type { Caisse } from "../types";
import { useCaisses } from "../hooks/useCaisses";
import ClotureCaisseModal from "../../cloture-caisse/components/ClotureCaisseModal";

export default function CaissierDashboard() {
  const navigate = useNavigate();

  const [selectedCaisseId, setSelectedCaisseId] =
    useState<string | null>(null);

  // 🔥 modal clôture
  const [openCloture, setOpenCloture] =
    useState(false);

  const {
  data: response,
  } = useCaisses(1, 100);

  const caisses: Caisse[] =
    response?.data || [];

  // 🔥 caisse active
  const selectedCaisse =
    caisses.find(
      (c) => c.id === selectedCaisseId
    ) || caisses[0];

  const actions = [
    {
      label: "Envoi",
      path: "/transfert-client",
      icon: Send,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Paiement",
      path: "/retrait",
      icon: Banknote,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Transfert caisse",
      path: "/transfert-caisse",
      icon: Repeat,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Transferts reçus",
      path: "/validation",
      icon: Inbox,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Ma caisse",
      path: "/caisses",
      icon: Wallet,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Registre",
      path: "/ledger",
      icon: FileText,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];

  return (
    <div className="h-full flex flex-col justify-center px-6">

      {/* HEADER */}
<div className="relative mb-10">

  {/* =========================================
      LOGO → TOP LEFT
  ========================================= */}
  <div className="absolute top-0 left-0">

    <div className="flex items-center gap-4">

      <img
        src="/logo.png"
        alt="Fintech Logo"
        className="
          w-16 h-16
          object-contain
          rounded-2xl
          shadow-sm
        "
      />

      <div className="flex flex-col leading-tight">

        <span className="text-2xl font-bold text-gray-800 tracking-tight">
          Global Fintech
        </span>

        <span className="text-sm text-gray-500">
          Financial System
        </span>

      </div>
    </div>
  </div>

  {/* =========================================
      CENTER BLOCK
  ========================================= */}
  <div className="flex flex-col items-center space-y-5">

    {/* SELECT CAISSE */}
    {caisses.length > 1 && (
      <select
        value={
          selectedCaisse?.id || ""
        }
        onChange={(e) =>
          setSelectedCaisseId(
            e.target.value
          )
        }
        className="
          px-3 py-2 rounded-xl border bg-white text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
      >
        {caisses.map((c) => (
          <option
            key={c.id}
            value={c.id}
          >
            {c.code_caisse} (
            {c.devise})
          </option>
        ))}
      </select>
    )}

    {/* INFOS */}
    {selectedCaisse && (
      <>
        <div className="flex items-center gap-3 flex-wrap justify-center">

          <span className="px-3 py-1 rounded-lg bg-gray-100 text-sm font-medium">
            Caisse{" "}
            {
              selectedCaisse.code_caisse
            }
          </span>

          <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium">
            {
              selectedCaisse.devise
            }
          </span>

          <span
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              selectedCaisse.state ===
              "OUVERTE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            ●{" "}
            {
              selectedCaisse.state
            }
          </span>
        </div>

        {/* SOLDE */}
        <div className="text-center">

          <p className="text-sm text-gray-500 mb-1">
            Solde disponible
          </p>

          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            {Number(
              selectedCaisse.solde
            ).toLocaleString()}{" "}
            <span className="text-lg text-gray-500">
              {
                selectedCaisse.devise
              }
            </span>
          </h1>

        </div>

        {/* 🔥 BOUTON CLOTURE */}
        <button
          onClick={() =>
            setOpenCloture(true)
          }
          className="
            flex items-center gap-2
            px-5 py-3 rounded-2xl
            bg-red-600 text-white
            font-medium shadow-sm
            hover:bg-red-700
            transition-all
          "
        >
          <Lock className="w-5 h-5" />
          Clôturer ma caisse
        </button>
      </>
    )}
  </div>
</div>

      {/* GRID ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              onClick={() =>
                navigate(
                  action.path
                )
              }
              className="
                group bg-white border rounded-2xl p-6 shadow-sm
                hover:shadow-lg hover:-translate-y-1
                transition-all duration-200
                flex flex-col items-center justify-center
              "
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${action.bg}`}
              >
                <Icon
                  className={`w-6 h-6 ${action.color}`}
                />
              </div>

              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 🔥 MODAL */}
      {openCloture && (
        <ClotureCaisseModal
          open={openCloture}
          onClose={() =>
            setOpenCloture(false)
          }
        />
      )}
    </div>
  );
}