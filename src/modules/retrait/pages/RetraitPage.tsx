// src/modules/retrait/pages/RetraitPage.tsx

import {
  ArrowDownCircle,
} from "lucide-react";

import Tabs from "../../../components/ui/Tab";

import RetraitHistoryTab from "../components/RetraitHistoryTab";
import RetraitPendingTab from "../components/RetraitPendingTab";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function RetraitPage() {

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
        {/* HEADER                                                         */}
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
            py-7
            shadow-[0_1px_2px_rgba(16,24,40,0.04)]
          "
        >

          {/* BACKGROUND GLOW */}

          <div
            className="
              absolute
              right-0
              top-0
              h-64
              w-64
              rounded-full
              bg-red-50
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-6
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
                  border-red-100
                  bg-red-50
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-red-700
                "
              >

                <ArrowDownCircle
                  size={13}
                />

                Retraits financiers

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
                Gestion des retraits
              </h1>

            </div>
          </div>

        </section>

        {/* -------------------------------------------------------------- */}
        {/* TABS                                                           */}
        {/* -------------------------------------------------------------- */}

        <section
          className="
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            p-3
            shadow-[0_1px_2px_rgba(16,24,40,0.04)]
          "
        >

          <Tabs
            defaultValue="pending"
            tabs={[
              {
                label:
                  "Retraits en attente",

                value:
                  "pending",

                content:
                  <RetraitPendingTab />,
              },

              {
                label:
                  "Historique",

                value:
                  "history",

                content:
                  <RetraitHistoryTab />,
              },
            ]}
          />

        </section>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 MINI STAT                                  */
/* -------------------------------------------------------------------------- */
