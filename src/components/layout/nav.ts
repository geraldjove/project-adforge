import {
  BadgeCheck,
  Building2,
  CalendarDays,
  ClipboardList,
  FolderPlus,
  LayoutDashboard,
  Lightbulb,
  Map,
  Palette,
  PackagePlus,
  PanelTop,
  Send,
  Settings,
  ShieldCheck,
  Target,
  UploadCloud,
  UserRoundCog,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { MockRole } from "@/lib/mockAuth";

export type NavGroup =
  | "Admin"
  | "Admin Operations"
  | "Client Project Dashboard"
  | "Artist"
  | "Artist Work";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  role: MockRole;
  group: NavGroup;
  step?: number;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard, role: "admin", group: "Admin" },
  { label: "Projects", to: "/admin/projects", icon: PanelTop, role: "admin", group: "Admin Operations" },
  { label: "Tasks", to: "/admin/tasks", icon: ClipboardList, role: "admin", group: "Admin Operations" },
  { label: "Submissions", to: "/admin/submissions", icon: UploadCloud, role: "admin", group: "Admin Operations" },
  { label: "Calendar", to: "/admin/calendar", icon: CalendarDays, role: "admin", group: "Admin Operations" },
  { label: "Artists", to: "/admin/artists", icon: UsersRound, role: "admin", group: "Admin Operations" },
  { label: "Brands", to: "/admin/brands", icon: Building2, role: "admin", group: "Admin Operations" },
  { label: "Settings", to: "/admin/settings", icon: Settings, role: "admin", group: "Admin Operations" },
  { label: "New Client", to: "/setup", icon: FolderPlus, role: "admin", group: "Admin Operations" },
  { label: "Client Overview", to: "/clients/client-001#overview", icon: UserRoundCog, role: "admin", step: 1, group: "Client Project Dashboard" },
  { label: "Brand Inputs", to: "/clients/client-001#brand-inputs", icon: Building2, role: "admin", step: 2, group: "Client Project Dashboard" },
  { label: "Products", to: "/clients/client-001#products", icon: PackagePlus, role: "admin", step: 3, group: "Client Project Dashboard" },
  { label: "Audience & Market", to: "/clients/client-001#audience-market", icon: Target, role: "admin", step: 4, group: "Client Project Dashboard" },
  { label: "Benefits & Guardrails", to: "/clients/client-001#benefits-guardrails", icon: ShieldCheck, role: "admin", step: 5, group: "Client Project Dashboard" },
  { label: "Messaging Map", to: "/clients/client-001#messaging-map", icon: Map, role: "admin", step: 6, group: "Client Project Dashboard" },
  { label: "My Dashboard", to: "/artist", icon: Palette, role: "artist", group: "Artist" },
  { label: "My Tasks", to: "/artist/tasks", icon: ClipboardList, role: "artist", group: "Artist Work" },
  { label: "Ad Concept Generator", to: "/concepts?client=client-001", icon: Lightbulb, role: "artist", group: "Artist Work" },
  { label: "Submit Work", to: "/artist/submit", icon: Send, role: "artist", group: "Artist Work" },
  { label: "My Submissions", to: "/artist/submissions", icon: BadgeCheck, role: "artist", group: "Artist Work" },
  { label: "Settings", to: "/artist/settings", icon: Settings, role: "artist", group: "Artist Work" },
];
