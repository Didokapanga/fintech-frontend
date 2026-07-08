// src/components/layout/Header.tsx

import {
  Building2,
  LogOut,
} from "lucide-react";

import { useAuthStore }
from "../../app/store";
import { useTauxChanges } from "../../modules/settings/hooks/useTauxChange";

export default function Header() {

  const logout =
    useAuthStore(
      (s) => s.logout
    );

  const user =
    useAuthStore(
      (s) => s.user
    );

  const agence =
    user?.agence_name || "—";

  const agenceCode =
    user?.code_agence || "—";

  const {
    data: taux = [],
  } = useTauxChanges();

  const tauxActifs =
    taux.filter(
      (t) => t.is_activated
    );

  return (

    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[74px]
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/95
        px-6
        backdrop-blur
      "
    >

      {/* ===================================================== */}
      {/* LEFT */}
      {/* ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-4
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
            bg-indigo-50
            text-indigo-600
          "
        >

          <Building2 size={20} />

        </div>

        <div className="leading-tight">

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.14em]
              text-slate-400
            "
          >
            Agence connectée
          </p>

          <h1
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            {agence}
          </h1>

        </div>

      </div>

      <div
        className="
          hidden
          lg:flex
          items-center
          gap-3
        "
      >

        {tauxActifs.map((taux) => (

          <div
            key={taux.id}
            className="
              rounded-2xl
              border
              border-blue-100
              bg-blue-50
              px-4
              py-2
            "
          >

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-blue-600
              "
            >
              {taux.devise_source}
              {" → "}
              {taux.devise_destination}
            </p>

            <p
              className="
                text-xs
                text-slate-700
              "
            >
              Achat :
              <span className="font-semibold">
                {" "}
                {Number(taux.taux_achat)}
              </span>
            </p>

            <p
              className="
                text-xs
                text-slate-700
              "
            >
              Vente :
              <span className="font-semibold">
                {" "}
                {Number(taux.taux_vente)}
              </span>
            </p>

          </div>

        ))}

      </div>

      {/* ===================================================== */}
      {/* RIGHT */}
      {/* ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        {/* CODE AGENCE */}

        <div
          className="
            hidden
            sm:flex
            items-center
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-2
          "
        >

          <div className="leading-tight">

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Code agence
            </p>

            <p
              className="
                text-sm
                font-bold
                text-slate-800
              "
            >
              {agenceCode}
            </p>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-red-100
            bg-red-50
            px-4
            py-2.5
            text-sm
            font-medium
            text-red-600
            transition-all
            hover:bg-red-100
          "
        >

          <LogOut size={16} />

          <span>
            Déconnexion
          </span>

        </button>

      </div>

    </header>
  );
}