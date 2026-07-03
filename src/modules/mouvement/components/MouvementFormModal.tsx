// src/modules/mouvement/components/MouvementFormModal.tsx

import {
  useEffect,
  useMemo,
} from "react";

import { usePermission }
from "../../../hooks/usePermission";

import { PERMISSIONS }
from "../../../constants/permissions";

import { useAuthStore }
from "../../../app/store";

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
import type { Caisse } from "../../caisse/types";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Props = {
  open: boolean;
  onClose: () => void;
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function MouvementFormModal({
  open,
  onClose,
}: Props) {


  const { can } =
    usePermission();

  const user =
    useAuthStore(
      (state) => state.user
    );

  const canCreateGlobal =
    can(
      PERMISSIONS.MOUVEMENT_CREATE
    );

  const canCreateAgence =
    can(
      PERMISSIONS.MOUVEMENT_CREATE_AGENCE
    );

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
      caisse_id: "",

      devise: "",

      type_mouvement: "APPROVISIONNEMENT",

      source_type: "BANQUE",

      motif: "",
    },
  });

  const typeMouvement =
    useWatch({
      control,
      name:
        "type_mouvement",
    });
  
  const selectedCaisseId =
    useWatch({
      control,
      name: "caisse_id",
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

      reset({
      caisse_id: "",

      devise: "",

      type_mouvement: "APPROVISIONNEMENT",

      source_type: "BANQUE",

      motif: "",
    });

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

  const caisses: Caisse[] =
    useMemo(
      () => response?.data || [],
      [response]
    );

  /* ---------------------------------------------------------------------- */
  /* WATCH                                                                  */
  /* ---------------------------------------------------------------------- */

  const caisseAgence =
    caisses.find(
      (c) =>
        c.agence_id ===
        user?.agence_id &&
        c.type === "AGENCE"
    );

  const caissesAgence =
    caisses.filter(
      (c) =>
        c.type === "AGENCE"
    );

  const selectedCaisse =
    caissesAgence.find(
      (c) =>
        c.id ===
        selectedCaisseId
    );
  /* ---------------------------------------------------------------------- */
  /* AUTO DEVISE                                                            */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {

    if (
      canCreateAgence &&
      caisseAgence
    ) {

      setValue(
        "caisse_id",
        caisseAgence.id
      );

    }

    if (
      canCreateAgence &&
      caisseAgence &&
      caisseAgence.devises?.length
    ) {

      setValue(
        "devise",
        caisseAgence.devises[0].devise
      );

    }

  }, [
    canCreateAgence,
    caisseAgence,
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

        <input
          type="hidden"
          {...register(
            "caisse_id"
          )}
        />

        {/* FORM */}

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >

         {/* CAISSE */}

          {canCreateGlobal && (

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
                  px-3
                  py-3
                "
              >

                <option value="">
                  Sélectionner une caisse
                </option>

                {caissesAgence.map(
                  (c) => (

                    <option
                      key={c.id}
                      value={c.id}
                    >
                      {c.code_caisse}
                      {" | "}
                      {c.agence_name}
                    </option>

                  )
                )}

              </select>

            </div>

          )}

          {canCreateAgence &&
            !canCreateGlobal &&
            caisseAgence && (

              <Input
                label="Caisse"
                value={`${caisseAgence.code_caisse} | ${caisseAgence.agence_name}`}
                readOnly
              />

            )}

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

              <option value="REVERSEMENT">
                ➖ Reversement
              </option>

              <option value="MOBILE_MONEY_ENTREE">
                📲 Mobile Money Entrée
              </option>

              <option value="MOBILE_MONEY_SORTIE">
                📲 Mobile Money Sortie
              </option>

              <option value="AJUSTEMENT">
                ⚖️ Ajustement
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

          {/* SENS AJUSTEMENT */}

          {typeMouvement === "AJUSTEMENT" && (

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
                Sens ajustement
              </label>

              <select
                {...register(
                  "ajustement_sens",
                  {
                    required:
                      "Le sens est obligatoire",
                  }
                )}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-3
                  py-3
                "
              >

                <option value="ENTREE">
                  Entrée
                </option>

                <option value="SORTIE">
                  Sortie
                </option>

              </select>

            </div>

          )}

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
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-3
                py-3
              "
            >

              <option value="">
                Sélectionner une devise
              </option>

              {selectedCaisse?.devises?.map(
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

          {/* SOURCE */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Source
            </label>

            <select
              {...register("source_type", {
                required: "La source est obligatoire",
              })}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-3
                py-3
              "
            >
              <option value="BANQUE">
                Banque
              </option>

              <option value="SIEGE">
                Siège
              </option>

              <option value="AGENCE">
                Agence
              </option>

              <option value="MOBILE_MONEY">
                Mobile Money
              </option>

              <option value="AUTRE">
                Autre
              </option>
            </select>
          </div>

          {/*REFERENCE */}

          <Input
            label="Référence source"
            placeholder="VRT-2026-001"
            {...register(
              "source_reference"
            )}
          />

          {/*MOTIF */}

          <Input
            label="Motif"
            placeholder="Motif du mouvement"
            error={
              errors.motif?.message
            }
            {...register("motif", {
              required:
                "Le motif est obligatoire",
            })}
          />

          {/*NUMERO DE PIECE */}
          <Input
            label="Numéro de pièce"
            placeholder="REC-00045"
            {...register(
              "numero_piece"
            )}
          />
          
          {/*URL */}

          <Input
            label="Document URL"
            placeholder="https://..."
            {...register(
              "document_url"
            )}
          />

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