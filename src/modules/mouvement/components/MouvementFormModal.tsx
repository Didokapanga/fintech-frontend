import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { useCreateMouvement } from "../hooks/useMouvement";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import { Button, Input, Modal } from "../../../components/ui";
import type { CreateMouvementDto } from "../types";

// 🔥 LISTE DEVISES
const CURRENCIES = ["CDF", "USD", "EUR"];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MouvementFormModal({ open, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm<CreateMouvementDto>();

  const { mutate, isPending } = useCreateMouvement();
  const { data: caisses } = useCaisses();

  // 🔥 WATCH CAISSE
  const selectedCaisseId = useWatch({
    control,
    name: "caisse_id",
  });

  const selectedCaisse = caisses?.find(
    (c) => c.id === selectedCaisseId
  );

  // 🔥 AUTO DEVise selon caisse
  useEffect(() => {
    if (selectedCaisse) {
      setValue("devise", selectedCaisse.devise);
    }
  }, [selectedCaisse, setValue]);

  const onSubmit = (data: CreateMouvementDto) => {
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
        Mouvement de caisse
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        {/* CAISSE */}
        <div>
          <label className="text-sm font-medium">Caisse</label>
          <select
            {...register("caisse_id", { required: true })}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Choisir une caisse</option>
            {caisses?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code_caisse} ({c.devise})
              </option>
            ))}
          </select>
        </div>

        {/* TYPE */}
        <div>
          <label className="text-sm font-medium">Type</label>
          <select
            {...register("type_mouvement", { required: true })}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="APPROVISIONNEMENT">Approvisionnement</option>
            <option value="RETRAIT_SORTIE">Retrait</option>
            <option value="TRANSFERT_SORTIE">Transfert sortie</option>
          </select>
        </div>

        {/* MONTANT */}
        <Input
          type="number"
          label="Montant"
          {...register("montant", { required: true, valueAsNumber: true })}
        />

        {/* DEVISE */}
        <div>
          <label className="text-sm font-medium">Devise</label>
          <select
            {...register("devise", { required: true })}
            disabled={!!selectedCaisse} // 🔥 bloque si auto
            className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Choisir une devise</option>

            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>

          <Button type="submit" loading={isPending}>
            Valider
          </Button>
        </div>
      </form>
    </Modal>
  );
}