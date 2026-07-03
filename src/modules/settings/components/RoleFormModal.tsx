// src/modules/settings/components/roles/RoleFormModal.tsx

import {
  useEffect,
} from "react";

import {
  X,
  Users,
} from "lucide-react";

import {
  useForm,
} from "react-hook-form";

import {
  useCreateRole,
  useUpdateRole,
} from "../hooks/useRoles";

import type {
  Role,
} from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  role?: Role | null;
};

type FormData = {
  role_name: string;
};

export default function RoleFormModal({
  open,
  onClose,
  role,
}: Props) {

  const isEdit =
    !!role;

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const createRole =
    useCreateRole();

  const updateRole =
    useUpdateRole();

  useEffect(() => {

    if (!open)
      return;

    if (role) {

      reset({
        role_name:
          role.role_name,
      });

    } else {

      reset({
        role_name: "",
      });

    }

  }, [
    role,
    open,
    reset,
  ]);

  const onSubmit = (
    data: FormData
  ) => {

    if (
      isEdit &&
      role
    ) {

      updateRole.mutate(
        {
          id:
            role.id,

          data,
        },
        {
          onSuccess:
            onClose,
        }
      );

      return;
    }

    createRole.mutate(
      data,
      {
        onSuccess:
          onClose,
      }
    );
  };

  if (!open)
    return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-5
          "
        >

          <div
            className="
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
                bg-indigo-100
              "
            >

              <Users
                size={20}
                className="
                  text-indigo-600
                "
              />

            </div>

            <div>

              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                {isEdit
                  ? "Modifier le rôle"
                  : "Nouveau rôle"}
              </h2>

            </div>

          </div>

          <button
            onClick={onClose}
          >

            <X size={20} />

          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="
            space-y-5
            p-6
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
              Nom du rôle
            </label>

            <input
              {...register(
                "role_name",
                {
                  required: true,
                }
              )}
              placeholder="Ex: SUPERVISEUR"
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                transition-all
                focus:border-blue-500
              "
            />

          </div>

          <div
            className="
              flex
              justify-end
              gap-3
              pt-2
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-2xl
                border
                border-slate-200
                px-5
                py-3
                font-medium
              "
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={
                createRole.isPending ||
                updateRole.isPending
              }
              className="
                rounded-2xl
                bg-blue-600
                px-5
                py-3
                font-medium
                text-white
                transition-all
                hover:bg-blue-700
              "
            >
              {isEdit
                ? "Modifier"
                : "Créer"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}