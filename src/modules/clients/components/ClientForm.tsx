import { useForm } from "react-hook-form";
import { useCreateClient } from "../hooks/useClients";
import type { CreateClientDto } from "../types";
import { Button, Input, Modal } from "../../../components/ui";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ClientFormModal({ open, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } =
  useForm<CreateClientDto>({
    defaultValues: {
      nationalite: "RDC",
    },
  });
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
        <Input
          label="Nom"
          {...register("nom")}
        />

        <Input
          label="Post-nom"
          {...register("postnom")}
        />

        <Input
          label="Prénom"
          {...register("prenom")}
        />

        <Input
          label="Téléphone"
          {...register("telephone")}
        />

        <Input
          label="Adresse"
          {...register("adresse")}
        />

        <Input
          label="Commune"
          {...register("commune")}
        />

        <Input
          label="Quartier"
          {...register("quartier")}
        />

        <Input
          label="Ville"
          {...register("ville")}
        />

        <Input
          label="Profession"
          {...register("profession")}
        />

        <Input
          label="Nationalité"
          {...register("nationalite")}
        />

        <Input
          label="Type de pièce"
          {...register("type_piece")}
        />

        <Input
          label="Numéro pièce"
          {...register("numero_piece")}
        />

        <Input
          type="date"
          label="Expiration pièce"
          {...register(
            "date_expiration_piece"
          )}
        />

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