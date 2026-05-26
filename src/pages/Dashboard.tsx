import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  ExternalLink,
  FolderOpen,
  LayoutDashboard,
  PackageCheck,
  PauseCircle,
  UsersRound,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import {
  clientAccounts,
  adsOrderOptions,
  subscriptionTierOptions,
  type ClientAccount,
  type ClientProjectStatus,
  type PaymentStatus,
} from "@/data/mockData";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function paymentVariant(status: PaymentStatus) {
  if (status === "Paid" || status === "On-going") return "success";
  if (status === "Not Paid") return "warning";
  return "destructive";
}

function projectVariant(status: ClientProjectStatus) {
  if (status === "Completed") return "success";
  if (status === "Under Review") return "warning";
  if (status === "Cancelled" || status === "Frozen") return "destructive";
  return "accent";
}

function ClientIdentity({ client }: { client: ClientAccount }) {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-semibold">{client.clientName}</p>
        <Badge variant="outline">{client.product}</Badge>
      </div>
      <div className="mt-1 grid gap-1 text-xs text-muted-foreground">
        <span>{client.contactPerson}</span>
        <a
          href={client.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          Client website <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const totalMonthlyRetainer = clientAccounts.reduce((sum, client) => sum + client.monthlyRetainer, 0);
  const activeClients = clientAccounts.filter((client) => client.projectStatus === "On-going").length;
  const adsOrdered = clientAccounts.reduce((sum, client) => sum + client.adCount, 0);
  const reviewCount = clientAccounts.filter((client) => client.projectStatus === "Under Review").length;

  return (
    <>
      <PageHeader
        eyebrow="Client Operations"
        title="Client Dashboard"
        description="Manage clients, subscriptions, payments, ad orders, project status, and handoff links from one working view."
        actions={
          <Button asChild>
            <Link to="/setup">
              New client <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Clients" value={clientAccounts.length} icon={UsersRound} hint={`${activeClients} on-going`} />
        <StatCard
          label="Monthly retainers"
          value={currencyFormatter.format(totalMonthlyRetainer)}
          icon={CircleDollarSign}
          hint="tracked by tier"
        />
        <StatCard label="Ads ordered" value={adsOrdered} icon={PackageCheck} hint="Silver, Gold, Platinum" />
        <StatCard label="Under review" value={reviewCount} icon={PauseCircle} hint="needs approval" />
      </div>

      <Card className="mt-6">
        <CardHeader className="gap-3 space-y-0 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-base">Client list</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Name, contact person, website, product, and current project controls.</p>
          </div>
          <Badge variant="accent">{clientAccounts.length} clients</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="pb-3 pr-4 font-semibold">Client</th>
                  <th className="pb-3 pr-4 font-semibold">Subscription tier</th>
                  <th className="pb-3 pr-4 font-semibold">Payment</th>
                  <th className="pb-3 pr-4 font-semibold">Ads order</th>
                  <th className="pb-3 pr-4 font-semibold">Project status</th>
                  <th className="pb-3 pr-4 font-semibold">Handoff</th>
                  <th className="pb-3 text-right font-semibold">Dashboard</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {clientAccounts.map((client) => (
                  <tr key={client.id} className="align-middle">
                    <td className="py-4 pr-4">
                      <ClientIdentity client={client} />
                    </td>
                    <td className="py-4 pr-4">
                      <p className="font-medium">{client.subscriptionTier}</p>
                      <p className="text-xs text-muted-foreground">
                        {currencyFormatter.format(client.monthlyRetainer)} ({client.subscriptionLabel})
                      </p>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge variant={paymentVariant(client.paymentStatus)}>{client.paymentStatus}</Badge>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="font-medium">{client.adsOrder}</p>
                      <p className="text-xs text-muted-foreground">{client.adCount} Ads</p>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge variant={projectVariant(client.projectStatus)}>{client.projectStatus}</Badge>
                      <p className="mt-1 text-xs text-muted-foreground">Updated {formatDate(client.updatedAt)}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={client.adsFolderUrl} target="_blank" rel="noreferrer">
                          <FolderOpen className="size-4" />
                          Ads folder
                        </a>
                      </Button>
                    </td>
                    <td className="py-4 text-right">
                      <Button size="sm" asChild>
                        <Link to={client.projectDashboardPath}>
                          <LayoutDashboard className="size-4" />
                          Open
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subscription tiers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {subscriptionTierOptions.map((option) => (
              <div key={option.tier} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{option.tier}</p>
                  <p className="text-xs text-muted-foreground">{option.label}</p>
                </div>
                <Badge variant={option.price === 0 ? "secondary" : "accent"}>
                  {currencyFormatter.format(option.price)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ad order reference</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            {adsOrderOptions.map((option) => {
              const isPlatinum = option.tier === "Platinum";
              return (
                <div
                  key={option.tier}
                  className={cn(
                    "rounded-lg border p-4",
                    isPlatinum && "border-primary/40 bg-accent/60"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{option.tier}</p>
                    {isPlatinum && <CheckCircle2 className="size-4 text-primary" />}
                  </div>
                  <p className="mt-2 text-2xl font-bold">{option.count}</p>
                  <p className="text-xs text-muted-foreground">Ads</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
