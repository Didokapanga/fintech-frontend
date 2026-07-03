// src/modules/auth/pages/LoginPage.tsx

import LoginForm from "../components/LoginForm";

import {
  Lock,
} from "lucide-react";

export default function LoginPage() {

  return (

    <div
      className="
        min-h-screen
        overflow-hidden
        bg-[#f5f7fb]
        flex
      "
    >

      {/* ===================================================== */}
      {/* LEFT SIDE */}
      {/* ===================================================== */}

      <div
        className="
          relative
          hidden
          lg:flex
          w-1/2
          overflow-hidden
          bg-gradient-to-br
          from-slate-950
          via-indigo-950
          to-blue-900
          text-white
        "
      >

        {/* BACKGROUND EFFECTS */}

        <div
          className="
            absolute
            top-[-100px]
            left-[-100px]
            h-[320px]
            w-[320px]
            rounded-full
            bg-cyan-400/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-120px]
            right-[-100px]
            h-[320px]
            w-[320px]
            rounded-full
            bg-indigo-500/20
            blur-3xl
          "
        />

        {/* CONTENT */}

        <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          flex-col
          items-center
          justify-center
          px-12
          text-center
        "
      >

        {/* CARTE RDC */}

        <div
          className="
            mb-10
            flex
            items-center
            justify-center
          "
        >

          <img
            src="../Congo-DR-Map.png"
            alt="Carte RDC"
            className="
              max-h-[180px]
              w-auto
              object-contain
              drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)]
            "
          />

        </div>

        {/* LOGO */}

        <div
          className="
            flex
            flex-col
            items-center
          "
        >

          <img
            src="/logo.png"
            alt="Logo"
            className="
              mb-5
              h-20
              w-auto
              object-contain
            "
          />
{/* 
          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
            "
          >
            Global Fintech
          </h2> */}

          <p
            className="
              mt-3
              max-w-md
              text-base
              leading-relaxed
              text-white/65
            "
          >
            Plateforme intégrée de gestion
            financière et d'opérations de caisse.
          </p>

        </div>

      </div>

      <div
        className="
          absolute
          bottom-8
          left-0
          w-full
          text-center
          text-sm
          text-white/40
        "
      >
        © {new Date().getFullYear()} Makuta DRC
      </div>

      </div>

      {/* ===================================================== */}
      {/* RIGHT SIDE */}
      {/* ===================================================== */}

      <div
        className="
          relative
          flex
          flex-1
          items-center
          justify-center
          overflow-hidden
          bg-gradient-to-br
          from-slate-50
          via-white
          to-slate-100
          px-6
          py-10
        "
      >

        {/* BG */}

        <div
          className="
            absolute
            right-[-120px]
            top-[-120px]
            h-[300px]
            w-[300px]
            rounded-full
            bg-indigo-100
            blur-3xl
            opacity-70
          "
        />

        <div
          className="
            absolute
            bottom-[-140px]
            left-[-100px]
            h-[280px]
            w-[280px]
            rounded-full
            bg-cyan-100
            blur-3xl
            opacity-70
          "
        />

        {/* LOGIN CONTAINER */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-md
          "
        >

          {/* MOBILE LOGO */}

          <div
            className="
              mb-8
              flex
              items-center
              justify-center
              gap-4
              lg:hidden
            "
          >

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-3xl
                bg-indigo-600
                shadow-lg
              "
            >

              <img
                src="/logo.png"
                alt="Fintech"
                className="
                  h-9
                  w-9
                  object-contain
                "
              />

            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                Global Fintech
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Financial System
              </p>

            </div>

          </div>

          {/* LOGIN CARD */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-slate-200/80
              bg-white/95
              p-7
              shadow-[0_25px_60px_rgba(15,23,42,0.12)]
              backdrop-blur-xl
            "
          >

            {/* TOP BAR */}

            <div
              className="
                absolute
                left-0
                top-0
                h-1.5
                w-full
                bg-gradient-to-r
                from-indigo-600
                via-blue-500
                to-cyan-400
              "
            />

            {/* HEADER */}

            <div className="mb-8 text-center">

              <div
                className="
                  mx-auto
                  mb-5
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-indigo-50
                  text-indigo-600
                "
              >

                <Lock size={28} />

              </div>

              <h2
                className="
                  text-3xl
                  font-bold
                  tracking-[-0.03em]
                  text-slate-900
                "
              >
                Connexion
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-slate-500
                "
              >
                Accédez à votre espace sécurisé
              </p>

            </div>

            {/* FORM */}

            <LoginForm />

          </div>

          {/* FOOTER */}

          <p
            className="
              mt-6
              text-center
              text-xs
              text-slate-400
            "
          >
            Transactions sécurisées • Audit complet •
            Supervision fiable
          </p>

        </div>

      </div>

    </div>
  );
}