import { Link } from "react-router-dom";
import { Search, Bell, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-10 flex min-h-16 flex-wrap items-center gap-3 border-b bg-background/90 px-4 py-3 backdrop-blur sm:flex-nowrap sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Open navigation"
        onClick={onMenuClick}
      >
        <Menu className="size-5" />
      </Button>
      <div className="min-w-0 flex-1 sm:flex-none">
        <p className="text-sm font-bold leading-tight text-foreground sm:hidden">AdForge</p>
        <p className="text-xs text-muted-foreground sm:hidden">Client Projects</p>
      </div>
      <div className="relative order-3 w-full sm:order-none sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search clients, payments, ad orders..." className="pl-9" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <Button className="hidden sm:inline-flex" asChild>
          <Link to="/setup">
            <Plus className="size-4" /> New client
          </Link>
        </Button>
        <div className="ml-1 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          GK
        </div>
      </div>
    </header>
  );
}
