// src/modules/agence/components/AgenceFormModal.tsx

import { useForm } from "react-hook-form";
import { Modal, Button, Input } from "../../../components/ui";
import AppMessageState from "../../../components/ui/AppMessageState";
import { useCreateAgence } from "../hooks/useAgences";
import type { CreateAgenceDto } from "../types";
import { useState } from "react";
import type { AxiosError } from "axios";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AgenceFormModal({
  open,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CreateAgenceDto>();

  const {
    mutate,
    isPending,
  } = useCreateAgence();

  const [feedback, setFeedback] =
    useState<{
      type:
        | "success"
        | "error"
        | null;
      title: string;
      message: string;
    }>({
      type: null,
      title: "",
      message: "",
    });

  const onSubmit = (
    data: CreateAgenceDto
  ) => {
    setFeedback({
      type: null,
      title: "",
      message: "",
    });

    mutate(data, {
      onSuccess: () => {
        setFeedback({
          type: "success",
          title:
            "Agence créée avec succès",
          message:
            "La nouvelle agence a été enregistrée correctement.",
        });

        reset();

        setTimeout(() => {
          onClose();
          setFeedback({
            type: null,
            title: "",
            message: "",
          });
        }, 1500);
      },

      onError: (
        error: unknown
      ) => {
        const err =
          error as AxiosError<{
            message?: string;
          }>;

        setFeedback({
          type: "error",
          title:
            "Création impossible",
          message:
            err.response?.data
              ?.message ||
            "Une erreur est survenue lors de la création de l’agence.",
        });
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Créer une agence"
    >
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-4"
      >
        {/* MESSAGE STATE */}
        {feedback.type && (
          <AppMessageState
            variant={feedback.type}
            title={feedback.title}
            message={
              feedback.message
            }
            fullPage={false}
          />
        )}

        {/* FORM */}
        <Input
          label="Libellé"
          {...register(
            "libelle"
          )}
        />
{/* 
        <Input
          label="Code agence"
          {...register(
            "code_agence"
          )}
        /> */}

        <Input
          label="Ville"
          {...register("ville")}
        />

        <Input
          label="Commune"
          {...register(
            "commune"
          )}
        />

        <Input
          label="Quartier"
          {...register(
            "quartier"
          )}
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
            type="button"
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