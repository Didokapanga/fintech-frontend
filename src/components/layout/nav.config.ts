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
  // ArrowLeftRight,
  Users,
  ArrowLeftRight,
  // FileSpreadsheet,
} from "lucide-react";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

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

export const getNavItems = ({
  // role,
  isCaisseUser,
}: {
  role?: string;
  isCaisseUser?: boolean;
}) => {

  const isCaissier =
    isCaisseUser === true;

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

    {
      label: "Clients",
      icon: Users,
      path: `${base}/clients`,
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
    /* TRANSFERTS */
    /* ===================================================== */

    {
      label: "Transferts",

      icon: Repeat,

      children: [

        {
          label: "Inter-caisses",
          icon: ArrowLeftRight,
          path: `${base}/transfert-caisse`,
        },

        {
          label: "Entrée / Sortie",
          icon: Building2,
          path: `${base}/transfert-inter-agence`,
        },

      ],
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

        ...(
          !isCaissier
            ? [
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
              ]
            : []
        ),

        {
          label: "Journal comptable",
          icon: FileText,
          path: `${base}/ledger`,
        },
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