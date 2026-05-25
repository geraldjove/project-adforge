import {
  LayoutDashboard,
  FolderPlus,
  Building2,
  Map,
  Lightbulb,
  Images,
  Wand2,
  PenTool,
  CheckSquare,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  step?: number;
  group: "Overview" | "Creative Pipeline";
}

export const navItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard, group: "Overview" },
  { label: "Project Setup", to: "/setup", icon: FolderPlus, group: "Overview" },
  { label: "Brand Inputs", to: "/brand", icon: Building2, step: 1, group: "Creative Pipeline" },
  { label: "Messaging Map", to: "/messaging", icon: Map, step: 2, group: "Creative Pipeline" },
  { label: "Concepts & Headlines", to: "/concepts", icon: Lightbulb, step: 3, group: "Creative Pipeline" },
  { label: "Ads Inspiration", to: "/inspiration", icon: Images, step: 4, group: "Creative Pipeline" },
  { label: "Image Prompts", to: "/prompts", icon: Wand2, step: 5, group: "Creative Pipeline" },
  { label: "Figma Briefs", to: "/briefs", icon: PenTool, step: 6, group: "Creative Pipeline" },
  { label: "Human Revisions", to: "/revisions", icon: CheckSquare, step: 7, group: "Creative Pipeline" },
];
