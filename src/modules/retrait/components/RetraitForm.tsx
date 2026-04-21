// src/modules/retrait/components/RetraitForm.tsx

import { useForm } from "react-hook-form";
import { Button, Input } from "../../../components/ui";
import { useRetrait } from "../hooks/useRetrait";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import type { AxiosError } from "axios";

// ✅ TYPE CAISSE
type Caisse = {
  id: string;
  code_caisse: string;
  solde: number;
  devise: string;
};

// ✅ DTO ALIGNÉ BACKEND
type FormData = {
  code_reference: string;
  code_secret: string;
  caisse_id: string;
  numero_piece: string;
  devise: string;
};

export default function RetraitForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const { mutate, isPending } = useRetrait();

  const { data: caisses = [] } = useCaisses() as { data: Caisse[] };

  const onSubmit = (data: FormData) => {
    console.log("🔥 RETRAIT DATA:", data);

    mutate(data, {
      onSuccess: (res) => {
        alert(`✅ Retrait réussi: ${res.montant}`);
        reset();
      },

      onError: (err: unknown) => {
        const error = err as AxiosError<{ message?: string }>;

        const message =
          error.response?.data?.message || "Erreur";

        alert(message);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold text-center">
        Retrait client
      </h2>

      {/* CODE REFERENCE */}
      <Input
        label="Code référence"
        placeholder="REF123456"
        {...register("code_reference", { required: true })}
      />

      {/* CODE SECRET */}
      <Input
        label="Code secret"
        type="password"
        placeholder="******"
        {...register("code_secret", { required: true })}
      />

      {/* NUMERO PIECE */}
      <Input
        label="Numéro de pièce"
        placeholder="AB123456"
        {...register("numero_piece", { required: true })}
      />

      {/* DEVISE */}
      <select
        {...register("devise", { required: true })}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Choisir la devise</option>
        <option value="USD">USD</option>
        <option value="CDF">CDF</option>
        <option value="EUR">EUR</option>
      </select>

      {/* CAISSE */}
      <select
        {...register("caisse_id", { required: true })}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Sélectionner une caisse</option>

        {caisses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.code_caisse} ({c.solde} {c.devise})
          </option>
        ))}
      </select>

      {/* ACTION */}
      <Button type="submit" loading={isPending} className="w-full">
        Valider le retrait
      </Button>
    </form>
  );
}