// src/modules/auth/pages/LoginPage.tsx

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-indigo-500 text-white items-start justify-start p-14">

        {/* Glow effects */}
        <div className="absolute w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

        {/* Content */}
        <div className="relative z-10 max-w-md space-y-6 mt-12">

          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Global Fintech
          </h1>

          <p className="text-lg text-white/80 leading-relaxed">
            Plateforme sécurisée de gestion et de messagerie financière.
            <br />
            Rapide. Fiable. Moderne.
          </p>

          <div className="mt-10 text-sm text-white/60">
            © {new Date().getFullYear()} Global Fintech
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">

        <div className="w-full max-w-md">

          {/* CARD */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">

            {/* subtle glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-100/40 to-transparent pointer-events-none" />

            {/* HEADER */}
            <div className="relative mb-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Connexion
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Entrez vos identifiants pour continuer
              </p>
            </div>

            {/* FORM */}
            <div className="relative">
              <LoginForm />
            </div>

          </div>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Accès sécurisé • Données protégées
          </p>
        </div>
      </div>
    </div>
  );
}