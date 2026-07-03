// src/modules/validation/components/TransfertCaisseDetailsModal.tsx

import {
  ArrowRightLeft,
  Wallet,
  X,
} from "lucide-react";

import {
  Modal,
} from "../../../components/ui";
import type { TransfertCaisse } from "../../transfert-caisse/types";

type Props = {
  open: boolean;

  transfert: TransfertCaisse;

  onClose: () => void;
};

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
      "
    >
      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-sm
          font-semibold
          text-slate-900
        "
      >
        {value || "-"}
      </p>
    </div>
  );
}

export default function TransfertCaisseDetailsModal({
  open,
  transfert,
  onClose,
}: Props) {

  const getStatusStyle = (
    statut: string
  ) => {

    switch (statut) {

      case "INITIE":
        return `
          border-amber-200
          bg-amber-50
          text-amber-700
        `;

      case "VALIDE":
        return `
          border-blue-200
          bg-blue-50
          text-blue-700
        `;

      case "EXECUTE":
        return `
          border-emerald-200
          bg-emerald-50
          text-emerald-700
        `;

      case "REJETE":
        return `
          border-red-200
          bg-red-50
          text-red-700
        `;

      default:
        return `
          border-slate-200
          bg-slate-50
          text-slate-700
        `;
    }
  };

  return (

    <Modal
      open={open}
      onClose={onClose}
    >

      <div
        className="
          flex
          max-h-[92vh]
          flex-col
          overflow-hidden
        "
      >

        {/* HEADER */}

        <div
          className="
            border-b
            border-slate-200
            px-8
            py-6
          "
        >

          <div
            className="
              flex
              items-start
              justify-between
            "
          >

            <div>

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
                  tracking-[0.14em]
                  text-indigo-700
                "
              >

                <ArrowRightLeft
                  size={13}
                />

                Transfert caisse

              </div>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-semibold
                  tracking-[-0.03em]
                  text-slate-900
                "
              >
                {transfert.code_reference}
              </h2>

            </div>

            <button
              onClick={onClose}
              className="
                rounded-xl
                p-2
                text-slate-500
                transition
                hover:bg-slate-100
              "
            >
              <X size={18} />
            </button>

          </div>

        </div>

        {/* BODY */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-8
            py-7
            space-y-7
          "
        >

          {/* STATUT */}

          <div>

            <span
              className={`
                inline-flex
                items-center
                rounded-full
                border
                px-4
                py-2
                text-sm
                font-semibold
                ${getStatusStyle(
                  transfert.statut
                )}
              `}
            >
              {transfert.statut}
            </span>

          </div>

          {/* MONTANT */}

          <section>

            <h3
              className="
                mb-4
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Montant
            </h3>

            <div
              className="
                rounded-3xl
                border
                border-emerald-100
                bg-emerald-50
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <Wallet
                  size={22}
                  className="
                    text-emerald-600
                  "
                />

                <span
                  className="
                    text-3xl
                    font-bold
                    text-emerald-700
                  "
                >
                  {Number(
                    transfert.montant
                  ).toLocaleString()}
                  {" "}
                  {transfert.devise}
                </span>

              </div>

            </div>

          </section>

          {/* FLUX */}

          <section>

            <h3
              className="
                mb-4
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Flux du transfert
            </h3>

            <div
              className="
                grid
                gap-5
                lg:grid-cols-2
              "
            >

              <div
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                "
              >

                <p
                  className="
                    text-xs
                    uppercase
                    text-slate-400
                  "
                >
                  Caisse source
                </p>

                <p
                  className="
                    mt-2
                    text-lg
                    font-semibold
                  "
                >
                  {
                    transfert.source_code_caisse
                  }
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >
                  {
                    transfert.agence_source_name
                  }
                </p>

              </div>

              <div
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                "
              >

                <p
                  className="
                    text-xs
                    uppercase
                    text-slate-400
                  "
                >
                  Caisse destination
                </p>

                <p
                  className="
                    mt-2
                    text-lg
                    font-semibold
                  "
                >
                  {
                    transfert.destination_code_caisse
                  }
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >
                  {
                    transfert.agence_destination_name
                  }
                </p>

              </div>

            </div>

          </section>

          {/* INFORMATIONS */}

          <section>

            <h3
              className="
                mb-4
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Informations générales
            </h3>

            <div
              className="
                grid
                gap-4
                md:grid-cols-2
                xl:grid-cols-3
              "
            >

              <Info
                label="Référence"
                value={
                  transfert.code_reference
                }
              />

              <Info
                label="Devise"
                value={
                  transfert.devise
                }
              />

              <Info
                label="Initiateur"
                value={
                  transfert.created_by_name
                }
              />

              <Info
                label="Agence source"
                value={
                  transfert.agence_source_name
                }
              />

              <Info
                label="Agence destination"
                value={
                  transfert.agence_destination_name
                }
              />

              <Info
                label="Date opération"
                value={
                  transfert.date_operation
                    ? new Date(
                        transfert.date_operation
                      ).toLocaleDateString(
                        "fr-FR"
                      )
                    : "-"
                }
              />

            </div>

          </section>

          {/* META */}

          <section>

            <h3
              className="
                mb-4
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Traçabilité
            </h3>

            <div
              className="
                grid
                gap-4
                md:grid-cols-2
              "
            >

              <Info
                label="Créé le"
                value={
                  new Date(
                    transfert.created_at
                  ).toLocaleString(
                    "fr-FR"
                  )
                }
              />

              <Info
                label="Dernière modification"
                value={
                  new Date(
                    transfert.updated_at
                  ).toLocaleString(
                    "fr-FR"
                  )
                }
              />

            </div>

          </section>

        </div>

      </div>

    </Modal>
  );
}