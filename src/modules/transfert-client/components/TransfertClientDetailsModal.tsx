import {
  Building2,
  CalendarDays,
  Landmark,
  Receipt,
  User2,
  X,
} from "lucide-react";

import { Modal } from "../../../components/ui";

import type {
  TransfertClient,
} from "../services/transfert.service";

type Props = {
  open: boolean;
  onClose: () => void;
  transfert: TransfertClient | null;
};

function InfoItem({
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
          break-words
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

export default function TransfertClientDetailsModal({
  open,
  onClose,
  transfert,
}: Props) {

  if (!transfert) {
    return null;
  }

  const montant =
    Number(
      transfert.montant_source
    );

  const frais =
    Number(
      transfert.frais
    );

  const total =
    Number(
      transfert.montant_total
    );

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
                  text-xs
                  font-semibold
                  text-indigo-700
                "
              >

                <Receipt size={14} />

                Détail du transfert

              </div>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-semibold
                  text-slate-900
                "
              >
                {transfert.code_reference}
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                Consultation complète de l'opération.
              </p>

            </div>

            <button
              onClick={onClose}
              className="
                rounded-xl
                p-2
                text-slate-500
                transition-all
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
            space-y-8
            overflow-y-auto
            px-8
            py-6
          "
        >

          {/* STATUS */}

          <section>

            <div
              className="
                rounded-3xl
                border
                border-slate-200
                bg-gradient-to-r
                from-indigo-50
                to-blue-50
                p-6
              "
            >

              <div
                className="
                  flex
                  flex-wrap
                  items-center
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
                    Montant transféré
                  </p>

                  <h3
                    className="
                      mt-2
                      text-3xl
                      font-bold
                      text-emerald-600
                    "
                  >
                    {montant.toLocaleString()}
                    {" "}
                    {
                      transfert.devise_source
                    }
                  </h3>

                </div>

                <span
                  className="
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-emerald-700
                  "
                >
                  {transfert.statut}
                </span>

              </div>

            </div>

          </section>

          {/* AGENCES */}

          <section>

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <Building2 size={18} />
              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                Informations agences
              </h3>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >

              <InfoItem
                label="Agence source"
                value={
                  transfert.agence_exp_name
                }
              />

              <InfoItem
                label="Agence destination"
                value={
                  transfert.agence_dest_name
                }
              />

              <InfoItem
                label="Caisse"
                value={
                  transfert.code_caisse
                }
              />

              <InfoItem
                label="Agent"
                value={
                  transfert.agent_name
                }
              />

            </div>

          </section>

          {/* EXPEDITEUR */}

          <section>

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <User2 size={18} />

              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                Expéditeur
              </h3>

            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >

              <InfoItem
                label="Nom complet"
                value={
                  transfert.expediteur_name
                }
              />

              <InfoItem
                label="Téléphone"
                value={
                  transfert.expediteur_telephone
                }
              />

              <InfoItem
                label="Type pièce"
                value={
                  transfert.expediteur_type_piece
                }
              />

              <InfoItem
                label="Numéro pièce"
                value={
                  transfert.expediteur_numero_piece
                }
              />

            </div>

          </section>

          {/* DESTINATAIRE */}

          <section>

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <User2 size={18} />

              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                Destinataire
              </h3>

            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >

              <InfoItem
                label="Nom complet"
                value={
                  transfert.destinataire_name
                }
              />

              <InfoItem
                label="Téléphone"
                value={
                  transfert.destinataire_telephone
                }
              />

              <InfoItem
                label="Type pièce"
                value={
                  transfert.destinataire_type_piece
                }
              />

              <InfoItem
                label="Numéro pièce"
                value={
                  transfert.destinataire_numero_piece
                }
              />

            </div>

          </section>

          {/* FINANCE */}

          <section>

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <Landmark size={18} />

              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                Détails financiers
              </h3>

            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-3
              "
            >

              <InfoItem
                label="Montant"
                value={`${montant.toLocaleString()} ${transfert.devise_source}`}
              />

              <InfoItem
                label="Frais"
                value={`${frais.toLocaleString()} ${transfert.devise_source}`}
              />

              <InfoItem
                label="Total encaissé"
                value={`${total.toLocaleString()} ${transfert.devise_source}`}
              />

              <InfoItem
                label="Devise source"
                value={
                  transfert.devise_source
                }
              />

              <InfoItem
                label="Devise destination"
                value={
                  transfert.devise_destination
                }
              />

              <InfoItem
                label="Mode paiement"
                value={
                  transfert.mode_paiement
                }
              />

              <InfoItem
                label="Taux appliqué"
                value={
                  transfert.taux_utilise
                }
              />

              <InfoItem
                label="Type taux"
                value={
                  transfert.type_taux_utilise
                }
              />

            </div>

          </section>

          {/* DATES */}

          <section>

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <CalendarDays
                size={18}
              />

              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                Historique
              </h3>

            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >

              <InfoItem
                label="Date opération"
                value={new Date(
                  transfert.date_operation
                ).toLocaleString(
                  "fr-FR"
                )}
              />

              <InfoItem
                label="Date création"
                value={new Date(
                  transfert.created_at
                ).toLocaleString(
                  "fr-FR"
                )}
              />

            </div>

          </section>

        </div>

      </div>

    </Modal>

  );
}