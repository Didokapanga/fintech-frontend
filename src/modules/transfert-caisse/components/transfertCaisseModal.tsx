// src/modules/transfert-caisse/components/TransfertCaisseModal.tsx

import { useForm, useWatch } from "react-hook-form";
import { useCreateTransfertCaisse } from "../hooks/useTransfertCaisse";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import { Button, Input, Modal } from "../../../components/ui";
import type { CreateTransfertCaisseDto } from "../services/transfertCaisse.service";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TransfertCaisseModal({ open, onClose }: Props) {
  const { register, handleSubmit, reset, control } =
    useForm<CreateTransfertCaisseDto>();

  const { mutate, isPending } = useCreateTransfertCaisse();
  const { data: caisses = [], isLoading } = useCaisses();

  // ✅ FIX ESLint + React Compiler
  const sourceId = useWatch({
    control,
    name: "caisse_source_id",
  });

  const onSubmit = (data: CreateTransfertCaisseDto) => {
    // console.log("🔥 DATA ENVOYÉE:", data);
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
        Transfert de caisse
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        {/* CAISSE SOURCE */}
        <select
          {...register("caisse_source_id", { required: true })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">
            {isLoading ? "Chargement..." : "Caisse source"}
          </option>

          {caisses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code_caisse} ({c.solde} {c.devise})
            </option>
          ))}
        </select>

        {/* CAISSE DESTINATION */}
        <select
          {...register("caisse_destination_id", { required: true })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Caisse destination</option>

          {caisses
            .filter((c) => !sourceId || c.id !== sourceId) // ✅ sécurité
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.code_caisse} ({c.devise})
              </option>
            ))}
        </select>

        {/* MONTANT */}
      <Input
        type="number"
        label="Montant"
        placeholder="ex: 100"
        {...register("montant", {
            required: true,
            min: 1,
            valueAsNumber: true, // 🔥 FIX ICI
        })}
        />

        {/* DEVISE */}
        <select
          {...register("devise", { required: true })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Devise</option>
          <option value="CDF">CDF</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>

          <Button type="submit" loading={isPending}>
            Transférer
          </Button>
        </div>
      </form>
    </Modal>
  );
}