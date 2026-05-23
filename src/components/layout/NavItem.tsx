// src/components/layout/NavItem.tsx

import { NavLink } from "react-router-dom";

type NavItemType = {
  label: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
};

type Props = {
  item: NavItemType;

  collapsed?: boolean;
};

export default function NavItem({
  item,
  collapsed = false,
}: Props) {

  const Icon = item.icon;

  return (

    <NavLink
      to={item.path}
      className={({
        isActive,
      }) =>
        `
          group
          relative
          flex
          items-center
          rounded-2xl
          px-4
          py-3
          text-sm
          font-medium
          transition-all
          duration-200
          ${
            collapsed
              ? "justify-center"
              : "gap-3"
          }
          ${
            isActive
              ? `
                bg-indigo-600
                text-white
                shadow-lg
                shadow-indigo-100
              `
              : `
                text-slate-600
                hover:bg-slate-100
                hover:text-slate-900
              `
          }
        `
      }
    >

      {({
        isActive,
      }) => (

        <>
          {/* ICON */}

          <div
            className={`
              shrink-0
              transition-all
              ${
                isActive
                  ? "text-white"
                  : "text-slate-400 group-hover:text-slate-700"
              }
            `}
          >

            <Icon size={20} />

          </div>

          {/* LABEL */}

          {!collapsed && (

            <span className="truncate">
              {item.label}
            </span>

          )}

          {/* ACTIVE BAR */}

          {isActive && !collapsed && (

            <div
              className="
                absolute
                right-3
                h-2
                w-2
                rounded-full
                bg-white
              "
            />

          )}

        </>

      )}

    </NavLink>

  );
}