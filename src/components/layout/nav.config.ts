import {
  Home,
  Banknote,
  Repeat,
  ClipboardCheck,
  Wallet,
  FileText,
  Users,
  Building2,
  Send, // 🔥 AJOUT
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", icon: Home, path: "/" },
  { label: "Transfert client", icon: Send, path: "/transfert-client" },
  { label: "Retrait", icon: Banknote, path: "/retrait" },

  // 👇 CLIENT & AGENCE (logique métier)
  { label: "Clients", icon: Users, path: "/clients" },
  { label: "Agences", icon: Building2, path: "/agences" }, // ✅

  { label: "Transfert caisse", icon: Repeat, path: "/transfert-caisse" },
  { label: "Validations", icon: ClipboardCheck, path: "/validation" },
  { label: "Caisses", icon: Wallet, path: "/caisses" },
  { label: "Ledger", icon: FileText, path: "/ledger" },
];