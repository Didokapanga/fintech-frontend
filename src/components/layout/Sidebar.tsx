// src/layouts/Sidebar.tsx

import {
  Wallet,
  ArrowLeftRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { useState } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import NavItem from "./NavItem";

import {
  useAuthStore,
} from "../../app/store";
import { getNavItems } from "./nav.config";

export default function Sidebar() {

  const navigate =
    useNavigate();

  const [
    collapsed,
    setCollapsed,
  ] = useState(false);

  const user =
    useAuthStore(
      (s) => s.user
    );

  const logout =
    useAuthStore(
      (s) => s.logout
    );

  /* ====================================================== */
  /* BASE PATH */
  /* ====================================================== */

  const basePath =
    user?.role_name ===
    "CAISSIER"
      ? "/caissier"
      : "/admin";

  return (

    <aside
      className={`
        relative
        h-screen
        border-r
        border-slate-200
        bg-white
        transition-all
        duration-300
        flex
        flex-col
        shadow-sm
        ${
          collapsed
            ? "w-[92px]"
            : "w-[290px]"
        }
      `}
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          px-5
          py-5
          border-b
          border-slate-100
        "
      >

        <NavLink
          to={basePath}
          className={`
            flex
            items-center
            gap-3
            overflow-hidden
            transition-all
            ${
              collapsed
                ? "justify-center w-full"
                : ""
            }
          `}
        >

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-600
              to-indigo-500
              shadow-md
              shrink-0
            "
          >

            <img
              src="/logo.png"
              alt="Fintech Logo"
              className="
                h-10
                w-10
                object-contain
              "
            />

          </div>

          {!collapsed && (

            <div className="leading-tight">

              <h1
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Fintech
              </h1>

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Financial System
              </p>

            </div>

          )}

        </NavLink>

        {!collapsed && (

          <button
            onClick={() =>
              setCollapsed(true)
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-500
              hover:bg-slate-100
              transition-all
            "
          >

            <ChevronLeft
              size={18}
            />

          </button>

        )}

      </div>

      {/* ================================================= */}
      {/* COLLAPSE BTN */}
      {/* ================================================= */}

      {collapsed && (

        <button
          onClick={() =>
            setCollapsed(false)
          }
          className="
            absolute
            right-[-14px]
            top-6
            z-20
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            shadow-md
            hover:bg-slate-50
            transition-all
          "
        >

          <ChevronRight
            size={16}
          />

        </button>

      )}

      {/* ================================================= */}
      {/* USER CARD */}
      {/* ================================================= */}

      <div className="px-4 pt-5">

        <div
          className={`
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            transition-all
            ${
              collapsed
                ? "p-3"
                : "p-4"
            }
          `}
        >

          <div
            className={`
              flex
              items-center
              ${
                collapsed
                  ? "justify-center"
                  : "gap-3"
              }
            `}
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-indigo-100
                text-indigo-600
                font-bold
                text-sm
                shrink-0
              "
            >

              {user?.user_name
                ?.slice(0, 2)
                ?.toUpperCase() ||
                "US"}

            </div>

            {!collapsed && (

              <div className="min-w-0">

                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  {user?.user_name}
                </p>

                <p
                  className="
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {user?.role_name}
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* NAVIGATION */}
      {/* ================================================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-3
          py-5
        "
      >

        <div className="space-y-1.5">

          {getNavItems(user?.role_name).map(
            (item) => (

              <NavItem
                key={item.path}
                item={item}
                collapsed={collapsed}
              />

            )
          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* QUICK ACCESS */}
      {/* ================================================= */}

      {!collapsed && (

        <div className="px-4 pb-4">

          <div
            className="
              rounded-3xl
              border
              border-indigo-100
              bg-gradient-to-br
              from-indigo-50
              to-white
              p-4
            "
          >

            <h3
              className="
                text-sm
                font-semibold
                text-slate-800
              "
            >
              Accès rapide
            </h3>

            <div
              className="
                mt-4
                grid
                grid-cols-3
                gap-2
              "
            >

              <QuickAction
                icon={
                  <Wallet size={16} />
                }
                label="Caisses"
                onClick={() =>
                  navigate(
                    `${basePath}/caisses`
                  )
                }
              />

              <QuickAction
                icon={
                  <ArrowLeftRight
                    size={16}
                  />
                }
                label="Transferts"
                onClick={() =>
                  navigate(
                    `${basePath}/transfert-client`
                  )
                }
              />

              <QuickAction
                icon={
                  <ShieldCheck
                    size={16}
                  />
                }
                label="Validation"
                onClick={() =>
                  navigate(
                    `${basePath}/validation`
                  )
                }
              />

            </div>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <div
        className="
          border-t
          border-slate-100
          p-4
        "
      >

        <button
          onClick={logout}
          className={`
            flex
            w-full
            items-center
            rounded-2xl
            px-4
            py-3
            text-sm
            font-medium
            text-red-600
            transition-all
            hover:bg-red-50
            ${
              collapsed
                ? "justify-center"
                : "gap-3"
            }
          `}
        >

          <LogOut size={18} />

          {!collapsed && (
            <span>
              Déconnexion
            </span>
          )}

        </button>

      </div>

    </aside>
  );
}

/* ======================================================== */
/* QUICK ACTION */
/* ======================================================== */

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {

  return (

    <button
      onClick={onClick}
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-3
        text-slate-600
        transition-all
        hover:border-indigo-200
        hover:bg-indigo-50
        hover:text-indigo-600
      "
    >

      {icon}

      <span
        className="
          text-[10px]
          font-medium
        "
      >
        {label}
      </span>

    </button>

  );
}