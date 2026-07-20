// src/modules/retrait/components/RetraitForm.tsx

import {
  ArrowDownCircle,
  CreditCard,
  LockKeyhole,
  Wallet,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useForm,
} from "react-hook-form";

import type {
  AxiosError,
} from "axios";

import {
  Button,
  Input,
} from "../../../components/ui";

import AppMessageState from "../../../components/ui/AppMessageState";

import {
  useRetrait,
} from "../hooks/useRetrait";

import {
  useAuthStore,
} from "../../../app/store";
import { usePermission } from "../../../hooks/usePermission";
import { PERMISSIONS } from "../../../constants/permissions";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type SelectedTransfert = {
  code_reference: string;

  devise_destination: string;

  montant_destination: string;

  destinataire_name: string;

  destinataire_telephone: string;
};

type FormData = {
    code_reference: string;
    code_secret: string;
    numero_piece: string;
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

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function RetraitForm({
  selected,
  }: Props) {

  /* ------------------------------------------------------------------------ */
  /*                                    FORM                                  */
  /* ------------------------------------------------------------------------ */

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } =
    useForm<FormData>();

  /* ------------------------------------------------------------------------ */
  /*                                   STORE                                  */
  /* ------------------------------------------------------------------------ */

  const user =
    useAuthStore(
      (s) => s.user
    );

  const { can } =
    usePermission();

  const canCreateRetrait =
    can(
      PERMISSIONS.RETRAIT_CREATE
    );

  /* ------------------------------------------------------------------------ */
  /*                                  MUTATION                                */
  /* ------------------------------------------------------------------------ */

  const {
    mutate,
    isPending,
  } =
    useRetrait();
  /* ------------------------------------------------------------------------ */
  /*                                  MESSAGE                                 */
  /* ------------------------------------------------------------------------ */

  const [
    appMessage,
    setAppMessage,
  ] =
    useState<MessageState | null>(
      null
    );

  /* ------------------------------------------------------------------------ */
  /*                             AUTO REF                                     */
  /* ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------ */
  /*                              DEFAULT DATE                                */
  /* ------------------------------------------------------------------------ */

  /* ------------------------------------------------------------------------ */
  /*                                  SUBMIT                                  */
  /* ------------------------------------------------------------------------ */

  const onSubmit = (
    data: FormData
  ) => {

    if (!user?.id) {

      setAppMessage({
        variant:
          "error",

        title:
          "Erreur système",

        message:
          "Utilisateur non connecté.",
      });

      return;
    }

    const payload = {
        code_reference: data.code_reference,
        code_secret: data.code_secret,
        numero_piece: data.numero_piece,
    };

    mutate(payload, {

      onSuccess: (
        res
      ) => {

        setAppMessage({
          variant:
            "success",

          title:
            "Retrait validé",

          message:
            `Le retrait a été initié avec succès. Montant : ${res.montant}`,
        });

        reset({
            code_secret: "",
            numero_piece: "",
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
          variant:
            "error",

          title:
            "Retrait refusé",

          message:
            error.response
              ?.data
              ?.message ||
            "Erreur lors du retrait.",
        });
      },
    });
  };

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1100px]
      "
    >

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="
          space-y-8
        "
      >

        {/* -------------------------------------------------------------- */}
        {/* HEADER                                                         */}
        {/* -------------------------------------------------------------- */}

        

        {/* -------------------------------------------------------------- */}
        {/* MESSAGE                                                        */}
        {/* -------------------------------------------------------------- */}

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

        {/* -------------------------------------------------------------- */}
        {/* FORM SECTION                                                   */}
        {/* -------------------------------------------------------------- */}

        <section
          className="
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            p-8
          "
        >

          <div
            className="
              mb-8
              flex
              items-start
              gap-4
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
                bg-red-50
                text-red-600
              "
            >

              <Wallet
                size={20}
              />

            </div>

            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                  text-slate-900
                "
              >
                Informations du retrait
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Saisissez les informations
                nécessaires pour traiter
                le retrait.
              </p>

            </div>

          </div>

          {/* ---------------------------------------------------------- */}
          {/* GRID                                                       */}
          {/* ---------------------------------------------------------- */}

          <div
            className="
              flex
              flex-col
              gap-6
            "
          >

            {/* CODE REF */}

            <Input
              label="Code référence"
              placeholder="TRF-XXXX"
              {...register(
                "code_reference",
                {
                  required:
                    true,
                }
              )}
            />

            {/* CODE SECRET */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Code secret
              </label>

              <div
                className="
                  relative
                "
              >

                <LockKeyhole
                  size={16}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="password"
                  placeholder="••••••"
                  {...register(
                    "code_secret",
                    {
                      required:
                        true,
                    }
                  )}
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    pl-11
                    pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition-all
                    focus:border-red-400
                    focus:ring-4
                    focus:ring-red-100
                  "
                />

              </div>

            </div>

            {/* NUMERO PIECE */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Numéro de pièce
              </label>

              <div
                className="
                  relative
                "
              >

                <CreditCard
                  size={16}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  placeholder="Numéro pièce"
                  {...register(
                    "numero_piece",
                    {
                      required:
                        true,
                    }
                  )}
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    pl-11
                    pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition-all
                    focus:border-red-400
                    focus:ring-4
                    focus:ring-red-100
                  "
                />

              </div>

            </div>

            {/* DATE */}

          </div>

          {/* ---------------------------------------------------------- */}
          {/* CAISSE                                                     */}
          {/* ---------------------------------------------------------- */}

          {/* ---------------------------------------------------------- */}
          {/* ACTIONS                                                    */}
          {/* ---------------------------------------------------------- */}

          <div
            className="
              mt-8
              flex
              justify-end
            "
          >

            {canCreateRetrait && (

              <Button
                type="submit"
                loading={isPending}
                className="
                  h-14
                  rounded-2xl
                  bg-red-600
                  px-7
                  hover:bg-red-700
                "
              >

                <ArrowDownCircle
                  size={17}
                />

                Valider le retrait

              </Button>

            )}

          </div>

        </section>

      </form>

    </div>
  );
}