// src/modules/validation-log/components/ValidationLogDetailsModal.tsx

import {
  CheckCircle2,
  Clock3,
  FileText,
  ShieldCheck,
  UserCheck,
  XCircle,
} from "lucide-react";

import {
  Button,
  Modal,
} from "../../../components/ui";

import type {
  ValidationLog,
} from "../types/validation-log.types";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Props = {
  open: boolean;

  onClose: () => void;

  log: ValidationLog | null;
};

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function ValidationLogDetailsModal({
  open,
  onClose,
  log,
}: Props) {

  if (!log) {
    return null;
  }

  const getDecisionStyle = (
    decision: string
  ) => {

    switch (
      decision?.toUpperCase()
    ) {

      case "APPROUVE":
        return {
          badge:
            "bg-emerald-100 text-emerald-700",

          icon:
            <CheckCircle2
              size={16}
            />,
        };

      case "REJETE":
        return {
          badge:
            "bg-red-100 text-red-700",

          icon:
            <XCircle
              size={16}
            />,
        };

      default:
        return {
          badge:
            "bg-slate-100 text-slate-700",

          icon:
            <Clock3
              size={16}
            />,
        };
    }
  };

  const decisionStyle =
    getDecisionStyle(
      log.decision
    );

  return (

    <Modal
      open={open}
      onClose={onClose}
    >

      <div className="space-y-6">

        {/* -------------------------------------------------------------- */}
        {/* HEADER                                                         */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
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
                tracking-[0.12em]
                text-indigo-700
              "
            >

              <ShieldCheck
                size={13}
              />

              Validation Log

            </div>

            <h2
              className="
                mt-4
                text-2xl
                font-semibold
                tracking-[-0.03em]
                text-slate-900
              "
            >
              Détails validation
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              "
            >
              {log.summary}
            </p>

          </div>

          <div
            className={`
              inline-flex
              items-center
              gap-2
              rounded-2xl
              px-4
              py-2
              text-sm
              font-semibold
              ${decisionStyle.badge}
            `}
          >

            {decisionStyle.icon}

            {log.decision}

          </div>

        </div>

        {/* -------------------------------------------------------------- */}
        {/* GRID                                                           */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >

          <InfoCard
            label="Opération"
            value={
              log.operation_type
            }
            icon={
              <FileText
                size={16}
              />
            }
          />

          <InfoCard
            label="Niveau"
            value={log.niveau}
            icon={
              <ShieldCheck
                size={16}
              />
            }
          />

          <InfoCard
            label="Référence"
            value={
              log.reference_id
            }
            icon={
              <FileText
                size={16}
              />
            }
          />

          <InfoCard
            label="Date"
            value={
              new Date(
                log.created_at
              ).toLocaleString()
            }
            icon={
              <Clock3
                size={16}
              />
            }
          />

          <InfoCard
            label="Statut avant"
            value={
              log.statut_avant
            }
            icon={
              <Clock3
                size={16}
              />
            }
          />

          <InfoCard
            label="Statut après"
            value={
              log.statut_apres
            }
            icon={
              <CheckCircle2
                size={16}
              />
            }
          />

          <InfoCard
            label="Validateur"
            value={
              log.validator
                ? `${log.validator.user_name} (${log.validator.role})`
                : "-"
            }
            icon={
              <UserCheck
                size={16}
              />
            }
          />

          <InfoCard
            label="Décision"
            value={log.decision}
            icon={
              decisionStyle.icon
            }
          />

        </div>

        {/* -------------------------------------------------------------- */}
        {/* COMMENTAIRE                                                    */}
        {/* -------------------------------------------------------------- */}

        <div>

          <div
            className="
              mb-3
              flex
              items-center
              gap-2
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-slate-100
                text-slate-600
              "
            >

              <FileText
                size={16}
              />

            </div>

            <div>

              <h3
                className="
                  text-sm
                  font-semibold
                  text-slate-800
                "
              >
                Commentaire
              </h3>

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Observation liée à
                la validation
              </p>

            </div>

          </div>

          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-5
              text-sm
              leading-7
              text-slate-700
            "
          >
            {log.commentaire ||
              "Aucun commentaire"}
          </div>

        </div>

        {/* -------------------------------------------------------------- */}
        {/* ACTIONS                                                        */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            flex
            justify-end
            pt-2
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

/* -------------------------------------------------------------------------- */
/*                                 INFO CARD                                  */
/* -------------------------------------------------------------------------- */

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-slate-50
        p-5
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
            rounded-2xl
            bg-white
            text-slate-600
            shadow-sm
          "
        >

          {icon}

        </div>

        <div className="min-w-0">

          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            {label}
          </p>

          <p
            className="
              mt-1
              break-all
              text-sm
              font-medium
              text-slate-800
            "
          >
            {value || "-"}
          </p>

        </div>

      </div>

    </div>
  );
}