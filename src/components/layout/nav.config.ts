import {
  Home,
  Banknote,
  Repeat,
  ClipboardCheck,
  Wallet,
  FileText,
  // Users,
  History,
  Building2,
  Send,
  UserPlus,
  ShieldCheck, // 🔥 AJOUT
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", icon: Home, path: "/" },
  { label: "Envoi", icon: Send, path: "/transfert-client" },
  { label: "Paiement", icon: Banknote, path: "/retrait" },

  // 👇 CLIENT & AGENCE (logique métier)
  // { label: "Clients", icon: Users, path: "/clients" },
  { label: "Agences", icon: Building2, path: "/agences" }, // ✅

  { label: "Transfert caisse", icon: Repeat, path: "/transfert-caisse" },
  { label: "Validations", icon: ClipboardCheck, path: "/validation" },
  { label: "Caisses", icon: Wallet, path: "/caisses" },
  { label: "Registre", icon: FileText, path: "/ledger" },
  { label: "Audit Logs", icon: ShieldCheck, path: "/audit-logs", roles: ["ADMIN", "N+1", "N+2"],},
  { label: "Validation Logs", icon: History, path: "/validation-logs", roles: ["ADMIN", "N+1", "N+2"],},
  { label: "Utilisateurs", icon: UserPlus, path: "/register", roles: ["ADMIN", "N+1", "N+2"],}, // 🔥 inline (pas besoin d'autre système)
];