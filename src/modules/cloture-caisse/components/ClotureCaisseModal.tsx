// src/modules/cloture-caisse/components/ClotureCaisseModal.tsx

import { useEffect } from "react";

import {
  useForm,
  useWatch,
} from "react-hook-form";

import {
  Button,
  Input,
  Modal,
} from "../../../components/ui";

import {
  useCaisses,
} from "../../caisse/hooks/useCaisses";

import {
  useClotureCaisse,
} from "../hooks/useClotureCaisse";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Caisse = {
  id: string;
  code_caisse: string;
  solde: number;
  devise: string;
  state: string;
};

type PaginatedCaissesResponse = {
  data: Caisse[];

  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type FormData = {
  caisse_id: string;
  solde_physique: number;
  motif_ecart?: string;
  observation?: string;
  date_operation: string;
};

export default function ClotureCaisseModal({
  open,
  onClose,
}: Props) {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm<FormData>();

  /**
   * =========================================
   * CAISSES
   * =========================================
   */
  const {
    data: response,
  } = useCaisses(
    1,
    100
  ) as {
    data?: PaginatedCaissesResponse;
  };

  const caisses =
    response?.data || [];

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
  const caisseId = useWatch({
    control,
    name: "caisse_id",
  });

  const selectedCaisse =
    caisses.find(
      (c) => c.id === caisseId
    );

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

            <select
              {...register(
                "caisse_id",
                {
                  required: true,
                }
              )}
              className="w-full border rounded-xl px-3 py-2"
            >

              <option value="">
                Sélectionner une caisse
              </option>

              {caisses
                .filter(
                  (c) =>
                    c.state ===
                    "OUVERTE"
                )
                .map((c) => (

                  <option
                    key={c.id}
                    value={c.id}
                  >

                    {c.code_caisse} (
                    {Number(
                      c.solde
                    ).toLocaleString()}{" "}
                    {c.devise}
                    )

                  </option>
                ))}
            </select>
          </div>

          {/* SOLDE SYSTEME */}
          {selectedCaisse && (

            <div className="bg-gray-50 border rounded-xl p-3">

              <p className="text-sm text-gray-500">
                Solde système
              </p>

              <p className="text-lg font-semibold text-green-600">

                {Number(
                  selectedCaisse.solde
                ).toLocaleString()}{" "}

                {
                  selectedCaisse.devise
                }

              </p>

            </div>
          )}

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

          {/* DATE */}
          <div>

            <label className="block text-sm font-medium mb-1">
              Date opération
            </label>

            <input
              type="date"
              {...register(
                "date_operation",
                {
                  required: true,
                }
              )}
              className="w-full border rounded-xl px-3 py-2"
            />
          </div>

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