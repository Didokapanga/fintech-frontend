// src/modules/caisse/pages/CaissesPage.tsx

import {
  ArrowLeftRight,
  Banknote,
  ShieldCheck,
  TrendingUp,
  Wallet2,
} from "lucide-react";

import Tabs from "../../../components/ui/Tab";

import CaisseTab from "../components/CaisseTab";
import MouvementCaisseTab from "../components/MouvementCaisseTab";

import {
  useAuthStore,
} from "../../../app/store";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function CaissesPage() {

  const user =
    useAuthStore(
      (s) => s.user
    );

  const isCaissier =
    user
      ?.role_name
      ?.toUpperCase() ===
    "CAISSIER";

  /* ------------------------------------------------------------------------ */
  /*                             VIEW CAISSIER                                */
  /* ------------------------------------------------------------------------ */

  if (isCaissier) {

    return (

      <div
        className="
          min-h-screen
          bg-[#f5f7fb]
        "
      >

        <div
          className="
            mx-auto
            max-w-[1700px]
            space-y-6
            px-4
            py-4
          "
        >

          {/* HERO */}

          <section
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-slate-200/80
              bg-white
              px-8
              py-8
            "
          >

            {/* GLOW */}

            <div
              className="
                absolute
                right-0
                top-0
                h-72
                w-72
                rounded-full
                bg-indigo-50
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                flex-col
                gap-8
                xl:flex-row
                xl:items-center
                xl:justify-between
              "
            >

              {/* LEFT */}

              <div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-indigo-100
                    bg-indigo-50
                    px-3
                    py-1
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-indigo-700
                  "
                >

                  <ShieldCheck
                    size={13}
                  />

                  Gestion de caisse

                </div>

                <h1
                  className="
                    mt-5
                    text-[38px]
                    font-semibold
                    tracking-[-0.04em]
                    text-slate-900
                  "
                >
                  Gestion des caisses
                </h1>

                <p
                  className="
                    mt-4
                    max-w-3xl
                    text-sm
                    leading-7
                    text-slate-500
                  "
                >
                  Consultez vos soldes,
                  opérations financières
                  et activités liées aux
                  caisses opérationnelles.
                </p>

              </div>

              {/* RIGHT */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                "
              >

                {/* CARD 1 */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-indigo-100
                      text-indigo-600
                    "
                  >

                    <Wallet2
                      size={18}
                    />

                  </div>

                  <p
                    className="
                      mt-4
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Soldes
                  </p>

                  <h3
                    className="
                      mt-1
                      text-base
                      font-semibold
                      text-slate-900
                    "
                  >
                    Gestion financière
                  </h3>

                </div>

                {/* CARD 2 */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-emerald-100
                      text-emerald-600
                    "
                  >

                    <TrendingUp
                      size={18}
                    />

                  </div>

                  <p
                    className="
                      mt-4
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Activités
                  </p>

                  <h3
                    className="
                      mt-1
                      text-base
                      font-semibold
                      text-slate-900
                    "
                  >
                    Suivi des flux
                  </h3>

                </div>

              </div>

            </div>

          </section>

          {/* CONTENT */}

          <section
            className="
              rounded-[32px]
              border
              border-slate-200/80
              bg-white
              p-6
            "
          >

            <div
              className="
                mb-6
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
                  bg-indigo-50
                  text-indigo-600
                "
              >

                <Banknote
                  size={20}
                />

              </div>

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                    text-slate-900
                  "
                >
                  Caisses disponibles
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Visualisez vos caisses
                  opérationnelles et
                  leurs informations.
                </p>

              </div>

            </div>

            <CaisseTab />

          </section>

        </div>

      </div>

    );
  }

  /* ------------------------------------------------------------------------ */
  /*                              VIEW COMPLETE                               */
  /* ------------------------------------------------------------------------ */

  return (

    <div
      className="
        min-h-screen
      "
    >

      <div
        className="
          mx-auto
          max-w-[1700px]
          space-y-6
          px-0
          py-0
        "
      >

        {/* HERO */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            px-8
            py-8
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              right-0
              top-0
              h-80
              w-80
              rounded-full
              bg-indigo-50
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-8
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >

            {/* LEFT */}

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-indigo-100
                  bg-indigo-50
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-indigo-700
                "
              >

                <ShieldCheck
                  size={13}
                />

                Infrastructure financière

              </div>

              <h1
                className="
                  mt-5
                  text-[40px]
                  font-semibold
                  tracking-[-0.04em]
                  text-slate-900
                "
              >
                Gestion des caisses
              </h1>

              <p
                className="
                  mt-4
                  max-w-3xl
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                Centralisez les soldes,
                mouvements et opérations
                des caisses agences et
                opérationnelles à travers
                la plateforme.
              </p>

            </div>

            {/* RIGHT */}

            <div
              className="
                grid
                grid-cols-2
                gap-4
              "
            >

              {/* CARD 1 */}

              <div
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-indigo-100
                    text-indigo-600
                  "
                >

                  <Wallet2
                    size={18}
                  />

                </div>

                <p
                  className="
                    mt-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Caisses
                </p>

                <h3
                  className="
                    mt-1
                    text-base
                    font-semibold
                    text-slate-900
                  "
                >
                  Gestion des soldes
                </h3>

              </div>

              {/* CARD 2 */}

              <div
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-emerald-100
                    text-emerald-600
                  "
                >

                  <ArrowLeftRight
                    size={18}
                  />

                </div>

                <p
                  className="
                    mt-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Mouvements
                </p>

                <h3
                  className="
                    mt-1
                    text-base
                    font-semibold
                    text-slate-900
                  "
                >
                  Flux financiers
                </h3>

              </div>

            </div>

          </div>

        </section>

        {/* CONTENT */}

        <section
          className="
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            p-6
          "
        >

          <div
            className="
              mb-6
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
                bg-indigo-50
                text-indigo-600
              "
            >

              <Banknote
                size={20}
              />

            </div>

            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                  text-slate-900
                "
              >
                Centre de gestion
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Gérez les caisses et
                consultez les mouvements
                financiers opérationnels.
              </p>

            </div>

          </div>

          {/* TABS */}

          <Tabs
            storageKey="caisses_tabs"
            defaultValue="caisses"
            tabs={[
              {
                label:
                  "Caisses",

                value:
                  "caisses",

                content:
                  <CaisseTab />,
              },

              {
                label:
                  "Mouvements de caisse",

                value:
                  "mouvements",

                content:
                  <MouvementCaisseTab />,
              },
            ]}
          />

        </section>

      </div>

    </div>

  );
}