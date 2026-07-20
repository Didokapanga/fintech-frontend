// src/components/layout/Header.tsx

import {
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { useAuthStore }
from "../../app/store";
import { useTauxChanges } from "../../modules/settings/hooks/useTauxChange";
import { useTransfertTarifs } from "../../modules/settings/hooks/useTransfertTarif";
import { useState } from "react";

export default function Header() {

  const logout =
    useAuthStore(
      (s) => s.logout
    );

  const user =
    useAuthStore(
      (s) => s.user
    );

  const agence =
    user?.agence_name || "—";

  const agenceCode =
    user?.code_agence || "—";

  const {
    data: taux = [],
  } = useTauxChanges();

  const tauxActifs =
    taux.filter(
      (t) => t.is_activated
    );

  const {
    data: tarifs = [],
  } = useTransfertTarifs();

  const tarifsActifs =
    tarifs.filter(
      (t) => t.is_activated
    );

  const cards = [

    ...tauxActifs.map((taux) => ({
      id: taux.id,
      type: "taux",

      title:
        `${taux.devise_source} → ${taux.devise_destination}`,

      achat:
        Number(taux.taux_achat),

      vente:
        Number(taux.taux_vente),
    })),

    ...tarifsActifs.map((tarif) => ({
      id: tarif.id,
      type: "tarif",

      devise:
        tarif.devise,

      min:
        Number(tarif.montant_min),

      max:
        Number(tarif.montant_max),

      frais:
        Number(tarif.frais),
    })),

  ];

  const [currentCard, setCurrentCard] =
    useState(0);

  const current =
    cards[currentCard];

  const nextCard = () => {

    setCurrentCard((index) =>
      index === cards.length - 1
        ? 0
        : index + 1
    );

  };

  const previousCard = () => {

    setCurrentCard((index) =>
      index === 0
        ? cards.length - 1
        : index - 1
    );

  };

  return (

    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[92px]
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/95
        px-6
        backdrop-blur
      "
    >

      {/* ===================================================== */}
      {/* LEFT */}
      {/* ===================================================== */}

      <div
        className="
          flex
          w-[280px]
          shrink-0
          items-center
        "
      >

        <div className="leading-tight">

          <h1
            className="
              truncate
              text-xl
              font-bold
              text-slate-900
            "
          >
            {agence}
          </h1>

        </div>

      </div>

      <div
        className="
          hidden
          xl:flex
          flex-1
          items-center
          justify-center
          gap-4
          px-8
          py-1
        "
      >

        <button
          onClick={previousCard}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            hover:bg-slate-50
          "
        >
          <ChevronLeft size={18} />
        </button>

        <div
          className="
            w-[300px]
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            shadow-sm
          "
        >

          {current && ("achat" in current ? (

            <>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-blue-600
                    whitespace-nowrap
                  "
                >
                  💱 TAUX DE CHANGE
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-slate-900
                    text-right
                  "
                >
                  {current.title}
                </span>

              </div>

              <div
                className="
                  mt-2
                  flex
                  justify-between
                  text-sm
                "
              >

                <span>
                  Achat
                  <strong>
                    {" "}
                    {current.achat}
                  </strong>
                </span>

                <span>
                  Vente
                  <strong>
                    {" "}
                    {current.vente}
                  </strong>
                </span>

              </div>

            </>

          ) : (

            <>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-emerald-600
                    whitespace-nowrap
                  "
                >
                  💵 TARIF TRANSFERT
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-right
                  "
                >
                  {current.min} - {current.max} {current.devise}
                </span>

              </div>

              <div
                className="
                  mt-2
                  text-sm
                "
              >
                Frais

                <strong>
                  {" "}
                  {current.frais} {current.devise}
                </strong>

              </div>

            </>

          ))}

        </div>

        <button
          onClick={nextCard}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            hover:bg-slate-50
          "
        >
          <ChevronRight size={18} />
        </button>

      </div>

      {/* ===================================================== */}
      {/* RIGHT */}
      {/* ===================================================== */}

      <div
        className="
          flex
          w-[320px]
          shrink-0
          justify-end
          items-center
          gap-4
        "
      >

        {/* CODE AGENCE */}

        <div
          className="
            hidden
            sm:flex
            items-center
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-2
          "
        >

          <div className="leading-tight">

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Code agence
            </p>

            <p
              className="
                text-sm
                font-bold
                text-slate-800
              "
            >
              {agenceCode}
            </p>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-red-100
            bg-red-50
            px-4
            py-2.5
            text-sm
            font-medium
            text-red-600
            transition-all
            hover:bg-red-100
          "
        >

          <LogOut size={16} />

          <span>
            Déconnexion
          </span>

        </button>

      </div>

    </header>
  );
}