// src/modules/auth/components/RegisterForm.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";

import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  ShieldCheck,
  User2,
  Lock,
  Building2,
} from "lucide-react";



import {
  useRegister,
} from "../hooks/useAuth";

import {
  useRoles,
} from "../hooks/useRoles";

import {
  useAgences,
} from "../../agence/hooks/useAgences";

import AppMessageState
from "../../../components/ui/AppMessageState";

import {
  Button,
} from "../../../components/ui";
import type { RegisterDto } from "../services/auth.service";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type Role = {
  id: string;
  role_name: string;
};

type Agence = {
  id: string;
  libelle: string;
};

type RolesResponse = {
  data: Role[];
};

type AgencesResponse = {
  data: Agence[];
};

type Props = {
  onClose?: () => void;
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
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function RegisterForm({
  onClose,
}: Props) {

  /* ---------------------------------------------------------------------- */
  /* FORM                                                                   */
  /* ---------------------------------------------------------------------- */

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<RegisterDto>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterDto>({
    defaultValues: {
      is_caisse_user: false,
    },
  });

  /* ---------------------------------------------------------------------- */
  /* MUTATION                                                               */
  /* ---------------------------------------------------------------------- */

  const {
    mutate,
    isPending,
  } = useRegister();

  /* ---------------------------------------------------------------------- */
  /* DATA                                                                   */
  /* ---------------------------------------------------------------------- */

  const {
    data: rolesResponse,
  } = useRoles() as {
    data?: Role[] | RolesResponse;
  };

  const {
    data: agencesResponse,
  } = useAgences() as {
    data?: Agence[] | AgencesResponse;
  };

  const roles: Role[] =
    Array.isArray(
      rolesResponse
    )
      ? rolesResponse
      : rolesResponse?.data || [];

  const agences: Agence[] =
    Array.isArray(
      agencesResponse
    )
      ? agencesResponse
      : agencesResponse?.data || [];

  /* ---------------------------------------------------------------------- */
  /* STATE                                                                  */
  /* ---------------------------------------------------------------------- */

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    appMessage,
    setAppMessage,
  ] =
    useState<MessageState | null>(
      null
    );

  /* ---------------------------------------------------------------------- */
  /* SUBMIT                                                                 */
  /* ---------------------------------------------------------------------- */

  const onSubmit = (
    data: RegisterDto
  ) => {

    mutate(data, {

      onSuccess: () => {

        setAppMessage({
          variant: "success",

          title: "Succès",

          message:
            "Utilisateur créé avec succès",
        });

        // reset();
        reset({
          is_caisse_user: false,
        });

        setTimeout(() => {
          onClose?.();
        }, 700);
      },

      onError: (
        error: unknown
      ) => {

        const err =
          error as AxiosError<{
            message?: string;
          }>;

        setAppMessage({
          variant: "error",

          title:
            "Création refusée",

          message:
            err.response
              ?.data
              ?.message ||
            "Erreur lors de la création",
        });
      },
    });
  };

  /* ---------------------------------------------------------------------- */
  /* RENDER                                                                 */
  /* ---------------------------------------------------------------------- */

  return (

    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-5"
    >

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
            setAppMessage(null)
          }
        />

      )}

      {/* USERNAME */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Nom utilisateur
        </label>

        <div className="relative">

          <User2
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            {...register(
              "user_name",
              {
                required:
                  "Champ requis",
              }
            )}
            placeholder="Ex: DKAPANGA"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3
              pl-10
              pr-4
              text-sm
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          />

        </div>

        {errors.user_name && (

          <p className="text-xs text-red-500">
            {
              errors.user_name
                .message
            }
          </p>

        )}

      </div>

      {/* PHONE */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Téléphone
        </label>

        <div className="relative">

          <Phone
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            {...register(
              "phone",
              {
                required:
                  "Champ requis",
              }
            )}
            placeholder="+243..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3
              pl-10
              pr-4
              text-sm
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          />

        </div>

      </div>

      {/* EMAIL */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Adresse email
        </label>

        <div className="relative">

          <Mail
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="email"
            {...register(
              "email",
              {
                required:
                  "Champ requis",
              }
            )}
            placeholder="email@exemple.com"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3
              pl-10
              pr-4
              text-sm
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          />

        </div>

      </div>

      {/* PASSWORD */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Mot de passe
        </label>

        <div className="relative">

          <Lock
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            {...register(
              "password",
              {
                required:
                  "Champ requis",
              }
            )}
            placeholder="********"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3
              pl-10
              pr-12
              text-sm
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (s) => !s
              )
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          >

            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}

          </button>

        </div>

      </div>

      {/* ROLE */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Rôle
        </label>

        <div className="relative">

          <ShieldCheck
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <select
            {...register(
              "role_id",
              {
                required:
                  "Champ requis",
              }
            )}
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3
              pl-10
              pr-4
              text-sm
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          >

            <option value="">
              Choisir un rôle
            </option>

            {roles.map(
              (role) => (

                <option
                  key={role.id}
                  value={role.id}
                >
                  {
                    role.role_name
                  }
                </option>

              )
            )}

          </select>

        </div>

      </div>

      {/* AGENCE */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Agence
        </label>

        <div className="relative">

          <Building2
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <select
            {...register(
              "agence_id",
              {
                required:
                  "Champ requis",
              }
            )}
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-white
              py-3
              pl-10
              pr-4
              text-sm
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
            "
          >

            <option value="">
              Choisir une agence
            </option>

            {agences.map(
              (a) => (

                <option
                  key={a.id}
                  value={a.id}
                >
                  {a.libelle}
                </option>

              )
            )}

          </select>

        </div>

      </div>

      {/* TYPE UTILISATEUR */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-medium
            text-slate-700
          "
        >
          Type d'utilisateur
        </label>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
          "
        >

          <input
            id="is_caisse_user"
            type="checkbox"
            {...register("is_caisse_user")}
            className="
              h-4
              w-4
              rounded
              border-slate-300
              text-indigo-600
              focus:ring-indigo-500
            "
          />

          <label
            htmlFor="is_caisse_user"
            className="
              text-sm
              text-slate-700
              cursor-pointer
            "
          >
            Cet utilisateur est un caissier
          </label>

        </div>

      </div>

      {/* BUTTON */}

      <Button
        type="submit"
        loading={isPending}
        className="
          w-full
          bg-indigo-600
          hover:bg-indigo-700
        "
      >
        {isPending
          ? "Création..."
          : "Créer un utilisateur"}
      </Button>

    </form>
  );
}