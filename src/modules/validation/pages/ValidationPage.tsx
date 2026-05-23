// src/modules/validation/pages/ValidationPage.tsx

import {
  ArrowRightLeft,
  Building2,
  CheckCircle2,
  Landmark,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import Tabs from "../../../components/ui/Tab";

import ValidationCaisseTab from "../components/ValidationCaisseTab";
import ValidationClientTab from "../components/ValidationClientTab";
import ValidationClotureCaisseTab from "../components/ValidationClotureCaisseTab";
import ValidationRetraitTab from "../components/ValidationRetraitTab";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function ValidationPage() {

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

        {/* -------------------------------------------------------------- */}
        {/* HERO                                                           */}
        {/* -------------------------------------------------------------- */}

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

            {/* ---------------------------------------------------------- */}
            {/* LEFT                                                       */}
            {/* ---------------------------------------------------------- */}

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

                Contrôle opérationnel

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
                Validation des opérations
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
                Centralisez et contrôlez
                l’ensemble des opérations
                financières nécessitant une
                validation hiérarchique ou
                opérationnelle.
              </p>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* RIGHT                                                       */}
            {/* ---------------------------------------------------------- */}

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

                  <ArrowRightLeft
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
                  Transferts
                </p>

                <h3
                  className="
                    mt-1
                    text-base
                    font-semibold
                    text-slate-900
                  "
                >
                  Clients & Caisses
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

                  <Wallet
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
                  Retraits
                </p>

                <h3
                  className="
                    mt-1
                    text-base
                    font-semibold
                    text-slate-900
                  "
                >
                  Contrôle financier
                </h3>

              </div>

              {/* CARD 3 */}

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
                    bg-orange-100
                    text-orange-600
                  "
                >

                  <Building2
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
                  Clôtures
                </p>

                <h3
                  className="
                    mt-1
                    text-base
                    font-semibold
                    text-slate-900
                  "
                >
                  Caisses agences
                </h3>

              </div>

              {/* CARD 4 */}

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
                    bg-blue-100
                    text-blue-600
                  "
                >

                  <CheckCircle2
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
                  Validation
                </p>

                <h3
                  className="
                    mt-1
                    text-base
                    font-semibold
                    text-slate-900
                  "
                >
                  Workflow sécurisé
                </h3>

              </div>

            </div>

          </div>

        </section>

        {/* -------------------------------------------------------------- */}
        {/* CONTENT                                                        */}
        {/* -------------------------------------------------------------- */}

        <section
          className="
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            p-6
          "
        >

          {/* SECTION HEADER */}

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

              <Landmark
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
                Centre de validation
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Gérez les validations
                par catégorie
                opérationnelle.
              </p>

            </div>

          </div>

          {/* TABS */}

          <Tabs
            storageKey="validation_tabs"
            defaultValue="client"
            tabs={[
              {
                label:
                  "Transfert client",

                value:
                  "client",

                content:
                  <ValidationClientTab />,
              },

              {
                label:
                  "Transfert caisse",

                value:
                  "caisse",

                content:
                  <ValidationCaisseTab />,
              },

              {
                label:
                  "Clôture caisse",

                value:
                  "cloture",

                content:
                  <ValidationClotureCaisseTab />,
              },

              {
                label:
                  "Retrait",

                value:
                  "retrait",

                content:
                  <ValidationRetraitTab />,
              },
            ]}
          />

        </section>

      </div>

    </div>
  );
}