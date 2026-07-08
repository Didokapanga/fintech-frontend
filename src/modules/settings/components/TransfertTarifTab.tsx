// src/modules/settings/components/TransfertTarifTab.tsx

import {
  Plus,
  RefreshCcw,
  Receipt,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Button,
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import {
  useDeactivateTransfertTarif,
  useTransfertTarifs,
} from "../hooks/useTransfertTarif";

import type {
  TransfertTarif,
} from "../types";

import TransfertTarifModal
from "./TransfertTarifModal";

export default function TransfertTarifTab() {

  const [
    devise,
    setDevise,
  ] = useState("");

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    selectedTarif,
    setSelectedTarif,
  ] =
    useState<
      TransfertTarif | null
    >(null);

  const {
    data = [],
    isLoading,
    refetch,
  } =
    useTransfertTarifs(
      devise || undefined
    );

  const deactivateMutation =
    useDeactivateTransfertTarif();

  const tarifs =
    useMemo(
      () => data || [],
      [data]
    );

  const columns:
    Column<TransfertTarif>[] = [

      {
        header:
          "Devise",

        accessor:
          "devise",

        render:
          (
            value
          ) => (

            <div
              className="
                flex
                flex-col
              "
            >

              <span
                className="
                  font-semibold
                  text-slate-800
                "
              >
                {value}
              </span>

              <span
                className="
                  text-xs
                  text-slate-400
                "
              >
                Tarif transfert
              </span>

            </div>

          ),
      },

      {
        header:
          "Intervalle",

        accessor:
          "montant_min",

        render:
          (
            _value,
            row
          ) => (

            <div
              className="
                flex
                flex-col
              "
            >

              <span
                className="
                  font-semibold
                  text-slate-800
                "
              >
                {Number(
                  row.montant_min
                ).toLocaleString()}
              </span>

              <span
                className="
                  text-xs
                  text-slate-400
                "
              >
                →
                {" "}
                {Number(
                  row.montant_max
                ).toLocaleString()}
              </span>

            </div>

          ),
      },

      {
        header:
          "Frais",

        accessor:
          "frais",

        render:
          (
            value,
            row
          ) => (

            <span
              className="
                font-semibold
                text-emerald-600
              "
            >
              {Number(
                value
              ).toLocaleString()}
              {" "}
              {row.devise}
            </span>

          ),
      },

      {
        header:
          "Statut",

        accessor:
          "is_activated",

        render:
          (
            value
          ) => (

            <span
              className={`
                inline-flex
                items-center
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-semibold
                ${
                  value
                    ? `
                      border-emerald-200
                      bg-emerald-50
                      text-emerald-700
                    `
                    : `
                      border-red-200
                      bg-red-50
                      text-red-700
                    `
                }
              `}
            >
              {
                value
                  ? "ACTIF"
                  : "INACTIF"
              }
            </span>

          ),
      },

      {
        header:
          "Date création",

        accessor:
          "created_at",

        render:
          (
            value
          ) => {

            const date =
              new Date(
                String(
                  value
                )
              );

            return (

              <div
                className="
                  flex
                  flex-col
                "
              >

                <span
                  className="
                    text-sm
                    text-slate-700
                  "
                >
                  {
                    date.toLocaleDateString(
                      "fr-FR"
                    )
                  }
                </span>

                <span
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  {
                    date.toLocaleTimeString(
                      "fr-FR",
                      {
                        hour:
                          "2-digit",
                        minute:
                          "2-digit",
                      }
                    )
                  }
                </span>

              </div>

            );

          },
      },

      {
        header:
          "Actions",

        accessor:
          "id",

        render:
          (
            _value,
            row
          ) => (

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <button
                onClick={() => {

                  setSelectedTarif(
                    row
                  );

                  setOpen(
                    true
                  );

                }}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-slate-700
                  transition-all
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                Modifier
              </button>

              {row.is_activated && (

                <button
                  onClick={() =>
                    deactivateMutation.mutate(
                      row.id
                    )
                  }
                  className="
                    rounded-xl
                    border
                    border-red-200
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-red-600
                    transition-all
                    hover:bg-red-50
                  "
                >
                  Désactiver
                </button>

              )}

            </div>

          ),
      },

    ];

  return (

    <div
      className="
        space-y-6
      "
    >

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-blue-50
              px-3
              py-1
              text-xs
              font-semibold
              text-blue-700
            "
          >

            <Receipt
              size={14}
            />

            TARIFS DE TRANSFERT

          </div>

          <h2
            className="
              mt-4
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Gestion des tarifs
          </h2>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <select
            value={devise}
            onChange={(
              e
            ) =>
              setDevise(
                e.target.value
              )
            }
            className="
              rounded-xl
              border
              border-slate-200
              px-4
              py-2
            "
          >
            <option value="">
              Toutes devises
            </option>

            <option value="USD">
              USD
            </option>

            <option value="CDF">
              CDF
            </option>

          </select>

          <Button
            variant="secondary"
            onClick={() =>
              refetch()
            }
          >

            <RefreshCcw
              size={16}
            />

            Actualiser

          </Button>

          <Button
            onClick={() => {

              setSelectedTarif(
                null
              );

              setOpen(
                true
              );

            }}
          >

            <Plus
              size={16}
            />

            Nouveau tarif

          </Button>

        </div>

      </div>

      <Table<TransfertTarif>
        data={tarifs}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucun tarif trouvé"
        emptyDescription="Aucun tarif de transfert n'est configuré."
      />

      <TransfertTarifModal
        open={open}
        tarif={selectedTarif}
        onClose={() => {

          setOpen(
            false
          );

          setSelectedTarif(
            null
          );

        }}
      />

    </div>

  );

}
