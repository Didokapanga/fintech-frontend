// src/modules/transfert-client/components/TransfertFormModal.tsx

import {
  ArrowRightLeft,
  Building2,
  CalendarRange,
  CreditCard,
  Landmark,
  Phone,
  Send,
  User2,
  Wallet,
} from "lucide-react";

import { useEffect, useState } from "react";
import {
  useForm,
  useWatch,
} from "react-hook-form";

import {
  Button,
  Input,
  Modal,
} from "../../../components/ui";

import AppMessageState from "../../../components/ui/AppMessageState";

import {
  useCreateTransfertClient,
} from "../hooks/useTransfert";

import type {
  CreateTransfertClientDto,
} from "../services/transfert.service";

import {
  useCaisses,
} from "../../caisse/hooks/useCaisses";

import {
  useAgences,
} from "../../agence/hooks/useAgences";

import {
  useAuthStore,
} from "../../../app/store";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Caisse = {
  id: string;
  code_caisse: string;
  devise?: string;
};

type Agence = {
  id: string;
  libelle: string;
};

type Props = {
  open: boolean;

  onClose: () => void;

  selectedCaisseId: string;

  selectedDevise: string;
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

type ErrorWithResponse =
  Error & {
    response?: {
      data?: {
        message?: string;
      };
    };
  };

type CreateTransfertResponse =
  {
    code_secret: string;
  };

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function TransfertFormModal({
  open,
  onClose,
  selectedCaisseId,
  selectedDevise,
}: Props) {

  /* ------------------------------------------------------------------------ */
  /*                                    FORM                                  */
  /* ------------------------------------------------------------------------ */

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
     formState: { errors },
  } = useForm<CreateTransfertClientDto>();

  const montant = Number(
    useWatch({
      control,
      name: "montant",
    }) || 0
  );

  /* ------------------------------------------------------------------------ */
  /*                                   STORE                                  */
  /* ------------------------------------------------------------------------ */

  const user =
    useAuthStore(
      (s) => s.user
    );

  /* ------------------------------------------------------------------------ */
  /*                                  QUERIES                                 */
  /* ------------------------------------------------------------------------ */

  const {
    mutate,
    isPending,
  } =
    useCreateTransfertClient();

  const {
    data:
      caisseResponse,
  } =
    useCaisses();

  const caisses:
    Caisse[] =
      caisseResponse?.data ||
      [];

  
  const commission =
    calculateCommission(
      montant
    ).toFixed(2);

  useEffect(() => {
    setValue(
      "commission",
      Number(commission)
    );
  }, [
    commission,
    setValue,
  ]);

  useEffect(() => {

    if (
      selectedCaisseId &&
      selectedDevise
    ) {

      setValue(
        "caisse_id",
        selectedCaisseId
      );

      setValue(
        "devise",
        selectedDevise
      );
    }

  }, [
    selectedCaisseId,
    selectedDevise,
    setValue,
  ]);

  const {
    data: agences =
      [],
  } =
    useAgences() as {
      data: Agence[];
    };

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
  /*                                  SUBMIT                                  */
  /* ------------------------------------------------------------------------ */

  const onSubmit = (
    data: CreateTransfertClientDto
  ) => {

     if (
        selectedDevise === "USD" &&
        Number(data.montant) >= 10000
      ) {

        setAppMessage({
          variant: "warning",
          title: "Montant non autorisé",
          message:
            "Le montant maximum autorisé pour un transfert client est de 9 999 USD."
        });

        return;
      }

    if (
      !user?.agence_id
    ) {

      setAppMessage({
        variant:
          "error",

        title:
          "Erreur système",

        message:
          "Agence utilisateur introuvable.",
      });

      return;
    }

    const payload:
      CreateTransfertClientDto =
        {
          ...data,

          agence_exp:
            user.agence_id,
        };

    mutate(payload, {

      onSuccess: (
        res:
          CreateTransfertResponse
      ) => {

        setAppMessage({
          variant:
            "success",

          title:
            "Transfert effectué",

          message: `Le transfert a été enregistré avec succès.\nCode secret : ${res.code_secret}`,
        });

        reset();

        onClose();
      },

      onError: (
        error: Error
      ) => {

        const apiError =
          error as ErrorWithResponse;

        setAppMessage({
          variant:
            "error",

          title:
            "Transfert refusé",

          message:
            apiError
              ?.response
              ?.data
              ?.message ||
            "Impossible d’effectuer ce transfert.",
        });
      },
    });
  };

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  function calculateCommission(
    montant: number
  ) {
    if (montant >= 5 && montant <= 99) {
      return montant * 0.0505;
    }

    if (montant >= 100 && montant <= 499) {
      return montant * 0.05;
    }

    if (montant >= 500 && montant <= 999) {
      return montant * 0.04;
    }

    if (montant >= 1000 && montant <= 9999) {
      return montant * 0.03;
    }

    return 0;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >

      <div
        className="
          flex
          max-h-[92vh]
          flex-col
        "
      >

        {/* -------------------------------------------------------------- */}
        {/* HEADER                                                         */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            border-b
            border-slate-200
            px-8
            py-6
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-indigo-100
              bg-indigo-50
              px-3
              py-1
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-indigo-700
            "
          >

            <ArrowRightLeft
              size={13}
            />

            Flux financier

          </div>

          <h2
            className="
              mt-4
              text-3xl
              font-semibold
              tracking-[-0.03em]
              text-slate-900
            "
          >
            Nouveau transfert client
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
            "
          >
            Enregistrez une nouvelle
            opération de transfert
            inter-agence.
          </p>

        </div>

        {/* -------------------------------------------------------------- */}
        {/* BODY                                                           */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            flex-1
            px-8
            py-7
          "
        >

          {appMessage && (

            <div
              className="
                mb-6
              "
            >

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

            </div>
          )}

          <input
            type="hidden"
            {...register(
              "caisse_id"
            )}
          />

          <input
            type="hidden"
            {...register(
              "devise"
            )}
          />

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="
              space-y-7
            "
          >

            {/* ---------------------------------------------------------- */}
            {/* CONFIGURATION                                              */}
            {/* ---------------------------------------------------------- */}

            <FormSection
              title="Configuration"
              description="Informations principales du transfert."
              icon={
                <Wallet
                  size={18}
                />
              }
            >

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-2
                "
              >

                {/* CAISSE */}

                <Field>

                  <Label>
                    Caisse source
                  </Label>

                  <input
                    type="text"
                    readOnly
                    value={
                      caisses.find(
                        c =>
                          c.id ===
                          selectedCaisseId
                      )?.code_caisse || ""
                    }
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-100
                      px-4
                      text-sm
                      font-medium
                      text-slate-700
                      cursor-not-allowed
                    "
                  />

                </Field>

                {/* DEVISE */}

                <Field>

                  <Label>
                    Devise
                  </Label>

                  <input
                    type="text"
                    readOnly
                    value={selectedDevise}
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-100
                      px-4
                      text-sm
                      font-medium
                      text-slate-700
                      cursor-not-allowed
                    "
                  />

                </Field>

              </div>

              {/* AGENCES */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-2
                "
              >

                <Field>

                  <Label>
                    Agence source
                  </Label>

                  <div
                    className="
                      flex
                      h-12
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-100
                      px-4
                      text-sm
                      font-medium
                      text-slate-600
                    "
                  >

                    <Building2
                      size={16}
                    />

                    {agences.find(
                      (
                        agence
                      ) =>
                        agence.id ===
                        user?.agence_id
                    )?.libelle ||
                      "-"}

                  </div>

                </Field>

                <Field>

                  <Label>
                    Agence destination
                  </Label>

                  <select
                    {...register(
                      "agence_dest"
                    )}
                    className="
                      form-select
                    "
                  >

                    <option value="">
                      Sélectionner une agence
                    </option>

                    {agences
                      .filter(
                        (
                          agence
                        ) =>
                          agence.id !==
                          user?.agence_id
                      )
                      .map(
                        (
                          agence
                        ) => (

                          <option
                            key={
                              agence.id
                            }
                            value={
                              agence.id
                            }
                          >
                            {
                              agence.libelle
                            }
                          </option>
                        )
                      )}

                  </select>

                </Field>

              </div>

            </FormSection>

            {/* ---------------------------------------------------------- */}
            {/* EXPEDITEUR                                                 */}
            {/* ---------------------------------------------------------- */}

            <FormSection
              title="Expéditeur"
              description="Informations du client expéditeur."
              icon={
                <User2
                  size={18}
                />
              }
            >

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-3
                "
              >

                <Input
                  label="Nom"
                  placeholder="Nom"
                  {...register(
                    "exp_nom"
                  )}
                />

                <Input
                  label="Postnom"
                  placeholder="Postnom"
                  {...register(
                    "exp_postnom"
                  )}
                />

                <Input
                  label="Prénom"
                  placeholder="Prénom"
                  {...register(
                    "exp_prenom"
                  )}
                />

              </div>

              <div
                className="
                  mt-5
                "
              >

                <Label>
                  Téléphone
                </Label>

                <div
                  className="
                    relative
                  "
                >

                  <Phone
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
                    placeholder="+243..."
                    {...register(
                      "exp_phone"
                    )}
                    className="
                      h-12
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
                      focus:border-indigo-400
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                </div>

              </div>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-2
                "
              >

                <Field>

                  <Label>
                    Type de pièce
                  </Label>

                  <select
                    {...register(
                      "exp_type_piece"
                    )}
                    className="
                      form-select
                    "
                  >

                    <option value="">
                      Sélectionner
                    </option>

                    <option value="CARTE D'ELECTEUR">
                      Carte d'électeur
                    </option>

                    <option value="PASSEPORT">
                      Passeport
                    </option>

                  </select>

                </Field>

                <div>

                  <Label>
                    Numéro pièce
                  </Label>

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
                      placeholder="Numéro d'identification"
                      {...register(
                        "exp_numero_piece"
                      )}
                      className="
                        h-12
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
                        focus:border-indigo-400
                        focus:ring-4
                        focus:ring-indigo-100
                      "
                    />

                  </div>

                </div>

              </div>

            </FormSection>

            {/* ---------------------------------------------------------- */}
            {/* DESTINATAIRE                                               */}
            {/* ---------------------------------------------------------- */}

            <FormSection
              title="Destinataire"
              description="Informations du client bénéficiaire."
              icon={
                <Send
                  size={18}
                />
              }
            >

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-3
                "
              >

                <Input
                  label="Nom"
                  placeholder="Nom"
                  {...register(
                    "dest_nom"
                  )}
                />

                <Input
                  label="Postnom"
                  placeholder="Postnom"
                  {...register(
                    "dest_postnom"
                  )}
                />

                <Input
                  label="Prénom"
                  placeholder="Prénom"
                  {...register(
                    "dest_prenom"
                  )}
                />

              </div>

              <div
                className="
                  mt-5
                "
              >

                <Label>
                  Téléphone
                </Label>

                <div
                  className="
                    relative
                  "
                >

                  <Phone
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
                    placeholder="+243..."
                    {...register(
                      "dest_phone"
                    )}
                    className="
                      h-12
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
                      focus:border-indigo-400
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                </div>

              </div>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-2
                "
              >

                <Field>

                  <Label>
                    Type de pièce
                  </Label>

                  <select
                    {...register(
                      "dest_type_piece"
                    )}
                    className="
                      form-select
                    "
                  >

                    <option value="">
                      Sélectionner
                    </option>

                    <option value="CARTE D'ELECTEUR">
                      Carte d'électeur
                    </option>

                    <option value="PASSEPORT">
                      Passeport
                    </option>

                  </select>

                </Field>

                <div>

                  <Label>
                    Numéro pièce
                  </Label>

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
                      placeholder="Numéro d'identification"
                      {...register(
                        "dest_numero_piece"
                      )}
                      className="
                        h-12
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
                        focus:border-indigo-400
                        focus:ring-4
                        focus:ring-indigo-100
                      "
                    />

                  </div>

                </div>

              </div>

            </FormSection>

            {/* ---------------------------------------------------------- */}
            {/* FINANCE                                                    */}
            {/* ---------------------------------------------------------- */}

            <FormSection
              title="Détails financiers"
              description="Informations liées au montant et aux frais."
              icon={
                <Landmark
                  size={18}
                />
              }
            >

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-2
                "
              >

                <Input
                  type="number"
                  label="Montant"
                  placeholder="0.00"
                  {...register(
                    "montant",
                    {
                      validate: (value) => {
                        if (
                          selectedDevise === "USD" &&
                          Number(value) >= 10000
                        ) {
                          return "Le montant maximum autorisé est de 9 999 USD";
                        }

                        return true;
                      },
                    }
                  )}
                />

                {errors.montant && (
                  <p
                    className="
                      mt-2
                      text-sm
                      font-medium
                      text-red-600
                    "
                  >
                    {errors.montant.message}
                  </p>
                )}

                <div>

                  <Label>
                    Date opération
                  </Label>

                  <div
                    className="
                      relative
                    "
                  >

                    <CalendarRange
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
                      type="date"
                      {...register(
                        "date_operation",
                        {
                          required:
                            true,
                        }
                      )}
                      className="
                        h-12
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
                        focus:border-indigo-400
                        focus:ring-4
                        focus:ring-indigo-100
                      "
                    />

                  </div>

                </div>

              </div>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-2
                "
              >

                <Input
                  type="number"
                  label="Frais"
                  placeholder="0.00"
                  {...register(
                    "frais"
                  )}
                />

                <div>

                  <Label>
                    Commission
                  </Label>

                  <input
                    type="text"
                    readOnly
                    value={commission}
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-100
                      px-4
                      text-sm
                      font-medium
                      text-slate-700
                      cursor-not-allowed
                    "
                  />

                </div>

              </div>

            </FormSection>

            {/* ---------------------------------------------------------- */}
            {/* FOOTER                                                     */}
            {/* ---------------------------------------------------------- */}

            <div
              className="
                flex
                items-center
                justify-end
                gap-3
                border-t
                border-slate-200
                pt-6
              "
            >

              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="
                  h-12
                  rounded-2xl
                  px-5
                "
              >
                Annuler
              </Button>

              <Button
                type="submit"
                loading={
                  isPending
                }
                className="
                  h-12
                  rounded-2xl
                  bg-indigo-600
                  px-5
                  hover:bg-indigo-700
                "
              >

                <Send
                  size={16}
                />

                Envoyer le transfert

              </Button>

            </div>

          </form>

        </div>

      </div>

    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/*                               FORM SECTION                                 */
/* -------------------------------------------------------------------------- */

function FormSection({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {

  return (
    <section
      className="
        rounded-[28px]
        border
        border-slate-200
        bg-slate-50/60
        p-6
      "
    >

      <div
        className="
          mb-6
          flex
          items-start
          gap-4
        "
      >

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-white
            text-slate-700
            shadow-sm
          "
        >
          {icon}
        </div>

        <div>

          <h3
            className="
              text-base
              font-semibold
              text-slate-900
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {description}
          </p>

        </div>

      </div>

      {children}

    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FIELD                                    */
/* -------------------------------------------------------------------------- */

function Field({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div
      className="
        flex
        flex-col
      "
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   LABEL                                    */
/* -------------------------------------------------------------------------- */

function Label({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <label
      className="
        mb-2
        block
        text-sm
        font-semibold
        text-slate-700
      "
    >
      {children}
    </label>
  );
}
