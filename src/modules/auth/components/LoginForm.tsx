// src/modules/auth/components/LoginForm.tsx

import { useState } from "react";

import {
  Eye,
  EyeOff,
  Lock,
  User2,
  ArrowRight,
} from "lucide-react";

import { useForm }
from "react-hook-form";

import {
  useLogin,
} from "../hooks/useAuth";

import type {
  LoginDto,
} from "../types";

import {
  useAuthStore,
} from "../../../app/store";

import type {
  AuthResponse,
} from "../types";

import {
  useApiMutationWithFeedback,
} from "../../../hooks/useApiMutationWithFeedback";

import AppMessageState
from "../../../components/ui/AppMessageState";

/* ======================================================== */
/* COMPONENT */
/* ======================================================== */

export default function LoginForm() {

  /* ====================================================== */
  /* FORM */
  /* ====================================================== */

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginDto>();

  /* ====================================================== */
  /* STORE */
  /* ====================================================== */

  const setAuth =
    useAuthStore(
      (s) => s.setAuth
    );

  /* ====================================================== */
  /* STATE */
  /* ====================================================== */

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  /* ====================================================== */
  /* LOGIN */
  /* ====================================================== */

  const loginMutation =
    useLogin();

  const {
    mutate,
    isPending,
    appMessage,
    clearMessage,
  } =
    useApiMutationWithFeedback<
      AuthResponse,
      LoginDto
    >({

      mutationFn:
        loginMutation.mutateAsync,

      successMessage:
        "Connexion réussie",

      errorMessage:
        "Identifiants invalides",

      onSuccess: (
        res
      ) => {

        setAuth({
          token: res.token,

          user: {
            id: res.user.id,

            user_name: res.user.user_name,

            role_name: res.user.role_name,

            agence_id: res.user.agence_id,

            agence_name: res.user.agence_name,

            code_agence: res.user.code_agence,

            permissions:
              res.user.permissions ?? [],
          },
        });

        const role =
          res.user.role_name;

        if (role === "CAISSIER") {

          window.location.href =
            "/caissier";

        } else {

          window.location.href =
            "/admin";
        }
      },
    });

  /* ====================================================== */
  /* SUBMIT */
  /* ====================================================== */

  const onSubmit = (
    data: LoginDto
  ) => {

    mutate(data);
  };

  /* ====================================================== */
  /* RENDER */
  /* ====================================================== */

  return (

    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-6"
    >

      {/* ================================================== */}
      {/* ALERT */}
      {/* ================================================== */}

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
          onAction={
            clearMessage
          }
        />

      )}

      {/* ================================================== */}
      {/* USERNAME */}
      {/* ================================================== */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Nom utilisateur
        </label>

        <div className="relative">

          <div
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          >

            <User2 size={18} />

          </div>

          <input
            {...register(
              "user_name",
              {
                required:
                  "Le nom utilisateur est requis",
              }
            )}

            placeholder="Entrez votre identifiant"

            className={`
              w-full
              rounded-2xl
              border
              bg-slate-50
              py-3.5
              pl-12
              pr-4
              text-sm
              text-slate-800
              outline-none
              transition-all
              focus:border-indigo-400
              focus:bg-white
              focus:ring-4
              focus:ring-indigo-100
              ${
                errors.user_name
                  ? "border-red-400"
                  : "border-slate-200"
              }
            `}
          />

        </div>

        {errors.user_name && (

          <p
            className="
              text-xs
              font-medium
              text-red-500
            "
          >
            {
              errors.user_name
                .message
            }
          </p>

        )}

      </div>

      {/* ================================================== */}
      {/* PASSWORD */}
      {/* ================================================== */}

      <div className="space-y-2">

        <label
          className="
            text-sm
            font-semibold
            text-slate-700
          "
        >
          Mot de passe
        </label>

        <div className="relative">

          {/* LEFT ICON */}

          <div
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          >

            <Lock size={18} />

          </div>

          {/* INPUT */}

          <input
            {...register(
              "password",
              {
                required:
                  "Le mot de passe est requis",
              }
            )}

            type={
              showPassword
                ? "text"
                : "password"
            }

            placeholder="••••••••"

            className={`
              w-full
              rounded-2xl
              border
              bg-slate-50
              py-3.5
              pl-12
              pr-12
              text-sm
              text-slate-800
              outline-none
              transition-all
              focus:border-indigo-400
              focus:bg-white
              focus:ring-4
              focus:ring-indigo-100
              ${
                errors.password
                  ? "border-red-400"
                  : "border-slate-200"
              }
            `}
          />

          {/* TOGGLE */}

          <button
            type="button"

            onClick={() =>
              setShowPassword(
                (s) => !s
              )
            }

            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              transition-all
              hover:text-slate-600
            "
          >

            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}

          </button>

        </div>

        {errors.password && (

          <p
            className="
              text-xs
              font-medium
              text-red-500
            "
          >
            {
              errors.password
                .message
            }
          </p>

        )}

      </div>

      {/* ================================================== */}
      {/* OPTIONS */}
      {/* ================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          text-sm
        "
      >

        <label
          className="
            flex
            items-center
            gap-2
            text-slate-500
          "
        >

          <input
            type="checkbox"
            className="
              rounded
              border-slate-300
              text-indigo-600
              focus:ring-indigo-500
            "
          />

          Se souvenir de moi

        </label>

        <button
          type="button"
          className="
            font-medium
            text-indigo-600
            transition-all
            hover:text-indigo-700
          "
        >
          Assistance
        </button>

      </div>

      {/* ================================================== */}
      {/* BUTTON */}
      {/* ================================================== */}

      <button
        type="submit"

        disabled={
          isPending
        }

        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          to-blue-500
          px-4
          py-3.5
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-indigo-200
          transition-all
          hover:scale-[1.01]
          hover:from-indigo-700
          hover:to-blue-600
          disabled:cursor-not-allowed
          disabled:opacity-70
          disabled:hover:scale-100
        "
      >

        {isPending ? (
          "Connexion..."
        ) : (
          <>
            Se connecter

            <ArrowRight
              size={16}
              className="
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </>
        )}

      </button>

    </form>
  );
}