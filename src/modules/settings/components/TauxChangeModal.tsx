import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import {
  useCreateTauxChange,
  useUpdateTauxChange,
} from "../hooks/useTauxChange";

import type { TauxChange } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  taux?: TauxChange | null;
};

type FormData = {
  devise_source: string;
  devise_destination: string;
  taux_achat: number;
  taux_vente: number;
};

export default function TauxChangeModal({
  open,
  onClose,
  taux,
}: Props) {
  const isEdit = !!taux;

 const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      devise_source: "USD",
      devise_destination: "CDF",
      taux_achat: 0,
      taux_vente: 0,
    },
  });
  
  /**
   * Maintient la souscription RHF active.
   * Sans cette ligne certains champs numériques
   * reviennent à undefined dans ce projet.
   */

  const watchedValues = watch();

  void watchedValues;

  const createMutation =
    useCreateTauxChange();

  const updateMutation =
    useUpdateTauxChange();

  const deviseSource =
    taux?.devise_source;

  const deviseDestination =
    taux?.devise_destination;

  const tauxAchat =
    taux?.taux_achat;

  const tauxVente =
    taux?.taux_vente;

  useEffect(() => {

    if (!open) return;

    if (!taux?.id) {

      reset({
        devise_source: "USD",
        devise_destination: "CDF",
        taux_achat: 0,
        taux_vente: 0,
      });

      return;
    }

    reset({
      devise_source: deviseSource,
      devise_destination: deviseDestination,
      taux_achat: Number(tauxAchat),
      taux_vente: Number(tauxVente),
    });

  }, [
    open,
    taux?.id,
    deviseSource,
    deviseDestination,
    tauxAchat,
    tauxVente,
    reset,
  ]);
  
  const onSubmit = (
    data: FormData
  ) => {

    if (isEdit && taux) {

      updateMutation.mutate(
        {
          id: taux.id,
          data: {
            taux_achat: data.taux_achat,
            taux_vente: data.taux_vente,
          },
        },
        {
          onSuccess: onClose,
        }
      );

      return;
    }

    createMutation.mutate(
      {
        devise_source:
          data.devise_source,

        devise_destination:
          data.devise_destination,

        taux_achat:
          Number(
            data.taux_achat
          ),

        taux_vente:
          Number(
            data.taux_vente
          ),
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
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
              ? "Modifier le taux"
              : "Nouveau taux"}
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
          <select
            {...register(
              "devise_source"
            )}
            disabled={isEdit}
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

          <select
            {...register(
              "devise_destination"
            )}
            disabled={isEdit}
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
            "
          >
            <option value="CDF">
              CDF
            </option>

            <option value="USD">
              USD
            </option>
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="Taux achat"
            {...register(
              "taux_achat",
              {
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

          <input
            type="number"
            step="0.01"
            placeholder="Taux vente"
            {...register(
              "taux_vente",
              {
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

          <div
            className="
              flex
              justify-end
              gap-3
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
