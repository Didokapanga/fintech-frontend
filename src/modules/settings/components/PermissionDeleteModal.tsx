// src/modules/settings/components/PermissionDeleteModal.tsx

import {
  AlertTriangle,
  X,
} from "lucide-react";

import {
  useDeletePermission,
} from "../hooks/usePermissions";

import type {
  Permission,
} from "../types";

type Props = {
  open: boolean;

  onClose: () => void;

  permission?: Permission | null;
};

export default function PermissionDeleteModal({
  open,
  onClose,
  permission,
}: Props) {

  const deleteMutation =
    useDeletePermission();

  if (
    !open ||
    !permission
  ) {
    return null;
  }

  const handleDelete =
    () => {

      deleteMutation.mutate(
        permission.id,
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    };

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
          max-w-md
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >

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

          <h2
            className="
              text-lg
              font-bold
            "
          >
            Supprimer permission
          </h2>

          <button
            onClick={onClose}
          >
            <X size={18} />
          </button>

        </div>

        <div
          className="
            p-6
          "
        >

          <div
            className="
              mb-5
              flex
              justify-center
            "
          >

            <AlertTriangle
              size={48}
              className="
                text-red-500
              "
            />

          </div>

          <p
            className="
              text-center
              text-slate-600
            "
          >
            Voulez-vous vraiment supprimer la permission
          </p>

          <p
            className="
              mt-2
              text-center
              font-semibold
              text-slate-900
            "
          >
            {permission.code}
          </p>

          <div
            className="
              mt-6
              flex
              justify-end
              gap-3
            "
          >

            <button
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
              onClick={
                handleDelete
              }
              disabled={
                deleteMutation.isPending
              }
              className="
                rounded-2xl
                bg-red-600
                px-5
                py-3
                font-medium
                text-white
              "
            >
              Supprimer
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}