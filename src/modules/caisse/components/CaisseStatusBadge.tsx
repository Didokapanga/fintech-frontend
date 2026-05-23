// src/modules/caisse/components/CaisseStatusBadge.tsx

import type {
  ReactNode,
} from "react";

import {
  CheckCircle2,
  Lock,
  ShieldX,
} from "lucide-react";

import type {
  CaisseState,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

type StatusConfig = {
  label: string;
  className: string;
  icon: ReactNode;
};

const statusConfig: Record<
  CaisseState,
  StatusConfig
> = {

  OUVERTE: {
    label: "OUVERTE",

    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",

    icon: (
      <CheckCircle2
        size={13}
      />
    ),
  },

  FERMEE: {
    label: "FERMÉE",

    className:
      "bg-amber-100 text-amber-700 border border-amber-200",

    icon: (
      <Lock
        size={13}
      />
    ),
  },

  CLOTUREE: {
    label: "CLÔTURÉE",

    className:
      "bg-red-100 text-red-700 border border-red-200",

    icon: (
      <ShieldX
        size={13}
      />
    ),
  },
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

type Props = {
  state: CaisseState;
};

export default function CaisseStatusBadge({
  state,
}: Props) {

  const config =
    statusConfig[state];

  return (

    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1
        text-[11px]
        font-semibold
        tracking-wide
        ${config.className}
      `}
    >

      {config.icon}

      {config.label}

    </span>

  );
}