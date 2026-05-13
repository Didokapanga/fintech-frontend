// src/modules/audit/pages/AuditLogPage.tsx

import { useState } from "react";

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
    <div className="space-y-5">

      {/* HEADER */}
      <div>

        <h1 className="text-2xl font-bold">
          Audit Logs
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Historique des actions
          système et métier
        </p>

      </div>

      {/* FILTERS */}
      <AuditLogFiltersComponent
        filters={filters}
        onChange={
          handleFiltersChange
        }
      />

      {/* TABLE */}
      <AuditLogTable
        data={logs}
        onDetails={
          handleOpenDetails
        }
      />

      {/* LOADING */}
      {isLoading && (

        <div className="text-sm text-gray-500">
          Chargement...
        </div>
      )}

      {/* EMPTY */}
      {!isLoading &&
        logs.length === 0 && (

        <div
          className="
            text-center
            text-gray-500
            py-10
            bg-white
            rounded-2xl
            border
          "
        >
          Aucun audit log trouvé
        </div>
      )}

      {/* PAGINATION */}
      {meta && (

        <div
          className="
            flex items-center
            justify-center
            gap-3
          "
        >

          <button
            disabled={
              (filters.page || 1) <= 1
            }
            onClick={() =>
              setFilters(
                (
                  prev: AuditLogFilters
                ) => ({
                  ...prev,
                  page:
                    (prev.page || 1) - 1,
                })
              )
            }
            className="
              px-4 py-2
              rounded-xl
              border
              bg-white
              text-sm
              disabled:opacity-50
            "
          >
            ←
          </button>

          <span className="text-sm text-gray-600">
            Page{" "}
            <strong>
              {meta.page}
            </strong>{" "}
            /{" "}
            {meta.totalPages}
          </span>

          <button
            disabled={
              (filters.page || 1) >=
              meta.totalPages
            }
            onClick={() =>
              setFilters(
                (
                  prev: AuditLogFilters
                ) => ({
                  ...prev,
                  page:
                    (prev.page || 1) + 1,
                })
              )
            }
            className="
              px-4 py-2
              rounded-xl
              border
              bg-white
              text-sm
              disabled:opacity-50
            "
          >
            →
          </button>

        </div>
      )}

      {/* =========================================
          MODAL DETAILS
      ========================================= */}
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