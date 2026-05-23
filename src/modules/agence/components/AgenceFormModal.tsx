// src/modules/agence/components/AgenceFormModal.tsx

import {
  Building2,
  Globe2,
  Landmark,
  MapPin,
  Save,
} from "lucide-react";

import {
  useForm,
} from "react-hook-form";

import {
  Button,
  Input,
  Modal,
} from "../../../components/ui";

import AppMessageState from "../../../components/ui/AppMessageState";

import {
  useCreateAgence,
} from "../hooks/useAgences";

import type {
  CreateAgenceDto,
} from "../types";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Props = {
  open: boolean;

  onClose: () => void;
};

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function AgenceFormModal({
  open,
  onClose,
}: Props) {

  /* ------------------------------------------------------------------------ */
  /*                                    FORM                                  */
  /* ------------------------------------------------------------------------ */

  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<CreateAgenceDto>();

  /* ------------------------------------------------------------------------ */
  /*                                  MUTATION                                */
  /* ------------------------------------------------------------------------ */

  const createAgence =
    useCreateAgence();

  const {
    mutate,
    isPending,
    appMessage,
    clearMessage,
  } =
    useApiMutationWithFeedback(
      {
        mutationFn:
          createAgence.mutateAsync,

        successMessage:
          "Agence créée avec succès",

        invalidateQueries:
          ["agences"],

        onSuccess:
          () => {

            reset();

            setTimeout(
              () => {

                onClose();

                clearMessage();

              },
              1500
            );
          },

        errorMessage:
          "Une erreur est survenue lors de la création de l’agence.",
      }
    );

  /* ------------------------------------------------------------------------ */
  /*                                  SUBMIT                                  */
  /* ------------------------------------------------------------------------ */

  const onSubmit = (
    data: CreateAgenceDto
  ) => {

    mutate(data);
  };

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="3xl"
    >

      <div
        className="
          mx-auto
          max-w-[1100px]
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
                h-64
                w-64
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

                <Landmark
                  size={13}
                />

                Réseau financier

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
                Nouvelle agence
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                Créez une nouvelle
                structure opérationnelle
                pour votre réseau
                multi-agences.
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
              fullPage={false}
              onAction={
                clearMessage
              }
            />

          )}

          {/* -------------------------------------------------------------- */}
          {/* FORM SECTION                                                   */}
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

                <Building2
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
                  Informations de l’agence
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Configurez les
                  informations principales
                  de votre nouvelle agence.
                </p>

              </div>

            </div>

            {/* ---------------------------------------------------------- */}
            {/* FIELDS                                                     */}
            {/* ---------------------------------------------------------- */}

            <div
              className="
                flex
                flex-col
                gap-6
              "
            >

              {/* LIBELLE */}

              <div
                className="
                  max-w-[720px]
                "
              >

                <Input
                  label="Libellé agence"
                  placeholder="Agence Kinshasa Centre"
                  {...register(
                    "libelle"
                  )}
                />

              </div>

              {/* VILLE */}

              <div
                className="
                  max-w-[720px]
                "
              >

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Ville
                </label>

                <div
                  className="
                    relative
                  "
                >

                  <Globe2
                    size={16}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    placeholder="Kinshasa"
                    {...register(
                      "ville"
                    )}
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      pl-11
                      pr-4
                      text-sm
                      text-slate-700
                      outline-none
                      transition-all
                      focus:border-indigo-400
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                </div>

              </div>

              {/* COMMUNE */}

              <div
                className="
                  max-w-[720px]
                "
              >

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Commune
                </label>

                <div
                  className="
                    relative
                  "
                >

                  <MapPin
                    size={16}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    placeholder="Gombe"
                    {...register(
                      "commune"
                    )}
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      pl-11
                      pr-4
                      text-sm
                      text-slate-700
                      outline-none
                      transition-all
                      focus:border-indigo-400
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                </div>

              </div>

              {/* QUARTIER */}

              <div
                className="
                  max-w-[720px]
                "
              >

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Quartier
                </label>

                <div
                  className="
                    relative
                  "
                >

                  <MapPin
                    size={16}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    placeholder="Référence quartier"
                    {...register(
                      "quartier"
                    )}
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      pl-11
                      pr-4
                      text-sm
                      text-slate-700
                      outline-none
                      transition-all
                      focus:border-indigo-400
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

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
                variant="secondary"
                onClick={onClose}
                type="button"
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

                Enregistrer l’agence

              </Button>

            </div>

          </section>

        </form>

      </div>

    </Modal>
  );
}