// src/modules/transfert-caisse/components/TransfertCaisseModal.tsx

import { useForm, useWatch } from "react-hook-form";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import { Button, Input, Modal } from "../../../components/ui";
import AppMessageState from "../../../components/ui/AppMessageState";
import { useApiMutationWithFeedback } from "../../../hooks/useApiMutationWithFeedback";
import { createTransfertCaisse } from "../services/transfertCaisse.service";
import type { CreateTransfertCaisseDto } from "../services/transfertCaisse.service";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * ✅ TYPE CORRIGÉ (aligné backend)
 */
type Caisse = {
  id: string;
  code_caisse: string;
  devise: string;
  solde: number;
  type?: string;

  // 🔥 backend réel
  agence_name?: string;

  // 🔒 compat future (optionnel)
  agence?: {
    libelle?: string;
  };
};

export default function TransfertCaisseModal({
  open,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<CreateTransfertCaisseDto>({
    defaultValues: {
      date_operation: new Date()
        .toISOString()
        .slice(0, 16),
    },
  });

  const {
    data: caisses = [],
    isLoading,
  } = useCaisses() as {
    data: Caisse[];
    isLoading: boolean;
  };

  const sourceId = useWatch({
    control,
    name: "caisse_source_id",
  });

  const {
    mutate,
    isPending,
    appMessage,
    clearMessage,
  } = useApiMutationWithFeedback({
    mutationFn: createTransfertCaisse,

    successMessage: "Transfert initié avec succès",

    invalidateQueries: [
      "transferts-caisse",
      "transferts-caisse-process",
    ],

    onSuccess: () => {
      reset({
        date_operation: new Date()
          .toISOString()
          .slice(0, 16),
      });

      onClose();
    },
  });

  const onSubmit = (data: CreateTransfertCaisseDto) => {
    const payload = {
      ...data,
      date_operation: new Date(
        data.date_operation
      ).toISOString(),
    };

    mutate(payload);
  };

  /**
   * ✅ FORMAT FIXÉ (support backend actuel + futur)
   */
  const formatCaisse = (c: Caisse) => {
    const agence =
      c.agence?.libelle ||
      c.agence_name ||
      "—";

    return `${c.code_caisse} • ${c.type ?? "—"} • ${
      c.devise
    } • ${agence}`;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">
        Transfert de caisse
      </h2>

      {appMessage && (
        <AppMessageState
          variant={appMessage.variant}
          title={appMessage.title}
          message={appMessage.message}
          onAction={clearMessage}
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3"
      >
        {/* CAISSE SOURCE */}
        <select
          {...register("caisse_source_id", {
            required: true,
          })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">
            {isLoading
              ? "Chargement..."
              : "Caisse source"}
          </option>

          {caisses.map((c) => (
            <option key={c.id} value={c.id}>
              {formatCaisse(c)}
            </option>
          ))}
        </select>

        {/* CAISSE DESTINATION */}
        <select
          {...register("caisse_destination_id", {
            required: true,
          })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">
            Caisse destination
          </option>

          {caisses
            .filter(
              (c) =>
                !sourceId || c.id !== sourceId
            )
            .map((c) => (
              <option key={c.id} value={c.id}>
                {formatCaisse(c)}
              </option>
            ))}
        </select>

        {/* MONTANT */}
        <Input
          type="number"
          label="Montant"
          {...register("montant", {
            required: true,
            min: 1,
            valueAsNumber: true,
          })}
        />

        {/* DEVISE */}
        <select
          {...register("devise", {
            required: true,
          })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Devise</option>
          <option value="CDF">CDF</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        {/* DATE */}
        <input
          type="date"
          {...register("date_operation", {
            required: true,
          })}
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* ACTIONS */}
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
            Transférer
          </Button>
        </div>
      </form>
    </Modal>
  );
}