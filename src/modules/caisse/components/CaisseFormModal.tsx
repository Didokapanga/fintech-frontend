// src/modules/caisse/components/CaisseFormModal.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCaisse } from "../hooks/useCaisses";
import { useAgences } from "../../agence/hooks/useAgences";
import { useUsers } from "../../auth/hooks/useAuth";
import { Button, Modal } from "../../../components/ui";
import AppMessageState from "../../../components/ui/AppMessageState";
import type { CreateCaisseDto } from "../services/caisse.service";

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

type MessageState = {
  variant:
    | "error"
    | "success"
    | "info"
    | "warning";
  title: string;
  message: string;
};

type ErrorWithResponse = Error & {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function CaisseFormModal({
  open,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CreateCaisseDto>({
    defaultValues: {
      agence_id: "",
      agent_id: "",
      type: "",
      devise: "",
    },
  });

  const {
    mutate,
    isPending,
  } = useCreateCaisse();

  const {
    data: agences = [],
    isLoading: loadingAgences,
  } = useAgences() as {
    data: Agence[];
    isLoading: boolean;
  };

  const {
    data: users = [],
    isLoading: loadingUsers,
  } = useUsers() as {
    data: User[];
    isLoading: boolean;
  };

  const [
    appMessage,
    setAppMessage,
  ] = useState<MessageState | null>(
    null
  );

  const onSubmit = (
    data: CreateCaisseDto
  ) => {
    /**
     * =========================
     * RÈGLES MÉTIER FRONTEND
     * =========================
     *
     * 1. type = AGENT
     *    → agent_id obligatoire
     *
     * 2. type = AGENCE
     *    → agent_id interdit
     */

    if (
      data.type === "AGENT" &&
      !data.agent_id
    ) {
      setError("agent_id", {
        type: "manual",
        message:
          "Un agent est obligatoire pour une caisse AGENT",
      });
      return;
    }

    if (
      data.type === "AGENCE" &&
      data.agent_id
    ) {
      setError("agent_id", {
        type: "manual",
        message:
          "Une caisse AGENCE ne doit pas avoir d’agent",
      });
      return;
    }

    clearErrors("agent_id");

    /**
     * 🔥 payload propre
     */

    const payload = {
      agence_id: data.agence_id,
      type: data.type,
      devise: data.devise,

      ...(data.type === "AGENT" &&
      data.agent_id
        ? {
            agent_id:
              data.agent_id,
          }
        : {}),
    };

    console.log(
      "🔥 PAYLOAD:",
      payload
    );

    mutate(payload as CreateCaisseDto, {
      onSuccess: () => {
        setAppMessage({
          variant: "success",
          title: "Succès",
          message:
            "Caisse créée avec succès",
        });

        reset();
        onClose();
      },

      onError: (
        error: Error
      ) => {
        const apiError =
          error as ErrorWithResponse;

        setAppMessage({
          variant: "error",
          title:
            "Création refusée",
          message:
            apiError
              ?.response
              ?.data
              ?.message ||
            "Impossible de créer cette caisse",
        });
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <h2 className="text-lg font-semibold mb-4">
        Créer une caisse
      </h2>

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
          buttonText="Fermer"
          onAction={() =>
            setAppMessage(
              null
            )
          }
        />
      )}

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-3"
      >
        {/* =========================
            AGENCE
        ========================= */}
        <select
          {...register(
            "agence_id",
            {
              required:
                "Agence obligatoire",
            }
          )}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">
            {loadingAgences
              ? "Chargement..."
              : "Choisir une agence"}
          </option>

          {agences.map(
            (a: Agence) => (
              <option
                key={a.id}
                value={a.id}
              >
                {a.libelle}
              </option>
            )
          )}
        </select>

        {errors.agence_id && (
          <p className="text-sm text-red-500">
            {
              errors.agence_id
                .message
            }
          </p>
        )}

        {/* =========================
            TYPE
        ========================= */}
        <div>
          <label className="block text-sm font-medium mb-1">
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
            className="w-full border rounded-lg px-3 py-2"
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
        </div>

        {errors.type && (
          <p className="text-sm text-red-500">
            {errors.type.message}
          </p>
        )}

        {/* =========================
            USER / AGENT
        ========================= */}
        <select
          {...register(
            "agent_id"
          )}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">
            {loadingUsers
              ? "Chargement..."
              : "Choisir un agent"
            }
          </option>

          {users.map(
            (u: User) => (
              <option
                key={u.id}
                value={u.id}
              >
                {u.user_name}
              </option>
            )
          )}
        </select>

        {errors.agent_id && (
          <p className="text-sm text-red-500">
            {
              errors.agent_id
                .message
            }
          </p>
        )}

        {/* =========================
            DEVISE
        ========================= */}
        <select
          {...register(
            "devise",
            {
              required:
                "Devise obligatoire",
            }
          )}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">
            Choisir une devise
          </option>

          <option value="CDF">
            CDF
          </option>

          <option value="USD">
            USD
          </option>

          <option value="EUR">
            EUR
          </option>
        </select>

        {errors.devise && (
          <p className="text-sm text-red-500">
            {
              errors.devise
                .message
            }
          </p>
        )}

        {/* =========================
            ACTIONS
        ========================= */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Annuler
          </Button>

          <Button
            type="submit"
            loading={isPending}
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
}