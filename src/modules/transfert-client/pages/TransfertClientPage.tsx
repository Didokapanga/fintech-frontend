// src/modules/transfert-client/pages/TransfertClientPage.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button, Table } from "../../../components/ui";
import type { Column } from "../../../components/ui/Table.types";

import { useMyTransferts } from "../hooks/useTransfert";

import {
  getTransfertsByAgence,
  type TransfertClient,
} from "../services/transfert.service";

import { useAgences } from "../../agence/hooks/useAgences";

import TransfertClientModal from "../components/TransfertFormModal";
import { useAuthStore } from "../../../app/store";
import { api } from "../../../services/api";


export default function TransfertClientPage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { user } = useAuthStore();

  // 🔥 FILTERS
  const [statut, setStatut] = useState("");
  const [dateOperation, setDateOperation] =
    useState("");
  
  const [selectedAgence, setSelectedAgence] =
  useState("");

  const isGlobalAdmin =
  user?.role_name === "ADMIN";

  const isAgenceView =
    ["N+1", "N+2"].includes(
      user?.role_name || ""
    );
  
  const { data: agences = [] } =
  useAgences();

  const myTransfertsQuery =
    useMyTransferts(
      page,
      10,
      {
        statut,
        date_operation:
          dateOperation,
      },

      !isGlobalAdmin &&
      !isAgenceView
    );

  const agenceTransfertsQuery =
    useQuery({
      queryKey: [
        "agence-transferts",
        user?.agence_id,
        page,
        statut,
        dateOperation,
      ],

      queryFn: () =>
        getTransfertsByAgence(
          String(user?.agence_id),
          page,
          10,
          {
            statut,
            date_operation:
              dateOperation,
          }
        ),

      enabled:
        isAgenceView &&
        !!user?.agence_id,
    });

  const globalTransfertsQuery =
  useQuery({
    queryKey: [
      "global-transferts",
      page,
      statut,
      dateOperation,
      selectedAgence,
    ],

    queryFn: async () => {
      const params =
        new URLSearchParams();

      params.append(
        "page",
        String(page)
      );

      params.append("limit", "10");

      if (statut) {
        params.append(
          "statut",
          statut
        );
      }

      if (dateOperation) {
        params.append(
          "date_operation",
          dateOperation
        );
      }

      if (selectedAgence) {
        params.append(
          "agence_exp",
          selectedAgence
        );
      }

      const res = await api.get(
        `/transfert-client?${params.toString()}`
      );

      return res.data;
    },

    enabled: isGlobalAdmin,
  });

  const currentQuery =
    isGlobalAdmin
      ? globalTransfertsQuery
      : isAgenceView
      ? agenceTransfertsQuery
      : myTransfertsQuery;

  const { data, isLoading } =
    currentQuery;

  const transferts: TransfertClient[] =
    Array.isArray(data)
      ? data
      : data?.data ?? [];

  const meta = !Array.isArray(data)
    ? data?.meta
    : undefined;

  // 🎨 STYLE STATUT
  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "INITIE":
        return "bg-yellow-100 text-yellow-700";
      case "VALIDE":
        return "bg-blue-100 text-blue-700";
      case "EXECUTE":
        return "bg-green-100 text-green-700";
      case "REJETE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const columns: Column<TransfertClient>[] = [
    {
      header: "Référence",
      accessor: "code_reference",
      render: (value) => (
        <span className="text-xs font-mono text-gray-600">
          {value}
        </span>
      ),
    },

    {
      header: "Expéditeur",
      accessor: "exp_nom",
      render: (_v, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            {row.exp_nom}{" "}
            {row.exp_postnom}
          </span>
          <span className="text-xs text-gray-500">
            {row.exp_phone}
          </span>
        </div>
      ),
    },

    {
      header: "Destinataire",
      accessor: "dest_nom",
      render: (_v, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            {row.dest_nom}{" "}
            {row.dest_postnom}
          </span>
          <span className="text-xs text-gray-500">
            {row.dest_phone}
          </span>
        </div>
      ),
    },

    {
      header: "Montant",
      accessor: "montant",
      render: (value, row) => {
        const montant =
          typeof value === "number"
            ? value
            : Number(value);

        return (
          <div className="flex flex-col">
            <span className="font-semibold text-green-600">
              {montant.toLocaleString()}{" "}
              {row.devise}
            </span>

            <span className="text-xs text-gray-400">
              Frais: {row.frais} •
              Comm: {row.commission}
            </span>
          </div>
        );
      },
    },

    {
      header: "Statut",
      accessor: "statut",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(
            String(value)
          )}`}
        >
          {value}
        </span>
      ),
    },

    {
      header: "Date",
      accessor: "date_operation",
      render: (value, row) => {
        const finalDate =
          value || row.created_at;

        return (
          <span className="text-sm text-gray-600">
            {new Date(
              String(finalDate)
            ).toLocaleDateString(
              "fr-FR"
            )}
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
            Transferts clients
          </h1>

          <p className="text-sm text-gray-500">
            Historique des opérations
            envoyées
          </p>
        </div>

        <div className="flex items-center gap-3">

            {isGlobalAdmin && (
              <select
                value={selectedAgence}
                onChange={(e) => {
                  setPage(1);
                  setSelectedAgence(
                    e.target.value
                  );
                }}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">
                  Toutes les agences
                </option>

                {agences.map((agence) => (
                  <option
                    key={agence.id}
                    value={agence.id}
                  >
                    {agence.libelle}
                  </option>
                ))}
              </select>
            )}

            <Button
              onClick={() => setOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              + Nouveau transfert
            </Button>

        </div>
        {/* <Button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          + Nouveau transfert
        </Button> */}
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl border p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <select
            value={statut}
            onChange={(e) => {
              setPage(1);
              setStatut(
                e.target.value
              );
            }}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">
              Statut
            </option>

            <option value="INITIE">
              INITIE
            </option>

            <option value="VALIDE">
              VALIDE
            </option>

            <option value="EXECUTE">
              EXECUTE
            </option>

            <option value="ANNULE">
              ANNULE
            </option>
          </select>

          <input
            type="date"
            value={dateOperation}
            onChange={(e) => {
              setPage(1);
              setDateOperation(
                e.target.value
              );
            }}
            className="w-full border rounded-lg px-3 py-2"
          />

          <Button
            variant="secondary"
            onClick={() => {
              setPage(1);
              setStatut("");
              setDateOperation("");
            }}
          >
            Reset
          </Button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table<TransfertClient>
          data={transferts}
          columns={columns}
          loading={isLoading}
        />
      </div>

      {/* EMPTY */}
      {!isLoading &&
        transferts.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            Aucun transfert trouvé
          </div>
        )}

      {/* PAGINATION */}
      {meta && (
        <div className="flex justify-center items-center gap-3">
          <Button
            variant="secondary"
            disabled={page === 1}
            onClick={() =>
              setPage((p) => p - 1)
            }
          >
            ←
          </Button>

          <span className="text-sm text-gray-600">
            Page{" "}
            <strong>
              {meta.page}
            </strong>{" "}
            / {meta.totalPages}
          </span>

          <Button
            variant="secondary"
            disabled={
              page >=
              meta.totalPages
            }
            onClick={() =>
              setPage((p) => p + 1)
            }
          >
            →
          </Button>
        </div>
      )}

      {/* MODAL */}
      {open && (
        <TransfertClientModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
        />
      )}
    </div>
  );
}