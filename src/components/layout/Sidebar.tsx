import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMockAccount } from "@/lib/mockAuth";
import { Select } from "@/components/ui/select";
import { clientAccounts } from "@/data/mockData";
import { navItems, type NavGroup } from "./nav";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const account = useMockAccount();
  const groups: NavGroup[] =
    account.role === "admin" ? ["Admin", "Admin Operations", "Client Project Dashboard"] : ["Artist", "Artist Work"];
  const location = useLocation();
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [searchParams] = useSearchParams();
  const currentPath = `${location.pathname}${location.hash}`;
  const activeClientId = clientId ?? searchParams.get("client") ?? clientAccounts[0].id;
  const activeClient = clientAccounts.find((client) => client.id === activeClientId) ?? clientAccounts[0];

  function handleClientChange(nextClientId: string) {
    if (location.pathname === "/concepts") {
      navigate(`/concepts?client=${nextClientId}`);
    } else {
      const section = location.pathname.startsWith("/clients/") ? location.hash : "";
      navigate(`/clients/${nextClientId}${section}`);
    }
    onNavigate?.();
  }

  return (
    <aside className={cn("flex h-full w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground", className)}>
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-accent text-white">
          <Sparkles className="size-5" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold text-white">AdForge</div>
          <div className="text-xs text-sidebar-foreground/60">
            {account.role === "admin" ? "Admin Workspace" : "Artist Workspace"}
          </div>
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
                .filter((i) => i.role === account.role && i.group === group)
                .map((item) => {
                  const itemTo = item.to.replace("/clients/client-001", `/clients/${activeClient.id}`);
                  const clientItemTo = itemTo.replace("client=client-001", `client=${activeClient.id}`);
                  const isOverviewSection =
                    clientItemTo.endsWith("#overview") &&
                    location.pathname === clientItemTo.split("#")[0] &&
                    location.hash === "";
                  const isGenerator = clientItemTo.startsWith("/concepts") && location.pathname === "/concepts";
                  const isActive =
                    clientItemTo === "/"
                      ? location.pathname === "/"
                      : currentPath === clientItemTo || isOverviewSection || isGenerator;

                  return (
                    <Link
                      key={item.to}
                      to={clientItemTo}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-white"
                          : "text-sidebar-foreground/80 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.step && (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-white/10 text-[10px] font-semibold">
                          {item.step}
                        </span>
                      )}
                      <item.icon className={cn("size-4 shrink-0", item.step && "hidden")} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-white/5 p-3">
          {account.role === "admin" ? (
            <>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
                Active client
              </label>
              <Select
                value={activeClient.id}
                onChange={(event) => handleClientChange(event.target.value)}
                className="h-9 border-white/10 bg-white pr-8 text-xs font-medium text-foreground shadow-none focus-visible:ring-sidebar-accent"
              >
                {clientAccounts.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.clientName}
                  </option>
                ))}
              </Select>
              <p className="mt-2 text-[11px] text-sidebar-foreground/60">
                {activeClient.projectStatus} · {activeClient.subscriptionTier}
              </p>
            </>
          ) : (
            <>
              <p className="text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
                Logged in artist
              </p>
              <p className="mt-1 text-sm font-semibold text-white">{account.name}</p>
              <p className="mt-1 text-[11px] text-sidebar-foreground/60">3 assigned tasks · 1 revision</p>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
