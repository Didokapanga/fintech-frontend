// src/modules/settings/components/SettingsTabs.tsx

import {
  ShieldCheck,
  Users,
  KeyRound,
  BadgeDollarSign,
  Receipt,
} from "lucide-react";

type Props = {
  activeTab: string;
  onChange: (
    tab: string
  ) => void;
};

const tabs = [

  {
    key: "permissions",
    label: "Permissions",
    icon: ShieldCheck,
  },

  {
    key: "roles",
    label: "Rôles",
    icon: Users,
  },

  {
    key: "role-permissions",
    label: "Permissions par rôle",
    icon: KeyRound,
  },

  {
    key: "taux-change",
    label: "Taux de change",
    icon: BadgeDollarSign,
  },

  {
    key: "transfert-tarifs",
    label: "Tarifs transfert",
    icon: Receipt,
  },

];

export default function SettingsTabs({
  activeTab,
  onChange,
}: Props) {

  return (

    <div
      className="
        flex
        flex-wrap
        gap-3
      "
    >

      {tabs.map(
        (tab) => {

          const Icon =
            tab.icon;

          return (

            <button
              key={tab.key}
              onClick={() =>
                onChange(
                  tab.key
                )
              }
              className={`
                flex
                items-center
                gap-2
                rounded-2xl
                border
                px-5
                py-3
                text-sm
                font-medium
                transition-all
                ${
                  activeTab ===
                  tab.key
                    ? `
                      border-blue-600
                      bg-blue-600
                      text-white
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-700
                      hover:bg-slate-50
                    `
                }
              `}
            >

              <Icon size={16} />

              {tab.label}

            </button>

          );

        }
      )}

    </div>

  );

}