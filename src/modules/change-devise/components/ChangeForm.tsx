import { useClients }
from "../../clients/hooks/useClients";

import {
//   Search,
  User2,
  Wallet,
} from "lucide-react";

import {
  ArrowLeftRight,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useCreateChange,
} from "../hooks/useCreateChange";

import type {
  CreateChangeDeviseDto,
} from "../types";
import { useApiMutationWithFeedback } from "../../../hooks/useApiMutationWithFeedback";
import AppMessageState from "../../../components/ui/AppMessageState";

export default function ChangeForm() {

  const createMutation =
    useCreateChange();

  const {
    mutate,
    // isPending,
    appMessage,
    clearMessage,
  } = useApiMutationWithFeedback({
    mutationFn:
      createMutation.mutateAsync,

    successMessage:
      "Change effectué avec succès",

    errorMessage:
      "Impossible d'effectuer le change.",

    invalidateQueries: [
      "changes",
    ],
  });

  const initialForm: CreateChangeDeviseDto = {
    client_id: "",
    devise_source: "CDF",
    devise_destination: "USD",
    montant_source: 0,
    mode_paiement: "ESPECE",
  };

  const [
    form,
    setForm,
  ] = useState<CreateChangeDeviseDto>(initialForm);

  const {
  data: clients = [],
} = useClients();

const [
  clientSearch,
  setClientSearch,
] = useState("");

const [
  showClients,
  setShowClients,
] = useState(false);

const getClientFullName = (client: typeof clients[number]) =>
  [
    client.nom,
    client.postnom,
    client.prenom,
  ]
    .filter(Boolean)
    .join(" ");

const filteredClients =
  clients.filter(
    (client) => {

      const fullname =
        getClientFullName(client)
          .toLowerCase();

      return fullname.includes(
        clientSearch.toLowerCase()
      );
    }
  );

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    mutate(form, {

    onSuccess: () => {

      setForm(initialForm);

      setClientSearch("");

      setShowClients(false);

    },

  });

  };

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

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
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-700
          "
        >

          <ArrowLeftRight
            size={22}
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
            Nouveau Change
          </h2>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Opération de change
            de devise
          </p>

        </div>

      </div>

      {appMessage && (

        <AppMessageState
          variant={appMessage.variant}
          title={appMessage.title}
          message={appMessage.message}
          onAction={clearMessage}
        />

      )}

      <form
        onSubmit={
          handleSubmit
        }
        className="
          space-y-4
        "
      >

        {/* CLIENT */}

        <div>

        <label
            className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
            "
        >
            Client
        </label>

        <div className="relative">

            <div
            className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
            "
            >

            <User2
                size={18}
                className="
                text-slate-400
                "
            />

            </div>

            <input
            type="text"
            value={clientSearch}
            placeholder="Rechercher un client..."
            onChange={(e) => {

                setClientSearch(
                e.target.value
                );

                setShowClients(
                true
                );
            }}
            className="
                h-12
                w-full
                rounded-2xl
                border
                border-slate-200
                pl-10
                pr-4
                text-sm
                outline-none
                focus:border-blue-500
            "
            />

            {showClients &&
            clientSearch && (

            <div
                className="
                absolute
                z-50
                mt-2
                max-h-64
                w-full
                overflow-auto
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl
                "
            >

                {filteredClients.map(
                (client) => (

                    <button
                    key={client.id}
                    type="button"
                    onClick={() => {

                        setForm({
                        ...form,

                        client_id:
                            client.id,
                        });

                        setClientSearch(
                          getClientFullName(client)
                        );

                        setShowClients(
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

                    <span
                      className="
                        font-medium
                      "
                    >
                      {getClientFullName(client)}
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

            </div>

            )}

        </div>

        </div>

        {/* CAISSE */}

        <div>

        <label
            className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
            "
        >
            Caisse
        </label>

        <div className="relative">

            <Wallet
            size={18}
            className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
            "
            />

        </div>

        </div>

        {/* DEVISES */}

        <div
        className="
            grid
            grid-cols-2
            gap-3
        "
        >

        <div>

            <label
            className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
            "
            >
            Devise reçue
            </label>

            <select
            value={form.devise_source}
            onChange={(e) =>
                setForm({
                ...form,
                devise_source:
                    e.target.value,
                })
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
            <option value="CDF">
                CDF
            </option>

            <option value="USD">
                USD
            </option>

            <option value="EUR">
                EUR
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
                text-slate-700
            "
            >
            Devise remise
            </label>

            <select
            value={form.devise_destination}
            onChange={(e) =>
                setForm({
                ...form,
                devise_destination:
                    e.target.value,
                })
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

            <option value="EUR">
                EUR
            </option>
            </select>

        </div>

        </div>

        {/* MONTANT + MODE PAIEMENT */}

        <div
        className="
            grid
            grid-cols-2
            gap-3
        "
        >

        <div>

            <label
            className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
            "
            >
            Montant reçu
            </label>

            <input
            type="number"
            min="0"
            value={
                form.montant_source || ""
            }
            onChange={(e) =>
                setForm({
                ...form,
                montant_source:
                    Number(
                    e.target.value
                    ),
                })
            }
            className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
            "
            />

        </div>

        <div>

            <label
            className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
            "
            >
            Mode de paiement
            </label>

            <select
            value={form.mode_paiement}
            onChange={(e) =>
                setForm({
                ...form,
                mode_paiement:
                    e.target.value as CreateChangeDeviseDto["mode_paiement"],
                })
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

        </div>

        </div>

        <button
          type="submit"
          disabled={
            createMutation.isPending
          }
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-blue-600
            px-5
            py-4
            font-semibold
            text-white
            hover:bg-blue-700
            disabled:opacity-50
          "
        >

          {
            createMutation.isPending
              ? "Traitement..."
              : "Exécuter le change"
          }

        </button>

      </form>

    </div>

  );
}