// src/modules/ledger/components/LedgerDetailsModal.tsx

import { Modal } from "../../../components/ui";
import type { Ledger } from "../types";

type Props = {
  ledger: Ledger | null;
  open: boolean;
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
    <div className="space-y-1">
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
          text-sm
          font-medium
          text-slate-800
        "
      >
        {value || "-"}
      </p>
    </div>
  );
}

export default function LedgerDetailsModal({
  ledger,
  open,
  onClose,
}: Props) {

  if (!ledger) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Détails du mouvement"
      size="xl"
    >

      <div className="space-y-8">

        {/* ===================================== */}
        {/* OPERATION                             */}
        {/* ===================================== */}

        <section>

          <h3
            className="
              mb-4
              text-sm
              font-semibold
              text-slate-900
            "
          >
            Informations générales
          </h3>

          <div
            className="
              grid
              grid-cols-1
              gap-4
              md:grid-cols-2
            "
          >

            <Info
              label="Référence métier"
              value={ledger.reference_metier}
            />

            <Info
              label="Type opération"
              value={ledger.type_operation}
            />

            <Info
              label="Libellé"
              value={ledger.libelle_operation}
            />

            <Info
              label="Sens"
              value={ledger.sens}
            />

            <Info
              label="Montant"
              value={`${Number(
                ledger.montant
              ).toLocaleString()} ${
                ledger.devise
              }`}
            />

            <Info
              label="Date création"
              value={new Date(
                ledger.created_at
              ).toLocaleString("fr-FR")}
            />

          </div>

        </section>

        {/* ===================================== */}
        {/* AGENCE                               */}
        {/* ===================================== */}

        <section>

          <h3
            className="
              mb-4
              text-sm
              font-semibold
              text-slate-900
            "
          >
            Agence & caisse
          </h3>

          <div
            className="
              grid
              grid-cols-1
              gap-4
              md:grid-cols-2
            "
          >

            <Info
              label="Agence"
              value={
                ledger.agence?.libelle ||
                ledger.agence_name
              }
            />

            <Info
              label="Code agence"
              value={
                ledger.agence?.code_agence ||
                ledger.code_agence
              }
            />

            <Info
              label="Code caisse"
              value={
                ledger.caisse?.code_caisse ||
                ledger.code_caisse
              }
            />

            <Info
              label="Agent"
              value={
                ledger.agent?.user_name ||
                ledger.agent_operation ||
                "SYSTEME"
              }
            />

          </div>

        </section>

        {/* ===================================== */}
        {/* EXPEDITEUR                           */}
        {/* ===================================== */}

        {ledger.expediteur && (

          <section>

            <h3
              className="
                mb-4
                text-sm
                font-semibold
                text-slate-900
              "
            >
              Expéditeur
            </h3>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-3
              "
            >

              <Info
                label="Nom complet"
                value={
                  ledger.expediteur.nom_complet
                }
              />

              <Info
                label="Téléphone"
                value={
                  ledger.expediteur.telephone
                }
              />

              <Info
                label="Type pièce"
                value={
                  ledger.expediteur.type_piece
                }
              />

              <Info
                label="Numéro pièce"
                value={
                  ledger.expediteur.numero_piece
                }
              />

            </div>

          </section>

        )}

        {/* ===================================== */}
        {/* DESTINATAIRE                         */}
        {/* ===================================== */}

        {ledger.destinataire && (

          <section>

            <h3
              className="
                mb-4
                text-sm
                font-semibold
                text-slate-900
              "
            >
              Destinataire
            </h3>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-3
              "
            >

              <Info
                label="Nom complet"
                value={
                  ledger.destinataire.nom_complet
                }
              />

              <Info
                label="Téléphone"
                value={
                  ledger.destinataire.telephone
                }
              />

              <Info
                label="Type pièce"
                value={
                  ledger.destinataire.type_piece
                }
              />

              <Info
                label="Numéro pièce"
                value={
                  ledger.destinataire.numero_piece
                }
              />

            </div>

          </section>

        )}

        {/* ===================================== */}
        {/* RETRAIT                              */}
        {/* ===================================== */}

        {ledger.retrait_id && (

          <section>

            <h3
              className="
                mb-4
                text-sm
                font-semibold
                text-slate-900
              "
            >
              Informations retrait
            </h3>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-3
              "
            >

              <Info
                label="Retrait ID"
                value={ledger.retrait_id}
              />

              <Info
                label="Statut retrait"
                value={
                  ledger.retrait_statut
                }
              />

              <Info
                label="Date retrait"
                value={
                  ledger.retrait_date_operation
                    ? new Date(
                        ledger.retrait_date_operation
                      ).toLocaleDateString(
                        "fr-FR"
                      )
                    : "-"
                }
              />

            </div>

          </section>

        )}

      </div>

    </Modal>
  );
}