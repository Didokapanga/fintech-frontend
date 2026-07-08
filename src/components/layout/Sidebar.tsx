// src/layouts/Sidebar.tsx

import {
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  NavLink,
  // useNavigate,
} from "react-router-dom";

import NavItem from "./NavItem";

import {
  useAuthStore,
} from "../../app/store";
import { getNavItems } from "./nav.config";
import NavGroup from "./NavGroup";

export default function Sidebar() {

  const [
    collapsed,
    setCollapsed,
  ] = useState(() => {

    const saved =
      localStorage.getItem(
        "sidebar-collapsed"
      );

    return saved === "true";
  });

  const user =
    useAuthStore(
      (s) => s.user
    );

  const logout =
    useAuthStore(
      (s) => s.logout
    );

  /* ====================================================== */
  /* PERSIST SIDEBAR STATE */
  /* ====================================================== */

  useEffect(() => {

    localStorage.setItem(
      "sidebar-collapsed",
      String(collapsed)
    );

  }, [collapsed]);

  /* ====================================================== */
  /* BASE PATH */
  /* ====================================================== */

  const basePath =
    user?.is_caisse_user
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
          relative
          flex
          justify-center
          items-center
          py-1
          border-b
          border-slate-100
        "
      >

        <NavLink
          to={basePath}
          className="
            flex
            justify-center
            py-2
          "
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="
              h-12
              w-auto
              object-contain
            "
          />
        </NavLink>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="
              absolute
              right-3
              top-3
            "
          >
            <ChevronLeft size={18} />
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

          {
            getNavItems({
              role:
                user?.role_name,

              isCaisseUser:
                user?.is_caisse_user,
            }).map((item) =>

              item.children ? (

                <NavGroup
                  key={item.label}
                  item={item}
                  collapsed={collapsed}
                />

              ) : (

                <NavItem
                  key={item.path}
                  item={item}
                  collapsed={collapsed}
                />

              )
            )
          }

        </div>

      </div>

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
