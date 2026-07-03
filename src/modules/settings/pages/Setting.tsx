// src/modules/settings/pages/Setting.tsx

import { useState } from "react";

import {
  Settings,
} from "lucide-react";

import SettingsTabs
from "../components/SettingsTabs";

import PermissionTab
from "../components/PermissionTab";
import RoleTab from "../components/RoleTab";
import RolePermissionTab from "../components/RolePermissionTab";

export default function Setting() {

  const [
    activeTab,
    setActiveTab,
  ] = useState("general");

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
      {/* BODY */}
      {/* ===================================================== */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-[1fr_280px]
        "
      >

        {/* ================================================= */}
        {/* CONTENU */}
        {/* ================================================= */}

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

          {activeTab === "roles" && (
            <RoleTab />
          )}

          {activeTab ===
            "role-permissions" && (
                <RolePermissionTab />
          )}

          {activeTab ===
            "general" && (

              <div
                className="
                  flex
                  h-full
                  min-h-[500px]
                  items-center
                  justify-center
                  text-slate-500
                "
              >
                Paramètres généraux
              </div>

          )}

          {activeTab ===
            "devises" && (

              <div
                className="
                  flex
                  h-full
                  min-h-[500px]
                  items-center
                  justify-center
                  text-slate-500
                "
              >
                Gestion des devises
              </div>

          )}

          {activeTab ===
            "frais" && (

              <div
                className="
                  flex
                  h-full
                  min-h-[500px]
                  items-center
                  justify-center
                  text-slate-500
                "
              >
                Gestion des frais
              </div>

          )}

          {activeTab ===
            "references" && (

              <div
                className="
                  flex
                  h-full
                  min-h-[500px]
                  items-center
                  justify-center
                  text-slate-500
                "
              >
                Gestion des références
              </div>

          )}

          {activeTab ===
            "caisses" && (

              <div
                className="
                  flex
                  h-full
                  min-h-[500px]
                  items-center
                  justify-center
                  text-slate-500
                "
              >
                Types de caisses
              </div>

          )}

          {activeTab ===
            "securite" && (

              <div
                className="
                  flex
                  h-full
                  min-h-[500px]
                  items-center
                  justify-center
                  text-slate-500
                "
              >
                Paramètres de sécurité
              </div>

          )}

        </div>

        {/* ================================================= */}
        {/* MENU */}
        {/* ================================================= */}

        <div
          className="
            sticky
            top-6
            h-fit
            self-start
          "
        >

          <SettingsTabs
            activeTab={activeTab}
            onChange={setActiveTab}
          />

        </div>

      </div>

    </div>

  );
}