// src/app/route.tsx

import {
  createBrowserRouter,
  Navigate,
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

import Setting
from "../modules/settings/pages/Setting";

import GrandLivreDetailPage
from "../modules/grand-livre/pages/GrandLivreDetailPage";

import BalancePage
from "../modules/balance-comptable/pages/BalancePage";

import ChangePage
from "../modules/change-devise/pages/ChangePage";

/* ========================================================= */
/* RECEIPTS */
/* ========================================================= */

import RetraitReceiptPage
from "../modules/receipt/pages/RetraitReceiptPage";

import TransfertReceiptPage
from "../modules/receipt/pages/TransfertReceiptPage";
import GrandLivrePage from "../modules/grand-livre/pages/GrandLivrePage";

/* ========================================================= */
/* ROUTER */
/* ========================================================= */

export const router =
  createBrowserRouter([

    {
      path: "/",
      element: (
        <Navigate
          to="/login"
          replace
        />
      ),
    },

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
          path: "change",

          element:
            <ChangePage />,
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
          path: "grand-livre",
          element: <GrandLivrePage />,
        },

        {
          path: "grand-livre/:compteId",
          element: <GrandLivreDetailPage />,
        },

        {
          path: "balance",

          element:
            <BalancePage />,
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

        {
          path: "parametres",

          element:
            <Setting />,
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
          path: "change",

          element:
            <ChangePage />,
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

        {
          path: "parametres",

          element:
            <Setting />,
        },
      ],
    },
  ]);