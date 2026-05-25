import * as React from "react";
import { MessageSquare, ThumbsUp, RotateCcw, ThumbsDown, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/shared/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDate } from "@/lib/utils";
import { revisions, type Revision, type ReviewStatus } from "@/data/mockData";

function RevisionCard({ r }: { r: Revision }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="font-semibold">{r.asset}</p>
            <p className="text-xs text-muted-foreground">
              {r.conceptTitle} · {r.reviewer} · Round {r.round} · {formatDate(r.updatedAt)}
            </p>
          </div>
          <StatusBadge status={r.status} />
        </div>

        {r.feedback ? (
          <div className="mt-3 flex gap-2 rounded-lg bg-muted/60 p-3">
            <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
            <p className="text-sm">{r.feedback}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm italic text-muted-foreground">No feedback yet — awaiting reviewer.</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant={r.status === "approved" ? "default" : "outline"}>
            <ThumbsUp className="size-4" /> Approve
          </Button>
          <Button size="sm" variant={r.status === "needs-revision" ? "default" : "outline"}>
            <RotateCcw className="size-4" /> Request revision
          </Button>
          <Button size="sm" variant={r.status === "rejected" ? "destructive" : "outline"}>
            <ThumbsDown className="size-4" /> Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function RevisionList({ items }: { items: Revision[] }) {
  if (items.length === 0) {
    return <EmptyState icon={Clock} title="Nothing here" description="No assets currently have this status." />;
  }
  return (
    <div className="space-y-4">
      {items.map((r) => (
        <RevisionCard key={r.id} r={r} />
      ))}
    </div>
  );
}

const filters: { value: string; label: string; match?: ReviewStatus }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending", match: "pending" },
  { value: "needs-revision", label: "Needs Revision", match: "needs-revision" },
  { value: "approved", label: "Approved", match: "approved" },
  { value: "rejected", label: "Rejected", match: "rejected" },
];

export default function HumanRevisions() {
  const [tab, setTab] = React.useState("all");
  const count = (s: ReviewStatus) => revisions.filter((r) => r.status === s).length;

  return (
    <>
      <PageHeader
        eyebrow="Step 7"
        title="Human Revisions"
        description="The human-in-the-loop checkpoint. Approve, request changes, or reject before anything ships."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Approved" value={count("approved")} icon={ThumbsUp} />
        <StatCard label="Needs revision" value={count("needs-revision")} icon={RotateCcw} />
        <StatCard label="Rejected" value={count("rejected")} icon={ThumbsDown} />
        <StatCard label="Pending" value={count("pending")} icon={Clock} />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {filters.map((f) => (
            <TabsTrigger key={f.value} value={f.value}>
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {filters.map((f) => (
          <TabsContent key={f.value} value={f.value}>
            <RevisionList items={f.match ? revisions.filter((r) => r.status === f.match) : revisions} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
