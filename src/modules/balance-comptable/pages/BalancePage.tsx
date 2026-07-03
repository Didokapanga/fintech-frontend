// src/modules/balance-comptable/pages/BalancePage.tsx

import {
  useState,
} from "react";

import {
  Scale,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  useBalance,
} from "../hooks/useBalance";

import {
  useBalanceSummary,
} from "../hooks/useBalanceSummary";

import {
  useBalanceControl,
} from "../hooks/useBalanceControl";

import type {
  BalanceFilters,
  BalanceItem,
} from "../types";

import {
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";
import { useAgences } from "../../agence/hooks/useAgences";
import { useCaisses } from "../../caisse/hooks/useCaisses";

import type { Caisse } from "../../caisse/types";

export default function BalancePage() {

  const [
    filters,
    setFilters,
  ] = useState<BalanceFilters>(
    {}
  );

    const {
    data: caissesResponse,
    } = useCaisses();

    const {
    data: agences = [],
    } = useAgences();

    const caisses =
    caissesResponse?.data ?? [];

  const {
    data: balances = [],
    isLoading,
  } = useBalance(
    filters
  );

  const {
    data: summary = [],
  } = useBalanceSummary(
    filters
  );

  const {
    data: control,
  } = useBalanceControl(
    filters
  );

  const columns: Column<BalanceItem>[] = [

    {
      header: "Compte",
      accessor: "numero",
    },

    {
      header: "Libellé",
      accessor: "libelle",
    },

    {
      header: "Type",
      accessor: "type_compte",
    },

    {
      header: "Devise",
      accessor: "devise",
    },

    {
      header: "Débit",
      accessor: "total_debit",

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
            value || 0
          ).toLocaleString()}
        </span>
      ),
    },

    {
      header: "Crédit",
      accessor: "total_credit",

      render: (
        value
      ) => (
        <span
          className="
            font-semibold
            text-red-600
          "
        >
          {Number(
            value || 0
          ).toLocaleString()}
        </span>
      ),
    },

    {
      header: "Solde",
      accessor: "solde",

      render: (
        value
      ) => (

        <span
          className={`
            font-bold
            ${
              Number(value) >= 0
                ? "text-blue-600"
                : "text-red-600"
            }
          `}
        >
          {Number(
            value || 0
          ).toLocaleString()}
        </span>

      ),
    },

  ];

  return (

    <div
      className="
        space-y-6
      "
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-700
          "
        >

          <Scale size={24} />

        </div>

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Balance Comptable
          </h1>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Vue synthétique des comptes
            comptables
          </p>

        </div>

      </div>

    {/* ================================================= */}
    {/* FILTRES */}
    {/* ================================================= */}

        <div
        className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
        "
        >

        <div
            className="
            grid
            gap-4
            md:grid-cols-2
            xl:grid-cols-6
            "
        >

            {/* AGENCE */}

            <select
            className="
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
            "
            value={
                filters.agence_id || ""
            }
            onChange={(e) =>
                setFilters({
                ...filters,
                agence_id:
                    e.target.value || undefined,
                })
            }
            >

            <option value="">
                Toutes les agences
            </option>

            {agences.map(
                (agence) => (

                <option
                    key={agence.id}
                    value={agence.id}
                >
                    {agence.libelle}
                </option>

                )
            )}

            </select>

            {/* CAISSE */}

            <select
            className="
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
            "
            value={
                filters.caisse_id || ""
            }
            onChange={(e) =>
                setFilters({
                ...filters,
                caisse_id:
                    e.target.value || undefined,
                })
            }
            >

            <option value="">
                Toutes les caisses
            </option>

            {caisses.map(
                (caisse: Caisse) => (

                    <option
                    key={caisse.id}
                    value={caisse.id}
                    >
                    {caisse.code_caisse}-{caisse.agence_name}-{caisse.agent_name}
                    </option>

                )
            )}

            </select>

            {/* DEVISE */}

            <select
            className="
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
            "
            value={
                filters.devise || ""
            }
            onChange={(e) =>
                setFilters({
                ...filters,
                devise:
                    e.target.value || undefined,
                })
            }
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

            <option value="EUR">
                EUR
            </option>

            </select>

            {/* TYPE COMPTE */}

            <select
            className="
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
            "
            value={
                filters.type_compte || ""
            }
            onChange={(e) =>
                setFilters({
                ...filters,
                type_compte:
                    e.target.value || undefined,
                })
            }
            >

            <option value="">
                Tous les types
            </option>

            <option value="ACTIF">
                ACTIF
            </option>

            <option value="PASSIF">
                PASSIF
            </option>

            <option value="CHARGE">
                CHARGE
            </option>

            <option value="PRODUIT">
                PRODUIT
            </option>

            <option value="CAPITAL">
                CAPITAL
            </option>

            </select>

            {/* DATE DEBUT */}

            <input
            type="date"
            className="
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
            "
            value={
                filters.date_from || ""
            }
            onChange={(e) =>
                setFilters({
                ...filters,
                date_from:
                    e.target.value || undefined,
                })
            }
            />

            {/* DATE FIN */}

            <input
            type="date"
            className="
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
            "
            value={
                filters.date_to || ""
            }
            onChange={(e) =>
                setFilters({
                ...filters,
                date_to:
                    e.target.value || undefined,
                })
            }
            />

        </div>

        </div>

      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div
        className="
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {summary.map(
          (item) => (

            <div
              key={item.devise}
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
              "
            >

              <h3
                className="
                  text-lg
                  font-bold
                "
              >
                {item.devise}
              </h3>

              <div
                className="
                  mt-4
                  space-y-2
                "
              >

                <p>
                  Débit :
                  {" "}
                  <span
                    className="
                      font-semibold
                      text-emerald-600
                    "
                  >
                    {Number(
                      item.total_debit
                    ).toLocaleString()}
                  </span>
                </p>

                <p>
                  Crédit :
                  {" "}
                  <span
                    className="
                      font-semibold
                      text-red-600
                    "
                  >
                    {Number(
                      item.total_credit
                    ).toLocaleString()}
                  </span>
                </p>

              </div>

            </div>

          )
        )}

      </div>

      {/* ================================================= */}
      {/* CONTROL */}
      {/* ================================================= */}

      {control && (

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                Contrôle comptable
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Vérification de
                l'équilibre comptable
              </p>

            </div>

            {control.is_balanced ? (

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-emerald-600
                "
              >

                <CheckCircle2
                  size={22}
                />

                Balance équilibrée

              </div>

            ) : (

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-red-600
                "
              >

                <XCircle
                  size={22}
                />

                Balance déséquilibrée

              </div>

            )}

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <Table
        data={balances}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucune donnée"
        emptyDescription="Aucune balance disponible."
      />

    </div>

  );
}