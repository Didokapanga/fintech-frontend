// src/modules/caisse/components/MouvementCaisseTab.tsx

import {
  ArrowUpDown,
  CalendarDays,
  Plus,
  RefreshCcw,
  Wallet2,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Button,
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import {
  useCaisses,
} from "../hooks/useCaisses";

import Pagination from "../../../components/ui/Pagination";

import {
  useMouvements,
} from "../../mouvement/hooks/useMouvement";

import type {
  MouvementCaisse,
} from "../../mouvement/services/mouvement.service";

import MouvementFormModal from "../../mouvement/components/MouvementFormModal";

import SelectCaisseModal
from "../../transfert-caisse/components/SelectCaisseModal";

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function MouvementCaisseTab() {

  /* ------------------------------------------------------------------------ */
  /*                                   STATE                                  */
  /* ------------------------------------------------------------------------ */

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    openMouvement,
    setOpenMouvement,
  ] = useState(false);

  const [
    typeMouvement,
    setTypeMouvement,
  ] = useState("");

  const [
    devise,
    setDevise,
  ] = useState("");

  const [
    statut,
    setStatut,
  ] = useState("");

  const [
    dateOperation,
    setDateOperation,
  ] = useState("");

  const [
    openSelectCaisse,
    setOpenSelectCaisse,
  ] = useState(false);

  const [
    selectedCaisseId,
    setSelectedCaisseId,
  ] = useState("");

  const [
    selectedDevise,
    setSelectedDevise,
  ] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                                   QUERY                                  */
  /* ------------------------------------------------------------------------ */

  const {
    data,
    isLoading,
  } = useMouvements(
    page,
    10,
    {
      type_mouvement:
        typeMouvement,

      devise,

      statut,

      date_operation:
        dateOperation,
    }
  );

  const mouvements:
    MouvementCaisse[] =
      useMemo(
        () =>

          Array.isArray(
            data?.data
          )
            ? data.data
            : [],

        [data]
      );

  const meta =
    data?.meta;

  const {
    data: caissesResponse,
  } = useCaisses(
    1,
    100
  );

  const caisses =
    useMemo(
      () =>
        caissesResponse?.data || [],
      [caissesResponse]
    );

  /* ------------------------------------------------------------------------ */
  /*                                  HELPERS                                 */
  /* ------------------------------------------------------------------------ */

  const getStatusBadge =
    (
      status: string
    ) => {

      switch (
        status
      ) {

        case "EXECUTE":
          return "bg-green-100 text-green-700";

        case "INITIE":
          return "bg-yellow-100 text-yellow-700";

        case "ANNULE":
          return "bg-red-100 text-red-700";

        default:
          return "bg-gray-100 text-gray-600";
      }
    };

  const getCaisseLabel = (
    caisseId: string
  ) => {

  const caisse =
    caisses.find(
      (
        c: {
          id: string;
          code_caisse: string;
          devise: string;
        }
      ) =>
        c.id === caisseId
    );
    
    return caisse
      ? `${caisse.code_caisse} (${caisse.devise})`
      : "-";
  };

  /* ------------------------------------------------------------------------ */
  /*                                  COLUMNS                                 */
  /* ------------------------------------------------------------------------ */

  const columns:
    Column<MouvementCaisse>[] =
    [

      {
        header:
          "Référence",

        accessor:
          "code_reference",

        render:
          (
            value
          ) => (

            <span
              className="
                text-xs
                font-mono
                text-slate-600
              "
            >
              {value || "-"}
            </span>

          ),
      },

      {
        header:
          "Caisse",

        accessor:
          "caisse_id",

        render:
          (value) => (

            <div
              className="
                flex
                flex-col
              "
            >

              <span
                className="
                  font-semibold
                  text-slate-800
                "
              >
                {getCaisseLabel(
                  String(value)
                )}
              </span>

              <span
                className="
                  text-xs
                  text-slate-400
                "
              >
                Caisse concernée
              </span>

            </div>

          ),
      },

      {
        header:
          "Type",

        accessor:
          "type_mouvement",

        render:
          (
            value
          ) => (

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

              <ArrowUpDown
                size={13}
              />

              {value || "-"}

            </div>

          ),
      },

      {
        header:
          "Montant",

        accessor:
          "montant",

        render:
          (
            value,
            row
          ) => (

            <div
              className="
                flex
                flex-col
              "
            >

              <span
                className="
                  font-semibold
                  text-emerald-600
                "
              >

                {Number(
                  value || 0
                ).toLocaleString()}{" "}

                {row.devise || ""}

              </span>

              <span
                className="
                  text-xs
                  text-slate-400
                "
              >
                Valeur opération
              </span>

            </div>

          ),
      },

      {
        header:
          "Statut",

        accessor:
          "statut",

        render:
          (
            value
          ) => (

            <span
              className={`
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${getStatusBadge(
                  String(
                    value
                  )
                )}
              `}
            >
              {value || "-"}
            </span>

          ),
      },

      {
        header:
          "Date opération",

        accessor:
          "date_operation",

        render:
          (
            value
          ) => (

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-slate-600
              "
            >

              <CalendarDays
                size={14}
              />

              {value
                ? new Date(
                    String(
                      value
                    )
                  ).toLocaleDateString(
                    "fr-FR"
                  )
                : "-"}

            </div>

          ),
      },
    ];

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (

    <div
      className="
        space-y-5
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-semibold
              tracking-[-0.03em]
              text-slate-900
            "
          >
            Mouvements de caisse
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Historique des opérations
            financières liées aux
            caisses.
          </p>

        </div>

        <Button
          onClick={() =>
            setOpenSelectCaisse(true)
          }
        >

          <Plus
            size={16}
          />

          Nouveau mouvement

        </Button>

      </div>

      {/* FILTERS */}

      <div
        className="
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-5
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-5
          "
        >

          {/* TYPE */}

          <select
            value={
              typeMouvement
            }
            onChange={(
              e
            ) => {

              setPage(
                1
              );

              setTypeMouvement(
                e.target.value
              );
            }}
            className="input"
          >

            <option value="">
              Type mouvement
            </option>

            <option value="APPROVISIONNEMENT">
              APPROVISIONNEMENT
            </option>

            <option value="RETRAIT_SORTIE">
              RETRAIT_SORTIE
            </option>

            <option value="TRANSFERT_SORTIE">
              TRANSFERT_SORTIE
            </option>

            <option value="TRANSFERT_ENTREE">
              TRANSFERT_ENTREE
            </option>

          </select>

          {/* DEVISE */}

          <select
            value={devise}
            onChange={(
              e
            ) => {

              setPage(
                1
              );

              setDevise(
                e.target.value
              );
            }}
            className="input"
          >

            <option value="">
              Devise
            </option>

            <option value="USD">
              USD
            </option>

            <option value="CDF">
              CDF
            </option>

          </select>

          {/* STATUS */}

          <select
            value={statut}
            onChange={(
              e
            ) => {

              setPage(
                1
              );

              setStatut(
                e.target.value
              );
            }}
            className="input"
          >

            <option value="">
              Statut
            </option>

            <option value="EXECUTE">
              EXECUTE
            </option>

            <option value="INITIE">
              INITIE
            </option>

            <option value="ANNULE">
              ANNULE
            </option>

          </select>

          {/* DATE */}

          <div
            className="
              relative
            "
          >

            <CalendarDays
              size={16}
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="date"
              value={
                dateOperation
              }
              onChange={(
                e
              ) => {

                setPage(
                  1
                );

                setDateOperation(
                  e.target.value
                );
              }}
              className="
                input
                pl-10
              "
            />

          </div>

          {/* RESET */}

          <Button
            variant="secondary"
            onClick={() => {

              setPage(1);

              setTypeMouvement(
                ""
              );

              setDevise(
                ""
              );

              setStatut(
                ""
              );

              setDateOperation(
                ""
              );
            }}
          >

            <RefreshCcw
              size={15}
            />

            Reset

          </Button>

        </div>

      </div>

      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-white
        "
      >

        <Table<MouvementCaisse>
          data={
            mouvements
          }
          columns={
            columns
          }
          loading={
            isLoading
          }
        />

      </div>

      {/* EMPTY */}

      {!isLoading &&
        mouvements.length ===
          0 && (

          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-slate-200
              bg-white
              py-16
              text-center
            "
          >

            <Wallet2
              size={38}
              className="
                mx-auto
                mb-4
                text-slate-300
              "
            />

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Aucun mouvement
              trouvé.
            </p>

          </div>

        )}

      {/* PAGINATION */}

      {meta &&
        meta.totalPages >
          1 && (

          <Pagination
            page={page}
            totalPages={
              meta.totalPages
            }
            onChange={
              setPage
            }
          />

        )}

      {/* MODAL */}

      <SelectCaisseModal
        open={openSelectCaisse}
        onClose={() =>
          setOpenSelectCaisse(false)
        }
        onSelect={(
          caisseId,
          devise
        ) => {

          setSelectedCaisseId(
            caisseId
          );

          setSelectedDevise(
            devise
          );

          setOpenMouvement(true);
        }}
      />

      {openMouvement && (

        <MouvementFormModal
          open={openMouvement}
          onClose={() =>
            setOpenMouvement(false)
          }
          selectedCaisseId={
            selectedCaisseId
          }
          selectedDevise={
            selectedDevise
          }
        />

      )}

    </div>

  );
}