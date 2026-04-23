// src/modules/transfert-client/components/TransfertClientModal.tsx

import { useForm } from "react-hook-form";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import { useAgences } from "../../agence/hooks/useAgences";
import { Button, Input, Modal } from "../../../components/ui";
import { useCreateTransfertClient } from "../hooks/useTransfert";
import type { CreateTransfertClientDto } from "../services/transfert.service";
import { useAuthStore } from "../../../app/store";

type Caisse = {
  id: string;
  code_caisse: string;
};

type Agence = {
  id: string;
  libelle: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TransfertClientModal({ open, onClose }: Props) {
  const { register, handleSubmit, reset } =
    useForm<CreateTransfertClientDto>();

  const { mutate, isPending } = useCreateTransfertClient();

  const user = useAuthStore((s) => s.user);

  const { data: caisses = [] } = useCaisses() as { data: Caisse[] };
  const { data: agences = [] } = useAgences() as { data: Agence[] };

  const onSubmit = (data: CreateTransfertClientDto) => {
  if (!user?.agence_id) {
    alert("Agence utilisateur introuvable");
    return;
  }

  const payload: CreateTransfertClientDto = {
    ...data,
    agence_exp: user.agence_id, // ✅ maintenant garanti string
  };

    // console.log("🔥 DATA ENVOYÉE:", payload);

    mutate(payload, {
      onSuccess: (res) => {
        alert("Code secret: " + res.code_secret);
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-6">
        Transfert client
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* CAISSE + DEVISE */}
        <div className="grid grid-cols-2 gap-4">
          <select {...register("caisse_id")} className="input">
            <option value="">Caisse</option>
            {caisses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code_caisse}
              </option>
            ))}
          </select>

          <select {...register("devise")} className="input">
            <option value="">Devise</option>
            <option value="USD">USD</option>
            <option value="CDF">CDF</option>
          </select>
        </div>

        {/* AGENCES */}
        <div className="grid grid-cols-2 gap-4">
          <input
            value={
              agences.find((a) => a.id === user?.agence_id)?.libelle || ""
            }
            disabled
            className="input bg-gray-100 cursor-not-allowed"
          />

          <select {...register("agence_dest")} className="input">
            <option value="">Agence destination</option>
            {agences
              .filter((a) => a.id !== user?.agence_id) // ✅ FIX ICI
              .map((a) => (
                <option key={a.id} value={a.id}>
                  {a.libelle}
                </option>
              ))}
          </select>
        </div>

        {/* ================= EXPEDITEUR ================= */}
        <div className="border rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-sm text-gray-600">
            Expéditeur
          </h3>

          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="Nom" {...register("exp_nom")} />
            <Input placeholder="Postnom" {...register("exp_postnom")} />
            <Input placeholder="Prénom" {...register("exp_prenom")} />
          </div>

          <Input placeholder="Téléphone" {...register("exp_phone")} />

          <div className="grid grid-cols-2 gap-2">
            <select {...register("exp_type_piece")} className="input">
              <option value="">Type pièce</option>
              <option value="CNI">CNI</option>
              <option value="PASSEPORT">Passeport</option>
            </select>

            <Input
              placeholder="Numéro pièce"
              {...register("exp_numero_piece")}
            />
          </div>
        </div>

        {/* ================= DESTINATAIRE ================= */}
        <div className="border rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-sm text-gray-600">
            Destinataire
          </h3>

          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="Nom" {...register("dest_nom")} />
            <Input placeholder="Postnom" {...register("dest_postnom")} />
            <Input placeholder="Prénom" {...register("dest_prenom")} />
          </div>

          <Input placeholder="Téléphone" {...register("dest_phone")} />

          <div className="grid grid-cols-2 gap-2">
            <select {...register("dest_type_piece")} className="input">
              <option value="">Type pièce</option>
              <option value="CARTE D'ELECTEUR">Carte d'électeur</option>
              <option value="PASSEPORT">Passeport</option>
            </select>

            <Input
              placeholder="Numéro pièce"
              {...register("dest_numero_piece")}
            />
          </div>
        </div>

        {/* MONTANT */}
        <Input
          type="number"
          label="Montant"
          {...register("montant")}
        />

        <div className="grid grid-cols-2 gap-2">
          <Input type="number" label="Frais" {...register("frais")} />
          <Input type="number" label="Commission" {...register("commission")} />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>

          <Button type="submit" loading={isPending}>
            Envoyer
          </Button>
        </div>
      </form>
    </Modal>
  );
}