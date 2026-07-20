import { useForm } from "react-hook-form";

import {
  UserPlus,
} from "lucide-react";

import {
  useCreateClient,
} from "../hooks/useClients";

import type {
  CreateClientDto,
} from "../types";

import {
  Button,
  Input,
  Modal,
} from "../../../components/ui";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ClientFormModal({
  open,
  onClose,
}: Props) {

  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<CreateClientDto>({
      defaultValues: {
        nationalite: "RDC",
        sexe: "M",
        type_piece: "CARTE_ELECTEUR",
      },
    });

  const {
    mutate,
    isPending,
  } =
    useCreateClient();

  const onSubmit = (
    data: CreateClientDto
  ) => {

    mutate(data, {

      onSuccess: () => {

        reset();

        onClose();

      },

    });

  };

  return (

    <Modal
      open={open}
      onClose={onClose}
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          mb-6
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
          "
        >

          <UserPlus
            className="
              text-blue-600
            "
            size={22}
          />

        </div>

        <div>

          <h2
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            Nouveau client
          </h2>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Informations d'identification
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* FORM */}
      {/* ================================================= */}

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="
          space-y-5
        "
      >

        {/* =============================== */}
        {/* IDENTITE */}
        {/* =============================== */}

        <div
          className="
            grid
            grid-cols-3
            gap-4
          "
        >

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
            label="Email"
            type="email"
            {...register("email")}
          />

          <div className="flex flex-col gap-2">

            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Sexe
            </label>

            <select
              {...register("sexe")}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                outline-none
                transition-all
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >

              <option value="M">
                Masculin
              </option>

              <option value="F">
                Féminin
              </option>

            </select>

          </div>

          <div className="flex flex-col gap-2">

            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Date de naissance
            </label>

            <input
              type="date"
              {...register("date_naissance")}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                outline-none
                transition-all
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>

          <div className="flex flex-col gap-2">
            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Type de pièce
            </label>

            <select
              {...register("type_piece")}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                outline-none
                transition-all
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >
              <option value="">
                Sélectionner...
              </option>

              <option value="CARTE_ELECTEUR">
                Carte d'électeur
              </option>

              <option value="PASSEPORT">
                Passeport
              </option>

            </select>
          </div>

          <Input
            label="Numéro de pièce"
            {...register("numero_piece")}
          />

        </div>

        {/* =============================== */}
        {/* ADRESSE */}
        {/* =============================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
          "
        >

          <Input
            label="Adresse"
            {...register("adresse")}
          />

          <Input
            label="Profession"
            {...register("profession")}
          />

          <Input
            label="Ville"
            {...register("ville")}
          />

          <Input
            label="Commune"
            {...register("commune")}
          />

          <Input
            label="Quartier"
            {...register("quartier")}
          />

          <div className="flex flex-col gap-2">

            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Nationalité
            </label>

            <select
              {...register("nationalite")}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                outline-none
                transition-all
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >

              <option value="RDC">
                RDC
              </option>

              <option value="ANGOLA">
                Angola
              </option>

              <option value="CONGO">
                Congo Brazzaville
              </option>

              <option value="RWANDA">
                Rwanda
              </option>

              <option value="BURUNDI">
                Burundi
              </option>

              <option value="AUTRE">
                Autre
              </option>

            </select>

          </div>

        </div>

        {/* =============================== */}
        {/* PIECE */}
        {/* =============================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
          "
        >
          <div className="flex flex-col gap-2">

            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Date de délivrance
            </label>

            <input
              type="date"
              {...register("date_delivrance_piece")}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                outline-none
                transition-all
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>

          <div className="flex flex-col gap-2">

            <label
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              Date d'expiration
            </label>

            <input
              type="date"
              {...register("date_expiration_piece")}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                outline-none
                transition-all
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>

        </div>

        {/* =============================== */}
        {/* ACTIONS */}
        {/* =============================== */}

        <div
          className="
            flex
            justify-end
            gap-3
            pt-2
          "
        >

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
            Enregistrer
          </Button>

        </div>

      </form>

    </Modal>

  );

}
