// src/modules/validation/pages/ValidationPage.tsx

import {
  Landmark,
  ShieldCheck,
} from "lucide-react";

import Tabs from "../../../components/ui/Tab";

import ValidationCaisseTab from "../components/ValidationCaisseTab";
import ValidationClientTab from "../components/ValidationClientTab";
// import ValidationClotureCaisseTab from "../components/ValidationClotureCaisseTab";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function ValidationPage() {

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

              // {
              //   label:
              //     "Clôture caisse",

              //   value:
              //     "cloture",

              //   content:
              //     <ValidationClotureCaisseTab />,
              // },
            ]}
          />

        </section>

      </div>

    </div>
  );
}