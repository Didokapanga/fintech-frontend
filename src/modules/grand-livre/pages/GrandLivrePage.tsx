// src/modules/grand-livre/pages/GrandLivrePage.tsx

import {
  useMemo,
  useState,
} from "react";

import {
  BookOpen,
  Landmark,
  Search,
  ArrowRight,
  Wallet,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import type {
  CompteComptable,
} from "../types";

import {
  useComptesComptables,
} from "../hooks/useGrandLivre";

export default function GrandLivrePage() {

  const navigate =
    useNavigate();

  const [
    search,
    setSearch,
  ] = useState("");

  const {
    data: comptes = [],
    isLoading,
  } = useComptesComptables();

  const filteredData =
    useMemo(() => {

      if (!search) {
        return comptes;
      }

      const keyword =
        search.toLowerCase();

      return comptes.filter(
        (compte) =>
          compte.numero
            ?.toLowerCase()
            .includes(keyword) ||
          compte.libelle
            ?.toLowerCase()
            .includes(keyword) ||
          compte.type_compte
            ?.toLowerCase()
            .includes(keyword)
      );

    }, [
      comptes,
      search,
    ]);

  const stats =
    useMemo(() => {

      return filteredData.reduce(
        (
          acc,
          compte
        ) => {

          acc.totalDebit +=
            Number(
              compte.total_debit || 0
            );

          acc.totalCredit +=
            Number(
              compte.total_credit || 0
            );

          acc.totalSolde +=
            Number(
              compte.solde || 0
            );

          return acc;

        },
        {
          totalDebit: 0,
          totalCredit: 0,
          totalSolde: 0,
        }
      );

    }, [filteredData]);

  const columns:
    Column<CompteComptable>[] =
    [

      {
        header:
          "Compte",

        accessor:
          "numero",

        render: (
          value,
          row
        ) => (

          <div>

            <p
              className="
                font-semibold
                text-slate-900
              "
            >
              {value}
            </p>

            <p
              className="
                text-xs
                text-slate-500
              "
            >
              {row.libelle}
            </p>

          </div>

        ),
      },

      {
        header:
          "Type",

        accessor:
          "type_compte",

        render:
          (value) => (

            <span
              className="
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-700
              "
            >
              {String(value)}
            </span>

          ),
      },

      {
        header:
          "Débit",

        accessor:
          "total_debit",

        render:
          (value) => (

            <span
              className="
                font-semibold
                text-emerald-600
              "
            >
              {Number(
                value
              ).toLocaleString()}
            </span>

          ),
      },

      {
        header:
          "Crédit",

        accessor:
          "total_credit",

        render:
          (value) => (

            <span
              className="
                font-semibold
                text-red-600
              "
            >
              {Number(
                value
              ).toLocaleString()}
            </span>

          ),
      },

      {
        header:
          "Solde",

        accessor:
          "solde",

        render:
          (value) => (

            <span
              className="
                font-bold
                text-slate-900
              "
            >
              {Number(
                value
              ).toLocaleString()}
            </span>

          ),
      },

      {
        header:
          "Actions",

        accessor:
          "id",

        render:
          (_, row) => (

            <button
              onClick={() =>
                navigate(
                  `/admin/grand-livre/${row.id}`
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                px-3
                py-2
                text-sm
                font-medium
                text-slate-700
                hover:bg-slate-100
              "
            >

              Consulter

              <ArrowRight
                size={15}
              />

            </button>

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

          <BookOpen
            size={24}
          />

        </div>

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Grand Livre
          </h1>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Consultation des
            comptes comptables
          </p>

        </div>

      </div>

      {/* STATS */}

      <div
        className="
          grid
          gap-4
          md:grid-cols-4
        "
      >

        <div
          className="
            rounded-3xl
            border
            bg-white
            p-5
          "
        >

          <Landmark
            size={20}
          />

          <p
            className="
              mt-3
              text-sm
              text-slate-500
            "
          >
            Comptes
          </p>

          <h3
            className="
              mt-1
              text-2xl
              font-bold
            "
          >
            {filteredData.length}
          </h3>

        </div>

        <div
          className="
            rounded-3xl
            border
            bg-white
            p-5
          "
        >

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Total débit
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-bold
              text-emerald-600
            "
          >
            {stats.totalDebit.toLocaleString()}
          </h3>

        </div>

        <div
          className="
            rounded-3xl
            border
            bg-white
            p-5
          "
        >

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Total crédit
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-bold
              text-red-600
            "
          >
            {stats.totalCredit.toLocaleString()}
          </h3>

        </div>

        <div
          className="
            rounded-3xl
            border
            bg-white
            p-5
          "
        >

          <Wallet
            size={20}
          />

          <p
            className="
              mt-3
              text-sm
              text-slate-500
            "
          >
            Solde global
          </p>

          <h3
            className="
              mt-1
              text-2xl
              font-bold
            "
          >
            {stats.totalSolde.toLocaleString()}
          </h3>

        </div>

      </div>

      {/* SEARCH */}

      <div
        className="
          relative
          max-w-md
        "
      >

        <Search
          size={18}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Rechercher un compte..."
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            py-3
            pl-10
            pr-4
            text-sm
          "
        />

      </div>

      {/* TABLE */}

      <Table
        data={filteredData}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucun compte comptable"
        emptyDescription="Aucun compte disponible."
      />

    </div>

  );
}