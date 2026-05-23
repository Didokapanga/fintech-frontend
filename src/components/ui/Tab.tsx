// src/components/ui/Tab.tsx

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ChevronRight,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type TabItem = {
  label: string;

  value: string;

  content: ReactNode;

  badge?: string | number;
};

type Props = {
  tabs: TabItem[];

  defaultValue?: string;

  storageKey?: string;
};

/* -------------------------------------------------------------------------- */
/*                                    TABS                                    */
/* -------------------------------------------------------------------------- */

export default function Tabs({
  tabs,
  defaultValue,
  storageKey = "active_tab",
}: Props) {

  /* ------------------------------------------------------------------------ */
  /*                                  ACTIVE                                  */
  /* ------------------------------------------------------------------------ */

  const [active, setActive] =
    useState(() => {

      const saved =
        localStorage.getItem(
          storageKey
        );

      return (
        saved ||
        defaultValue ||
        tabs[0]?.value
      );
    });

  /* ------------------------------------------------------------------------ */
  /*                             LOCAL STORAGE                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {

    if (active) {

      localStorage.setItem(
        storageKey,
        active
      );
    }

  }, [
    active,
    storageKey,
  ]);

  /* ------------------------------------------------------------------------ */
  /*                             ACTIVE CONTENT                               */
  /* ------------------------------------------------------------------------ */

  const activeTab =
    useMemo(
      () =>
        tabs.find(
          (tab) =>
            tab.value ===
            active
        ),
      [
        active,
        tabs,
      ]
    );

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        space-y-6
      "
    >

      {/* -------------------------------------------------------------- */}
      {/* HEADER                                                         */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          overflow-x-auto
        "
      >

        <div
          className="
            inline-flex
            min-w-full
            items-center
            gap-2
            rounded-[24px]
            border
            border-slate-200/80
            bg-slate-50/80
            p-2
          "
        >

          {tabs.map(
            (tab) => {

              const isActive =
                active ===
                tab.value;

              return (
                <button
                  key={
                    tab.value
                  }
                  onClick={() =>
                    setActive(
                      tab.value
                    )
                  }
                  className={`
                    group
                    relative
                    inline-flex
                    items-center
                    gap-3
                    rounded-2xl
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    whitespace-nowrap
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          bg-white
                          text-slate-900
                          shadow-sm
                          border
                          border-slate-200
                        `
                        : `
                          text-slate-500
                          hover:bg-white/70
                          hover:text-slate-700
                        `
                    }
                  `}
                >

                  {/* ACTIVE INDICATOR */}

                  {isActive && (

                    <div
                      className="
                        absolute
                        inset-y-2
                        left-2
                        w-1
                        rounded-full
                        bg-indigo-500
                      "
                    />

                  )}

                  {/* LABEL */}

                  <span
                    className="
                      pl-1
                    "
                  >
                    {tab.label}
                  </span>

                  {/* BADGE */}

                  {tab.badge !==
                    undefined && (

                    <span
                      className={`
                        inline-flex
                        min-w-[24px]
                        items-center
                        justify-center
                        rounded-full
                        px-2
                        py-1
                        text-[11px]
                        font-bold

                        ${
                          isActive
                            ? `
                              bg-indigo-50
                              text-indigo-700
                            `
                            : `
                              bg-slate-200
                              text-slate-600
                            `
                        }
                      `}
                    >
                      {tab.badge}
                    </span>
                  )}

                  {/* ICON */}

                  <ChevronRight
                    size={14}
                    className={`
                      transition-transform
                      duration-200

                      ${
                        isActive
                          ? `
                            translate-x-0.5
                            text-slate-400
                          `
                          : `
                            text-transparent
                            group-hover:text-slate-300
                          `
                      }
                    `}
                  />

                </button>
              );
            }
          )}

        </div>

      </div>

      {/* -------------------------------------------------------------- */}
      {/* CONTENT                                                        */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          animate-in
          fade-in-0
          duration-300
        "
      >

        {activeTab?.content}

      </div>

    </div>
  );
}