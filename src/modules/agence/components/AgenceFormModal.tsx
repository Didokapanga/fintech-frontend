import { useForm } from "react-hook-form";
import { Modal, Button, Input } from "../../../components/ui";
import { useCreateAgence } from "../hooks/useAgences";
import type { CreateAgenceDto } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AgenceFormModal({ open, onClose }: Props) {
  const { register, handleSubmit, reset } = useForm<CreateAgenceDto>();
  const { mutate, isPending } = useCreateAgence();

  const onSubmit = (data: CreateAgenceDto) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Créer une agence">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input label="Libellé" {...register("libelle")} />
        <Input label="Code agence" {...register("code_agence")} />
        <Input label="Ville" {...register("ville")} />
        <Input label="Commune" {...register("commune")} />
        <Input label="Quartier" {...register("quartier")} />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>

          <Button type="submit" loading={isPending}>
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
}