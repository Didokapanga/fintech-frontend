// src/modules/audit/components/AuditLogDetailsModal.tsx

import {
  Activity,
  Clock3,
  Database,
  Globe,
  MonitorSmartphone,
  ShieldCheck,
  User2,
} from "lucide-react";

import {
  Modal,
  Button,
} from "../../../components/ui";

import type {
  AuditLog,
} from "../types/audit-log.types";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                              STATUS STYLES                                 */
/* -------------------------------------------------------------------------- */

const ACTION_STYLES: Record<
  string,
  string
> = {

  CREATE:
    "bg-emerald-100 text-emerald-700",

  UPDATE:
    "bg-blue-100 text-blue-700",

  DELETE:
    "bg-red-100 text-red-700",

  LOGIN:
    "bg-indigo-100 text-indigo-700",

  VALIDATION:
    "bg-orange-100 text-orange-700",
};

/* -------------------------------------------------------------------------- */
/*                                   MODAL                                    */
/* -------------------------------------------------------------------------- */

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

  const badgeClass =
    ACTION_STYLES[
      log.action?.toUpperCase()
    ] ||

    "bg-slate-100 text-slate-700";

  return (

    <Modal
      open={open}
      onClose={onClose}
    >

      <div className="space-y-6">

        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            rounded-[28px]
            border
            border-slate-200
            bg-gradient-to-br
            from-white
            to-slate-50
            p-6
          "
        >

          <div
            className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >

            {/* LEFT */}

            <div className="flex gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-50
                  text-indigo-600
                "
              >

                <ShieldCheck
                  size={24}
                />

              </div>

              <div>

                <div
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    px-3
                    py-1
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    ${badgeClass}
                  `}
                >

                  <Activity
                    size={12}
                  />

                  {log.action}

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
                  Détails Audit Log
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

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* INFOS */}
        {/* ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >

          <InfoCard
            icon={
              <Activity
                size={16}
              />
            }
            label="Action"
            value={log.action}
          />

          <InfoCard
            icon={
              <Database
                size={16}
              />
            }
            label="Table"
            value={log.table_name}
          />

          <InfoCard
            icon={
              <ShieldCheck
                size={16}
              />
            }
            label="Référence"
            value={
              log.code_reference ||
              "-"
            }
          />

          <InfoCard
            icon={
              <Clock3
                size={16}
              />
            }
            label="Date"
            value={
              new Date(
                log.created_at
              ).toLocaleString(
                "fr-FR"
              )
            }
          />

          <InfoCard
            icon={
              <User2
                size={16}
              />
            }
            label="Utilisateur"
            value={
              log.user
                ? `${log.user.user_name} (${log.user.role})`
                : "-"
            }
          />

          <InfoCard
            icon={
              <Globe
                size={16}
              />
            }
            label="Adresse IP"
            value={
              log.ip_address ||
              "-"
            }
          />

        </div>

        {/* ====================================================== */}
        {/* USER AGENT */}
        {/* ====================================================== */}

        <section
          className="
            rounded-[26px]
            border
            border-slate-200
            bg-white
            p-5
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                text-slate-600
              "
            >

              <MonitorSmartphone
                size={18}
              />

            </div>

            <div>

              <h3
                className="
                  text-sm
                  font-semibold
                  text-slate-900
                "
              >
                User Agent
              </h3>

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Informations navigateur/appareil
              </p>

            </div>

          </div>

          <div
            className="
              mt-4
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4
              font-mono
              text-xs
              leading-6
              text-slate-600
              break-all
            "
          >

            {log.user_agent ||
              "-"}

          </div>

        </section>

        {/* ====================================================== */}
        {/* CHANGES */}
        {/* ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-2
          "
        >

          {/* OLD */}

          <section
            className="
              overflow-hidden
              rounded-[26px]
              border
              border-red-100
              bg-red-50
            "
          >

            <div
              className="
                border-b
                border-red-100
                px-5
                py-4
              "
            >

              <h3
                className="
                  text-sm
                  font-semibold
                  text-red-700
                "
              >
                Anciennes données
              </h3>

            </div>

            <pre
              className="
                max-h-[420px]
                overflow-auto
                p-5
                text-xs
                leading-6
                text-red-950
              "
            >

              {prettyJson(
                log.changes?.old
              )}

            </pre>

          </section>

          {/* NEW */}

          <section
            className="
              overflow-hidden
              rounded-[26px]
              border
              border-emerald-100
              bg-emerald-50
            "
          >

            <div
              className="
                border-b
                border-emerald-100
                px-5
                py-4
              "
            >

              <h3
                className="
                  text-sm
                  font-semibold
                  text-emerald-700
                "
              >
                Nouvelles données
              </h3>

            </div>

            <pre
              className="
                max-h-[420px]
                overflow-auto
                p-5
                text-xs
                leading-6
                text-emerald-950
              "
            >

              {prettyJson(
                log.changes?.new
              )}

            </pre>

          </section>

        </div>

        {/* ====================================================== */}
        {/* ACTIONS */}
        {/* ====================================================== */}

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

/* -------------------------------------------------------------------------- */
/*                                INFO CARD                                   */
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
        rounded-[24px]
        border
        border-slate-200
        bg-white
        p-5
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            text-slate-600
          "
        >

          {icon}

        </div>

        <div>

          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]
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
              text-slate-700
              break-all
            "
          >
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}