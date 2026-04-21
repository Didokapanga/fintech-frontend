import { useForm } from "react-hook-form";
import { useCreateClient } from "../hooks/useClients";
import type { CreateClientDto } from "../types";
import { Button, Input, Modal } from "../../../components/ui";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ClientFormModal({ open, onClose }: Props) {
  const { register, handleSubmit, reset } = useForm<CreateClientDto>();
  const { mutate, isPending } = useCreateClient();

  const onSubmit = (data: CreateClientDto) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Créer un client</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input label="Nom" {...register("name")} />
        <Input label="Post-nom" {...register("first_name")} />
        <Input label="Prénom" {...register("second_name")} />
        <Input label="Téléphone" {...register("phone")} />
        <Input label="Adresse" {...register("address")} />
        <Input label="Commune" {...register("commune")} />
        <Input label="Quartier" {...register("quartier")} />
        <Input label="Ville" {...register("ville")} />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
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