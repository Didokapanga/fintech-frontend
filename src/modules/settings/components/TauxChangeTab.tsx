// src/modules/settings/components/TauxChangeTab.tsx

import {
  BadgeDollarSign,
  Plus,
  RefreshCcw,
} from "lucide-react";

import {
  Button,
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import { useDeactivateTauxChange, useTauxChanges } from "../hooks/useTauxChange";
import type { TauxChange } from "../types";
import { useState } from "react";
import TauxChangeModal from "./TauxChangeModal";

export default function TauxChangeTab() {

  const {
    data = [],
    isLoading,
    refetch,
  } = useTauxChanges();

  const [open, setOpen] =
    useState(false);

  const [selectedTaux, setSelectedTaux] =
    useState<TauxChange | null>(
        null
    );

  const deactivateMutation =
    useDeactivateTauxChange();

  const columns:
    Column<TauxChange>[] = [

      {
        header:
          "Conversion",

        accessor:
          "devise_source",

        render: (
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
              {
                row.devise_source
              }
              {" → "}
              {
                row.devise_destination
              }
            </span>

            <span
              className="
                text-xs
                text-slate-400
              "
            >
              Taux de conversion
            </span>

          </div>
        ),
      },

      {
        header:
          "Taux achat",

        accessor:
          "taux_achat",

        render: (
          value
        ) => (

          <span
            className="
              font-semibold
              text-emerald-600
            "
          >
            {Number(
              value
            ).toLocaleString(
              "fr-FR"
            )}
          </span>
        ),
      },

      {
        header:
          "Taux vente",

        accessor:
          "taux_vente",

        render: (
          value
        ) => (

          <span
            className="
              font-semibold
              text-blue-600
            "
          >
            {Number(
              value
            ).toLocaleString(
              "fr-FR"
            )}
          </span>
        ),
      },

      {
        header:
          "Statut",

        accessor:
          "is_activated",

        render: (
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

        render: (
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
                      hour: "2-digit",
                      minute: "2-digit",
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
          "Action",

        accessor:
          "id",

        render: (
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

                setSelectedTaux(
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
                onClick={() => {

                  if (
                    !window.confirm(
                      "Désactiver ce taux ?"
                    )
                  ) return;

                  deactivateMutation.mutate(
                    row.id
                  );

                }}
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

      {/* HEADER */}

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

            <BadgeDollarSign
              size={14}
            />

            TAUX DE CHANGE

          </div>

          <h2
            className="
              mt-4
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Gestion des taux de change
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            Gérez les taux de conversion
            utilisés pour les opérations
            financières de la plateforme.
          </p>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

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

                setSelectedTaux(
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

            Nouveau taux

            </Button>

        </div>

      </div>

      {/* TABLE */}

      <Table<TauxChange>
        data={data}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucun taux trouvé"
        emptyDescription="Aucun taux de change n'est actuellement configuré."
      />

      <TauxChangeModal
        open={open}
        onClose={() => {

            setOpen(
            false
            );

            setSelectedTaux(
            null
            );

        }}
        taux={selectedTaux}
        />

    </div>
  );
}