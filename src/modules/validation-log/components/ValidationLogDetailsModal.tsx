// src/modules/validation-log/components/ValidationLogDetailsModal.tsx

import { Button, Modal } from "../../../components/ui";
import type {
  ValidationLog,
} from "../types/validation-log.types";

type Props = {
  open: boolean;

  onClose: () => void;

  log: ValidationLog | null;
};

export default function ValidationLogDetailsModal({
  open,
  onClose,
  log,
}: Props) {

  if (!log) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >

      <div className="space-y-5">

        {/* HEADER */}
        <div>

          <h2 className="text-xl font-semibold text-gray-800">
            Détails Validation
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {log.summary}
          </p>

        </div>

        {/* INFOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <InfoCard
            label="Décision"
            value={log.decision}
          />

          <InfoCard
            label="Opération"
            value={
              log.operation_type
            }
          />

          <InfoCard
            label="Niveau"
            value={log.niveau}
          />

          <InfoCard
            label="Référence"
            value={
              log.reference_id
            }
          />

          <InfoCard
            label="Avant"
            value={
              log.statut_avant
            }
          />

          <InfoCard
            label="Après"
            value={
              log.statut_apres
            }
          />

          <InfoCard
            label="Date"
            value={
              new Date(
                log.created_at
              ).toLocaleString()
            }
          />

          <InfoCard
            label="Validateur"
            value={
              log.validator
                ? `${log.validator.user_name} (${log.validator.role})`
                : "-"
            }
          />

        </div>

        {/* COMMENTAIRE */}
        <div>

          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Commentaire
          </h3>

          <div
            className="
              bg-gray-50
              border
              rounded-xl
              p-4
              text-sm
              text-gray-700
            "
          >
            {log.commentaire ||
              "Aucun commentaire"}
          </div>

        </div>

        {/* ACTION */}
        <div className="flex justify-end">

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

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (
    <div
      className="
        bg-gray-50
        border
        rounded-2xl
        p-4
      "
    >

      <p className="text-xs uppercase text-gray-400 mb-1">
        {label}
      </p>

      <p className="text-sm font-medium text-gray-700 break-all">
        {value}
      </p>

    </div>
  );
}