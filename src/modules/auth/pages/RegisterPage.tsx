// src/modules/auth/pages/RegisterPage.tsx

import { useMemo, useState } from "react";

import {
  Building2,
  Mail,
  Phone,
  Plus,
  ShieldCheck,
  User2,
  Users,
} from "lucide-react";

import {
  Button,
  Table,
} from "../../../components/ui";

import type {
  Column,
} from "../../../components/ui/Table.types";

import RegisterForm
from "../components/RegisterForm";

import {
  useUsers,
} from "../hooks/useAuth";

import type {
  User,
} from "../types";

import Modal
from "../../../components/ui/Modal";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

// type UsersResponse = {
//   success: boolean;

//   message: string;

//   data: User[];
// };

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function RegisterPage() {

  /* ---------------------------------------------------------------------- */
  /* STATE                                                                  */
  /* ---------------------------------------------------------------------- */

  const [open, setOpen] =
    useState(false);

  /* ---------------------------------------------------------------------- */
/* QUERY                                                                  */
/* ---------------------------------------------------------------------- */

const {
  data,
  isLoading,
} = useUsers();

const users = useMemo<User[]>(() => {

  if (Array.isArray(data)) {
    return data;
  }

  return [];

}, [data]);

  /* ---------------------------------------------------------------------- */
  /* STATS                                                                  */
  /* ---------------------------------------------------------------------- */

  const stats =
    useMemo(() => {

      const total =
        users.length;

      const actifs =
        users.filter(
          (u) =>
            u.is_activated
        ).length;

      const admins =
        users.filter(
          (u) =>
            u.role_name ===
            "ADMIN"
        ).length;

      return {
        total,
        actifs,
        admins,
      };

    }, [users]);

  /* ---------------------------------------------------------------------- */
  /* ROLE STYLE                                                             */
  /* ---------------------------------------------------------------------- */

  const getRoleStyle = (
    role: string
  ) => {

    const styles:
      Record<
        string,
        string
      > = {

      ADMIN:
        "bg-purple-100 text-purple-700",

      CAISSIER:
        "bg-blue-100 text-blue-700",

      "N+1":
        "bg-emerald-100 text-emerald-700",

      "N+2":
        "bg-emerald-100 text-emerald-700",
    };

    return (
      styles[role] ||
      "bg-slate-100 text-slate-700"
    );
  };

  /* ---------------------------------------------------------------------- */
  /* TABLE                                                                  */
  /* ---------------------------------------------------------------------- */

  const columns:
    Column<User>[] = [

    {
      header:
        "Utilisateur",

      accessor:
        "user_name",

      render: (
        value,
        row
      ) => (

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-indigo-50
              text-indigo-600
            "
          >

            <User2
              size={18}
            />

          </div>

          <div className="flex flex-col">

            <span
              className="
                font-semibold
                text-slate-800
              "
            >
              {String(
                value
              )}
            </span>

            <span
              className="
                flex
                items-center
                gap-1
                text-xs
                text-slate-500
              "
            >

              <Mail
                size={12}
              />

              {row.email}

            </span>

          </div>

        </div>
      ),
    },

    {
      header:
        "Téléphone",

      accessor:
        "phone",

      render: (
        value
      ) => (

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-700
          "
        >

          <Phone
            size={14}
            className="
              text-slate-400
            "
          />

          {String(
            value || "-"
          )}

        </div>
      ),
    },

    {
      header:
        "Rôle",

      accessor:
        "role_name",

      render: (
        value
      ) => {

        const role =
          String(value);

        return (

          <span
            className={`
              inline-flex
              items-center
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${getRoleStyle(
                role
              )}
            `}
          >
            {role}
          </span>
        );
      },
    },

    {
      header:
        "Agence",

      accessor:
        "agence_name",

      render: (
        value,
        row
      ) => (

        <div className="flex items-start gap-2">

          <Building2
            size={15}
            className="
              mt-0.5
              text-slate-400
            "
          />

          <div className="flex flex-col">

            <span
              className="
                text-sm
                font-medium
                text-slate-700
              "
            >
              {String(
                value || "—"
              )}
            </span>

            <span
              className="
                text-xs
                text-slate-500
              "
            >
              {row.ville ||
                "—"}
            </span>

          </div>

        </div>
      ),
    },

    {
      header:
        "Statut",

      accessor:
        "is_activated",

      render: (
        value
      ) => {

        const isActive =
          Boolean(value);

        return (

          <span
            className={`
              inline-flex
              items-center
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {isActive
              ? "Actif"
              : "Inactif"}
          </span>
        );
      },
    },
  ];

  /* ---------------------------------------------------------------------- */
  /* RENDER                                                                 */
  /* ---------------------------------------------------------------------- */

  return (

    <div
      className="
        min-h-screen
      "
    >

      <div
        className="
          mx-auto
          max-w-[1700px]
          space-y-6
          px-0
          py-0
        "
      >

        {/* HERO */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            px-8
            py-8
          "
        >

          <div
            className="
              absolute
              right-0
              top-0
              h-80
              w-80
              rounded-full
              bg-indigo-50
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-8
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-indigo-100
                  bg-indigo-50
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-indigo-700
                "
              >

                <ShieldCheck
                  size={13}
                />

                Administration utilisateurs

              </div>

              <h1
                className="
                  mt-5
                  text-[40px]
                  font-semibold
                  tracking-[-0.04em]
                  text-slate-900
                "
              >
                Gestion des utilisateurs
              </h1>

            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-3
              "
            >

              <StatCard
                title="Utilisateurs"
                value={stats.total}
                icon={<Users size={18} />}
                color="indigo"
              />

              <StatCard
                title="Comptes actifs"
                value={stats.actifs}
                icon={<ShieldCheck size={18} />}
                color="emerald"
              />

              <StatCard
                title="Administrateurs"
                value={stats.admins}
                icon={<Users size={18} />}
                color="purple"
              />

            </div>

          </div>

        </section>

        {/* CONTENT */}

        <section
          className="
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            p-6
          "
        >

          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              gap-4
              flex-wrap
            "
          >

            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                  text-slate-900
                "
              >
                Liste des utilisateurs
              </h2>

            </div>

            <Button
              onClick={() =>
                setOpen(true)
              }
              className="
                bg-indigo-600
                hover:bg-indigo-700
              "
            >

              <Plus
                size={16}
              />

              Nouvel utilisateur

            </Button>

          </div>

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
            "
          >

            <Table<User>
              data={users}
              columns={columns}
              loading={isLoading}
            />

          </div>

        </section>

      </div>

      {/* MODAL */}

      <Modal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        title="Créer un utilisateur"
      >

        <RegisterForm />

      </Modal>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 STAT CARD                                  */
/* -------------------------------------------------------------------------- */

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color:
    | "indigo"
    | "emerald"
    | "purple";
}) {

  const styles = {
    indigo:
      "bg-indigo-100 text-indigo-600",

    emerald:
      "bg-emerald-100 text-emerald-600",

    purple:
      "bg-purple-100 text-purple-600",
  };

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-slate-50
        p-5
        min-w-[180px]
      "
    >

      <div
        className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          ${styles[color]}
        `}
      >
        {icon}
      </div>

      <p
        className="
          mt-4
          text-xs
          font-semibold
          uppercase
          tracking-[0.12em]
          text-slate-400
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-1
          text-2xl
          font-bold
          text-slate-900
        "
      >
        {value}
      </h3>

    </div>
  );
}