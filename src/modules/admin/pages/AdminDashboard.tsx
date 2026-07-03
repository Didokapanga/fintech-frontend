// src/modules/admin/pages/AdminDashboard.tsx

import {
  Activity,
  ArrowUpRight,
  Clock3,
  Wallet,
} from "lucide-react";

import { useMemo, useState } from "react";

import { useAuthStore } from "../../../app/store";
import DashboardTable from "../components/DashboardTable";
import { useDashboard } from "../hooks/useDashboard";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function AdminDashboard() {

  const user =
    useAuthStore(
      (s) => s.user
    );

  /* -------------------------------------------------------------------------- */
  /*                                   FILTERS                                  */
  /* -------------------------------------------------------------------------- */

  const [
    dateFrom,
    setDateFrom,
  ] = useState("");

  const [
    dateTo,
    setDateTo,
  ] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                   QUERY                                    */
  /* -------------------------------------------------------------------------- */

  const { data } =
    useDashboard({
      date_from:
        dateFrom || undefined,

      date_to:
        dateTo || undefined,
    });

  const dashboard =
    data?.data;

  /* -------------------------------------------------------------------------- */
  /*                                  GREETING                                  */
  /* -------------------------------------------------------------------------- */

  const currentHour =
    new Date().getHours();

  const greeting =
    currentHour < 18
      ? "Bonjour"
      : "Bonsoir";

  /* -------------------------------------------------------------------------- */
  /*                                   TABLE                                    */
  /* -------------------------------------------------------------------------- */

  const rows = useMemo(
    () => {

      if (!dashboard)
        return [];

      return [
        {
          label: "Transfert client",

          description:
            "Transferts exécutés",

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
          label: "Retrait",

          description:
            "Retraits exécutés",

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
            "Frais transfert",

          description:
            "Revenus générés",

          volumes:
            dashboard
              .frais_transfert_client
              ?.volumes || {},

          count: Number(
            dashboard
              .frais_transfert_client
              ?.total_count || 0
          ),
        },

        {
          label:
            "Transferts en attente",

          description:
            "Validation requise",

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
            "Retraits en attente",

          description:
            "Validation requise",

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
      ];
    },
    [dashboard]
  );

  /* -------------------------------------------------------------------------- */
  /*                                  METRICS                                   */
  /* -------------------------------------------------------------------------- */

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
            currency,
            amount,
          ]) => {

            acc[currency] =
              (acc[currency] || 0) +
              Number(
                amount || 0
              );
          }
        );

        return acc;
      },
      {}
    );

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

  const pendingOperations =
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

  const volumeCaisses =
  dashboard?.volume_caisses || {};

  const totalCaissesOuvertes =
    Number(
      dashboard?.total_caisses_ouvertes || 0
    );

  const totalCaissesFermees =
    Number(
      dashboard?.total_caisses_fermees || 0
    );

  const totalCaissesAgence =
    Number(
      dashboard?.total_agence_caisse || 0
    );

  const totalCaissesAgent =
    Number(
      dashboard?.total_agent_caisse || 0
    );

  const totalFees =
    dashboard
      ?.frais_transfert_client
      ?.volumes || {};

  /* -------------------------------------------------------------------------- */
  /*                                   ACTIONS                                  */
  /* -------------------------------------------------------------------------- */

  const handleReset =
    () => {

      setDateFrom("");
      setDateTo("");
    };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div
      className="
        min-h-screen
        bg-[#f5f7fb00]
      "
    >

      <div
        className="
          mx-auto
          max-w-[1700px]
          px-0
          py-0
          space-y-6
        "
      >

        {/* ------------------------------------------------------------------ */}
        {/* HEADER                                                             */}
        {/* ------------------------------------------------------------------ */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200/80
            bg-white
            px-8
            py-7
            shadow-[0_1px_2px_rgba(16,24,40,0.04)]
          "
        >

          <div
            className="
              absolute
              inset-y-0
              right-0
              w-[35%]
              bg-gradient-to-l
              from-indigo-50/80
              to-transparent
              pointer-events-none
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-8
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >

            {/* LEFT */}

            <div
              className="
                max-w-3xl
              "
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-indigo-100
                  bg-indigo-50
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-indigo-700
                "
              >
                ERP Administration
              </div>

              <h1
                className="
                  mt-5
                  text-[34px]
                  font-semibold
                  tracking-[-0.03em]
                  text-slate-900
                "
              >
                {greeting},{" "}

                <span
                  className="
                    text-indigo-600
                  "
                >
                  {user?.user_name ||
                    "Administrateur"}
                </span>
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-[15px]
                  leading-7
                  text-slate-500
                "
              >
                Supervisez les flux
                financiers, les opérations
                multi-agences et les
                validations critiques depuis
                une vue consolidée temps réel.
              </p>

            </div>

            {/* RIGHT */}

            <div
              className="
                grid
                min-w-[320px]
                grid-cols-2
                gap-4
              "
            >

              <MiniStat
                label="Date"
                value={
                  new Date()
                    .toLocaleDateString(
                      "fr-FR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                }
              />

              <MiniStat
                label="Statut"
                value="Système opérationnel"
                positive
              />

            </div>

          </div>

        </section>

        {/* ------------------------------------------------------------------ */}
        {/* KPI GRID                                                           */}
        {/* ------------------------------------------------------------------ */}

        <section
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          <MetricCard
            title="Volume global"
            icon={
              <Wallet size={18} />
            }
            values={totalVolumes}
          />

          <MetricCard
            title="Total opérations"
            icon={
              <Activity size={18} />
            }
            value={totalOperations}
          />

          <MetricCard
            title="En attente"
            icon={
              <Clock3 size={18} />
            }
            value={pendingOperations}
          />

          <MetricCard
            title="Frais générés"
            icon={
              <ArrowUpRight
                size={18}
              />
            }
            values={totalFees}
          />

        </section>

        <section
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          <MetricCard
            title="Caisses ouvertes"
            icon={
              <Wallet size={18} />
            }
            value={
              totalCaissesOuvertes
            }
          />

          <MetricCard
            title="Caisses fermées"
            icon={
              <Clock3 size={18} />
            }
            value={
              totalCaissesFermees
            }
          />

          <MetricCard
            title="Caisses agence"
            icon={
              <Activity size={18} />
            }
            value={
              totalCaissesAgence
            }
          />

          <MetricCard
            title="Caisses agent"
            icon={
              <Activity size={18} />
            }
            value={
              totalCaissesAgent
            }
          />

        </section>
        {/* <section
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-8
          "
        >

          <MetricCard
            title="Volume global"
            icon={
              <Wallet size={18} />
            }
            values={totalVolumes}
          />

          <MetricCard
            title="Total opérations"
            icon={
              <Activity size={18} />
            }
            value={totalOperations}
          />

          <MetricCard
            title="En attente"
            icon={
              <Clock3 size={18} />
            }
            value={pendingOperations}
          />

          <MetricCard
            title="Frais générés"
            icon={
              <ArrowUpRight
                size={18}
              />
            }
            values={totalFees}
          />

          <MetricCard
            title="Caisses ouvertes"
            icon={
              <Wallet size={18} />
            }
            value={
              totalCaissesOuvertes
            }
          />

          <MetricCard
            title="Caisses agence"
            icon={
              <Activity size={18} />
            }
            value={
              totalCaissesAgence
            }
          />

          <MetricCard
            title="Caisses fermées"
            icon={
              <Clock3 size={18} />
            }
            value={
              totalCaissesFermees
            }
          />

          <MetricCard
            title="Caisses agent"
            icon={
              <Activity size={18} />
            }
            value={
              totalCaissesAgent
            }
          />

        </section> */}

        <section
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-2
          "
        >

          <MetricCard
            title="Volume caisses"
            icon={
              <Wallet size={18} />
            }
            values={
              volumeCaisses
            }
          />

          <MetricCard
            title="Caisses par devise"
            icon={
              <Activity size={18} />
            }
            values={
              dashboard
                ?.nombre_caisses_par_devise || {}
            }
          />

        </section>

        {/* ------------------------------------------------------------------ */}
        {/* TABLE SECTION                                                      */}
        {/* ------------------------------------------------------------------ */}

        <section
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200/80
            bg-white
            shadow-[0_1px_2px_rgba(16,24,40,0.04)]
          "
        >

          <div
            className="
              flex
              flex-col
              gap-4
              border-b
              border-slate-100
              px-7
              py-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                  text-slate-900
                "
              >
                Vue opérationnelle
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Analyse consolidée des
                transactions et volumes
                financiers.
              </p>

            </div>

          </div>

          <div
            className="
              px-2
              pb-2
            "
          >

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

        </section>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                METRIC CARD                                 */
/* -------------------------------------------------------------------------- */

function MetricCard({
  title,
  icon,
  value,
  values,
}: {
  title: string;

  icon: React.ReactNode;

  value?: number;

  values?: Record<
    string,
    number
  >;
}) {

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200/80
        bg-white
        p-6
        transition-all
        duration-300
        hover:-translate-y-[2px]
        hover:shadow-xl
      "
    >

      <div
        className="
          absolute
          right-0
          top-0
          h-28
          w-28
          rounded-full
          bg-indigo-50
          blur-3xl
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <div
        className="
          relative
          flex
          items-start
          justify-between
        "
      >

        <div>

          <p
            className="
              text-[12px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-slate-400
            "
          >
            {title}
          </p>

        </div>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            text-slate-700
          "
        >
          {icon}
        </div>

      </div>

      {/* SIMPLE VALUE */}

      {typeof value ===
      "number" ? (

        <div
          className="
            relative
            mt-7
          "
        >

          <h3
            className="
              text-4xl
              font-semibold
              tracking-[-0.04em]
              text-slate-900
            "
          >
            {value.toLocaleString()}
          </h3>

        </div>

      ) : (

        <div
          className="
            relative
            mt-6
            space-y-3
          "
        >

          {Object.entries(
            values || {}
          ).length > 0 ? (

            Object.entries(
              values || {}
            ).map(
              ([
                currency,
                amount,
              ]) => (

                <div
                  key={currency}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-slate-100
                    bg-slate-50/70
                    px-4
                    py-3
                  "
                >

                  <span
                    className="
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >
                    {currency}
                  </span>

                  <span
                    className="
                      text-lg
                      font-semibold
                      tracking-[-0.02em]
                      text-slate-900
                    "
                  >
                    {Number(
                      amount
                    ).toLocaleString()}
                  </span>

                </div>
              )
            )

          ) : (

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-slate-200
                px-4
                py-5
                text-sm
                text-slate-400
              "
            >
              Aucune donnée disponible
            </div>

          )}

        </div>
      )}

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 MINI STAT                                  */
/* -------------------------------------------------------------------------- */

function MiniStat({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50/70
        px-4
        py-4
      "
    >

      <p
        className="
          text-[11px]
          font-medium
          uppercase
          tracking-[0.12em]
          text-slate-400
        "
      >
        {label}
      </p>

      <div
        className="
          mt-2
          flex
          items-center
          gap-2
        "
      >

        {positive && (

          <span
            className="
              h-2
              w-2
              rounded-full
              bg-emerald-500
            "
          />
        )}

        <span
          className="
            text-sm
            font-semibold
            text-slate-800
          "
        >
          {value}
        </span>

      </div>

    </div>
  );
}