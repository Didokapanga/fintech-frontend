// src/modules/settings/components/roles/RoleDeleteModal.tsx

import {
  AlertTriangle,
  X,
} from "lucide-react";

import {
  useDeleteRole,
} from "../hooks/useRoles";

import type {
  Role,
} from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  role?: Role | null;
};

export default function RoleDeleteModal({
  open,
  onClose,
  role,
}: Props) {

  const deleteRole =
    useDeleteRole();

  if (
    !open ||
    !role
  ) {
    return null;
  }

  const handleDelete =
    () => {

      deleteRole.mutate(
        role.id,
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

          <h2
            className="
              text-lg
              font-bold
              text-slate-900
            "
          >
            Supprimer le rôle
          </h2>

          <button
            onClick={onClose}
          >
            <X size={18} />
          </button>

        </div>

        {/* BODY */}

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
              size={54}
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
            Voulez-vous vraiment désactiver ce rôle ?
          </p>

          <p
            className="
              mt-3
              text-center
              text-lg
              font-bold
              text-slate-900
            "
          >
            {role.role_name}
          </p>

          <div
            className="
              mt-8
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
                font-medium
              "
            >
              Annuler
            </button>

            <button
              onClick={
                handleDelete
              }
              disabled={
                deleteRole.isPending
              }
              className="
                rounded-2xl
                bg-red-600
                px-5
                py-3
                font-medium
                text-white
                transition-all
                hover:bg-red-700
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