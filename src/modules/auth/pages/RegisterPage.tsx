// src/modules/auth/pages/RegisterPage.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import RegisterForm from "../components/RegisterForm";
import { useUsers } from "../hooks/useAuth";
import type { User } from "../types";
import Modal from "../../../components/ui/Modal"; // ✅ IMPORTANT

export default function RegisterPage() {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useUsers();

  const users = Array.isArray(data) ? data : data?.data ?? [];

  const columns: Column<User>[] = [
    {
      header: "Utilisateur",
      accessor: "user_name",
      render: (value, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            {String(value)}
          </span>
          <span className="text-xs text-gray-500">
            {row.email}
          </span>
        </div>
      ),
    },
    {
      header: "Téléphone",
      accessor: "phone",
      render: (value) => String(value),
    },
    {
      header: "Rôle",
      accessor: "role_name",
      render: (value) => {
        const role = String(value);

        const styles: Record<string, string> = {
          ADMIN: "bg-purple-100 text-purple-700",
          CAISSIER: "bg-blue-100 text-blue-700",
          "N+1": "bg-green-100 text-green-700",
          "N+2": "bg-green-100 text-green-700",
        };

        return (
          <span
            className={`px-2 py-1 rounded text-xs ${
              styles[role] || "bg-gray-100 text-gray-600"
            }`}
          >
            {role}
          </span>
        );
      },
    },
    {
      header: "Agence",
      accessor: "agence_name",
      render: (value, row) => (
        <div className="text-sm">
          <div className="font-medium">
            {String(value || "—")}
          </div>
          <div className="text-xs text-gray-500">
            {row.ville || "—"}
          </div>
        </div>
      ),
    },
    {
      header: "Statut",
      accessor: "is_activated",
      render: (value) => {
        const isActive = Boolean(value);

        return (
          <span
            className={`px-2 py-1 rounded text-xs ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isActive ? "Actif" : "Inactif"}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Utilisateurs
          </h1>
          <p className="text-sm text-gray-500">
            Gestion des comptes utilisateurs
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          + Nouvel utilisateur
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border">
        <Table<User>
          data={users}
          columns={columns}
          loading={isLoading}
        />
      </div>

      {/* EMPTY */}
      {!isLoading && users.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          Aucun utilisateur trouvé
        </div>
      )}

      {/* ✅ MODAL PROPRE */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Créer un utilisateur"
      >
        <RegisterForm />
      </Modal>

    </div>
  );
}