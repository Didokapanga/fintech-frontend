import {
  useRef,
  useState,
} from "react";

import {
  Send,
  Banknote,
  Inbox,
  Filter,
  Wallet,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
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

  const caissesScrollRef = useRef<HTMLDivElement>(null);

  const scrollCaissesLeft = () => {
    caissesScrollRef.current?.scrollBy({
      left: -240,
      behavior: "smooth",
    });
  };

  const scrollCaissesRight = () => {
    caissesScrollRef.current?.scrollBy({
      left: 240,
      behavior: "smooth",
    });
  };

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

  const [selectedCaisseId, setSelectedCaisseId] =
    useState<string>();

  const selectedCaisse =
    dashboard?.caisses.find(
      c => c.id === selectedCaisseId
    ) ||
    dashboard?.caisses[0] ||
    null;

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
              grid
              gap-8
              xl:grid-cols-[minmax(0,2fr)_380px]
              xl:items-start
            "
          >

            {/* LEFT */}

            <div
              className="
                min-w-0
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
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50/80
                  px-6
                  py-3
                "
              >

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
                    Session active
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {greeting},{" "}
                    <span className="text-red-600">
                      {user?.user_name}
                    </span>
                  </h2>

                </div>

                <div
                  className="
                    rounded-full
                    bg-emerald-50
                    border
                    border-emerald-200
                    px-4
                    py-1.5
                    text-sm
                    font-semibold
                    text-emerald-700
                  "
                >
                  ● En ligne
                </div>

              </div>

              <div className="mt-6">
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-200
                    pb-3
                  "
                >

                  <div className="flex items-center gap-3">

                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-slate-900
                      "
                    >
                      Mes caisses
                    </h3>

                    <span
                      className="
                        rounded-full
                        bg-red-100
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-red-600
                      "
                    >
                      {dashboard?.caisses.length ?? 0}
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={scrollCaissesLeft}
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        text-slate-500
                        transition-all
                        hover:border-red-300
                        hover:text-red-600
                        hover:shadow-sm
                      "
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      onClick={scrollCaissesRight}
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        text-slate-500
                        transition-all
                        hover:border-red-300
                        hover:text-red-600
                        hover:shadow-sm
                      "
                    >
                      <ChevronRight size={18} />
                    </button>

                  </div>

                </div>

                <div
                    ref={caissesScrollRef}
                    className="
                        w-full
                        overflow-x-auto
                        pb-2
                        scroll-smooth
                        no-scrollbar
                    "
                >

                  <div
                    className={`
                      flex
                      gap-4
                      snap-x
                      snap-mandatory

                      ${
                        (dashboard?.caisses.length ?? 0) <= 4
                          ? "w-full"
                          : "w-max"
                      }
                    `}
                  >

                    {dashboard?.caisses.map((caisse) => (

                      <button
                        key={caisse.id}
                        onClick={() => setSelectedCaisseId(caisse.id)}
                        className={`
                          snap-start

                          ${
                            (dashboard?.caisses.length ?? 0) <= 4
                              ? "basis-0 flex-1"
                              : "w-[190px] shrink-0"
                          }

                          h-[132px]
                          rounded-3xl
                          border
                          p-4
                          text-left
                          transition-colors
                          duration-300

                          ${
                            selectedCaisse?.id === caisse.id
                              ? `
                                  border-red-500
                                  bg-gradient-to-br
                                  from-red-50
                                  via-white
                                  to-white
                                  shadow-lg
                                  shadow-red-100
                                  ring-1
                                  ring-red-200
                                `
                              : `
                                  border-slate-200
                                  bg-white
                                  hover:border-red-300
                                  hover:shadow-md
                                `
                          }
                        `}
                      >

                        <div className="flex items-start justify-between">

                          <div>

                            <h4 className="text-lg font-bold tracking-tight text-slate-900">
                              {caisse.code_caisse}
                            </h4>

                            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                              {caisse.support.replace("_", " ")}
                            </p>

                          </div>

                          <div
                            className={`mt-1 h-3 w-3 rounded-full ${
                              caisse.state === "OUVERTE"
                                ? "bg-emerald-500"
                                : caisse.state === "FERMEE"
                                ? "bg-orange-500"
                                : "bg-red-500"
                            }`}
                          />

                        </div>

                        <div className="mt-5 flex items-center justify-between">

                          <div>

                            {caisse.prestataire ? (
                              <p className="text-sm font-medium text-slate-600">
                                {caisse.prestataire}
                              </p>
                            ) : (
                              <p className="text-sm text-slate-400">
                                Aucun prestataire
                              </p>
                            )}

                          </div>

                          <span
                            className="
                              rounded-full
                              bg-slate-100
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-slate-600
                            "
                          >
                            {caisse.devise_principale}
                          </span>

                        </div>

                      </button>

                    ))}

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            {selectedCaisse && (
              <div
                className="
                  relative
                  w-full
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/40
                  bg-gradient-to-br
                  from-slate-900
                  via-slate-800
                  to-slate-900
                  p-6
                  text-white
                  shadow-[0_20px_60px_rgba(15,23,42,0.30)]
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

                <div className="relative">

                  {/* HEADER */}

                  <div className="flex items-start justify-between">

                    <div>

                      <div className="flex items-center gap-2">

                        <Wallet
                          size={18}
                          className="text-red-400"
                        />

                        <p className="text-sm text-slate-300">
                          Solde disponible
                        </p>

                      </div>

                      <h3 className="mt-3 text-2xl font-bold">
                        {selectedCaisse.code_caisse}
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        {selectedCaisse.support.replace("_", " ")}
                      </p>

                    </div>

                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold

                        ${
                          selectedCaisse.state === "OUVERTE"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-red-500/20 text-red-300"
                        }
                      `}
                    >
                      ● {selectedCaisse.state}
                    </span>

                  </div>

                  {/* SOLDES */}

                  <div
                    className="
                      mt-6
                      max-h-[240px]
                      space-y-3
                      overflow-y-auto
                      pr-1
                    "
                  >

                    {selectedCaisse.devises.map((devise) => (

                      <div
                        key={devise.id}
                        className="
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/5
                          px-4
                          py-3
                          transition-colors
                          hover:bg-white/10
                        "
                      >

                        <div className="flex items-center gap-3">

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
                            {devise.devise}
                          </div>

                          <div>

                            <p className="text-xs text-slate-400">
                              Solde
                            </p>

                            <p className="text-lg font-bold">
                              {Number(devise.solde).toLocaleString()}
                            </p>

                          </div>

                        </div>

                        <span
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
                          {devise.devise}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

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