// src/modules/settings/components/TransfertTarifModal.tsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import {
  useCreateTransfertTarif,
  useUpdateTransfertTarif,
} from "../hooks/useTransfertTarif";

import type {
  TransfertTarif,
} from "../types";
import type { AxiosError } from "axios";

type Props = {
  open: boolean;
  onClose: () => void;
  tarif?: TransfertTarif | null;
};

type FormData = {
  devise: string;
  montant_min: number;
  montant_max: number;
  frais: number;
};

export default function TransfertTarifModal({
  open,
  onClose,
  tarif,
}: Props) {

  const isEdit = !!tarif;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: {
      errors,
    },
  } = useForm<FormData>({
    defaultValues: {
      devise: "USD",
      montant_min: 0,
      montant_max: 0,
      frais: 0,
    },
  });

  const createMutation =
    useCreateTransfertTarif();

  const updateMutation =
    useUpdateTransfertTarif();

  useEffect(() => {

    if (!open) return;

    if (tarif) {

      reset({
        devise: tarif.devise,
        montant_min: Number(tarif.montant_min),
        montant_max: Number(tarif.montant_max),
        frais: Number(tarif.frais),
      });

    } else {

      reset({
        devise: "USD",
        montant_min: 0,
        montant_max: 0,
        frais: 0,
      });

    }

  }, [
    open,
    tarif,
    reset,
  ]);

  const onSubmit = async (
    data: FormData
  ) => {

    const payload = {

      devise:
        String(
          data.devise
        ),

      montant_min:
        Number(
          data.montant_min
        ),

      montant_max:
        Number(
          data.montant_max
        ),

      frais:
        Number(
          data.frais
        ),

    };

    if (
      payload.montant_min < 0
    ) {

      setError(
        "montant_min",
        {
          type: "manual",
          message:
            "Montant minimum invalide",
        }
      );

      return;
    }

    if (
      payload.montant_max <=
      payload.montant_min
    ) {

      setError(
        "montant_max",
        {
          type: "manual",
          message:
            "Le montant maximum doit être supérieur au montant minimum",
        }
      );

      return;
    }

    if (
      payload.frais < 0
    ) {

      setError(
        "frais",
        {
          type: "manual",
          message:
            "Frais invalide",
        }
      );

      return;
    }

    try {

      if (
        isEdit &&
        tarif
      ) {

        await updateMutation.mutateAsync({

          id:
            tarif.id,

          data:
            payload,

        });

      } else {

        await createMutation.mutateAsync(
          payload
        );

      }

      reset();

      onClose();

    } catch (
      error: unknown
    ) {

      const axiosError =
        error as AxiosError<{
          message?: string;
        }>;

      const message =
        axiosError.response
          ?.data
          ?.message ??
        "Une erreur est survenue";

      alert(message);

    }

  };

  if (!open)
    return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-xl
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-5
          "
        >

          <h2
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            {isEdit
              ? "Modifier le tarif"
              : "Nouveau tarif"}
          </h2>

          <button
            type="button"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="
            space-y-5
            p-6
          "
        >

          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Devise
            </label>

            <select
              {...register(
                "devise",
                {
                  required:
                    "La devise est obligatoire",
                }
              )}
              disabled={
                isEdit
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
              "
            >
              <option value="USD">
                USD
              </option>

              <option value="CDF">
                CDF
              </option>
            </select>

          </div>

          <div>

  <label
    className="
      mb-2
      block
      text-sm
      font-medium
    "
  >
    Montant minimum
  </label>

  <input
  type="number"
  step="0.01"
  min="0"
  {...register(
    "montant_min",
    {
      required:
        "Montant minimum requis",
      valueAsNumber:
        true,
    }
  )}
  className="
    w-full
    rounded-2xl
    border
    border-slate-200
    px-4
    py-3
  "
/>

  {errors.montant_min && (
    <p
      className="
        mt-1
        text-sm
        text-red-500
      "
    >
      {errors.montant_min.message}
    </p>
  )}

</div>

<div>

  <label
    className="
      mb-2
      block
      text-sm
      font-medium
    "
  >
    Montant maximum
  </label>

  <input
  type="number"
  step="0.01"
  min="0"
  {...register(
    "montant_max",
    {
      required:
        "Montant maximum requis",
      valueAsNumber:
        true,
    }
  )}
  className="
    w-full
    rounded-2xl
    border
    border-slate-200
    px-4
    py-3
  "
/>

  {errors.montant_max && (
    <p
      className="
        mt-1
        text-sm
        text-red-500
      "
    >
      {errors.montant_max.message}
    </p>
  )}

</div>

<div>

  <label
    className="
      mb-2
      block
      text-sm
      font-medium
    "
  >
    Frais
  </label>

  <input
  type="number"
  step="0.01"
  {...register("frais", {
    required: true,
    valueAsNumber: true,
  })}
     className="
      w-full
      rounded-2xl
      border
      border-slate-200
      px-4
      py-3
    "
  />

  {errors.frais && (
    <p
      className="
        mt-1
        text-sm
        text-red-500
      "
    >
      {errors.frais.message}
    </p>
  )}

</div>

          <div
            className="
              flex
              justify-end
              gap-3
              pt-2
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-2xl
                border
                border-slate-200
                px-5
                py-3
              "
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={
                createMutation.isPending ||
                updateMutation.isPending
              }
              className="
                rounded-2xl
                bg-blue-600
                px-5
                py-3
                font-medium
                text-white
              "
            >
              {isEdit
                ? "Modifier"
                : "Créer"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
