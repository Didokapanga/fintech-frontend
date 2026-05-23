// src/modules/caissier/CaissierDashboard.tsx

import { useMemo, useState } from "react";

import { useNavigate }
from "react-router-dom";

import {
  Send,
  Banknote,
  Inbox,
  Wallet,
  Repeat,
  Lock,
  FileText,
  ChevronRight,
  Building2,
  ArrowUpRight,
} from "lucide-react";

import type {
  Caisse,
} from "../types";

import {
  useCaisses,
} from "../hooks/useCaisses";

import ClotureCaisseModal
from "../../cloture-caisse/components/ClotureCaisseModal";

/* ======================================================== */
/* COMPONENT */
/* ======================================================== */

export default function CaissierDashboard() {

  const navigate =
    useNavigate();

  /* ====================================================== */
  /* STATE */
  /* ====================================================== */

  const [
    selectedCaisseId,
    setSelectedCaisseId,
  ] = useState<
    string | null
  >(null);

  const [
    openCloture,
    setOpenCloture,
  ] = useState(false);

  /* ====================================================== */
  /* QUERY */
  /* ====================================================== */

  const {
    data: response,
  } = useCaisses(
    1,
    100
  );

  const caisses =
    useMemo<Caisse[]>(
      () =>
        response?.data || [],
      [response]
    );

  /* ====================================================== */
  /* SELECTED CAISSE */
  /* ====================================================== */

  const selectedCaisse =
    useMemo(() => {

      if (
        selectedCaisseId
      ) {

        return (
          caisses.find(
            (c) =>
              c.id ===
              selectedCaisseId
          ) ||
          caisses[0]
        );
      }

      return caisses[0];

    }, [
      caisses,
      selectedCaisseId,
    ]);

  /* ====================================================== */
  /* ACTIONS */
  /* ====================================================== */

  const actions = [

    {
      label:
        "Envoi d’argent",

      path:
        "/transfert-client",

      icon:
        Send,

      color:
        "text-indigo-600",

      bg:
        "bg-indigo-50",
    },

    {
      label:
        "Paiement retrait",

      path:
        "/retrait",

      icon:
        Banknote,

      color:
        "text-emerald-600",

      bg:
        "bg-emerald-50",
    },

    {
      label:
        "Transfert caisse",

      path:
        "/transfert-caisse",

      icon:
        Repeat,

      color:
        "text-blue-600",

      bg:
        "bg-blue-50",
    },

    {
      label:
        "Validations",

      path:
        "/validation",

      icon:
        Inbox,

      color:
        "text-orange-600",

      bg:
        "bg-orange-50",
    },

    {
      label:
        "Mes caisses",

      path:
        "/caisses",

      icon:
        Wallet,

      color:
        "text-purple-600",

      bg:
        "bg-purple-50",
    },

    {
      label:
        "Journal caisse",

      path:
        "/ledger",

      icon:
        FileText,

      color:
        "text-slate-600",

      bg:
        "bg-slate-100",
    },
  ];

  /* ====================================================== */
  /* RENDER */
  /* ====================================================== */

  return (

    <div
      className="
        min-h-screen
        px-0
        py-0
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

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            p-6
            shadow-sm
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute
              right-[-120px]
              top-[-120px]
              h-[320px]
              w-[320px]
              rounded-full
              bg-indigo-50
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

            {/* ============================================= */}
            {/* LEFT */}
            {/* ============================================= */}

            <div
              className="
                flex
                flex-col
                gap-6
              "
            >

              {/* BRAND */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-3xl
                    bg-gradient-to-br
                    from-indigo-600
                    to-blue-500
                    shadow-lg
                    shadow-indigo-200
                  "
                >

                  <img
                    src="/logo.png"
                    alt="Fintech Logo"
                    className="
                      h-11
                      w-11
                      object-contain
                    "
                  />

                </div>

                <div>

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-indigo-600
                    "
                  >
                    Global Fintech
                  </p>

                  <h1
                    className="
                      mt-1
                      text-3xl
                      font-bold
                      tracking-[-0.04em]
                      text-slate-900
                    "
                  >
                    Tableau de bord caissier
                  </h1>

                </div>

              </div>

              {/* SELECT */}

              {caisses.length >
                1 && (

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
                    Sélectionner une caisse
                  </label>

                  <select
                    value={
                      selectedCaisse
                        ?.id || ""
                    }

                    onChange={(
                      e
                    ) =>
                      setSelectedCaisseId(
                        e.target
                          .value
                      )
                    }

                    className="
                      min-w-[260px]
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      py-3
                      text-sm
                      text-slate-700
                      outline-none
                      transition-all
                      focus:border-indigo-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  >

                    {caisses.map(
                      (
                        c
                      ) => (

                        <option
                          key={
                            c.id
                          }
                          value={
                            c.id
                          }
                        >
                          {
                            c.code_caisse
                          }{" "}
                          (
                          {
                            c.devise
                          }
                          )
                        </option>

                      )
                    )}

                  </select>

                </div>

              )}

            </div>

            {/* ============================================= */}
            {/* RIGHT */}
            {/* ============================================= */}

            {selectedCaisse && (

              <div
                className="
                  w-full
                  max-w-[450px]
                  rounded-[28px]
                  border
                  border-slate-200
                  bg-slate-50
                  p-6
                "
              >

                {/* TOP */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >

                  <div>

                    <p
                      className="
                        text-sm
                        text-slate-500
                      "
                    >
                      Solde disponible
                    </p>

                    <h2
                      className="
                        mt-2
                        text-4xl
                        font-bold
                        tracking-[-0.04em]
                        text-slate-900
                      "
                    >
                      {Number(
                        selectedCaisse.solde
                      ).toLocaleString()}

                      <span
                        className="
                          ml-2
                          text-lg
                          font-medium
                          text-slate-500
                        "
                      >
                        {
                          selectedCaisse.devise
                        }
                      </span>

                    </h2>

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
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    ●{" "}
                    {
                      selectedCaisse.state
                    }
                  </div>

                </div>

                {/* INFOS */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
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
                      bg-indigo-50
                      text-indigo-600
                    "
                  >

                    <Building2
                      size={22}
                    />

                  </div>

                  <div>

                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.12em]
                        text-slate-400
                      "
                    >
                      Caisse active
                    </p>

                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-slate-800
                      "
                    >
                      {
                        selectedCaisse.code_caisse
                      }
                    </h3>

                  </div>

                </div>

                {/* ACTION */}

                <button
                  onClick={() =>
                    setOpenCloture(
                      true
                    )
                  }

                  className="
                    mt-6
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-red-600
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-red-700
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

        {/* ================================================= */}
        {/* ACTIONS */}
        {/* ================================================= */}

        <section>

          <div
            className="
              mb-5
              flex
              items-center
              justify-between
              gap-4
              flex-wrap
            "
          >

            <div>

              <h2
                className="
                  text-xl
                  font-semibold
                  text-slate-900
                "
              >
                Opérations rapides
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Accès direct aux principales opérations
              </p>

            </div>

          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >

            {actions.map(
              (
                action
              ) => {

                const Icon =
                  action.icon;

                return (

                  <button
                    key={
                      action.label
                    }

                    onClick={() =>
                      navigate(
                        action.path
                      )
                    }

                    className="
                      group
                      rounded-[28px]
                      border
                      border-slate-200
                      bg-white
                      p-6
                      text-left
                      shadow-sm
                      transition-all
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <div
                        className={`
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          ${action.bg}
                        `}
                      >

                        <Icon
                          className={`
                            h-6
                            w-6
                            ${action.color}
                          `}
                        />

                      </div>

                      <ArrowUpRight
                        className="
                          h-5
                          w-5
                          text-slate-300
                          transition-all
                          group-hover:text-slate-500
                        "
                      />

                    </div>

                    <div className="mt-6">

                      <h3
                        className="
                          text-base
                          font-semibold
                          text-slate-900
                        "
                      >
                        {
                          action.label
                        }
                      </h3>

                      <div
                        className="
                          mt-4
                          inline-flex
                          items-center
                          gap-1
                          text-sm
                          font-medium
                          text-indigo-600
                        "
                      >

                        Accéder

                        <ChevronRight
                          size={15}
                        />

                      </div>

                    </div>

                  </button>

                );
              }
            )}

          </div>

        </section>

      </div>

      {/* =================================================== */}
      {/* MODAL */}
      {/* =================================================== */}

      {openCloture && (

        <ClotureCaisseModal
          open={
            openCloture
          }
          onClose={() =>
            setOpenCloture(
              false
            )
          }
        />

      )}

    </div>
  );
}