// src/modules/cloture-caisse/components/ClotureCaisseModal.tsx

import { useEffect } from "react";

import {
  useForm,
} from "react-hook-form";

import {
  Button,
  Input,
  Modal,
} from "../../../components/ui";

import {
  useClotureCaisse,
} from "../hooks/useClotureCaisse";

type Props = {
  open: boolean;
  onClose: () => void;

  selectedCaisseId: string;

  selectedCodeCaisse: string;

  soldes: Record<
    string,
    number
  >;
};

type FormData = {
  caisse_id: string;

  devise: string;

  solde_physique: number;

  motif_ecart?: string;

  observation?: string;

  date_operation: string;
};

export default function ClotureCaisseModal({
  open,
  onClose,
  selectedCaisseId,
  selectedCodeCaisse,
  soldes,
}: Props){

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormData>();

  /**
   * =========================================
   * CAISSES
   * =========================================
   */

  /**
   * =========================================
   * MUTATION
   * =========================================
   */
  const {
    mutate,
    isPending,
  } = useClotureCaisse();

  /**
   * =========================================
   * WATCH
   * =========================================
   */

  useEffect(() => {

    if (selectedCaisseId) {

      setValue(
        "caisse_id",
        selectedCaisseId
      );

    }

  }, [
    selectedCaisseId,
    setValue,
  ]);

  /**
   * =========================================
   * DATE AUTO
   * =========================================
   */
  useEffect(() => {

    const today = new Date()
      .toISOString()
      .split("T")[0];

    setValue(
      "date_operation",
      today
    );

  }, [setValue]);

  /**
   * =========================================
   * SUBMIT
   * =========================================
   */
  const onSubmit = (
    data: FormData
  ) => {

    mutate(data, {
      onSuccess: () => {

        reset({
          date_operation:
            new Date()
              .toISOString()
              .split("T")[0],
        });

        onClose();
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >

      <div className="space-y-5">

        {/* HEADER */}
        <div>

          <h2 className="text-xl font-semibold">
            Clôture de caisse
          </h2>

          <p className="text-sm text-gray-500">
            Vérification du solde
            physique avant fermeture
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >

          {/* CAISSE */}
          <div>

            <label className="block text-sm font-medium mb-1">
              Caisse
            </label>

            <input
              type="hidden"
              {...register("caisse_id")}
            />

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-4
              "
            >

              <p
                className="
                  text-xs
                  uppercase
                  text-slate-400
                "
              >
                Caisse sélectionnée
              </p>

              <p
                className="
                  mt-1
                  font-semibold
                  text-slate-900
                "
              >
                {selectedCodeCaisse}
              </p>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                {Object.keys(soldes).join(" / ")}
              </p>

            </div>
          </div>

          {/* DEVISE */}

          <div>

            <label
              className="
                block
                text-sm
                font-medium
                mb-1
              "
            >
              Devise
            </label>

            <select
              {...register(
                "devise",
                {
                  required: true,
                }
              )}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                px-3
                py-2
              "
            >

              {Object.keys(
                soldes || {}
              ).map(
                (devise) => (

                  <option
                    key={devise}
                    value={devise}
                  >
                    {devise}
                  </option>

                )
              )}

            </select>

          </div>

          {/* SOLDE SYSTEME */}
          <div
            className="
              bg-gray-50
              border
              rounded-xl
              p-3
            "
          >

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Soldes disponibles
            </p>

            <div className="mt-2 space-y-2">

              {Object.entries(
                soldes || {}
              ).map(
                ([
                  devise,
                  montant,
                ]) => (

                  <div
                    key={devise}
                    className="
                      flex
                      justify-between
                    "
                  >

                    <span>
                      {devise}
                    </span>

                    <span
                      className="
                        font-semibold
                        text-green-600
                      "
                    >
                      {Number(
                        montant
                      ).toLocaleString()}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

          {/* SOLDE PHYSIQUE */}
          <Input
            label="Solde physique"
            type="number"
            placeholder="Ex: 1500"
            {...register(
              "solde_physique",
              {
                required: true,
                min: 0,
                valueAsNumber: true,
              }
            )}
          />

          {/* MOTIF */}
          <Input
            label="Motif écart (si nécessaire)"
            placeholder="Expliquer l’écart éventuel"
            {...register(
              "motif_ecart"
            )}
          />

          {/* OBSERVATION */}
          <Input
            label="Observation"
            placeholder="Observation complémentaire"
            {...register(
              "observation"
            )}
          />
        

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">

            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Annuler
            </Button>

            <Button
              type="submit"
              loading={
                isPending
              }
            >
              Clôturer
            </Button>

          </div>
        </form>
      </div>
    </Modal>
  );
}