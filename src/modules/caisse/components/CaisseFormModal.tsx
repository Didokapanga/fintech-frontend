import { useForm } from "react-hook-form";
import { useCreateCaisse } from "../hooks/useCaisses";
import { useAgences } from "../../agence/hooks/useAgences";
import { useUsers } from "../../auth/hooks/useAuth";
import { Button, Input, Modal } from "../../../components/ui";
import type { CreateCaisseDto } from "../services/caisse.service";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CaisseFormModal({ open, onClose }: Props) {
  const { register, handleSubmit, reset } =
    useForm<CreateCaisseDto>();

  const { mutate, isPending } = useCreateCaisse();

  const { data: agences = [], isLoading: loadingAgences } = useAgences();
  const { data: users = [], isLoading: loadingUsers } = useUsers();

  const onSubmit = (data: CreateCaisseDto) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">
        Créer une caisse
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        {/* AGENCE */}
        <select
          {...register("agence_id", { required: true })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">
            {loadingAgences ? "Chargement..." : "Choisir une agence"}
          </option>

          {agences.map((a) => (
            <option key={a.id} value={a.id}>
              {a.libelle}
            </option>
          ))}
        </select>

        {/* USER */}
        <select
          {...register("agent_id")}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">
            {loadingUsers ? "Chargement..." : "Choisir un agent"}
          </option>

          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.user_name}
            </option>
          ))}
        </select>

        {/* TYPE */}
        <div>
        <label className="block text-sm font-medium mb-1">
            Type de caisse
        </label>

        <select
            {...register("type", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
        >
            <option value="">Choisir un type</option>
            <option value="AGENCE">AGENCE</option>
            <option value="AGENT">AGENT</option>
        </select>
        </div>

        {/* DEVISE */}
        <select
          {...register("devise", { required: true })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Choisir une devise</option>
          <option value="CDF">CDF</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        {/* CODE */}
        <Input
          label="Code caisse"
          placeholder="ex: CSH001"
          {...register("code_caisse", { required: true })}
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