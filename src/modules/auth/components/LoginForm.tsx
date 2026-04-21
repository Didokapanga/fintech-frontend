import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";
import type { LoginDto } from "../types";
import { toast } from "sonner";
import { useAuthStore } from "../../../app/store";
import type { AxiosError } from "axios";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();

  const { mutate, isPending } = useLogin();
  const setToken = useAuthStore((s) => s.setToken);

  const onSubmit = (data: LoginDto) => {
    console.log("LOGIN DATA:", data);

    mutate(data, {
      onSuccess: (res) => {
        console.log("✅ LOGIN SUCCESS:", res);

        // 🔥 FIX ICI
        setToken(res.token);

        toast.success("Connexion réussie");

        window.location.href = "/";
      },

      onError: (error: unknown) => {
        const err = error as AxiosError<{ message?: string }>;

        console.log("❌ LOGIN ERROR:", err.response?.data);

        const message =
          err.response?.data?.message || "Identifiants invalides";

        toast.error(message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Nom utilisateur</label>
        <input
          {...register("user_name", { required: "Champ requis" })}
          className="w-full mt-1 px-3 py-2 border rounded-lg"
          placeholder="ex: admin"
        />
        {errors.user_name && (
          <p className="text-red-500 text-sm">{errors.user_name.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Mot de passe</label>
        <input
          {...register("password", { required: "Champ requis" })}
          type="password"
          className="w-full mt-1 px-3 py-2 border rounded-lg"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg"
      >
        {isPending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}