// src/modules/validation-log/pages/ValidationLogPage.tsx

import {
  Activity,
  ShieldCheck,
} from "lucide-react";

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

import Pagination
from "../../../components/ui/Pagination";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function ValidationLogPage() {

  /**
   * =========================================
   * FILTERS
   * =========================================
   */
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

  /**
   * =========================================
   * MODAL
   * =========================================
   */
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

  /**
   * =========================================
   * QUERY
   * =========================================
   */
  const {
    data,
    isLoading,
  } = useValidationLogs(filters);

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
    log: ValidationLog
  ) => {

    setSelectedLog(log);

    setOpenDetails(true);
  };

  /**
   * =========================================
   * PAGINATION
   * =========================================
   */
  const handlePageChange = (
    page: number
  ) => {

    setFilters(
      (
        prev
      ) => ({
        ...prev,
        page,
      })
    );
  };

  return (

    <div className="space-y-6">

      {/* -------------------------------------------------------------- */}
      {/* HERO                                                           */}
      {/* -------------------------------------------------------------- */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-slate-200/80
          bg-white
          px-8
          py-8
        "
      >

        {/* GLOW */}

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

              Workflow sécurisé

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
              Validation Logs
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
              Consultez l’historique
              complet des validations,
              approbations et rejets
              effectués dans le système.
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
                Historique
              </p>

              <h3
                className="
                  mt-1
                  text-base
                  font-semibold
                  text-slate-900
                "
              >
                Logs métier
              </h3>

            </div>

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
                  bg-emerald-100
                  text-emerald-600
                "
              >

                <ShieldCheck
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
                Sécurité
              </p>

              <h3
                className="
                  mt-1
                  text-base
                  font-semibold
                  text-slate-900
                "
              >
                Contrôle hiérarchique
              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* -------------------------------------------------------------- */}
      {/* CONTENT                                                        */}
      {/* -------------------------------------------------------------- */}

      <section
        className="
          rounded-[32px]
          border
          border-slate-200/80
          bg-white
          p-6
        "
      >

        {/* HEADER */}

        <div
          className="
            mb-6
            flex
            items-center
            justify-between
            gap-4
            flex-wrap
          "
        >

          <div>

            <h2
              className="
                text-lg
                font-semibold
                text-slate-900
              "
            >
              Journal des validations
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Analysez les opérations
              validées, rejetées ou
              approuvées dans le système.
            </p>

          </div>

        </div>

        {/* FILTERS */}

        <ValidationLogFiltersComponent
          filters={filters}
          onChange={setFilters}
        />

        {/* TABLE */}

        <div className="mt-6">

          <ValidationLogTable
            data={logs}
            onDetails={
              handleOpenDetails
            }
          />

        </div>

        {/* LOADING */}

        {isLoading && (

          <div
            className="
              py-8
              text-center
              text-sm
              text-slate-500
            "
          >
            Chargement...
          </div>
        )}

        {/* EMPTY */}

        {!isLoading &&
          logs.length === 0 && (

          <div
            className="
              mt-6
              rounded-3xl
              border
              border-dashed
              border-slate-200
              bg-slate-50
              py-14
              text-center
            "
          >

            <p
              className="
                text-sm
                font-medium
                text-slate-500
              "
            >
              Aucun validation log trouvé
            </p>

          </div>
        )}

        {/* PAGINATION */}

        {meta && (

          <div className="mt-6">

            <Pagination
              page={
                meta.page
              }
              totalPages={
                meta.totalPages
              }
              onChange={
                handlePageChange
              }
            />

          </div>
        )}

      </section>

      {/* -------------------------------------------------------------- */}
      {/* MODAL                                                          */}
      {/* -------------------------------------------------------------- */}

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