// src/modules/settings/components/SettingsTabs.tsx

import {
  // Settings,
  // Coins,
  // Wallet,
  Shield,
  // Building2,
  KeyRound,
  Users,
} from "lucide-react";

type Props = {
  activeTab: string;
  onChange: (
    tab: string
  ) => void;
};

const tabs = [
  // {
  //   key: "general",
  //   label: "Général",
  //   icon: Settings,
  // },
  // {
  //   key: "devises",
  //   label: "Devises",
  //   icon: Coins,
  // },
  // {
  //   key: "frais",
  //   label: "Frais",
  //   icon: Wallet,
  // },
  {
    key: "permissions",
    label: "Permissions",
    icon: KeyRound,
  },
  {
    key: "roles",
    label: "Rôles",
    icon: Users,
  },
  {
    key: "role-permissions",
    label: "Permissions rôles",
    icon: Shield,
  },
  // {
  //   key: "caisses",
  //   label: "Types caisse",
  //   icon: Building2,
  // },
  // {
  //   key: "securite",
  //   label: "Sécurité",
  //   icon: Shield,
  // },
];

export default function SettingsTabs({
  activeTab,
  onChange,
}: Props) {

  return (

    <div
    className="
        sticky
        top-6
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
    "
    >

      <div className="space-y-2">

        {tabs.map((tab) => {

          const Icon =
            tab.icon;

          return (

            <button
              key={tab.key}
              onClick={() =>
                onChange(tab.key)
              }
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-2xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all

                ${
                  activeTab ===
                  tab.key
                    ? `
                      bg-blue-600
                      text-white
                    `
                    : `
                      text-slate-600
                      hover:bg-slate-100
                    `
                }
              `}
            >

              <Icon size={18} />

              {tab.label}

            </button>

          );
        })}

      </div>

    </div>

  );
}