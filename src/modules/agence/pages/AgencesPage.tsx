import { useState } from "react";
import { useAgences, useDeleteAgence } from "../hooks/useAgences";
import type { Agence } from "../types";
import { Button, Table } from "../../../components/ui";
import AgenceFormModal from "../components/AgenceFormModal";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import type { Column } from "../../../components/ui/Table.types";

export default function AgencesPage() {
  const { data, isLoading } = useAgences();
  const { mutate: deleteAgence, isPending } = useDeleteAgence();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!selectedId) return;

    deleteAgence(selectedId, {
      onSuccess: () => setSelectedId(null),
    });
  };

  const columns: Column<Agence>[] = [
    { header: "Libellé", accessor: "libelle" },
    { header: "Code", accessor: "code_agence" },
    { header: "Ville", accessor: "ville" },
    { header: "Commune", accessor: "commune" },
    {
      header: "Actions",
      accessor: "id",
      render: (_v, row) => (
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
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Agences</h1>

        <Button onClick={() => setOpen(true)}>
          + Nouvelle agence
        </Button>
      </div>

      <Table<Agence>
        data={data}
        columns={columns}
        loading={isLoading}
      />

      <AgenceFormModal open={open} onClose={() => setOpen(false)} />

      <ConfirmModal
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Supprimer agence"
        description="Cette action est irréversible."
      />
    </div>
  );
}