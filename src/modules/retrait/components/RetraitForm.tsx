// src/modules/retrait/components/RetraitForm.tsx

import { useForm } from "react-hook-form";
import { Button, Input } from "../../../components/ui";
import AppMessageState from "../../../components/ui/AppMessageState";
import { useRetrait } from "../hooks/useRetrait";
import { useCaisses } from "../../caisse/hooks/useCaisses";
import type { AxiosError } from "axios";
import { useAuthStore } from "../../../app/store";
import { useEffect, useMemo, useState } from "react";

// TYPES
type Caisse = {
  id: string;
  code_caisse: string;
  solde: number;
  devise: string;
  type?: string;
};

type SelectedTransfert = {
  code_reference: string;
};

type FormData = {
  code_reference: string;
  code_secret: string;
  caisse_id: string;
  numero_piece: string;
  date_operation: string;
};

type Props = {
  selected?: SelectedTransfert | null;
};

type MessageState = {
  variant:
    | "error"
    | "success"
    | "info"
    | "warning";

  title: string;
  message: string;
};

type PaginatedCaissesResponse = {
  data: Caisse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default function RetraitForm({
  selected,
}: Props) {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormData>();

  const {
    mutate,
    isPending,
  } = useRetrait();

  /**
   * =========================================
   * 🔥 CAISSES
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

  /**
   * =========================================
   * 🔥 DATA STABLE
   * =========================================
   */
  const caisses: Caisse[] =
    useMemo(
      () => response?.data || [],
      [response]
    );

  const user = useAuthStore(
    (s) => s.user
  );

  const [
    appMessage,
    setAppMessage,
  ] = useState<MessageState | null>(
    null
  );

  /**
   * =========================================
   * AUTO REF
   * =========================================
   */
  useEffect(() => {

    if (selected) {

      setValue(
        "code_reference",
        selected.code_reference
      );
    }

  }, [
    selected,
    setValue,
  ]);

  /**
   * =========================================
   * DATE PAR DEFAUT
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
   * 🚀 SUBMIT
   * =========================================
   */
  const onSubmit = (
    data: FormData
  ) => {

    if (!user?.id) {

      setAppMessage({
        variant: "error",
        title: "Erreur",
        message:
          "Utilisateur non connecté",
      });

      return;
    }

    const payload = {
      ...data,
      created_by: user.id,
      user_agent:
        navigator.userAgent,
    };

    mutate(payload, {

      onSuccess: (
        res
      ) => {

        setAppMessage({
          variant: "success",
          title: "Succès",
          message:
            `Retrait initié avec succès : ${res.montant}`,
        });

        reset({
          date_operation:
            new Date()
              .toISOString()
              .split("T")[0],
        });
      },

      onError: (
        err: unknown
      ) => {

        const error =
          err as AxiosError<{
            message?: string;
          }>;

        setAppMessage({
          variant: "error",
          title:
            "Retrait refusé",
          message:
            error.response
              ?.data
              ?.message ||
            "Erreur lors du retrait",
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="
        bg-white
        p-6
        rounded-xl
        shadow
        space-y-4
      "
    >

      <h2 className="text-lg font-semibold text-center">
        Retrait client
      </h2>

      {/* MESSAGE */}
      {appMessage && (
        <AppMessageState
          variant={
            appMessage.variant
          }
          title={
            appMessage.title
          }
          message={
            appMessage.message
          }
          onAction={() =>
            setAppMessage(
              null
            )
          }
        />
      )}

      {/* CODE REF */}
      <Input
        label="Code référence"
        {...register(
          "code_reference",
          {
            required: true,
          }
        )}
      />

      {/* CODE SECRET */}
      <Input
        label="Code secret"
        type="password"
        {...register(
          "code_secret",
          {
            required: true,
          }
        )}
      />

      {/* NUMERO PIECE */}
      <Input
        label="Numéro de pièce"
        {...register(
          "numero_piece",
          {
            required: true,
          }
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
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
        />
      </div>

      {/* CAISSE */}
      <select
        {...register(
          "caisse_id",
          {
            required: true,
          }
        )}
        className="
          w-full
          border
          rounded-lg
          px-3
          py-2
        "
      >

        <option value="">
          Sélectionner une caisse
        </option>

        {caisses.map(
          (
            c: Caisse
          ) => (

            <option
              key={c.id}
              value={c.id}
            >
              {c.code_caisse} (
              {c.solde}{" "}
              {c.devise})
            </option>
          )
        )}
      </select>

      {/* SUBMIT */}
      <Button
        type="submit"
        loading={
          isPending
        }
        className="w-full"
      >
        Valider le retrait
      </Button>
    </form>
  );
}