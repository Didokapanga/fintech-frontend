import {
  useState,
} from "react";

import {
  Send,
  Banknote,
  Inbox,
  Lock,
  Filter,
  Wallet,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

import {
  useDashboardCaissier,
} from "../hooks/useDashboardCaissier";

import ClotureCaisseModal
from "../../cloture-caisse/components/ClotureCaisseModal";
import { useAuthStore } from "../../../app/store";

/* ======================================================== */
/* COMPONENT */
/* ======================================================== */

export default function CaissierDashboard() {

  /* ====================================================== */
  /* STATE */
  /* ====================================================== */


  /**
   * ======================================================
   * FILTERS
   * ======================================================
   */

  const [
    devise,
    setDevise,
  ] = useState("");

  const [
    dateFrom,
    setDateFrom,
  ] = useState("");

  const [
    dateTo,
    setDateTo,
  ] = useState("");

  const [
    openCloture,
    setOpenCloture,
  ] = useState(false);

  /* ====================================================== */
  /* QUERY */
  /* ====================================================== */

  /**
   * ======================================================
   * DASHBOARD QUERY
   * ======================================================
   */

  const {
    data: dashboard,
  } = useDashboardCaissier({
    devise:
      devise || undefined,

    date_from:
      dateFrom || undefined,

    date_to:
      dateTo || undefined,
  });

  /* ====================================================== */
  /* SELECTED CAISSE */
  /* ====================================================== */

  const selectedCaisse =
    dashboard?.caisse;

  /* ====================================================== */
  /* RENDER */
  /* ====================================================== */

  /* ====================================================== */
  /* USER */
  /* ====================================================== */

  const user =
    useAuthStore(
      (s) => s.user
    );

  /* ====================================================== */
  /* GREETING */
  /* ====================================================== */

  const currentHour =
    new Date().getHours();

  const greeting =
    currentHour < 18
      ? "Bonjour"
      : "Bonsoir";

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        via-white
        to-red-50/40
        p-1
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-6
        "
      >

        {/* HERO */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-white/50
            bg-white/80
            p-7
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            backdrop-blur-xl
          "
        >

          {/* BACKGROUND EFFECT */}

          <div
            className="
              absolute
              right-[-120px]
              top-[-120px]
              h-[320px]
              w-[320px]
              rounded-full
              bg-red-200/30
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-[-120px]
              left-[-120px]
              h-[280px]
              w-[280px]
              rounded-full
              bg-orange-100/40
              blur-3xl
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
                flex
                flex-col
                gap-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-5
                "
              >

                {/* LOGO */}

                <div
                  className="
                    relative
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-[28px]
                    bg-gradient-to-br
                    from-red-600
                    via-red-500
                    to-orange-400
                    shadow-[0_15px_35px_rgba(239,68,68,0.35)]
                  "
                >

                  <div
                    className="
                      absolute
                      inset-0
                      rounded-[28px]
                      bg-white/10
                    "
                  />

                  <img
                    src="/2.png"
                    alt="Fintech Logo"
                    className="
                      relative
                      h-12
                      w-12
                      object-contain
                    "
                  />

                </div>

                {/* TITLE */}

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <div
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-500
                      "
                    />

                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-red-600
                      "
                    >
                      Global Fintech ERP
                    </p>

                  </div>

                  <h1
                    className="
                      mt-3
                      text-4xl
                      font-black
                      tracking-[-0.06em]
                      text-slate-900
                    "
                  >
                    Dashboard Caissier
                  </h1>

                  <p
                    className="
                      mt-2
                      max-w-xl
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    Vue intelligente des opérations,
                    retraits et validations en attente
                    en temps réel.
                  </p>

                </div>

              </div>

              {/* ===================================================== */}
              {/* GREETING */}
              {/* ===================================================== */}

              <div
                className="
                  w-fit
                  rounded-3xl
                  border
                  border-red-100
                  bg-gradient-to-r
                  from-red-50
                  to-orange-50
                  px-5
                  py-4
                  shadow-sm
                "
              >

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-red-500
                  "
                >
                  Session active
                </p>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    tracking-[-0.03em]
                    text-slate-900
                  "
                >
                  {greeting},{" "}
                  <span className="text-red-600">
                    {user?.user_name}
                  </span>
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Heureux de vous revoir sur votre espace caissier.
                </p>

              </div>

            </div>

            {/* RIGHT */}

            {selectedCaisse && (

              <div
                className="
                  relative
                  w-full
                  max-w-[420px]
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/40
                  bg-gradient-to-br
                  from-slate-900
                  via-slate-800
                  to-slate-900
                  p-7
                  text-white
                  shadow-[0_20px_60px_rgba(15,23,42,0.35)]
                "
              >

                <div
                  className="
                    absolute
                    right-[-60px]
                    top-[-60px]
                    h-40
                    w-40
                    rounded-full
                    bg-red-500/20
                    blur-3xl
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

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Wallet
                        size={18}
                        className="
                          text-red-400
                        "
                      />

                      <p
                        className="
                          text-sm
                          text-slate-300
                        "
                      >
                        Solde disponible
                      </p>

                    </div>

                    <div
                      className="
                        mt-6
                        max-h-[260px]
                        space-y-3
                        overflow-y-auto
                        pr-1
                      "
                    >

                      {Object.entries(
                        dashboard?.soldes || {}
                      ).map(
                        ([
                          devise,
                          montant,
                        ]) => (

                          <div
                            key={devise}
                            className="
                              flex
                              items-center
                              justify-between
                              rounded-2xl
                              border
                              border-white/10
                              bg-white/5
                              px-4
                              py-4
                              backdrop-blur-sm
                              transition-all
                              hover:bg-white/10
                            "
                          >

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
                                  h-10
                                  w-10
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-red-500/15
                                  text-xs
                                  font-bold
                                  text-red-300
                                "
                              >
                                {devise}
                              </div>

                              <div>

                                <p
                                  className="
                                    text-xs
                                    uppercase
                                    tracking-widest
                                    text-slate-400
                                  "
                                >
                                  Solde disponible
                                </p>

                                <p
                                  className="
                                    mt-1
                                    text-lg
                                    font-bold
                                    text-white
                                  "
                                >
                                  {Number(
                                    montant
                                  ).toLocaleString()}
                                </p>

                              </div>

                            </div>

                            <div
                              className="
                                rounded-full
                                bg-emerald-500/15
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-emerald-300
                              "
                            >
                              {devise}
                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                  <div
                    className={`
                      rounded-2xl
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      ${
                        selectedCaisse.state ===
                        "OUVERTE"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-red-500/20 text-red-300"
                      }
                    `}
                  >
                    ●{" "}
                    {
                      selectedCaisse.state
                    }
                  </div>

                </div>

                <button
                  onClick={() =>
                   setOpenCloture(true)
                  }

                  className="
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-red-600
                    px-4
                    py-4
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-red-700
                    hover:shadow-xl
                  "
                >

                  <Lock
                    size={18}
                  />

                  Clôturer ma caisse

                </button>

              </div>

            )}

          </div>

        </section>

        {/* MAIN GRID */}

        <section
          className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-3
          "
        >

          {/* STATS */}

          <div
            className="
              rounded-[32px]
              border
              border-white/50
              bg-white/80
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.05)]
              backdrop-blur-xl
              xl:col-span-2
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

                <h2
                  className="
                    text-2xl
                    font-bold
                    tracking-[-0.04em]
                    text-slate-900
                  "
                >
                  Activités
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Vue instantanée des opérations
                </p>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-red-50
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-red-600
                "
              >

                <ArrowUpRight
                  size={16}
                />

                Temps réel

              </div>

            </div>

            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-5
                md:grid-cols-3
              "
            >

              <StatCard
                title="Transferts"
                value={String(
                  dashboard
                    ?.stats
                    ?.transfert_client
                    ?.total_effectue || 0
                )}
                icon={
                  <Send
                    size={22}
                  />
                }
                bg="bg-red-100"
                color="text-red-600"
              />

              <StatCard
                title="Retraits"
                value={String(
                  dashboard
                    ?.stats
                    ?.retrait
                    ?.total_effectue || 0
                )}
                icon={
                  <Banknote
                    size={22}
                  />
                }
                bg="bg-emerald-100"
                color="text-emerald-600"
              />

              <StatCard
                title="En attente"
                value={String(
                  dashboard
                    ?.stats
                    ?.en_attente
                    ?.total_en_attente || 0
                )}
                icon={
                  <Inbox
                    size={22}
                  />
                }
                bg="bg-orange-100"
                color="text-orange-600"
              />

            </div>

          </div>

          {/* FILTERS */}

          <div
            className="
              rounded-[32px]
              border
              border-white/50
              bg-white/80
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.05)]
              backdrop-blur-xl
            "
          >

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
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-red-100
                  text-red-600
                "
              >

                <Filter
                  size={20}
                />

              </div>

              <div>

                <h2
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Filtres
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Analyse par période
                </p>

              </div>

            </div>

            <div
              className="
                mt-7
                space-y-5
              "
            >

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-slate-600
                  "
                >
                  Devise
                </label>

                <select
                  value={devise}
                  onChange={(e) =>
                    setDevise(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-red-400
                  "
                >

                  <option value="">
                    Toutes les devises
                  </option>

                  <option value="USD">
                    USD
                  </option>

                  <option value="CDF">
                    CDF
                  </option>

                </select>

              </div>

              <div>

                <label
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-slate-600
                  "
                >

                  <CalendarDays
                    size={15}
                  />

                  Date début

                </label>

                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) =>
                    setDateFrom(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-red-400
                  "
                />

              </div>

              <div>

                <label
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-slate-600
                  "
                >

                  <CalendarDays
                    size={15}
                  />

                  Date fin

                </label>

                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) =>
                    setDateTo(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-red-400
                  "
                />

              </div>

            </div>

          </div>

        </section>

      </div>

      {openCloture && selectedCaisse && (

        <ClotureCaisseModal
          open={openCloture}
          onClose={() =>
            setOpenCloture(false)
          }

          selectedCaisseId={
            selectedCaisse.id
          }

          selectedCodeCaisse={
            selectedCaisse.code_caisse
          }

          soldes={
            dashboard?.soldes || {}
          }
        />

      )}

    </div>
  );
}

/* ======================================================== */
/* STAT CARD */
/* ======================================================== */

function StatCard({
  title,
  value,
  icon,
  bg,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  bg: string;
  color: string;
}) {

  return (

    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200/70
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      <div
        className={`
          absolute
          right-[-40px]
          top-[-40px]
          h-32
          w-32
          rounded-full
          opacity-40
          blur-3xl
          transition-all
          duration-300
          group-hover:scale-125
          ${bg}
        `}
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
              text-sm
              font-medium
              text-slate-500
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-4
              text-4xl
              font-black
              tracking-[-0.05em]
              text-slate-900
            "
          >
            {value}
          </h3>

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
            "
          >

            <div
              className={`
                h-2
                w-2
                rounded-full
                ${bg}
              `}
            />

            <span
              className="
                text-xs
                font-medium
                text-slate-400
              "
            >
              Synchronisé
            </span>

          </div>

        </div>

        <div
          className={`
            relative
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            shadow-lg
            ${bg}
            ${color}
          `}
        >

          <div className="relative">
            {icon}
          </div>

        </div>

      </div>

    </div>
  );
}