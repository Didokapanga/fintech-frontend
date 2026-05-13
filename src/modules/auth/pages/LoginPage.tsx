// src/modules/auth/pages/LoginPage.tsx

import LoginForm from "../components/LoginForm";
import { ShieldCheck, Landmark, Lock } from "lucide-react";
import CongoMap from "../../../assets/Congo-DR-Map.png";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">

      {/* =========================================
          LEFT SIDE
      ========================================= */}
      <div
        className="
          hidden lg:flex w-1/2 relative overflow-hidden
          bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-700
          text-white p-14
        "
      >
        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-80px] w-[360px] h-[360px] rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between h-full max-w-xl">

          {/* TOP */}
          <div className="space-y-8 pt-8">

            <div className="space-y-5">

            <p className="text-sm uppercase tracking-[0.25em] text-white/70 font-medium">
              Plateforme financière
            </p>

            <div
              className="
                relative
                w-full
                max-w-[230px]
                aspect-square
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/5
                backdrop-blur-sm
              "
            >
              <img
                src={CongoMap}
                alt="Carte RDC"
                className="
                  w-full
                  h-full
                  object-contain
                  p-2
                "
              />
            </div>

          </div>

            {/* FEATURES */}
            <div className="space-y-5 pt-6">

              <Feature
                icon={<ShieldCheck size={20} />}
                title="Sécurité renforcée"
                text="Contrôle d’accès, validation multi-niveaux et audit complet."
              />

              <Feature
                icon={<Landmark size={20} />}
                title="Gestion centralisée"
                text="Pilotage des caisses, agences et flux financiers."
              />

              <Feature
                icon={<Lock size={20} />}
                title="Fiabilité opérationnelle"
                text="Transactions rapides, traçables et sécurisées."
              />

            </div>
          </div>

          {/* FOOTER */}
          <div className="text-sm text-white/50">
            © {new Date().getFullYear()} Global Fintech
          </div>
        </div>
      </div>

      {/* =========================================
          RIGHT SIDE
      ========================================= */}
      <div
        className="
          flex flex-1 items-center justify-center
          px-6 py-10
          bg-gradient-to-br from-slate-50 via-white to-slate-100
        "
      >
        <div className="w-full max-w-md">

          {/* LOGIN CARD */}
          <div
            className="
              relative overflow-hidden
              bg-white border border-slate-200
              rounded-3xl shadow-xl
              p-8 md:p-10
            "
          >
            {/* subtle top accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400" />

            {/* HEADER */}
            <div className="mb-8 text-center">
              <div
                className="
                  mx-auto mb-4
                  w-14 h-14 rounded-2xl
                  bg-indigo-50
                  flex items-center justify-center
                "
              >
                <Lock className="w-6 h-6 text-indigo-600" />
              </div>

              <h2 className="text-3xl font-semibold text-slate-800">
                Connexion
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Entrez vos identifiants pour accéder à votre espace sécurisé
              </p>
            </div>

            {/* FORM */}
            <LoginForm />
          </div>

          {/* FOOTER */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Accès sécurisé • Transactions protégées • Supervision fiable
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   FEATURE ITEM
========================================= */

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="
          w-10 h-10 rounded-xl
          bg-white/10 border border-white/10
          flex items-center justify-center
          shrink-0
        "
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="text-sm text-white/70 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}