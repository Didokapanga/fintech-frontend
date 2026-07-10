// src/modules/transfert-client/components/TransfertFormModal.tsx

import {
  ArrowRightLeft,
  Building2,
  Landmark,
  Send,
  User2,
  Wallet,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
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

import type {
  Caisse,
} from "../../caisse/types";

import {
  useCaisses,
} from "../../caisse/hooks/useCaisses";

import {
  useAgences,
} from "../../agence/hooks/useAgences";

import {
  useAuthStore,
} from "../../../app/store";
import { useClients } from "../../clients/hooks/useClients";
import type { Client } from "../../clients/types";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Agence = {
  id: string;
  libelle: string;
};

type Props = {
  open: boolean;

  onClose: () => void;
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

  useWatch({
    control,
    name: "montant_destination",
  })

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
    data: caisseResponse,
  } = useCaisses(
    1,
    100
  );

  const caisses =
    useMemo(
      () =>
        caisseResponse?.data || [],
      [caisseResponse]
    );

  const {
    data: agences =
      [],
  } =
    useAgences() as {
      data: Agence[];
    };

  const myCaisse:
    Caisse | undefined =
      caisses?.[0];

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

  /*--------------------------------------------------------------*/
  /* LES AJOUT                                                    */
  /*--------------------------------------------------------------*/

  const {
    data: clients = [],
  } = useClients();

  const [
  expSearch,
  setExpSearch,
] = useState("");

const [
  destSearch,
  setDestSearch,
] = useState("");

const [
  showExpResults,
  setShowExpResults,
] = useState(false);

const [
  showDestResults,
  setShowDestResults,
] = useState(false);

const getClientFullName = (client: Client) =>
  [
    client.nom,
    client.postnom,
    client.prenom,
  ]
    .filter(Boolean)
    .join(" ");

const filteredExpediteurs =
  clients.filter((client) => {

    const fullName =
      `${client.nom ?? ""}
       ${client.postnom ?? ""}
       ${client.prenom ?? ""}`
        .toLowerCase();

    return fullName.includes(
      expSearch.toLowerCase()
    );
  });

const filteredDestinataires =
  clients.filter((client) => {

    const fullName =
      `${client.nom ?? ""}
       ${client.postnom ?? ""}
       ${client.prenom ?? ""}`
        .toLowerCase();

    return fullName.includes(
      destSearch.toLowerCase()
    );
  });

  useEffect(() => {

    if (!myCaisse) return;

    setValue(
      "caisse_id",
      myCaisse.id
    );

  }, [
    myCaisse,
    setValue,
  ]);

  useEffect(() => {

  if (!myCaisse) return;

  setValue(
    "caisse_id",
    myCaisse.id
  );

}, [
  myCaisse,
  setValue,
]);

const deviseSelectionnee =
  useWatch({
    control,
    name: "devise_source",
  });

const typeCalculFrais =
  useWatch({
    control,
    name: "type_calcul_frais",
  });

  useEffect(() => {

    if (
      deviseSelectionnee
    ) {

      setValue(
        "devise_destination",
        deviseSelectionnee
      );

    }

  }, [
    deviseSelectionnee,
    setValue,
  ]);

  useEffect(() => {

    setValue(
      "type_calcul_frais",
      "FORFAITAIRE"
    );

  }, [setValue]);

  /* ------------------------------------------------------------------------ */
  /*                                  SUBMIT                                  */
  /* ------------------------------------------------------------------------ */

  const onSubmit = (
    data: CreateTransfertClientDto
  ) => {

     if (
        deviseSelectionnee === "USD" &&
        Number(data.montant_destination) >= 10000
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

    const payload = data;

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

  const deviseInfo =
    myCaisse?.devises?.find(
      (d) =>
        d.devise ===
        deviseSelectionnee
    );

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

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
            {...register("devise_source")}
          />

          <input
            type="hidden"
            {...register("devise_destination")}
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
              icon={<Wallet size={18} />}
            >

              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  xl:grid-cols-2
                "
              >

                <Field>

                  <Label>
                    Caisse source
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
                      text-slate-700
                    "
                  >

                    <Wallet size={16} />

                    {myCaisse
                      ? `${myCaisse.code_caisse} • ${myCaisse.agence_name}`
                      : "Chargement..."
                    }

                  </div>

                </Field>

                <Field>

                  <Label>
                    Devise du transfert
                  </Label>

                  <select
                    {...register(
                      "devise_source",
                      {
                        required:
                          "Veuillez sélectionner une devise",
                      }
                    )}
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      text-sm
                      outline-none
                      transition-all
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  >

                    <option value="">
                      Sélectionner une devise
                    </option>

                    {myCaisse?.devises?.map(
                      (devise) => (
                        <option
                          key={devise.id}
                          value={devise.devise}
                        >
                          {devise.devise}
                        </option>
                      )
                    )}

                  </select>

                  {errors.devise_source && (

                    <p
                      className="
                        mt-2
                        text-xs
                        font-medium
                        text-red-500
                      "
                    >
                      {errors.devise_source.message}
                    </p>

                  )}

                  {deviseInfo && (

                    <p
                      className="
                        mt-2
                        text-xs
                        font-medium
                        text-emerald-600
                      "
                    >
                      Solde disponible :
                      {" "}
                      {Number(
                        deviseInfo.solde
                      ).toLocaleString()}
                      {" "}
                      {deviseInfo.devise}
                    </p>

                  )}

                </Field>

              </div>

              <div
                className="
                  mt-6
                  grid
                  grid-cols-1
                  gap-6
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

                    <Building2 size={16} />

                    {agences.find(
                      (agence) =>
                        agence.id ===
                        user?.agence_id
                    )?.libelle || "-"}

                  </div>

                </Field>

                <Field>

                  <Label>
                    Agence destination
                  </Label>

                  <select
                    {...register(
                      "agence_dest",
                      {
                        required:
                          "Veuillez sélectionner une agence",
                      }
                    )}
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      text-sm
                      outline-none
                      transition-all
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  >

                    <option value="">
                      Sélectionner une agence
                    </option>

                    {agences
                      .filter(
                        (agence) =>
                          agence.id !==
                          user?.agence_id
                      )
                      .map(
                        (agence) => (
                          <option
                            key={agence.id}
                            value={agence.id}
                          >
                            {agence.libelle}
                          </option>
                        )
                      )}

                  </select>

                  {errors.agence_dest && (

                    <p
                      className="
                        mt-2
                        text-xs
                        font-medium
                        text-red-500
                      "
                    >
                      {errors.agence_dest.message}
                    </p>

                  )}

                </Field>

              </div>

            </FormSection>

            {/* ---------------------------------------------------------- */}
            {/* EXPEDITEUR                                                 */}
            {/* ---------------------------------------------------------- */}

            <FormSection
              title="Expéditeur"
              description="Recherche et sélection du client expéditeur."
              icon={<User2 size={18} />}
            >

              <Field>

                <Label>
                  Client expéditeur
                </Label>

                <div className="relative">

                  <input
                    type="text"
                    value={expSearch}
                    onChange={(e) => {

                      setExpSearch(
                        e.target.value
                      );

                      setShowExpResults(
                        true
                      );
                    }}
                    placeholder="Rechercher un client..."
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      px-4
                      text-sm
                      outline-none
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                  {showExpResults &&
                    expSearch && (

                    <div
                      className="
                        absolute
                        z-50
                        mt-2
                        max-h-60
                        w-full
                        overflow-auto
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        shadow-xl
                      "
                    >

                      {filteredExpediteurs.map(
                        (client) => (

                          <button
                            type="button"
                            key={client.id}
                            onClick={() => {

                              setValue(
                                "expediteur_id",
                                client.id
                              );

                              setExpSearch(
                               getClientFullName(client)
                              );

                              setShowExpResults(
                                false
                              );
                            }}
                            className="
                              flex
                              w-full
                              flex-col
                              px-4
                              py-3
                              text-left
                              hover:bg-slate-50
                            "
                          >

                            <span className="font-medium">
                              {client.nom}{" "}
                              {client.postnom}{" "}
                              {client.prenom}
                            </span>

                            <span className="text-xs text-slate-500">
                              {client.telephone}
                            </span>

                          </button>

                        )
                      )}

                    </div>

                  )}

                </div>

                <input
                  type="hidden"
                  {...register(
                    "expediteur_id",
                    {
                      required:
                        "Sélectionnez un expéditeur",
                    }
                  )}
                />

                {errors.expediteur_id && (

                  <p className="mt-2 text-xs text-red-500">
                    {errors.expediteur_id.message}
                  </p>

                )}

              </Field>

            </FormSection>

            {/* ---------------------------------------------------------- */}
            {/* DESTINATAIRE                                               */}
            {/* ---------------------------------------------------------- */}

            <FormSection
              title="Destinataire"
              description="Recherche et sélection du bénéficiaire."
              icon={<Send size={18} />}
            >

              <Field>

                <Label>
                  Client bénéficiaire
                </Label>

                <div className="relative">

                  <input
                    type="text"
                    value={destSearch}
                    onChange={(e) => {

                      setDestSearch(
                        e.target.value
                      );

                      setShowDestResults(
                        true
                      );
                    }}
                    placeholder="Rechercher un bénéficiaire..."
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      px-4
                      text-sm
                      outline-none
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  />

                  {showDestResults &&
                    destSearch && (

                    <div
                      className="
                        absolute
                        z-50
                        mt-2
                        max-h-60
                        w-full
                        overflow-auto
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        shadow-xl
                      "
                    >

                      {filteredDestinataires.map(
                        (client) => (

                          <button
                            type="button"
                            key={client.id}
                            onClick={() => {

                              setValue(
                                "destinataire_id",
                                client.id
                              );

                              setDestSearch(
                               getClientFullName(client)
                              );

                              setShowDestResults(
                                false
                              );
                            }}
                            className="
                              flex
                              w-full
                              flex-col
                              px-4
                              py-3
                              text-left
                              hover:bg-slate-50
                            "
                          >

                            <span className="font-medium">
                              {client.nom}{" "}
                              {client.postnom}{" "}
                              {client.prenom}
                            </span>

                            <span
                              className="
                                text-xs
                                text-slate-500
                              "
                            >
                              {client.telephone}
                            </span>

                          </button>

                        )
                      )}

                      {filteredDestinataires.length === 0 && (

                        <div
                          className="
                            px-4
                            py-3
                            text-sm
                            text-slate-500
                          "
                        >
                          Aucun client trouvé
                        </div>

                      )}

                    </div>

                  )}

                </div>

                <input
                  type="hidden"
                  {...register(
                    "destinataire_id",
                    {
                      required:
                        "Sélectionnez un bénéficiaire",
                    }
                  )}
                />

                {errors.destinataire_id && (

                  <p
                    className="
                      mt-2
                      text-xs
                      text-red-500
                    "
                  >
                    {errors.destinataire_id.message}
                  </p>

                )}

              </Field>

            </FormSection>

            {/* ---------------------------------------------------------- */}
            {/* FINANCE                                                    */}
            {/* ---------------------------------------------------------- */}

            <FormSection
              title="Détails financiers"
              description="Montant et mode de paiement."
              icon={<Landmark size={18} />}
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
                    "montant_destination",
                    {
                      valueAsNumber: true,
                      required: true,
                    }
                  )}
                />

                <Field>

                  <Label>
                    Calcul des frais
                  </Label>

                  <select
                    {...register(
                      "type_calcul_frais",
                      {
                        required: true,
                      }
                    )}
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      text-sm
                      outline-none
                      transition-all
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                    "
                  >
                    <option value="FORFAITAIRE">
                      Tarif configuré
                    </option>

                    <option value="POURCENTAGE">
                      Pourcentage
                    </option>

                  </select>

                </Field>

                {
                  typeCalculFrais === "POURCENTAGE" && (

                    <Input
                      type="number"
                      label="Pourcentage (%)"
                      placeholder="Ex : 2.5"
                      {...register("pourcentage_frais", {
                        required:
                          typeCalculFrais === "POURCENTAGE",

                        setValueAs: (value) =>
                          value === ""
                            ? undefined
                            : Number(value),
                      })}
                    />

                  )
                }

                <Field>

                  <Label>
                    Mode paiement
                  </Label>

                  <select
                    {...register(
                      "mode_paiement",
                      {
                        required: true,
                      }
                    )}
                    className="
                      form-select
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      text-sm
                      outline-none
                      transition-all
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100"
                  >

                    <option value="">
                      Sélectionner
                    </option>

                    <option value="ESPECE">
                      Espèce
                    </option>

                    <option value="MOBILE_MONEY">
                      Mobile Money
                    </option>

                    <option value="COMPTE_CLIENT">
                      Compte Client
                    </option>

                    <option value="CARTE">
                      Carte
                    </option>

                    <option value="CHEQUE">
                      Chèque
                    </option>

                  </select>

                </Field>

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
