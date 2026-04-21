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

  const columns: Column<Client>[] = [
    { header: "Nom", accessor: "name" },
    { header: "Post-nom", accessor: "first_name" },
    { header: "Prénom", accessor: "second_name" },
    { header: "Téléphone", accessor: "phone" },
    { header: "Ville", accessor: "ville" },
    {
      header: "Actions",
      accessor: "id",
      render: (_value, row) => (
        <Button
          variant="danger"
          onClick={() => setSelectedId(row.id)}
        >
          Supprimer
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Clients</h1>

        <Button onClick={() => setOpen(true)}>
          + Nouveau client
        </Button>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Rechercher un client..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // 🔥 reset pagination
        }}
        clearable
      />

      {/* TABLE */}
      <Table<Client>
        data={data || []}
        columns={columns}
        loading={isLoading}
      />

      {/* PAGINATION */}
      <div className="flex justify-center gap-2">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ←
        </Button>

        <span className="px-3 py-2 text-sm">
          Page {data?.page || 1}
        </span>

        <Button
          variant="secondary"
          onClick={() => setPage((p) => p + 1)}
        >
          →
        </Button>
      </div>

      {/* MODALS */}
      <ClientFormModal open={open} onClose={() => setOpen(false)} />

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