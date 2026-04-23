// src/modules/retrait/components/RetraitForm.tsx

import { useForm } from "react-hook-form";
import { Button, Input } from "../../../components/ui";
import { useRetrait } from "../hooks/useRetrait";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import type { AxiosError } from "axios";
import { useAuthStore } from "../../../app/store";
import { useEffect } from "react";

// ✅ TYPE CAISSE
type Caisse = {
  id: string;
  code_caisse: string;
  solde: number;
  devise: string;
};

// 🔥 DATA REÇUE DU TABLE
type SelectedTransfert = {
  code_reference: string;
};

// ✅ FORM
type FormData = {
  code_reference: string;
  code_secret: string;
  caisse_id: string;
  numero_piece: string;
};

type Props = {
  selected?: SelectedTransfert | null;
};

export default function RetraitForm({ selected }: Props) {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();

  const { mutate, isPending } = useRetrait();
  const { data: caisses = [] } = useCaisses() as { data: Caisse[] };
  const user = useAuthStore((s) => s.user);

  // 🔥 AUTO REMPLISSAGE
  useEffect(() => {
    if (selected) {
      setValue("code_reference", selected.code_reference);
    }
  }, [selected, setValue]);

  const onSubmit = (data: FormData) => {
    if (!user?.id) {
      alert("Utilisateur non connecté");
      return;
    }

    const payload = {
      ...data,
      created_by: user.id,
      user_agent: navigator.userAgent,
    };

    mutate(payload, {
      onSuccess: (res) => {
        alert(`✅ Retrait réussi: ${res.montant}`);
        reset();
      },
      onError: (err: unknown) => {
        const error = err as AxiosError<{ message?: string }>;
        alert(error.response?.data?.message || "Erreur");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold text-center">
        Retrait client
      </h2>

      <Input
        label="Code référence"
        {...register("code_reference", { required: true })}
      />

      <Input
        label="Code secret"
        type="password"
        {...register("code_secret", { required: true })}
      />

      <Input
        label="Numéro de pièce"
        {...register("numero_piece", { required: true })}
      />

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

      <Button type="submit" loading={isPending} className="w-full">
        Valider le retrait
      </Button>
    </form>
  );
}