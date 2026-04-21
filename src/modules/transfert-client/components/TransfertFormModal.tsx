// src/modules/transfert-client/components/TransfertClientModal.tsx

import { useForm } from "react-hook-form";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import { useClients } from "../../clients/hooks/useClients";
import { useAgences } from "../../agence/hooks/useAgences";
import { Button, Input, Modal } from "../../../components/ui";
import { useCreateTransfertClient } from "../hooks/useTransfert";
import type { CreateTransfertClientDto } from "../services/transfert.service";

// ✅ TYPES
type Caisse = {
  id: string;
  code_caisse: string;
};

type Client = {
  id: string;
  name: string;
  first_name?: string;
  second_name?: string;
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

  const { data: caisses = [] } = useCaisses() as { data: Caisse[] };
  const { data: clients = [] } = useClients() as { data: Client[] };
  const { data: agences = [] } = useAgences() as { data: Agence[] };

  // ✅ FORMAT NOM COMPLET
  const getFullName = (c: Client) =>
    [c.name, c.first_name, c.second_name]
      .filter(Boolean)
      .join(" ");

  const onSubmit = (data: CreateTransfertClientDto) => {
    console.log("🔥 DATA ENVOYÉE:", data);

    mutate(data, {
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

        {/* 🔷 SECTION 1 */}
        <div className="grid grid-cols-2 gap-4">

          <select {...register("caisse_id", { required: true })} className="input">
            <option value="">Caisse</option>
            {Array.isArray(caisses) &&
              caisses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code_caisse}
                </option>
              ))}
          </select>

          <select {...register("devise", { required: true })} className="input">
            <option value="">Devise</option>
            <option value="CDF">CDF</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

        </div>

        {/* 🔷 SECTION 2 */}
        <div className="grid grid-cols-2 gap-4">

          <select {...register("agence_exp", { required: true })} className="input">
            <option value="">Agence expéditeur</option>
            {agences.map((a) => (
              <option key={a.id} value={a.id}>
                {a.libelle}
              </option>
            ))}
          </select>

          <select {...register("agence_dest", { required: true })} className="input">
            <option value="">Agence destination</option>
            {agences.map((a) => (
              <option key={a.id} value={a.id}>
                {a.libelle}
              </option>
            ))}
          </select>

        </div>

        {/* 🔷 SECTION 3 */}
        <div className="grid grid-cols-2 gap-4">

          <select {...register("client_exp", { required: true })} className="input">
            <option value="">Client expéditeur</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {getFullName(c)}
              </option>
            ))}
          </select>

          <select {...register("client_dest", { required: true })} className="input">
            <option value="">Client bénéficiaire</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {getFullName(c)}
              </option>
            ))}
          </select>

        </div>

        {/* 🔷 MONTANT */}
        <Input
          type="number"
          label="Montant"
          placeholder="ex: 100"
          {...register("montant", { required: true, min: 1 })}
        />

        {/* 🔷 IDENTITÉ */}
        <div className="grid grid-cols-2 gap-4">

          <select
            {...register("type_piece", { required: true })}
            className="input"
          >
            <option value="">Type de pièce</option>
            <option value="CARTE_ELECTEUR">Carte d'électeur</option>
            <option value="PASSEPORT">Passeport</option>
          </select>

          <Input
            label="Numéro pièce"
            placeholder="Numéro d'identité"
            {...register("numero_piece", { required: true })}
          />

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-4">
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