// src/modules/admin/pages/AdminDashboard.tsx

import { useState } from "react";
import { useAuthStore } from "../../../app/store";
import DashboardTable from "../components/DashboardTable";
import { useDashboard } from "../hooks/useDashboard";

export default function AdminDashboard() {

  const user =
    useAuthStore(
      (s) => s.user
    );

  /**
   * =========================================
   * 📅 FILTRES PÉRIODE
   * =========================================
   */
  const [
    dateFrom,
    setDateFrom
  ] = useState("");

  const [
    dateTo,
    setDateTo
  ] = useState("");

  /**
   * =========================================
   * 📊 DASHBOARD
   * =========================================
   */
  const { data } =
    useDashboard({
      date_from:
        dateFrom || undefined,

      date_to:
        dateTo || undefined,
    });

  const dashboard =
    data?.data;

  /**
   * =========================================
   * 👋 GREETING
   * =========================================
   */
  const currentHour =
    new Date().getHours();

  const greeting =
    currentHour < 18
      ? "Bonjour"
      : "Bonsoir";

  /**
   * =========================================
   * 📋 TABLE DATA
   * =========================================
   */
  const rows = dashboard
    ? [
        {
          label:
            "Transfert client",

          volumes:
            dashboard
              .transfert_client
              ?.volumes || {},

          count: Number(
            dashboard
              .transfert_client
              ?.total_count || 0
          ),
        },

        {
          label:
            "Retrait",

          volumes:
            dashboard
              .retrait
              ?.volumes || {},

          count: Number(
            dashboard
              .retrait
              ?.total_count || 0
          ),
        },

        {
          label:
            "Transferts en attente validation",

          volumes:
            dashboard
              .transfert_en_attente_validation
              ?.volumes || {},

          count: Number(
            dashboard
              .transfert_en_attente_validation
              ?.total_count || 0
          ),
        },

        {
          label:
            "Retraits en attente validation",

          volumes:
            dashboard
              .retrait_en_attente_validation
              ?.volumes || {},

          count: Number(
            dashboard
              .retrait_en_attente_validation
              ?.total_count || 0
          ),
        },
      ]
    : [];

  /**
   * =========================================
   * 💰 KPI GLOBAL MULTI-DEVISE
   * =========================================
   */
  const totalVolumes =
    rows.reduce(
      (
        acc: Record<
          string,
          number
        >,
        row
      ) => {

        Object.entries(
          row.volumes || {}
        ).forEach(
          ([
            devise,
            montant
          ]) => {

            acc[devise] =
              (acc[devise] || 0) +
              Number(
                montant || 0
              );
          }
        );

        return acc;
      },
      {}
    );

  /**
   * =========================================
   * 🔢 TOTAL OPÉRATIONS
   * =========================================
   */
  const totalOperations =
    rows.reduce(
      (
        acc,
        row
      ) =>
        acc +
        Number(
          row.count || 0
        ),
      0
    );

  /**
   * =========================================
   * ⏳ TOTAL EN ATTENTE
   * =========================================
   */
  const pendingCount =
    Number(
      dashboard
        ?.transfert_en_attente_validation
        ?.total_count || 0
    ) +
    Number(
      dashboard
        ?.retrait_en_attente_validation
        ?.total_count || 0
    );

  /**
   * =========================================
   * 🔄 RESET FILTERS
   * =========================================
   */
  const handleReset =
    () => {

      setDateFrom("");
      setDateTo("");
    };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div
        className="
          relative overflow-hidden
          bg-gradient-to-br from-white via-white to-indigo-50
          border border-gray-200
          rounded-3xl
          p-7
          shadow-sm
        "
      >

        {/* GLOW */}
        <div
          className="
            absolute -top-10 -right-10
            w-40 h-40
            bg-indigo-100/50
            rounded-full
            blur-3xl
            pointer-events-none
          "
        />

        <div
          className="
            absolute -bottom-8 -left-8
            w-32 h-32
            bg-blue-100/40
            rounded-full
            blur-2xl
            pointer-events-none
          "
        />

        <div
          className="
            relative z-10
            flex flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-6
          "
        >

          {/* LEFT */}
          <div>

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-indigo-500
                mb-2
              "
            >
              Dashboard Administrateur
            </p>

            <h1
              className="
                text-3xl
                font-bold
                text-gray-800
                leading-tight
              "
            >
              {greeting}{" "}

              <span className="text-indigo-600">
                {user?.user_name ||
                  "Utilisateur"}
              </span>{" "}

              👋
            </h1>

            <p
              className="
                text-sm text-gray-500
                mt-3
                max-w-xl
                leading-relaxed
              "
            >
              Voici un aperçu global
              de vos opérations,
              validations et mouvements
              financiers.
            </p>

          </div>

          {/* RIGHT */}
          <div
            className="
              self-start md:self-center
              px-4 py-3
              rounded-2xl
              bg-white/80
              border border-gray-200
              shadow-sm
              backdrop-blur-sm
            "
          >

            <p
              className="
                text-xs
                text-gray-400
                uppercase
                font-medium
              "
            >
              Aujourd’hui
            </p>

            <p
              className="
                text-sm
                font-semibold
                text-gray-700
                mt-1
              "
            >
              {new Date()
                .toLocaleDateString(
                  "fr-FR",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
            </p>

          </div>

        </div>
      </div>

      {/* KPI */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        "
      >

        <Kpi
          title="Volume total"
          values={totalVolumes}
        />

        <Kpi
          title="Total opérations"
          values={totalOperations}
        />

        <Kpi
          title="En attente validation"
          values={pendingCount}
        />

      </div>

      {/* TABLE */}
      <div>

        <h2
          className="
            text-sm
            font-semibold
            text-gray-600
            mb-3
          "
        >
          Vue détaillée
        </h2>

        <DashboardTable
          data={rows}

          dateFrom={
            dateFrom
          }

          dateTo={
            dateTo
          }

          onDateFromChange={
            setDateFrom
          }

          onDateToChange={
            setDateTo
          }

          onReset={
            handleReset
          }
        />

      </div>
    </div>
  );
}

function Kpi({
  title,
  values,
}: {
  title: string;

  values:
    | number
    | Record<
        string,
        number
      >;
}) {

  /**
   * =========================================
   * 🔢 SIMPLE NUMBER
   * =========================================
   */
  if (
    typeof values ===
    "number"
  ) {

    return (
      <div
        className="
          bg-white
          border
          rounded-2xl
          p-5
          shadow-sm
        "
      >

        <p
          className="
            text-xs
            text-gray-400
            uppercase
            tracking-wide
          "
        >
          {title}
        </p>

        <h2
          className="
            text-2xl
            font-bold
            text-gray-800
            mt-2
          "
        >
          {values.toLocaleString()}
        </h2>

      </div>
    );
  }

  /**
   * =========================================
   * 💰 MULTI DEVISE
   * =========================================
   */
  const entries =
    Object.entries(
      values || {}
    );

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-5
        shadow-sm
      "
    >

      <p
        className="
          text-xs
          text-gray-400
          uppercase
          tracking-wide
        "
      >
        {title}
      </p>

      <div
        className="
          mt-3
          space-y-2
        "
      >

        {entries.length > 0 ? (

          entries.map(
            ([
              devise,
              montant
            ]) => (

              <div
                key={devise}
                className="
                  flex items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  {devise}
                </span>

                <span
                  className="
                    text-lg
                    font-bold
                    text-gray-800
                  "
                >
                  {Number(
                    montant
                  ).toLocaleString()}
                </span>

              </div>
            )
          )

        ) : (

          <span
            className="
              text-sm
              text-gray-400
            "
          >
            Aucune donnée
          </span>
        )}

      </div>

    </div>
  );
}