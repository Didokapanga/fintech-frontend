import { navItems } from "./nav.config";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen border-r p-4 flex flex-col">

      {/* 🔥 LOGO */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <img
          src="/logo.png"
          alt="Fintech Logo"
          className="w-16 h-16 object-contain rounded-xl"
        />

        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-gray-800">
            Fintech
          </span>

          <span className="text-xs text-gray-500">
            Financial System
          </span>
        </div>
      </div>

      {/* 🔥 NAVIGATION */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  );
}


// import { navItems } from "./nav.config";
// import NavItem from "./NavItem";

// export default function Sidebar() {
//   return (
//     <aside className="w-64  bg-white h-screen border-r p-4 flex flex-col">
//       <div className="text-xl font-bold mb-6">💰 Fintech</div>

//       <nav className="space-y-2">
//         {navItems.map((item) => (
//           <NavItem key={item.path} item={item} />
//         ))}
//       </nav>
//     </aside>
//   );
// }