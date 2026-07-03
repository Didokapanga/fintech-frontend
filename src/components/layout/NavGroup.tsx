import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import {
  useState,
} from "react";

import NavItem from "./NavItem";

import type {
  NavItemType,
} from "./nav.config";

type Props = {
  item: NavItemType;
  collapsed?: boolean;
};

export default function NavGroup({
  item,
  collapsed = false,
}: Props) {

  const [
    open,
    setOpen,
  ] = useState(false);

  const Icon = item.icon;

  return (

    <div>

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          flex
          w-full
          items-center
          rounded-2xl
          px-4
          py-3
          text-sm
          font-medium
          text-slate-600
          hover:bg-slate-100
        "
      >

        <Icon size={20} />

        {!collapsed && (

          <>

            <span className="ml-3 flex-1 text-left">

              {item.label}

            </span>

            {open ? (

              <ChevronDown
                size={16}
              />

            ) : (

              <ChevronRight
                size={16}
              />

            )}

          </>

        )}

      </button>

      {!collapsed &&
        open && (

          <div
            className="
              ml-4
              mt-2
              space-y-1
              border-l
              border-slate-200
              pl-3
            "
          >

            {item.children?.map(
                (child) => (

                    <NavItem
                    key={child.path}
                    item={child}
                    />

                )
            )}

          </div>

        )}

    </div>
  );
}