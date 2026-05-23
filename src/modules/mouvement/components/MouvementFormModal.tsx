// src/modules/mouvement/components/MouvementFormModal.tsx

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
  useCreateMouvement,
} from "../hooks/useMouvement";

import {
  useCaisses,
} from "../../caisse/hooks/useCaisses";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import type {
  CreateMouvementDto,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Props = {
  open: boolean;
  onClose: () => void;
};

type CaisseItem = {
  id: string;
  type?: string;
  devise: string;
  code_caisse: string;
};

/* -------------------------------------------------------------------------- */
/*                                CONSTANTES                                  */
/* -------------------------------------------------------------------------- */

const CURRENCIES = [
  "CDF",
  "USD",
  "EUR",
];

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function MouvementFormModal({
  open,
  onClose,
}: Props) {

  /* ---------------------------------------------------------------------- */
  /* FORM                                                                   */
  /* ---------------------------------------------------------------------- */

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: {
      errors,
    },
  } = useForm<CreateMouvementDto>({
    defaultValues: {
      devise: "",
      caisse_id: "",
      type_mouvement:
        "APPROVISIONNEMENT",
    },
  });

  /* ---------------------------------------------------------------------- */
  /* MUTATION                                                               */
  /* ---------------------------------------------------------------------- */

  const createMutation =
    useCreateMouvement();

  const {
    mutate,
    isPending,
    appMessage,
    clearMessage,
  } = useApiMutationWithFeedback({

    mutationFn:
      createMutation.mutateAsync,

    successMessage:
      "Mouvement enregistré avec succès",

    invalidateQueries: [
      "mouvements",
      "caisses",
    ],

    onSuccess: () => {

      reset();

      setTimeout(() => {

        clearMessage();

        onClose();

      }, 1200);
    },

    errorMessage:
      "Impossible d’effectuer ce mouvement.",
  });

  /* ---------------------------------------------------------------------- */
  /* CAISSES                                                                */
  /* ---------------------------------------------------------------------- */

  const {
    data: response,
  } = useCaisses(
    1,
    100
  );

  const caisses: CaisseItem[] =
    useMemo(
      () =>
        response?.data || [],
      [response]
    );

  /* ---------------------------------------------------------------------- */
  /* FILTER                                                                 */
  /* ---------------------------------------------------------------------- */

  const agenceCaisses =
    useMemo(() => {

      return caisses.filter(
        (
          c: CaisseItem
        ) =>
          c.type ===
          "AGENCE"
      );

    }, [caisses]);

  /* ---------------------------------------------------------------------- */
  /* WATCH                                                                  */
  /* ---------------------------------------------------------------------- */

  const selectedCaisseId =
    useWatch({
      control,
      name: "caisse_id",
    });

  const selectedCaisse =
    agenceCaisses.find(
      (
        c: CaisseItem
      ) =>
        c.id ===
        selectedCaisseId
    );

  /* ---------------------------------------------------------------------- */
  /* AUTO DEVISE                                                            */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {

    if (
      selectedCaisse
    ) {

      setValue(
        "devise",
        selectedCaisse.devise
      );
    }

  }, [
    selectedCaisse,
    setValue,
  ]);

  /* ---------------------------------------------------------------------- */
  /* SUBMIT                                                                 */
  /* ---------------------------------------------------------------------- */

  const onSubmit = (
    data: CreateMouvementDto
  ) => {

    mutate(data);
  };

  /* ---------------------------------------------------------------------- */
  /* RENDER                                                                 */
  /* ---------------------------------------------------------------------- */

  return (

    <Modal
      open={open}
      onClose={onClose}
      title="Mouvement de caisse"
    >

      <div className="space-y-5">

        {/* MESSAGE */}

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

        {/* FORM */}

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >

          {/* CAISSE */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Caisse
            </label>

            <select
              {...register(
                "caisse_id",
                {
                  required:
                    "La caisse est obligatoire",
                }
              )}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                py-3
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
              "
            >

              <option value="">
                Sélectionner une caisse
              </option>

              {agenceCaisses.map(
                (
                  c: CaisseItem
                ) => (

                  <option
                    key={c.id}
                    value={c.id}
                  >
                    {
                      c.code_caisse
                    }{" "}
                    (
                    {c.devise}
                    )
                  </option>
                )
              )}

            </select>

            {errors.caisse_id && (

              <p className="mt-1 text-xs text-red-500">

                {
                  errors
                    .caisse_id
                    .message
                }

              </p>
            )}

          </div>

          {/* TYPE */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Type de mouvement
            </label>

            <select
              {...register(
                "type_mouvement",
                {
                  required:
                    true,
                }
              )}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                py-3
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
              "
            >

              <option value="APPROVISIONNEMENT">
                ➕ Approvisionnement
              </option>

              <option value="RETRAIT_SORTIE">
                ➖ Retrait (sortie)
              </option>

              <option value="TRANSFERT_SORTIE">
                🔁 Transfert vers une autre caisse
              </option>

            </select>

          </div>

          {/* MONTANT */}

          <Input
            type="number"
            label="Montant"
            placeholder="0"
            error={
              errors
                .montant
                ?.message
            }
            {...register(
              "montant",
              {
                required:
                  "Le montant est obligatoire",

                valueAsNumber:
                  true,

                min: {
                  value: 1,
                  message:
                    "Montant invalide",
                },
              }
            )}
          />

          {/* DEVISE */}

          <div>

            <label
              className="
                mb-1.5
                block
                text-sm
                font-medium
                text-slate-700
              "
            >
              Devise
            </label>

            <select
              {...register(
                "devise",
                {
                  required:
                    "La devise est obligatoire",
                }
              )}
              disabled={
                !!selectedCaisse
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                py-3
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
              "
            >

              <option value="">
                Choisir une devise
              </option>

              {CURRENCIES.map(
                (
                  currency
                ) => (

                  <option
                    key={
                      currency
                    }
                    value={
                      currency
                    }
                  >
                    {currency}
                  </option>
                )
              )}

            </select>

            {errors.devise && (

              <p className="mt-1 text-xs text-red-500">

                {
                  errors
                    .devise
                    .message
                }

              </p>
            )}

          </div>

          {/* ACTIONS */}

          <div
            className="
              flex
              justify-end
              gap-3
              pt-4
            "
          >

            <Button
              type="button"
              variant="secondary"
              onClick={
                onClose
              }
            >
              Annuler
            </Button>

            <Button
              type="submit"
              loading={
                isPending
              }
            >
              Valider
            </Button>

          </div>

        </form>

      </div>

    </Modal>
  );
}