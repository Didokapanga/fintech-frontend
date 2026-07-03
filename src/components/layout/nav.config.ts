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
  Settings,
  // Landmark,
  ScrollText,
  // ReceiptText,
  BookOpen,
  Scale,
  ArrowLeftRight,
  // FileSpreadsheet,
} from "lucide-react";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

export type Role =
  | "ADMIN"
  | "CAISSIER"
  | "N+1"
  | "N+2";

export type NavItemType = {
  label: string;
  path?: string;
  icon: React.ElementType;
  roles?: string[];
  children?: NavItemType[];
};

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
    /* OPERATION */
    /* ===================================================== */

    {
      label: "Opérations",

      icon: Repeat,

      children: [

        {
          label: "Envoi",
          icon: Send,
          path:
            `${base}/transfert-client`,
        },

        {
          label: "Paiement",
          icon: Banknote,
          path:
            `${base}/retrait`,
        },

        {
          label: "Change",
          icon: ArrowLeftRight,
          path:
            `${base}/change`,
        },

      ],
    },

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
      label: "Comptabilité",

      icon: BookOpen,

      children: [

        {
          label: "Balance comptable",
          icon: Scale,
          path: `${base}/balance`,
        },

        {
          label: "Grand Livre",
          icon: ScrollText,
          path: `${base}/grand-livre`,
        },

        {
          label: "Journal comptable",
          icon: FileText,
          path: `${base}/ledger`,
        },

        // {
        //   label: "Écritures comptables",
        //   icon: ReceiptText,
        //   path: `${base}/ecritures-comptables`,
        // },

        // {
        //   label: "Comptes comptables",
        //   icon: Landmark,
        //   path: `${base}/comptes-comptables`,
        // },
      ],
    },
    // {
    //   label: "Comptabilité",

    //   icon: BookOpen,

    //   children: [

    //     {
    //       label: "Écritures",

    //       icon: ReceiptText,

    //       path:
    //         `${base}/ecritures-comptables`,
    //     },

    //     {
    //       label: "Journaux",

    //       icon: FileText,

    //       path:
    //         `${base}/journaux`,
    //     },

    //     {
    //       label: "Grand Livre",

    //       icon: ScrollText,

    //       path:
    //         `${base}/grand-livre`,
    //     },

    //     {
    //       label: "Registre",

    //       icon: FileText,
          
    //       path: `${base}/ledger`,
    //     },

    //     {
    //       label: "Balance",

    //       icon: Scale,

    //       path:
    //         `${base}/balance-comptable`,
    //     },

    //     {
    //       label: "Comptes",

    //       icon: Landmark,

    //       path:
    //         `${base}/comptes-comptables`,
    //     },

    //     {
    //       label: "Exports",

    //       icon: FileSpreadsheet,

    //       path:
    //         `${base}/exports-comptables`,
    //     },

    //   ],
    // },

    /**
     * ==================================================
     * PARAMETRES
     * ==================================================
     */
      ...(
      !isCaissier
        ? [
            {
              label: "Configurations",

              icon: ShieldCheck,

              children: [

                {
                  label: "Agences",
                  icon: Building2,
                  path:
                    `${base}/agences`,
                },

                {
                  label: "Utilisateurs",
                  icon: UserPlus,
                  path:
                    `${base}/register`,
                },

                {
                  label: "Audit Logs",
                  icon: ShieldCheck,
                  path:
                    `${base}/audit-logs`,
                },

                {
                  label: "Validation Logs",
                  icon: History,
                  path:
                    `${base}/validation-logs`,
                },

                {
                  label: "Paramètres",
                  icon: Settings,
                  path:
                    `${base}/parametres`,
                },
              ],
            },
          ]
        : []
    ),
  ];
};