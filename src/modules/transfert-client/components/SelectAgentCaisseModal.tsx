// src/modules/transfert-caisse/components/SelectCaisseModal.tsx

import {
  Wallet,
//   Building2,
  ChevronRight,
} from "lucide-react";

import { useMemo } from "react";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import { Modal } from "../../../components/ui";


/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */

type Props = {
  open: boolean;

  onClose: () => void;

  onSelect: (
    caisseId: string,
    devise: string
  ) => void;
};

type Caisse = {
  id: string;

  code_caisse: string;

  devise: string;

  solde: number;

  state: string;

  type?: string;

  agence_name?: string;

  agence?: {
    libelle?: string;
  };
};

/* -------------------------------------------------------------------------- */
/* COMPONENT */
/* -------------------------------------------------------------------------- */

export default function SelectAgentCaisseModal({
  open,
  onClose,
  onSelect,
}: Props) {

  const {
    data: response,
    isLoading,
  } = useCaisses(
    1,
    100
  );

  const caisses =
    useMemo<Caisse[]>(
        () =>
        (response?.data || [])
            .filter(
            (c: Caisse) =>
                c.type
                ?.toUpperCase() ===
                "AGENT" &&
                c.state ===
                "OUVERTE"
            ),
        [response]
    );

  return (

    <Modal
      open={open}
      onClose={onClose}
      size="2xl"
    >

      <div
        className="
          space-y-6
        "
      >

        {/* HEADER */}

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Choisir une caisse
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            Sélectionnez la caisse
            à utiliser pour le
            transfert.
          </p>

        </div>

        {/* LOADING */}

        {isLoading && (

          <div
            className="
              py-10
              text-center
              text-slate-500
            "
          >
            Chargement des caisses...
          </div>

        )}

        {/* LISTE VIDE */}

            {!isLoading &&
            caisses.length === 0 && (

            <div
                className="
                rounded-3xl
                border
                border-dashed
                border-slate-200
                py-10
                text-center
                "
            >

                <p
                className="
                    text-slate-500
                "
                >
                Aucune caisse agent ouverte
                disponible.
                </p>

            </div>

            )}

            {/* LISTE DES CAISSES */}

            {!isLoading &&
            caisses.length > 0 && (

            <div
                className="
                grid
                gap-4
                "
            >

                {caisses.map(
                (caisse) => {

                    const agence =
                    caisse.agence
                        ?.libelle ||
                    caisse.agence_name ||
                    "-";

                    return (

                    <button
                        key={caisse.id}

                        onClick={() => {

                        onSelect(
                            caisse.id,
                            caisse.devise
                        );

                        onClose();
                        }}

                        className="
                        group
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                        text-left
                        transition-all
                        hover:border-red-300
                        hover:bg-red-50
                        hover:shadow-md
                        "
                    >

                        <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                        >

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
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-red-100
                                text-red-600
                            "
                            >

                            <Wallet
                                size={24}
                            />

                            </div>

                            <div>

                            <h3
                                className="
                                text-base
                                font-semibold
                                text-slate-900
                                "
                            >
                                {
                                caisse.code_caisse
                                }
                            </h3>

                            <p
                                className="
                                mt-1
                                text-sm
                                text-slate-500
                                "
                            >
                                {agence}
                            </p>

                            </div>

                        </div>

                        <ChevronRight
                            className="
                            text-slate-400
                            transition-all
                            group-hover:translate-x-1
                            "
                        />

                        </div>

                        <div
                        className="
                            mt-5
                            grid
                            grid-cols-3
                            gap-4
                        "
                        >

                        <div>

                            <p
                            className="
                                text-xs
                                uppercase
                                text-slate-400
                            "
                            >
                            Devise
                            </p>

                            <p
                            className="
                                mt-1
                                font-semibold
                                text-red-600
                            "
                            >
                            {
                                caisse.devise
                            }
                            </p>

                        </div>

                        <div>

                            <p
                            className="
                                text-xs
                                uppercase
                                text-slate-400
                            "
                            >
                            Solde
                            </p>

                            <p
                            className="
                                mt-1
                                font-semibold
                                text-slate-800
                            "
                            >
                            {Number(
                                caisse.solde
                            ).toLocaleString()}
                            </p>

                        </div>

                        <div>

                            <p
                            className="
                                text-xs
                                uppercase
                                text-slate-400
                            "
                            >
                            État
                            </p>

                            <p
                            className="
                                mt-1
                                font-semibold
                                text-emerald-600
                            "
                            >
                            {
                                caisse.state
                            }
                            </p>

                        </div>

                        </div>

                    </button>

                    );
                }
                )}

            </div>

            )}

      </div>

    </Modal>

  );
}