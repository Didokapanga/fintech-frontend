// src/modules/agence/components/AgenceFormModal.tsx

import { useForm } from "react-hook-form";
import { Modal, Button, Input } from "../../../components/ui";
import AppMessageState from "../../../components/ui/AppMessageState";
import { useCreateAgence } from "../hooks/useAgences";
import type { CreateAgenceDto } from "../types";
import { useApiMutationWithFeedback } from "../../../hooks/useApiMutationWithFeedback";

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

  const createAgence = useCreateAgence();

  // ✅ 🔥 HOOK CENTRALISÉ
  const {
    mutate,
    isPending,
    appMessage,
    clearMessage,
  } = useApiMutationWithFeedback({
    mutationFn: createAgence.mutateAsync,

    successMessage:
      "Agence créée avec succès",

    invalidateQueries: ["agences"],

    onSuccess: () => {
      reset();

      // 🔥 on garde ton comportement UX
      setTimeout(() => {
        onClose();
        clearMessage();
      }, 1500);
    },

    errorMessage:
      "Une erreur est survenue lors de la création de l’agence.",
  });

  const onSubmit = (
    data: CreateAgenceDto
  ) => {
    mutate(data);
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
        {/* ✅ MESSAGE CENTRALISÉ */}
        {appMessage && (
          <AppMessageState
            variant={appMessage.variant}
            title={appMessage.title}
            message={appMessage.message}
            fullPage={false}
            onAction={clearMessage}
          />
        )}

        {/* FORM */}
        <Input
          label="Libellé"
          {...register("libelle")}
        />

        <Input
          label="Ville"
          {...register("ville")}
        />

        <Input
          label="Commune"
          {...register("commune")}
        />

        <Input
          label="Quartier"
          {...register("quartier")}
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