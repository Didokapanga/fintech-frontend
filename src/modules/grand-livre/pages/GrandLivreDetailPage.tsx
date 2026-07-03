// src/modules/grand-livre/pages/GrandLivreDetailPage.tsx

import {
  useMemo,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  Landmark,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import {
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import {
  useCompteGrandLivre,
} from "../hooks/useCompteGrandLivre";

import {
  useCompteSummary,
} from "../hooks/useCompteSummary";

import type {
  GrandLivreEntry,
} from "../types";

export default function GrandLivreDetailPage() {

  const navigate =
    useNavigate();

  const {
    compteId,
  } = useParams();

  const {
    data: ecritures = [],
    isLoading,
  } = useCompteGrandLivre(
    compteId
  );

  const {
    data: summary,
  } = useCompteSummary(
    compteId
  );

  /**
   * =====================================================
   * SOLDE PROGRESSIF
   * =====================================================
   */
  const rowsWithBalance =
    useMemo(() => {

        return ecritures.reduce<
        (GrandLivreEntry & {
            runningBalance: number;
        })[]
        >(
        (
            acc,
            entry
        ) => {

            const previousBalance =
            acc.length > 0
                ? acc[
                    acc.length - 1
                ].runningBalance
                : 0;

            const runningBalance =
            previousBalance +
            Number(
                entry.debit || 0
            ) -
            Number(
                entry.credit || 0
            );

            acc.push({
            ...entry,
            runningBalance,
            });

            return acc;

        },
        []
        );

    }, [ecritures]);

  const columns: Column<
    GrandLivreEntry & {
      runningBalance: number;
    }
  >[] = [

    {
      header: "Date",
      accessor:
        "date_operation",

      render:
        (value) =>

          new Date(
            String(value)
          ).toLocaleDateString(),
    },

    {
      header: "Journal",
      accessor:
        "journal_code",

      render: (
        value,
        row
      ) => (

        <div>

          <p
            className="
              font-semibold
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
            {
              row.journal_libelle
            }
          </p>

        </div>

      ),
    },

    {
      header:
        "Référence",

      accessor:
        "reference_piece",
    },

    {
      header:
        "Débit",

      accessor:
        "debit",

      render:
        (value) => (

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
      header:
        "Crédit",

      accessor:
        "credit",

      render:
        (value) => (

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
      header:
        "Solde",

      accessor:
        "runningBalance",

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
          justify-between
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <button
            onClick={() =>
              navigate(-1)
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          >

            <ArrowLeft
              size={18}
            />

          </button>

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
              Détail du compte
              comptable
            </p>

          </div>

        </div>

      </div>

      {/* INFOS COMPTE */}

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
            gap-3
          "
        >

          <BookOpen
            size={22}
            className="
              text-blue-600
            "
          />

          <div>

            <h2
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              {
                summary?.numero
              }
            </h2>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              {
                summary?.libelle
              }
            </p>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div
        className="
          grid
          gap-4
          md:grid-cols-3
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

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <TrendingUp
              size={18}
              className="
                text-emerald-600
              "
            />

            <span
              className="
                text-sm
                text-slate-500
              "
            >
              Débit total
            </span>

          </div>

          <h3
            className="
              mt-3
              text-2xl
              font-bold
              text-emerald-600
            "
          >
            {Number(
              summary?.total_debit ||
                0
            ).toLocaleString()}
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

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <TrendingDown
              size={18}
              className="
                text-red-600
              "
            />

            <span
              className="
                text-sm
                text-slate-500
              "
            >
              Crédit total
            </span>

          </div>

          <h3
            className="
              mt-3
              text-2xl
              font-bold
              text-red-600
            "
          >
            {Number(
              summary?.total_credit ||
                0
            ).toLocaleString()}
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

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Landmark
              size={18}
              className="
                text-blue-600
              "
            />

            <span
              className="
                text-sm
                text-slate-500
              "
            >
              Solde
            </span>

          </div>

          <h3
            className="
              mt-3
              text-2xl
              font-bold
              text-slate-900
            "
          >
            {Number(
              summary?.solde || 0
            ).toLocaleString()}
          </h3>

        </div>

      </div>

      {/* TABLEAU */}

      <Table
        data={rowsWithBalance}
        columns={columns}
        loading={isLoading}
        emptyTitle="Aucune écriture"
        emptyDescription="Aucune écriture trouvée pour ce compte."
      />

    </div>

  );
}