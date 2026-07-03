// src/modules/retrait/components/RetraitDetailsModal.tsx

import {
  Phone,
  User2,
  Wallet,
} from "lucide-react";

import {
  Modal,
  Button,
} from "../../../components/ui";

import type {
  Retrait,
} from "../types";

type Props = {
  open: boolean;
  retrait: Retrait | null;
  onClose: () => void;
};

export default function RetraitDetailsModal({
  open,
  retrait,
  onClose,
}: Props) {

  if (!retrait)
    return null;

  const exp =
    retrait.expediteur;

  const dest =
    retrait.destinataire;

  const getStatusStyle = (
    statut: string
  ) => {

    switch (statut) {

      case "INITIE":
        return `
          border-yellow-200
          bg-yellow-50
          text-yellow-700
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

      case "ANNULE":
        return `
          border-red-200
          bg-red-50
          text-red-700
        `;

      default:
        return `
          border-slate-200
          bg-slate-100
          text-slate-600
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
          w-full
          max-w-4xl
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
              items-center
              justify-between
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-slate-900
                "
              >
                Détails du retrait
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Consultation complète de
                l'opération de retrait.
              </p>

            </div>

            <span
              className={`
                inline-flex
                items-center
                rounded-full
                border
                px-4
                py-2
                text-xs
                font-semibold
                ${getStatusStyle(
                  retrait.statut
                )}
              `}
            >
              {retrait.statut}
            </span>

          </div>

        </div>

        {/* BODY */}

        <div
          className="
            space-y-6
            px-8
            py-6
          "
        >

          {/* MONTANT */}

          <div
            className="
              rounded-3xl
              border
              border-emerald-200
              bg-emerald-50
              p-6
            "
          >

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-emerald-700
              "
            >
              Montant retiré
            </p>

            <h3
              className="
                mt-2
                text-4xl
                font-bold
                text-emerald-700
              "
            >
              {Number(
                retrait.montant
              ).toLocaleString()}
              {" "}
              {retrait.devise}
            </h3>

          </div>

          {/* PERSONNES */}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              xl:grid-cols-2
            "
          >

            {/* EXPEDITEUR */}

            <div
              className="
                rounded-3xl
                border
                border-slate-200
                p-6
              "
            >

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-2
                "
              >

                <User2
                  size={18}
                />

                <h3
                  className="
                    font-semibold
                    text-slate-900
                  "
                >
                  Expéditeur
                </h3>

              </div>

              <div
                className="
                  space-y-4
                "
              >

                <Info
                  label="Nom complet"
                  value={
                    exp
                      ? `${exp.nom} ${exp.postnom} ${exp.prenom}`
                      : "-"
                  }
                />

                <Info
                    label="Téléphone"
                    value={
                        exp?.telephone ||
                        "-"
                    }
                />

              </div>

            </div>

            {/* DESTINATAIRE */}

            <div
              className="
                rounded-3xl
                border
                border-slate-200
                p-6
              "
            >

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-2
                "
              >

                <Phone
                  size={18}
                />

                <h3
                  className="
                    font-semibold
                    text-slate-900
                  "
                >
                  Bénéficiaire
                </h3>

              </div>

              <div
                className="
                  space-y-4
                "
              >

                <Info
                  label="Nom complet"
                  value={
                    dest
                      ? `${dest.nom} ${dest.postnom} ${dest.prenom}`
                      : "-"
                  }
                />

                <Info
                    label="Téléphone"
                    value={
                        dest?.telephone ||
                        "-"
                    }
                />

              </div>

            </div>

          </div>

          {/* OPERATION */}

          <div
            className="
              rounded-3xl
              border
              border-slate-200
              p-6
            "
          >

            <div
              className="
                mb-5
                flex
                items-center
                gap-2
              "
            >

              <Wallet
                size={18}
              />

              <h3
                className="
                  font-semibold
                  text-slate-900
                "
              >
                Informations opération
              </h3>

            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-5
                xl:grid-cols-2
              "
            >

              <Info
                label="Numéro pièce"
                value={
                  retrait.numero_piece
                }
              />

              <Info
                label="Devise"
                value={
                  retrait.devise
                }
              />

              <Info
                label="Date opération"
                value={new Date(
                  retrait.date_operation ||
                    retrait.created_at
                ).toLocaleDateString(
                  "fr-FR"
                )}
              />

              <Info
                label="Date création"
                value={new Date(
                  retrait.created_at
                ).toLocaleString(
                  "fr-FR"
                )}
              />

              <Info
                label="Caisse"
                value={
                    `${retrait.code_caisse} (${retrait.caisse_type})`
                }
                />

              <Info
                label="Montant"
                value={`${Number(
                  retrait.montant
                ).toLocaleString()} ${
                  retrait.devise
                }`}
              />

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            justify-end
            border-t
            border-slate-200
            px-8
            py-5
          "
        >

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Fermer
          </Button>

        </div>

      </div>

    </Modal>
  );
}

type InfoProps = {
  label: string;
  value: string;
};

function Info({
  label,
  value,
}: InfoProps) {

  return (

    <div>

      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-medium
          text-slate-800
        "
      >
        {value}
      </p>

    </div>
  );
}