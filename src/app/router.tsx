// src/app/route.tsx

import {
  createBrowserRouter,
} from "react-router-dom";

/* ========================================================= */
/* PROTECTION */
/* ========================================================= */

import ProtectedRoute
from "../components/ProtectedRoute";

/* ========================================================= */
/* LAYOUTS */
/* ========================================================= */

import Layout
from "../components/layout/Layout";

/* ========================================================= */
/* AUTH */
/* ========================================================= */

import LoginPage
from "../modules/auth/pages/LoginPage";

import RegisterPage
from "../modules/auth/pages/RegisterPage";

/* ========================================================= */
/* DASHBOARDS */
/* ========================================================= */

import DashboardResolver
from "../components/layout/DashboardResolver";

/* ========================================================= */
/* MODULES */
/* ========================================================= */

import ClientsPage
from "../modules/clients/pages/ClientsPage";

import AgencesPage
from "../modules/agence/pages/AgencesPage";

import CaissesPage
from "../modules/caisse/pages/CaissesPage";

import TransfertClientPage
from "../modules/transfert-client/pages/TransfertClientPage";

import TransfertCaissePage
from "../modules/transfert-caisse/pages/TransfertcaissePage";

import ValidationPage
from "../modules/validation/pages/ValidationPage";

import RetraitPage
from "../modules/retrait/pages/RetraitPage";

import LedgerPage
from "../modules/ledger/pages/LedgerPage";

import AuditLogPage
from "../modules/audit/pages/AuditLogPage";

import ValidationLogPage
from "../modules/validation-log/pages/ValidationLogPage";

/* ========================================================= */
/* RECEIPTS */
/* ========================================================= */

import RetraitReceiptPage
from "../modules/receipt/pages/RetraitReceiptPage";

import TransfertReceiptPage
from "../modules/receipt/pages/TransfertReceiptPage";

/* ========================================================= */
/* ROUTER */
/* ========================================================= */

export const router =
  createBrowserRouter([

    /**
     * =======================================================
     * LOGIN
     * =======================================================
     */
    {
      path: "/login",

      element:
        <LoginPage />,
    },

    /**
     * =======================================================
     * ADMIN AREA
     * =======================================================
     */
    {
      path: "/admin",

      element: (

        <ProtectedRoute>

          <Layout />

        </ProtectedRoute>
      ),

      children: [

        /**
         * DASHBOARD
         */
        {
          index: true,

          element:
            <DashboardResolver />,
        },

        /**
         * MODULES
         */
        {
          path: "transfert-client",

          element:
            <TransfertClientPage />,
        },

        {
          path: "retrait",

          element:
            <RetraitPage />,
        },

        {
          path: "clients",

          element:
            <ClientsPage />,
        },

        {
          path: "agences",

          element:
            <AgencesPage />,
        },

        {
          path: "caisses",

          element:
            <CaissesPage />,
        },

        {
          path: "transfert-caisse",

          element:
            <TransfertCaissePage />,
        },

        {
          path: "validation",

          element:
            <ValidationPage />,
        },

        {
          path: "ledger",

          element:
            <LedgerPage />,
        },

        {
          path: "register",

          element:
            <RegisterPage />,
        },

        {
          path: "audit-logs",

          element:
            <AuditLogPage />,
        },

        {
          path: "validation-logs",

          element:
            <ValidationLogPage />,
        },

        /**
         * RECEIPTS
         */
        {
          path:
            "receipt/transfert/:id",

          element:
            <TransfertReceiptPage />,
        },

        {
          path:
            "receipt/retrait/:id",

          element:
            <RetraitReceiptPage />,
        },
      ],
    },

    /**
     * =======================================================
     * CAISSIER AREA
     * =======================================================
     */
    {
      path: "/caissier",

      element: (

        <ProtectedRoute>

          <Layout />

        </ProtectedRoute>
      ),

      children: [

        /**
         * DASHBOARD
         */
        {
          index: true,

          element:
            <DashboardResolver />,
        },

        /**
         * MODULES
         */
        {
          path: "transfert-client",

          element:
            <TransfertClientPage />,
        },

        {
          path: "retrait",

          element:
            <RetraitPage />,
        },

        {
          path: "transfert-caisse",

          element:
            <TransfertCaissePage />,
        },

        {
          path: "validation",

          element:
            <ValidationPage />,
        },

        {
          path: "caisses",

          element:
            <CaissesPage />,
        },

        {
          path: "ledger",

          element:
            <LedgerPage />,
        },

        /**
         * RECEIPTS
         */
        {
          path:
            "receipt/transfert/:id",

          element:
            <TransfertReceiptPage />,
        },

        {
          path:
            "receipt/retrait/:id",

          element:
            <RetraitReceiptPage />,
        },
      ],
    },
  ]);