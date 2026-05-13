// src/modules/audit/components/AuditLogDetailsModal.tsx

import {
  Modal,
  Button,
} from "../../../components/ui";

import type {
  AuditLog,
} from "../types/audit-log.types";

type JsonData =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null;

type Props = {
  open: boolean;

  onClose: () => void;

  log: AuditLog | null;
};

export default function AuditLogDetailsModal({
  open,
  onClose,
  log,
}: Props) {

  if (!log) {
    return null;
  }

  const prettyJson = (
    value: JsonData | undefined
  ) => {

    if (
      value === null ||
      value === undefined
    ) {
      return "Aucune donnée";
    }

    return JSON.stringify(
      value,
      null,
      2
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >

      <div className="space-y-5">

        {/* HEADER */}
        <div>

          <h2 className="text-xl font-semibold text-gray-800">
            Détails Audit Log
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {log.summary}
          </p>

        </div>

        {/* INFOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <InfoCard
            label="Action"
            value={log.action}
          />

          <InfoCard
            label="Table"
            value={log.table_name}
          />

          <InfoCard
            label="Référence"
            value={
              log.code_reference ||
              "-"
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
            label="Utilisateur"
            value={
              log.user
                ? `${log.user.user_name} (${log.user.role})`
                : "-"
            }
          />

          <InfoCard
            label="IP"
            value={
              log.ip_address ||
              "-"
            }
          />

        </div>

        {/* USER AGENT */}
        <div>

          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            User Agent
          </h3>

          <div
            className="
              bg-gray-50
              border
              rounded-xl
              p-3
              text-xs
              text-gray-600
              break-all
            "
          >
            {log.user_agent ||
              "-"}
          </div>

        </div>

        {/* OLD DATA */}
        <div>

          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Anciennes données
          </h3>

          <pre
            className="
              bg-red-50
              border border-red-100
              rounded-xl
              p-4
              text-xs
              overflow-auto
              max-h-80
            "
          >
            {prettyJson(
              log.changes?.old
            )}
          </pre>

        </div>

        {/* NEW DATA */}
        <div>

          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Nouvelles données
          </h3>

          <pre
            className="
              bg-emerald-50
              border border-emerald-100
              rounded-xl
              p-4
              text-xs
              overflow-auto
              max-h-80
            "
          >
            {prettyJson(
              log.changes?.new
            )}
          </pre>

        </div>

        {/* ACTION */}
        <div className="flex justify-end pt-2">

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