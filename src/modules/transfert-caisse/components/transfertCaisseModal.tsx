// src/modules/transfert-caisse/components/TransfertCaisseModal.tsx
import { usePermission } from "../../../hooks/usePermission";
import { useAuthStore } from "../../../app/store";
import { PERMISSIONS } from "../../../constants/permissions";

import {
  ArrowRightLeft,
  Landmark,
  Save,
  Wallet,
} from "lucide-react";

import {
  useEffect,
  useMemo,
} from "react";

import {
  useForm,
  useWatch,
} from "react-hook-form";

import {
  Button,
  Input,
  Modal,
} from "../../../components/ui";

import AppMessageState from "../../../components/ui/AppMessageState";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import {
  useCaisses,
} from "../../caisse/hooks/useCaisses";

import {
  createTransfertCaisse,
} from "../services/transfertCaisse.service";
import type { CreateTransfertCaisseDto } from "../types";


/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

// type Props = {
//   open: boolean;

//   onClose: () => void;
// };

type Props = {
  open: boolean;
  onClose: () => void;
};

type Caisse = {
  id: string;

  agence_id: string;

  code_caisse: string;

  type?: string;

  agence_name?: string;

  devises?: {
    id: string;
    devise: string;
    solde: string;
  }[];
};

/* -------------------------------------------------------------------------- */
/*                                   MODAL                                    */
/* -------------------------------------------------------------------------- */

export default function TransfertCaisseModal({
  open,
  onClose,
}: Props) {

  const user =
    useAuthStore(
      (state) => state.user
    );

  const { can } =
    usePermission();

  const canCreateGlobal =
    can(
      PERMISSIONS.TRANSFERT_CAISSE_CREATE
    );

  const canCreateAgence =
    can(
      PERMISSIONS.TRANSFERT_CAISSE_CREATE_AGENCE
    );

  /* ------------------------------------------------------------------------ */
  /*                                    FORM                                  */
  /* ------------------------------------------------------------------------ */

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control
  } =
    useForm<CreateTransfertCaisseDto>();

  /* ------------------------------------------------------------------------ */
  /*                                  CAISSES                                 */
  /* ------------------------------------------------------------------------ */

  const {
    data:
      response,
  } =
    useCaisses(
      1,
      100
    );

  const caisses =
    useMemo<Caisse[]>(
      () =>
        response?.data ||
        [],
      [response]
    );

  const caisseAgence =
    caisses.find(
      (c) =>
        c.agence_id ===
        user?.agence_id &&
        c.type ===
          "AGENCE"
    );

  useEffect(() => {

    if (
      canCreateAgence &&
      caisseAgence
    ) {

      setValue(
        "caisse_source_id",
        caisseAgence.id
      );

      if (
        caisseAgence.devises?.length
      ) {

        setValue(
          "devise",
          caisseAgence.devises[0].devise
        );

      }

    }

  }, [
    canCreateAgence,
    caisseAgence,
    setValue,
  ]);

  /* ------------------------------------------------------------------------ */
  /*                                WATCHERS                                  */
  /* ------------------------------------------------------------------------ */

  const sourceId =
    useWatch({
      control,

      name:
        "caisse_source_id",
    });

  const selectedSourceCaisse =
  caisses.find(
    (c) =>
      c.id === sourceId
  );

  /* ------------------------------------------------------------------------ */
  /*                                MUTATION                                  */
  /* ------------------------------------------------------------------------ */

  const {
    mutate,
    isPending,
    appMessage,
    clearMessage,
  } =
    useApiMutationWithFeedback(
      {
        mutationFn:
          createTransfertCaisse,

        successMessage:
          "Transfert initié avec succès",

        invalidateQueries:
          [
            "transferts-caisse",
            "transferts-caisse-process",
          ],

        onSuccess:
          () => {

            reset();

            onClose();
          },
      }
    );

  /* ------------------------------------------------------------------------ */
  /*                                  SUBMIT                                  */
  /* ------------------------------------------------------------------------ */

  const onSubmit = (
    data: CreateTransfertCaisseDto
  ) => {

    const payload =
      {
        ...data,
      };

    mutate(payload);
  };

  /* ------------------------------------------------------------------------ */
  /*                                 HELPERS                                  */
  /* ------------------------------------------------------------------------ */

  const formatCaisse = (
  c: Caisse
) => {

  const devises =
      c.devises
        ?.map(
          (d) => d.devise
        )
        .join(", ") ||
      "Aucune devise";

    return `${c.code_caisse} • ${
      c.type ?? "—"
    } • ${
      devises
    } • ${
      c.agence_name ?? "—"
    }`;
  };

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="4xl"
    >

      <div
        className="
          mx-auto
          max-w-[1200px]
        "
      >

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="
            space-y-8
          "
        >

          {/* -------------------------------------------------------------- */}
          {/* HEADER                                                         */}
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
              "
            >

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

                <ArrowRightLeft
                  size={13}
                />

                Mouvement financier

              </div>

              <h1
                className="
                  mt-5
                  text-[36px]
                  font-semibold
                  tracking-[-0.04em]
                  text-slate-900
                "
              >
                Nouveau transfert caisse
              </h1>

              <p
                className="
                  mt-3
                  max-w-3xl
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                Initiez un transfert
                sécurisé entre les
                différentes caisses
                du réseau financier.
              </p>

            </div>

          </section>

          {/* -------------------------------------------------------------- */}
          {/* MESSAGE                                                        */}
          {/* -------------------------------------------------------------- */}

          {appMessage && (

            <AppMessageState
              variant={
                appMessage.variant
              }
              title={
                appMessage.title
              }
              message={
                appMessage.message
              }
              onAction={
                clearMessage
              }
            />

          )}

          {/* -------------------------------------------------------------- */}
          {/* FORM                                                           */}
          {/* -------------------------------------------------------------- */}

          <section
            className="
              rounded-[32px]
              border
              border-slate-200/80
              bg-white
              p-8
            "
          >

            {/* ---------------------------------------------------------- */}
            {/* SECTION HEADER                                             */}
            {/* ---------------------------------------------------------- */}

            <div
              className="
                mb-8
                flex
                items-start
                gap-4
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-50
                  text-indigo-600
                "
              >

                <Landmark
                  size={20}
                />

              </div>

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                    text-slate-900
                  "
                >
                  Informations du transfert
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Configurez le mouvement
                  financier entre les
                  différentes caisses.
                </p>

              </div>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* GRID                                                       */}
            {/* ---------------------------------------------------------- */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-2
              "
            >

              {/* SOURCE */}

              {canCreateGlobal && (

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Caisse source
                  </label>

                  <select
                    {...register(
                      "caisse_source_id",
                      {
                        required: true,
                      }
                    )}
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                    "
                  >

                    <option value="">
                      Sélectionner une caisse
                    </option>

                    {caisses
                      .filter(
                        (c) =>
                          c.type ===
                          "AGENCE"
                      )
                      .map((c) => (

                        <option
                          key={c.id}
                          value={c.id}
                        >
                          {c.code_caisse}
                          {" | "}
                          {c.agence_name}
                        </option>

                      ))}

                  </select>

                </div>
              )}

              {canCreateAgence &&
                !canCreateGlobal &&
                caisseAgence && (

                  <Input
                    label="Caisse source"
                    value={`${caisseAgence.code_caisse} | ${caisseAgence.agence_name}`}
                    readOnly
                  />

              )}


              {/* DESTINATION */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Caisse destination
                </label>

                <select
                  {...register(
                    "caisse_destination_id",
                    {
                      required: true,
                    }
                  )}
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition-all
                    focus:border-indigo-400
                    focus:ring-4
                    focus:ring-indigo-100
                  "
                >

                  <option value="">
                    Sélectionner une caisse destination
                  </option>

                  {caisses
                    .filter(
                      (c) =>
                        (
                          !sourceId ||
                          c.id !==
                            sourceId
                        ) &&
                        c.type ===
                          "AGENT"
                    )
                    .map(
                      (c) => (

                        <option
                          key={
                            c.id
                          }
                          value={
                            c.id
                          }
                        >
                          {formatCaisse(
                            c
                          )}
                        </option>

                      )
                    )}

                </select>

              </div>

              {/* MONTANT */}

              <div>

                <Input
                  type="number"
                  label="Montant"
                  placeholder="0.00"
                  {...register(
                    "montant",
                    {
                      required: true,

                      min: 1,

                      valueAsNumber:
                        true,
                    }
                  )}
                />

              </div>

              {/* DEVISE */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Devise
                </label>

                <select
                  {...register(
                    "devise",
                    {
                      required: true,
                    }
                  )}
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition-all
                    focus:border-indigo-400
                    focus:ring-4
                    focus:ring-indigo-100
                  "
                >

                  <option value="">
                    Sélectionner une devise
                  </option>

                  {(
                    selectedSourceCaisse?.devises ||
                    caisseAgence?.devises ||
                    []
                  ).map(
                    (d) => (

                      <option
                        key={d.id}
                        value={d.devise}
                      >
                        {d.devise}
                      </option>

                    )
                  )}

                </select>

              </div>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* PREVIEW                                                    */}
            {/* ---------------------------------------------------------- */}

            <div
              className="
                mt-8
                rounded-3xl
                border
                border-indigo-100
                bg-gradient-to-br
                from-indigo-50
                to-white
                p-6
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  xl:flex-row
                  xl:items-center
                  xl:justify-between
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-indigo-500
                    "
                  >
                    Validation opérationnelle
                  </p>

                  <h3
                    className="
                      mt-2
                      text-lg
                      font-semibold
                      text-slate-900
                    "
                  >
                    Vérifiez les informations
                    avant validation.
                  </h3>

                </div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/60
                    bg-white/70
                    px-5
                    py-3
                    backdrop-blur-sm
                  "
                >

                  <Wallet
                    size={18}
                    className="
                      text-indigo-500
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Mouvement sécurisé
                  </span>

                </div>

              </div>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* ACTIONS                                                    */}
            {/* ---------------------------------------------------------- */}

            <div
              className="
                mt-10
                flex
                items-center
                justify-end
                gap-3
                border-t
                border-slate-200
                pt-6
              "
            >

              <Button
                type="button"
                variant="secondary"
                onClick={
                  onClose
                }
                className="
                  h-14
                  rounded-2xl
                  px-6
                "
              >
                Annuler
              </Button>

              <Button
                type="submit"
                loading={
                  isPending
                }
                className="
                  h-14
                  rounded-2xl
                  bg-indigo-600
                  px-6
                  hover:bg-indigo-700
                "
              >

                <Save
                  size={16}
                />

                Valider le transfert

              </Button>

            </div>

          </section>

        </form>

      </div>

    </Modal>
  );
}