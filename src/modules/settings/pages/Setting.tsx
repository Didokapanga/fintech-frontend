// src/modules/settings/pages/Setting.tsx

import { useEffect, useState } from "react";

import {
  Settings,
} from "lucide-react";

import SettingsTabs
from "../components/SettingsTabs";

import PermissionTab
from "../components/PermissionTab";

import RoleTab
from "../components/RoleTab";

import RolePermissionTab
from "../components/RolePermissionTab";
import TauxChangeTab from "../components/TauxChangeTab";
import TransfertTarifTab from "../components/TransfertTarifTab";

export default function Setting() {

  const [
    activeTab,
    setActiveTab,
  ] = useState(() => {

    return (
      localStorage.getItem(
        "settings-active-tab"
      ) || "permissions"
    );

  });

  useEffect(() => {

    localStorage.setItem(
      "settings-active-tab",
      activeTab
    );

  }, [activeTab]);

  return (

    <div
      className="
        flex
        flex-col
        gap-6
      "
    >

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-700
          "
        >

          <Settings size={24} />

        </div>

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Paramètres
          </h1>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Configuration générale
            de la plateforme
          </p>

        </div>

      </div>

      {/* ===================================================== */}
      {/* TABS HORIZONTALES */}
      {/* ===================================================== */}

      <SettingsTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* ===================================================== */}
      {/* CONTENU */}
      {/* ===================================================== */}

      <div
        className="
          min-h-[700px]
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >

        {activeTab ===
          "permissions" && (
            <PermissionTab />
        )}

        {activeTab ===
          "roles" && (
            <RoleTab />
        )}

        {activeTab ===
          "role-permissions" && (
            <RolePermissionTab />
        )}

        {activeTab ===
          "taux-change" && (
            <TauxChangeTab />
        )}

        {activeTab ===
          "transfert-tarifs" && (
            <TransfertTarifTab />
        )}

      </div>

    </div>

  );

}