import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../modules/auth/pages/LoginPage";
import Layout from "../components/layout/Layout";
import ClientsPage from "../modules/clients/pages/ClientsPage";
import AgencesPage from "../modules/agence/pages/AgencesPage";
import CaissesPage from "../modules/caisse/pages/CaissesPage";
import TransfertClientPage from "../modules/transfert-client/pages/TransfertClientPage";
import TransfertCaissePage from "../modules/transfert-caisse/pages/TransfertcaissePage";
import ValidationPage from "../modules/validation/pages/ValidationPage";
import RetraitPage from "../modules/retrait/pages/RetraitPage";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <div>Dashboard</div> },
      { path: "transfert-client", element: <TransfertClientPage /> },
      { path: "retrait", element: <RetraitPage /> },
      { path: "clients", element: <ClientsPage /> },
      { path: "agences", element: <AgencesPage /> },
      { path: "caisses", element: <CaissesPage /> },
      { path: "transfert-caisse", element: <TransfertCaissePage /> },
      { path: "validation", element: <ValidationPage /> },
      { path: "ledger", element: <div>Ledger</div> },
    ],
  },
]);