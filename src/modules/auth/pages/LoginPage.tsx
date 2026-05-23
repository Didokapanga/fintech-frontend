// src/modules/auth/pages/LoginPage.tsx

import LoginForm from "../components/LoginForm";

import {
  ShieldCheck,
  Landmark,
  Lock,
  Globe2,
} from "lucide-react";

// import CongoMap
// from "../../../assets/Congo-DR-Map.png";

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
            justify-between
            p-10
          "
        >

          {/* TOP */}

          <div className="space-y-8">

            {/* LOGO */}

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
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/10
                "
              >

                <img
                  src="/logo.png"
                  alt="Fintech"
                  className="
                    h-10
                    w-10
                    object-contain
                  "
                />

              </div>

              <div>

                <h1
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                  "
                >
                  Global Fintech
                </h1>

                <p
                  className="
                    text-sm
                    text-white/60
                  "
                >
                  Financial System
                </p>

              </div>

            </div>

            {/* HERO */}

            <div className="space-y-6">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-cyan-200
                  backdrop-blur-xl
                "
              >

                <Globe2 size={14} />

                République Démocratique du Congo

              </div>

              <div className="space-y-4">

                <h2
                  className="
                    max-w-xl
                    text-4xl
                    xl:text-5xl
                    font-bold
                    leading-[1.05]
                    tracking-[-0.05em]
                  "
                >
                  Plateforme financière moderne et sécurisée
                </h2>

                <p
                  className="
                    max-w-xl
                    text-base
                    leading-relaxed
                    text-white/70
                  "
                >
                  Gestion centralisée des agences, caisses,
                  validations et opérations financières
                  avec supervision en temps réel.
                </p>

              </div>

            </div>

            {/* MAP BLOCK */}

            {/* <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/5
                p-5
                backdrop-blur-xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-6
                "
              >

                <div className="space-y-3">

                  <h3
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    Infrastructure nationale
                  </h3>

                  <p
                    className="
                      max-w-sm
                      text-sm
                      leading-relaxed
                      text-white/70
                    "
                  >
                    Supervision centralisée des opérations
                    financières inter-agences.
                  </p>

                </div>

                <img
                  src={CongoMap}
                  alt="Carte RDC"
                  className="
                    h-[170px]
                    w-[170px]
                    object-contain
                  "
                />

              </div>

            </div> */}

            {/* FEATURES */}

            <div
              className="
                grid
                grid-cols-1
                gap-3
                xl:grid-cols-3
              "
            >

              <Feature
                icon={<ShieldCheck size={18} />}
                title="Sécurité"
                text="Validation et audit intégrés."
              />

              <Feature
                icon={<Landmark size={18} />}
                title="Gestion"
                text="Pilotage des agences et caisses."
              />

              <Feature
                icon={<Lock size={18} />}
                title="Fiabilité"
                text="Transactions sécurisées."
              />

            </div>

          </div>

          {/* FOOTER */}

          <div
            className="
              text-sm
              text-white/40
            "
          >
            © {new Date().getFullYear()} Global Fintech
          </div>

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

/* ======================================================== */
/* FEATURE */
/* ======================================================== */

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

    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-5
        backdrop-blur-xl
      "
    >

      <div
        className="
          mb-4
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-white/10
          text-cyan-200
        "
      >

        {icon}

      </div>

      <h3
        className="
          text-sm
          font-semibold
          text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-sm
          leading-relaxed
          text-white/65
        "
      >
        {text}
      </p>

    </div>
  );
}