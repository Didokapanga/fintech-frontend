// src/modules/audit/pages/AuditLogPage.tsx

import { useState } from "react";

import {
  Activity,
  FileSearch,
  ShieldCheck,
} from "lucide-react";

import Pagination from "../../../components/ui/Pagination";

import AuditLogFiltersComponent
from "../components/AuditLogFilters";

import AuditLogTable
from "../components/AuditLogTable";

import AuditLogDetailsModal
from "../components/AuditLogDetailsModal";

import { useAuditLogs }
from "../hooks/useAuditLogs";

import type {
  AuditLog,
  AuditLogFilters,
} from "../types/audit-log.types";

export default function AuditLogPage() {

  /**
   * =========================================
   * FILTERS
   * =========================================
   */
  const [
    filters,
    setFilters,
  ] = useState<AuditLogFilters>({
    page: 1,
    limit: 10,
    action: "",
    table_name: "",
    date_from: "",
    date_to: "",
  });

  /**
   * =========================================
   * MODAL STATE
   * =========================================
   */
  const [
    selectedLog,
    setSelectedLog,
  ] = useState<AuditLog | null>(
    null
  );

  const [
    openDetails,
    setOpenDetails,
  ] = useState(false);

  /**
   * =========================================
   * QUERY
   * =========================================
   */
  const {
    data,
    isLoading,
  } = useAuditLogs(filters);

  const logs =
    data?.data?.data || [];

  const meta =
    data?.data?.meta;

  /**
   * =========================================
   * OPEN DETAILS
   * =========================================
   */
  const handleOpenDetails = (
    log: AuditLog
  ) => {

    setSelectedLog(log);

    setOpenDetails(true);
  };

  /**
   * =========================================
   * FILTER CHANGE
   * =========================================
   */
  const handleFiltersChange = (
    values: AuditLogFilters
  ) => {

    setFilters({
      page:
        values.page ?? 1,

      limit:
        values.limit ?? 10,

      action:
        values.action ?? "",

      table_name:
        values.table_name ?? "",

      date_from:
        values.date_from ?? "",

      date_to:
        values.date_to ?? "",
    });
  };

  return (

    <div className="space-y-6">

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-slate-200
          bg-white
          p-7
          shadow-sm
        "
      >

        <div
          className="
            absolute
            right-0
            top-0
            h-72
            w-72
            rounded-full
            bg-indigo-50
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-8
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          {/* LEFT */}

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

              <ShieldCheck
                size={13}
              />

              Audit & traçabilité

            </div>

            <h1
              className="
                mt-5
                text-[38px]
                font-semibold
                tracking-[-0.04em]
                text-slate-900
              "
            >
              Journal d’audit
            </h1>

            <p
              className="
                mt-4
                max-w-3xl
                text-sm
                leading-7
                text-slate-500
              "
            >
              Consultez l’historique complet
              des actions système et métiers
              effectuées sur la plateforme.
            </p>

          </div>

          {/* RIGHT */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >

            {/* CARD 1 */}

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
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-100
                  text-indigo-600
                "
              >

                <Activity
                  size={18}
                />

              </div>

              <p
                className="
                  mt-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                "
              >
                Activité
              </p>

              <h3
                className="
                  mt-1
                  text-base
                  font-semibold
                  text-slate-900
                "
              >
                Historique système
              </h3>

            </div>

            {/* CARD 2 */}

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
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-100
                  text-blue-600
                "
              >

                <FileSearch
                  size={18}
                />

              </div>

              <p
                className="
                  mt-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                "
              >
                Contrôle
              </p>

              <h3
                className="
                  mt-1
                  text-base
                  font-semibold
                  text-slate-900
                "
              >
                Suivi détaillé
              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* FILTERS */}
      {/* ====================================================== */}

      <section
        className="
          rounded-[30px]
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >

        <AuditLogFiltersComponent
          filters={filters}
          onChange={
            handleFiltersChange
          }
        />

      </section>

      {/* ====================================================== */}
      {/* TABLE */}
      {/* ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-[30px]
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >

        <AuditLogTable
          data={logs}
          onDetails={
            handleOpenDetails
          }
        />

      </section>

      {/* ====================================================== */}
      {/* LOADING */}
      {/* ====================================================== */}

      {isLoading && (

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            py-8
            text-center
            text-sm
            text-slate-500
          "
        >

          Chargement des audit logs...

        </div>
      )}

      {/* ====================================================== */}
      {/* EMPTY */}
      {/* ====================================================== */}

      {!isLoading &&
        logs.length === 0 && (

        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            py-12
            text-center
            text-sm
            text-slate-500
          "
        >

          Aucun audit log trouvé

        </div>
      )}

      {/* ====================================================== */}
      {/* PAGINATION */}
      {/* ====================================================== */}

      {meta && (

        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={(newPage) =>
            setFilters(
              (
                prev: AuditLogFilters
              ) => ({
                ...prev,
                page: newPage,
              })
            )
          }
        />

      )}

      {/* ======================================================
          MODAL DETAILS
      ====================================================== */}

      <AuditLogDetailsModal
        open={openDetails}
        onClose={() =>
          setOpenDetails(false)
        }
        log={selectedLog}
      />

    </div>
  );
}