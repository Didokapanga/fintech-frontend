import { useState } from "react";
import {
  useCaisses,
  useDeleteCaisse,
  useOpenCaisse,
  useCloseCaisse,
} from "../hooks/useCaisses";
import type { Caisse } from "../types";
import { Button, Table } from "../../../components/ui";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import type { Column } from "../../../components/ui/Table.types";
import CaisseStatusBadge from "../components/CaisseStatusBadge";

// 🔥 MODALS
import MouvementFormModal from "../../mouvement/components/MouvementFormModal";
import CaisseFormModal from "../components/CaisseFormModal";

export default function CaissesPage() {
  const { data, isLoading } = useCaisses();

  const { mutate: deleteCaisse } = useDeleteCaisse();
  const { mutate: openCaisse } = useOpenCaisse();
  const { mutate: closeCaisse } = useCloseCaisse();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 🔥 MODALS STATE
  const [openMouvement, setOpenMouvement] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const columns: Column<Caisse>[] = [
    { header: "Code", accessor: "code_caisse" },
    { header: "Devise", accessor: "devise" },
    { header: "Type", accessor: "type" },

    {
      header: "Solde",
      accessor: "solde",
      render: (value, row) => (
        <span className="font-semibold text-green-600">
          {value !== undefined
            ? `${value.toLocaleString()} ${row.devise}`
            : "-"}
        </span>
      ),
    },

    {
      header: "Statut",
      accessor: "state",
      render: (value) =>
        value ? (
          <CaisseStatusBadge state={value as Caisse["state"]} />
        ) : (
          <span>-</span>
        ),
    },

    {
      header: "Actions",
      accessor: "id",
      render: (_v, row) => (
       <div className="flex gap-2 flex-wrap">
        {row.state === "FERMEE" && (
          <Button
            onClick={() => openCaisse(row.id)}
            className="px-2 py-1 text-xs"
          >
            Ouvrir
          </Button>
        )}

        {row.state === "OUVERTE" && (
          <Button
            variant="secondary"
            onClick={() => closeCaisse(row.id)}
            className="px-2 py-1 text-xs"
          >
            Fermer
          </Button>
        )}

        <Button
          variant="secondary"
          onClick={() => alert("Edit bientôt")}
          className="px-2 py-1 text-xs"
        >
          Modifier
        </Button>

        <Button
          variant="danger"
          onClick={() => setSelectedId(row.id)}
          className="px-2 py-1 text-xs"
        >
          Supprimer
        </Button>
      </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Caisses</h1>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setOpenMouvement(true)}>
            + Mouvement
          </Button>

          <Button onClick={() => setOpenCreate(true)}>
            + Caisse
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <Table<Caisse>
        data={data ?? []}
        columns={columns}
        loading={isLoading}
      />

      {/* 🔥 MODALS */}
      <MouvementFormModal
        open={openMouvement}
        onClose={() => setOpenMouvement(false)}
      />

      <CaisseFormModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />

      {/* CONFIRM DELETE */}
      <ConfirmModal
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
        onConfirm={() => {
          if (selectedId) deleteCaisse(selectedId);
        }}
        title="Supprimer caisse"
        description="Cette action est irréversible."
      />
    </div>
  );
}