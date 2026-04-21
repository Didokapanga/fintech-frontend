import { NavLink } from "react-router-dom";
import type { NavItemType } from "./nav.types";

type Props = {
  item: NavItemType;
};

export default function NavItem({ item }: Props) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <Icon size={18} />
      {item.label}
    </NavLink>
  );
}