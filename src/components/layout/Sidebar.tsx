import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "./nav";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const groups = ["Overview", "Creative Pipeline"] as const;
  return (
    <aside className={cn("flex h-full w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground", className)}>
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-accent text-white">
          <Sparkles className="size-5" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold text-white">AdForge</div>
          <div className="text-xs text-sidebar-foreground/60">Creative Pipeline</div>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {groups.map((group) => (
          <div key={group}>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              {group}
            </p>
            <div className="space-y-0.5">
              {navItems
                .filter((i) => i.group === group)
                .map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-white"
                          : "text-sidebar-foreground/80 hover:bg-white/5 hover:text-white"
                      )
                    }
                  >
                    {item.step && (
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-white/10 text-[10px] font-semibold">
                        {item.step}
                      </span>
                    )}
                    <item.icon className={cn("size-4 shrink-0", item.step && "hidden")} />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs font-medium text-white">Acme Hydration</p>
          <p className="text-[11px] text-sidebar-foreground/60">Spring Launch · Active project</p>
        </div>
      </div>
    </aside>
  );
}
