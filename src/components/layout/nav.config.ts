// src/layouts/nav.config.ts

import {
  Home,
  Banknote,
  Repeat,
  ClipboardCheck,
  Wallet,
  FileText,
  History,
  Building2,
  Send,
  UserPlus,
  ShieldCheck,
} from "lucide-react";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

type Role =
  | "ADMIN"
  | "CAISSIER"
  | "N+1"
  | "N+2";

/* ========================================================= */
/* NAV FACTORY */
/* ========================================================= */

export const getNavItems = (
  role?: string
) => {

  const isCaissier =
    role === "CAISSIER";

  const base =
    isCaissier
      ? "/caissier"
      : "/admin";

  return [

    /* ===================================================== */
    /* DASHBOARD */
    /* ===================================================== */

    {
      label: "Dashboard",
      icon: Home,
      path: base,
    },

    /* ===================================================== */
    /* ENVOI */
    /* ===================================================== */

    {
      label: "Envoi",
      icon: Send,
      path:
        `${base}/transfert-client`,
    },

    /* ===================================================== */
    /* RETRAIT */
    /* ===================================================== */

    {
      label: "Paiement",
      icon: Banknote,
      path:
        `${base}/retrait`,
    },

    /* ===================================================== */
    /* AGENCES */
    /* ===================================================== */

    ...(
      !isCaissier
        ? [
            {
              label: "Agences",
              icon: Building2,
              path:
                `${base}/agences`,
            },
          ]
        : []
    ),

    /* ===================================================== */
    /* TRANSFERT CAISSE */
    /* ===================================================== */

    {
      label:
        "Transfert caisse",

      icon: Repeat,

      path:
        `${base}/transfert-caisse`,
    },

    /* ===================================================== */
    /* VALIDATIONS */
    /* ===================================================== */

    {
      label: "Validations",

      icon:
        ClipboardCheck,

      path:
        `${base}/validation`,
    },

    /* ===================================================== */
    /* CAISSES */
    /* ===================================================== */

    {
      label: "Caisses",

      icon: Wallet,

      path:
        `${base}/caisses`,
    },

    /* ===================================================== */
    /* REGISTRE */
    /* ===================================================== */

    {
      label: "Registre",

      icon: FileText,

      path:
        `${base}/ledger`,
    },

    /* ===================================================== */
    /* ADMIN ONLY */
    /* ===================================================== */

    ...(
      !isCaissier
        ? [
            {
              label:
                "Audit Logs",

              icon:
                ShieldCheck,

              path:
                `${base}/audit-logs`,

              roles: [
                "ADMIN",
                "N+1",
                "N+2",
              ] as Role[],
            },

            {
              label:
                "Validation Logs",

              icon:
                History,

              path:
                `${base}/validation-logs`,

              roles: [
                "ADMIN",
                "N+1",
                "N+2",
              ] as Role[],
            },

            {
              label:
                "Utilisateurs",

              icon:
                UserPlus,

              path:
                `${base}/register`,

              roles: [
                "ADMIN",
                "N+1",
                "N+2",
              ] as Role[],
            },
          ]
        : []
    ),
  ];
};