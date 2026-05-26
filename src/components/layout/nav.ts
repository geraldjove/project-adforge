import {
  LayoutDashboard,
  FolderPlus,
  Building2,
  Map,
  ShieldCheck,
  Target,
  Lightbulb,
  PackagePlus,
  UserRoundCog,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  step?: number;
  group: "Overview" | "Client Project Dashboard";
}

export const navItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard, group: "Overview" },
  { label: "New Client", to: "/setup", icon: FolderPlus, group: "Overview" },
  { label: "Client Overview", to: "/clients/client-001#overview", icon: UserRoundCog, step: 1, group: "Client Project Dashboard" },
  { label: "Brand Inputs", to: "/clients/client-001#brand-inputs", icon: Building2, step: 2, group: "Client Project Dashboard" },
  { label: "Products", to: "/clients/client-001#products", icon: PackagePlus, step: 3, group: "Client Project Dashboard" },
  { label: "Audience & Market", to: "/clients/client-001#audience-market", icon: Target, step: 4, group: "Client Project Dashboard" },
  { label: "Benefits & Guardrails", to: "/clients/client-001#benefits-guardrails", icon: ShieldCheck, step: 5, group: "Client Project Dashboard" },
  { label: "Messaging Map", to: "/clients/client-001#messaging-map", icon: Map, step: 6, group: "Client Project Dashboard" },
  { label: "Ad Concept Generator", to: "/concepts?client=client-001", icon: Lightbulb, step: 7, group: "Client Project Dashboard" },
];
