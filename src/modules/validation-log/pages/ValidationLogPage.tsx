// src/modules/validation-log/pages/ValidationLogPage.tsx

import { useState }
from "react";

import ValidationLogFiltersComponent
from "../components/ValidationLogFilters";

import ValidationLogTable
from "../components/ValidationLogTable";

import ValidationLogDetailsModal
from "../components/ValidationLogDetailsModal";

import { useValidationLogs }
from "../hooks/useValidationLogs";

import type {
  ValidationLog,
  ValidationLogFilters,
} from "../types/validation-log.types";

export default function ValidationLogPage() {

  const [
    filters,
    setFilters,
  ] =
  useState<ValidationLogFilters>({
    page: 1,
    limit: 10,
    operation_type: "",
    niveau: "",
    decision: "",
    date_from: "",
    date_to: "",
  });

  const [
    selectedLog,
    setSelectedLog,
  ] =
  useState<ValidationLog | null>(
    null
  );

  const [
    openDetails,
    setOpenDetails,
  ] = useState(false);

  const {
    data,
    isLoading,
  } = useValidationLogs(filters);

  const logs =
    data?.data?.data || [];

  const meta =
    data?.data?.meta;

  const handleOpenDetails = (
    log: ValidationLog
  ) => {

    setSelectedLog(log);

    setOpenDetails(true);
  };

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div>

        <h1 className="text-2xl font-bold">
          Validation Logs
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Historique des validations
          système et métier
        </p>

      </div>

      {/* FILTERS */}
      <ValidationLogFiltersComponent
        filters={filters}
        onChange={setFilters}
      />

      {/* TABLE */}
      <ValidationLogTable
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
          Aucun validation log trouvé
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
                  prev: ValidationLogFilters
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
                  prev: ValidationLogFilters
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
            "
          >
            →
          </button>

        </div>
      )}

      {/* MODAL */}
      <ValidationLogDetailsModal
        open={openDetails}
        onClose={() =>
          setOpenDetails(false)
        }
        log={selectedLog}
      />

    </div>
  );
}