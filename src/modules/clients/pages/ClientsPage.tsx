// src/modules/clients/pages/ClientsPage.tsx

import { useState } from "react";
import { useClients, useDeleteClient } from "../hooks/useClients";
import type { Client } from "../types";
import { Button, Table, Input } from "../../../components/ui";
import ClientFormModal from "../components/ClientForm";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import type { Column } from "../../../components/ui/Table.types";
import useDebounce from "../hooks/useDebounce";

export default function ClientsPage() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [page, setPage] = useState(1);

  const { data, isLoading } = useClients({
    search: debouncedSearch,
    page,
    limit: 10,
  });

  const { mutate: deleteClient, isPending } = useDeleteClient();

  const handleDelete = () => {
    if (!selectedId) return;

    deleteClient(selectedId, {
      onSuccess: () => setSelectedId(null),
    });
  };

  // 🔥 FIX GLOBAL : supporte les 2 formats (array OU paginated)
  const clients = data ?? [];

  const columns: Column<Client>[] = [

  {
    header: "Client",
    accessor: "nom",

    render: (_value, row) => (

      <div className="flex flex-col">

        <span className="font-semibold text-slate-800">
          {row.nom} {row.postnom}
        </span>

        <span className="text-xs text-slate-500">
          {row.prenom}
        </span>

      </div>

    ),
  },

  {
    header: "Téléphone",
    accessor: "telephone",

    render: (value) => (

      <span className="font-medium text-slate-700">
        {String(value ?? "-")}
      </span>

    ),
  },

  {
    header: "Sexe",
    accessor: "sexe",

    render: (value) => (

      <span
        className={`
          rounded-full
          px-2
          py-1
          text-xs
          font-medium
          ${
            value === "M"
              ? "bg-blue-100 text-blue-700"
              : "bg-pink-100 text-pink-700"
          }
        `}
      >
        {value || "-"}
      </span>

    ),
  },

  {
    header: "Profession",
    accessor: "profession",

    render: (value) => (

      <span className="text-slate-600">
        {String(value ?? "-")}
      </span>

    ),
  },

  {
    header: "Pièce",
    accessor: "numero_piece",

    render: (_value, row) => (

      <div className="flex flex-col">

        <span className="text-sm font-medium">
          {row.type_piece ?? "-"}
        </span>

        <span className="text-xs text-slate-500">
          {row.numero_piece ?? "-"}
        </span>

      </div>

    ),
  },

  {
      header: "Expiration pièce",

      accessor:
        "date_expiration_piece",

      render: (
        value
      ) =>

        new Date(
          String(value)
        ).toLocaleString(
          "fr-FR"
        ),
    },

  {
    header: "Ville",
    accessor: "ville",

    render: (value) => (

      <span
        className="
          rounded-lg
          bg-slate-100
          px-2
          py-1
          text-xs
          text-slate-700
        "
      >
        {String(value ?? "-")}
      </span>

    ),
  },

  {
    header: "Statut",
    accessor: "is_activated",

    render: (value) => (

      <span
        className={`
          rounded-full
          px-2
          py-1
          text-xs
          font-medium
          ${
            value
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }
        `}
      >
        {value
          ? "Actif"
          : "Inactif"}
      </span>

    ),
  },

  {
    header: "Actions",
    accessor: "id",

    render: (_value, row) => (

      <div className="flex gap-2">

        <Button
          variant="danger"
          className="text-xs px-3 py-1"
          onClick={() =>
            setSelectedId(row.id)
          }
        >
          Supprimer
        </Button>

      </div>

    ),
  },

];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Clients
          </h1>
          <p className="text-sm text-gray-500">
            Gestion des clients enregistrés
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          + Nouveau client
        </Button>
      </div>

      {/* SEARCH */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <Input
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          clearable
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border">
        <Table<Client>
          data={clients}
          columns={columns}
          loading={isLoading}
        />
      </div>

      {/* EMPTY */}
      {!isLoading && clients.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          Aucun client trouvé
        </div>
      )}

      {/* PAGINATION */}
      {/* {meta && (
        <div className="flex justify-center items-center gap-3">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ←
          </Button>

          <span className="text-sm text-gray-600">
            Page <strong>{meta.page}</strong> / {meta.totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={page >= meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            →
          </Button>
        </div>
      )} */}

      {/* MODALS */}
      {open && (
        <ClientFormModal
          open={open}
          onClose={() => setOpen(false)}
        />
      )}

      <ConfirmModal
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Supprimer ce client"
        description="Cette action est irréversible."
      />
    </div>
  );
}