import { navItems } from "./nav.config";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r p-4 flex flex-col">
      <div className="text-xl font-bold mb-6">💰 Fintech</div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  );
}