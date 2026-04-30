// src/modules/auth/components/LoginForm.tsx

import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";
import type { LoginDto } from "../types";
import { useAuthStore } from "../../../app/store";
import { useState } from "react";

import { useApiMutationWithFeedback } from "../../../hooks/useApiMutationWithFeedback";
import AppMessageState from "../../../components/ui/AppMessageState";

type LoginResponse = {
  token: string;
  user: {
    id: string;
    user_name: string;
    role_name: string;
    agence_id?: string;
    agence_name?: string;
  };
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();

  const loginMutation = useLogin();

  const setAuth = useAuthStore((s) => s.setAuth);

  const [showPassword, setShowPassword] = useState(false);

  // ✅ 🔥 HOOK CENTRALISÉ
  const {
    mutate,
    isPending,
    appMessage,
    clearMessage,
  } = useApiMutationWithFeedback<LoginResponse, LoginDto>({
    mutationFn: loginMutation.mutateAsync,

    successMessage: "Connexion réussie",

    onSuccess: (res) => {
      // 🔐 stockage auth
      setAuth({
        token: res.token,
        user: {
          id: res.user.id,
          user_name: res.user.user_name,
          role_name: res.user.role_name,
          agence_id: res.user.agence_id,
          agence_name: res.user.agence_name,
        },
      });

      // 🔥 redirection
      window.location.href = "/";
    },

    errorMessage: "Identifiants invalides",
  });

  const onSubmit = (data: LoginDto) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* MESSAGE */}
      {appMessage && (
        <AppMessageState
          variant={appMessage.variant}
          title={appMessage.title}
          message={appMessage.message}
          onAction={clearMessage}
        />
      )}

      {/* USERNAME */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Nom utilisateur
        </label>

        <input
          {...register("user_name", { required: "Champ requis" })}
          placeholder="ex: admin"
          className={`
            w-full px-4 py-2.5 rounded-xl border
            bg-gray-50 text-gray-800
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white
            transition
            ${errors.user_name ? "border-red-500" : "border-gray-200"}
          `}
        />

        {errors.user_name && (
          <p className="text-red-500 text-xs">
            {errors.user_name.message}
          </p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Mot de passe
        </label>

        <div className="relative">
          <input
            {...register("password", { required: "Champ requis" })}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`
              w-full px-4 py-2.5 pr-10 rounded-xl border
              bg-gray-50 text-gray-800
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white
              transition
              ${errors.password ? "border-red-500" : "border-gray-200"}
            `}
          />

          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-xs">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isPending}
        className="
          w-full py-2.5 rounded-xl font-medium text-white
          bg-gradient-to-r from-indigo-600 to-blue-500
          hover:from-indigo-700 hover:to-blue-600
          transition-all duration-200
          shadow-md hover:shadow-lg
          disabled:opacity-70 disabled:cursor-not-allowed
        "
      >
        {isPending ? "Connexion..." : "Se connecter"}
      </button>

    </form>
  );
}