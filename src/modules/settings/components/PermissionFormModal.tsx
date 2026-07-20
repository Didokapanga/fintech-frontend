// src/modules/settings/components/PermissionFormModal.tsx

import {
  useEffect,
  useState,
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
import AppMessageState from "../../../components/ui/AppMessageState";

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
    formState: {
      errors,
    },
  } = useForm<FormData>({
    defaultValues: {
      code: "",
      permission_name: "",
      description: "",
    },
  });

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
  const createMutation =
    useCreatePermission();

  const [
    appMessage,
    setAppMessage,
  ] =
    useState<MessageState | null>(
      null
    );

  const updateMutation =
    useUpdatePermission();

    useEffect(() => {

      if (!open) return;

      if (permission) {

        reset({
          code: permission.code,
          permission_name:
            permission.permission_name,
          description:
            permission.description ?? "",
        });

      }

  }, [
    open,
    permission,
    reset,
  ]);
  

  const onSubmit = (
    data: FormData
  ) => {

    console.log(
      "FORM DATA =>",
      data
    );

    if (isEdit && permission) {

      updateMutation.mutate(
      {
        id: permission.id,
        data,
      },
      {
        onSuccess: () => {
          onClose();
        },

        onError: (error) => {

          const apiError =
            error as ErrorWithResponse;

          setAppMessage({
            variant: "error",
            title: "Modification refusée",
            message:
              apiError?.response?.data?.message ||
              "Impossible de modifier cette permission.",
          });

        },
      }
    );

      return;
    }

    createMutation.mutate(
      data,
      {
        onSuccess: () => {

          setAppMessage({
            variant: "success",
            title: "Succès",
            message: "Permission créée avec succès.",
          });

          onClose();
        },

        onError: (error) => {

          const apiError =
            error as ErrorWithResponse;

          setAppMessage({
            variant: "error",
            title: "Création refusée",
            message:
              apiError?.response?.data?.message ||
              "Impossible de créer cette permission.",
          });

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
          {appMessage && (

          <div className="mb-5">

            <AppMessageState
              variant={appMessage.variant}
              title={appMessage.title}
              message={appMessage.message}
              onAction={() =>
                setAppMessage(null)
              }
            />

          </div>

        )}

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
                    "Le code est obligatoire",
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

            {errors.code && (
              <p className="mt-1 text-sm text-red-500">
                {errors.code.message}
              </p>
            )}

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
                    "Le nom est obligatoire",
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

          {errors.permission_name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.permission_name.message}
            </p>
          )}

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