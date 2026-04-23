// src/modules/auth/components/RegisterForm.tsx

import { useForm } from "react-hook-form";
import type { RegisterDto } from "../services/auth.service";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useRegister } from "../hooks/useAuth";
import { useRoles } from "../hooks/useRoles";
import { useAgences } from "../../agence/hooks/useAgences";

// ✅ TYPES PROPRES
type Role = {
  id: string;
  role_name: string;
};

type Agence = {
  id: string;
  libelle: string;
};

type Props = {
  onClose?: () => void;
};

export default function RegisterForm({ onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterDto>();

  const { mutate, isPending } = useRegister();

  // ✅ TYPES APPLIQUÉS
  const { data: roles = [] } = useRoles() as {
    data: Role[];
  };

  const { data: agences = [] } = useAgences() as {
    data: Agence[];
  };

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegisterDto) => {
        mutate(data, {
            onSuccess: () => {
            toast.success("Utilisateur créé avec succès");

            reset();

            // 🔥 FERMER MODAL
            onClose?.();
            },

            onError: (error: unknown) => {
            const err = error as AxiosError<{ message?: string }>;

            toast.error(
                err.response?.data?.message || "Erreur lors de la création"
            );
            },
        });
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* USERNAME */}
      <div>
        <label className="text-sm">Nom utilisateur</label>
        <input
          {...register("user_name", { required: "Champ requis" })}
          className="input"
        />
        {errors.user_name && (
          <p className="text-xs text-red-500">
            {errors.user_name.message}
          </p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm">Téléphone</label>
        <input
          {...register("phone", { required: "Champ requis" })}
          className="input"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm">Email</label>
        <input
          {...register("email", { required: "Champ requis" })}
          className="input"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm">Mot de passe</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Champ requis" })}
            className="input pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-2"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* ROLE */}
      <div>
        <label className="text-sm">Rôle</label>
        <select {...register("role_id")} className="input">
          <option value="">Choisir</option>

          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.role_name}
            </option>
          ))}
        </select>
      </div>

      {/* AGENCE */}
      <div>
        <label className="text-sm">Agence</label>
        <select {...register("agence_id")} className="input">
          <option value="">Choisir</option>

          {agences.map((a) => (
            <option key={a.id} value={a.id}>
              {a.libelle}
            </option>
          ))}
        </select>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full"
      >
        {isPending ? "Création..." : "Créer un utilisateur"}
      </button>
    </form>
  );
}