// src/modules/caisse/components/CaisseFormModal.tsx

import {
  Building2,
  CircleDollarSign,
  Shield,
  User2,
  Wallet,
} from "lucide-react";

import {
  useMemo,
} from "react";

import {
  useForm,
  useWatch,
} from "react-hook-form";

import {
  useCreateCaisse,
} from "../hooks/useCaisses";

import {
  useAgences,
} from "../../agence/hooks/useAgences";

import {
  useUsers,
} from "../../auth/hooks/useAuth";

import {
  Button,
  Modal,
} from "../../../components/ui";

import AppMessageState from "../../../components/ui/AppMessageState";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import type {
  CreateCaisseDto,
} from "../services/caisse.service";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Props = {
  open: boolean;
  onClose: () => void;
};

type User = {
  id: string;
  user_name: string;
};

type Agence = {
  id: string;
  libelle: string;
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function CaisseFormModal({
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
    setError,
    clearErrors,
    control,

    formState: {
      errors,
    },
  } = useForm<CreateCaisseDto>({
    defaultValues: {
      agence_id: "",
      agent_id: "",
      type: undefined,

      support: "ESPECE",
      prestataire: "",
      devise_principale: "USD",
    },
  });

  const selectedType =
    useWatch({
      control,
      name: "type",
    });

  const selectedSupport = useWatch({
    control,
    name: "support",
  });

  /* ------------------------------------------------------------------------ */
  /*                                   QUERIES                                */
  /* ------------------------------------------------------------------------ */

  const {
    data: agences = [],
    isLoading:
      loadingAgences,
  } = useAgences() as {
    data: Agence[];
    isLoading: boolean;
  };

  const {
    data: users = [],
    isLoading:
      loadingUsers,
  } = useUsers() as {
    data: User[];
    isLoading: boolean;
  };

  /* ------------------------------------------------------------------------ */
  /*                                  MUTATION                                */
  /* ------------------------------------------------------------------------ */

  const createCaisse =
    useCreateCaisse();

  const {
    mutate,
    isPending,
    appMessage,
    clearMessage,
  } =
    useApiMutationWithFeedback({
      mutationFn:
        createCaisse.mutateAsync,

      successMessage:
        "Caisse créée avec succès",

      invalidateQueries: [
        "caisses",
      ],

      onSuccess: () => {

        reset();

        setTimeout(
          () => {

            onClose();

            clearMessage();

          },
          1200
        );
      },

      errorMessage:
        "Impossible de créer cette caisse.",
    });

  /* ------------------------------------------------------------------------ */
  /*                                   HELPERS                                */
  /* ------------------------------------------------------------------------ */

  const filteredUsers =
    useMemo(
      () => users || [],
      [users]
    );

  /* ------------------------------------------------------------------------ */
  /*                                  SUBMIT                                  */
  /* ------------------------------------------------------------------------ */

  const onSubmit = (
    data: CreateCaisseDto
  ) => {

    /**
     * ------------------------------------------------
     * RULES
     * ------------------------------------------------
     */

    if (
      data.type ===
        "AGENT" &&
      !data.agent_id
    ) {

      setError(
        "agent_id",
        {
          type:
            "manual",

          message:
            "Un agent est obligatoire pour une caisse AGENT",
        }
      );

      return;
    }

    if (
      data.type ===
        "AGENCE" &&
      data.agent_id
    ) {

      setError(
        "agent_id",
        {
          type:
            "manual",

          message:
            "Une caisse AGENCE ne doit pas contenir d’agent",
        }
      );

      return;
    }

    clearErrors(
      "agent_id"
    );

    /**
     * ------------------------------------------------
     * PAYLOAD
     * ------------------------------------------------
     */

    const payload = {
      agence_id: data.agence_id,

      type: data.type,

      support: data.support,

      prestataire:
        data.support === "ESPECE"
          ? null
          : data.prestataire,

      devise_principale:
        data.devise_principale,

      ...(data.type === "AGENT" &&
        data.agent_id
          ? {
              agent_id: data.agent_id,
            }
          : {}),
    };

    mutate(
      payload as CreateCaisseDto
    );
  };

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (

    <Modal
      open={open}
      onClose={onClose}
      title="Créer une caisse"
    >

      <div
        className="
          space-y-6
        "
      >

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
          className="
            space-y-5
          "
        >

          {/* -------------------------------------------------------------- */}
          {/* AGENCE                                                        */}
          {/* -------------------------------------------------------------- */}

          <div>

            <label
              className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-700
              "
            >

              <Building2
                size={16}
              />

              Agence

            </label>

            <select
              {...register(
                "agence_id",
                {
                  required:
                    "Agence obligatoire",
                }
              )}
              className="input"
            >

              <option value="">
                {loadingAgences
                  ? "Chargement..."
                  : "Choisir une agence"}
              </option>

              {agences.map(
                (
                  agence
                ) => (

                  <option
                    key={
                      agence.id
                    }
                    value={
                      agence.id
                    }
                  >
                    {
                      agence.libelle
                    }
                  </option>

                )
              )}

            </select>

            {errors.agence_id && (

              <p
                className="
                  mt-1
                  text-xs
                  text-red-500
                "
              >
                {
                  errors
                    .agence_id
                    .message
                }
              </p>

            )}

          </div>

          {/* -------------------------------------------------------------- */}
          {/* TYPE                                                           */}
          {/* -------------------------------------------------------------- */}

          <div>

            <label
              className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-700
              "
            >

              <Shield
                size={16}
              />

              Type de caisse

            </label>

            <select
              {...register(
                "type",
                {
                  required:
                    "Type obligatoire",
                }
              )}
              className="input"
            >

              <option value="">
                Choisir un type
              </option>

              <option value="AGENCE">
                AGENCE
              </option>

              <option value="AGENT">
                AGENT
              </option>

            </select>

            {errors.type && (

              <p
                className="
                  mt-1
                  text-xs
                  text-red-500
                "
              >
                {
                  errors
                    .type
                    .message
                }
              </p>

            )}

          </div>

          {/* -------------------------------------------------------------- */}
          {/* AGENT                                                          */}
          {/* -------------------------------------------------------------- */}

          <div>

            <label
              className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-700
              "
            >

              <User2
                size={16}
              />

              Agent associé

            </label>

            <select
              {...register(
                "agent_id"
              )}
              disabled={
                selectedType !==
                "AGENT"
              }
              className={`
                input
                ${
                  selectedType !==
                  "AGENT"
                    ? "cursor-not-allowed bg-slate-100"
                    : ""
                }
              `}
            >

              <option value="">
                {loadingUsers
                  ? "Chargement..."
                  : "Choisir un agent"}
              </option>

              {filteredUsers.map(
                (
                  user
                ) => (

                  <option
                    key={
                      user.id
                    }
                    value={
                      user.id
                    }
                  >
                    {
                      user.user_name
                    }
                  </option>

                )
              )}

            </select>

            {errors.agent_id && (

              <p
                className="
                  mt-1
                  text-xs
                  text-red-500
                "
              >
                {
                  errors
                    .agent_id
                    .message
                }
              </p>

            )}

          </div>

          {/* -------------------------------------------------------------- */}
          {/* DEVISE                                                         */}
          {/* -------------------------------------------------------------- */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Wallet size={16} />
                Canal d'opération
            </label>

            <select
              {...register("support")}
              className="input"
            >

              <option value="ESPECE">Espèce</option>
              <option value="MOBILE_MONEY">Mobile Money</option>
              <option value="BANQUE">Banque</option>
              <option value="IMF">IMF</option>
              <option value="SMF">SMF</option>
              <option value="AUTRE">Autre</option>

            </select>

          </div>

          {/******************************************************************/}
          {/* PRESTATAIRE                                                    */}
          {/******************************************************************/}

          {selectedSupport !== "ESPECE" && (

            <div>

              <label className="mb-2 text-sm font-medium text-slate-700">
                Opérateur
              </label>

              <input
                className="input"
                placeholder="Ex : MPESA"

                {...register("prestataire", {
                  pattern: {
                    value: /^[A-Z0-9_]+$/,
                    message:
                      "Utilisez uniquement des lettres, chiffres et '_'"
                  },

                  onChange: (e) => {
                    e.target.value = e.target.value
                      .toUpperCase()
                      .replace(/\s+/g, "_")
                      .replace(/[^A-Z0-9_]/g, "");
                  }
                })}
              />

              {errors.prestataire && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.prestataire.message}
                </p>
              )}

            </div>

            )}

          {/******************************************************************/}
          {/* DEVISE PRINCIPALE                                              */}
          {/******************************************************************/}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">

              <CircleDollarSign size={16} />

              Devise principale

            </label>

            <select
              {...register("devise_principale")}
              className="input"
            >

              <option value="USD">USD</option>

              <option value="CDF">CDF</option>

              <option value="EUR">EUR</option>

            </select>

          </div>

          {/* -------------------------------------------------------------- */}
          {/* ACTIONS                                                        */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              flex
              justify-end
              gap-3
              border-t
              border-slate-100
              pt-5
            "
          >

            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Annuler
            </Button>

            <Button
              type="submit"
              loading={
                isPending
              }
            >

              <Wallet
                size={16}
              />

              Enregistrer

            </Button>

          </div>

        </form>

      </div>

    </Modal>

  );
}