// src/modules/mouvement/components/MouvementCaisseTab.tsx

import { useState } from "react";
import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";
import { useMouvements } from "../../mouvement/hooks/useMouvement";
import type { MouvementCaisse } from "../../mouvement/services/mouvement.service";
import MouvementFormModal from "../../mouvement/components/MouvementFormModal";

export default function MouvementCaisseTab() {
  const [page, setPage] = useState(1);

  // 🔥 MODAL
  const [openMouvement, setOpenMouvement] = useState(false);

  // 🔥 FILTERS
  const [typeMouvement, setTypeMouvement] = useState("");
  const [devise, setDevise] = useState("");
  const [statut, setStatut] = useState("");
  const [dateOperation, setDateOperation] = useState("");

  const { data, isLoading } = useMouvements(
    page,
    10,
    {
      type_mouvement: typeMouvement,
      devise,
      statut,
      date_operation: dateOperation,
    }
  );

  const mouvements: MouvementCaisse[] = Array.isArray(
    data?.data
  )
    ? data.data
    : [];

  const meta = data?.meta;

  const columns: Column<MouvementCaisse>[] = [
    {
      header: "Référence",
      accessor: "code_reference",
      render: (value) => (
        <span className="text-xs font-mono text-gray-600">
          {value || "-"}
        </span>
      ),
    },

    {
      header: "Type",
      accessor: "type_mouvement",
      render: (value) => (
        <span className="text-sm text-gray-700">
          {value || "-"}
        </span>
      ),
    },

    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => (
        <span className="font-semibold text-green-600">
          {Number(value || 0).toLocaleString()}{" "}
          {row.devise || ""}
        </span>
      ),
    },

    {
      header: "Statut",
      accessor: "statut",
      render: (value) => (
        <span className="text-sm text-gray-700">
          {value || "-"}
        </span>
      ),
    },

    {
      header: "Date opération",
      accessor: "date_operation",
      render: (value) => (
        <span className="text-sm text-gray-600">
          {value
            ? new Date(String(value)).toLocaleDateString(
                "fr-FR"
              )
            : "-"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Mouvements de caisse
        </h1>

        <Button
          onClick={() => setOpenMouvement(true)}
        >
          + Mouvement
        </Button>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl border p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <select
            value={typeMouvement}
            onChange={(e) => {
              setPage(1);
              setTypeMouvement(e.target.value);
            }}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">
              Type mouvement
            </option>

            <option value="APPROVISIONNEMENT">
              APPROVISIONNEMENT
            </option>

            <option value="RETRAIT_SORTIE">
              RETRAIT_SORTIE
            </option>

            <option value="TRANSFERT_SORTIE">
              TRANSFERT_SORTIE
            </option>

            <option value="TRANSFERT_ENTREE">
              TRANSFERT_ENTREE
            </option>
          </select>

          <select
            value={devise}
            onChange={(e) => {
              setPage(1);
              setDevise(e.target.value);
            }}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">
              Devise
            </option>

            <option value="USD">
              USD
            </option>

            <option value="CDF">
              CDF
            </option>
          </select>

          <select
            value={statut}
            onChange={(e) => {
              setPage(1);
              setStatut(e.target.value);
            }}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">
              Statut
            </option>

            <option value="EXECUTE">
              EXECUTE
            </option>
          </select>

          <input
            type="date"
            value={dateOperation}
            onChange={(e) => {
              setPage(1);
              setDateOperation(e.target.value);
            }}
            className="w-full border rounded-lg px-3 py-2"
          />

          <Button
            variant="secondary"
            onClick={() => {
              setPage(1);
              setTypeMouvement("");
              setDevise("");
              setStatut("");
              setDateOperation("");
            }}
          >
            Reset
          </Button>

        </div>
      </div>

      {/* TABLE */}
      <Table<MouvementCaisse>
        data={mouvements}
        columns={columns}
        loading={isLoading}
      />

      {/* EMPTY */}
      {!isLoading && mouvements.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          Aucun mouvement trouvé
        </div>
      )}

      {/* PAGINATION */}
      {meta && (
        <div className="flex justify-center items-center gap-3">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ←
          </Button>

          <span className="text-sm text-gray-600">
            Page <strong>{meta.page}</strong> /{" "}
            {meta.totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={page >= meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            →
          </Button>
        </div>
      )}

      {/* MODAL */}
      {openMouvement && (
        <MouvementFormModal
          open={openMouvement}
          onClose={() => setOpenMouvement(false)}
        />
      )}
    </div>
  );
}