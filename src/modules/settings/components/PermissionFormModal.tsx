// src/modules/settings/components/PermissionFormModal.tsx

import {
  useEffect,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  X,
} from "lucide-react";

import {
  useCreatePermission,
  useUpdatePermission,
} from "../hooks/usePermissions";

import type {
  Permission,
} from "../types";

type Props = {
  open: boolean;

  onClose: () => void;

  permission?: Permission | null;
};

type FormData = {
  code: string;

  permission_name: string;

  description?: string;
};

export default function PermissionFormModal({
  open,
  onClose,
  permission,
}: Props) {

  const isEdit =
    !!permission;

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const createMutation =
    useCreatePermission();

  const updateMutation =
    useUpdatePermission();

  useEffect(() => {

    if (!open) return;

    if (permission) {

      reset({
        code:
          permission.code,

        permission_name:
          permission.permission_name,

        description:
          permission.description ||
          "",
      });

    } else {

      reset({
        code: "",
        permission_name: "",
        description: "",
      });

    }

  }, [
    permission,
    reset,
    open,
  ]);

  const onSubmit = (
    data: FormData
  ) => {

    if (isEdit) {

      updateMutation.mutate(
        {
          id:
            permission.id,

          data,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );

      return;
    }

    createMutation.mutate(
      data,
      {
        onSuccess: () => {
          onClose();
        },
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
          max-w-xl
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

          <div>

            <h2
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              {isEdit
                ? "Modifier la permission"
                : "Nouvelle permission"}
            </h2>

          </div>

          <button
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        {/* BODY */}

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
              "
            >
              Code
            </label>

            <input
              {...register(
                "code",
                {
                  required:
                    true,
                }
              )}
              placeholder="client.create"
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
              "
            >
              Nom
            </label>

            <input
              {...register(
                "permission_name",
                {
                  required:
                    true,
                }
              )}
              placeholder="Créer un client"
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
              "
            >
              Description
            </label>

            <textarea
              rows={4}
              {...register(
                "description"
              )}
              placeholder="Autorise la création des clients"
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
              "
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={
                createMutation.isPending ||
                updateMutation.isPending
              }
              className="
                rounded-2xl
                bg-blue-600
                px-5
                py-3
                font-medium
                text-white
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