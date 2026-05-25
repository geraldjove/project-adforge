import { Link } from "react-router-dom";
import { Lightbulb, Images, CheckSquare, Layers, ArrowRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { WorkflowProgress } from "@/components/shared/WorkflowProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import {
  concepts,
  currentProject,
  inspiration,
  projects,
  revisions,
  workflowStages,
} from "@/data/mockData";

export default function Dashboard() {
  const pendingReviews = revisions.filter((r) => r.status === "pending" || r.status === "needs-revision");
  const nextStage = workflowStages.find((s) => s.status === "active");

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Creative Dashboard"
        description="Track every project from brand inputs through to approved, production-ready creative."
        actions={
          <Button asChild>
            <Link to="/setup">New project</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active concepts" value={concepts.length} icon={Lightbulb} hint="2 with product · 2 without" />
        <StatCard label="Inspiration saved" value={inspiration.length} icon={Images} hint="across 4 formats" />
        <StatCard label="Awaiting review" value={pendingReviews.length} icon={CheckSquare} hint="needs your attention" />
        <StatCard label="Projects" value={projects.length} icon={Layers} hint="1 active" />
      </div>

      <Card className="mt-6">
        <CardHeader className="gap-3 space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <CardTitle className="text-base">{currentProject.name}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{currentProject.objective}</p>
          </div>
          <Badge variant="success">{currentProject.status}</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">Pipeline progress</span>
              <span className="text-muted-foreground">{currentProject.progress}%</span>
            </div>
            <Progress value={currentProject.progress} />
          </div>
          <WorkflowProgress stages={workflowStages} />
          {nextStage && (
            <div className="flex flex-col gap-3 rounded-lg bg-accent px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-accent-foreground">
                <Clock className="size-4" />
                <span>
                  Next up: <span className="font-semibold">{nextStage.label}</span>
                </span>
              </div>
              <Button size="sm" variant="outline" className="w-full sm:w-auto" asChild>
                <Link to="/inspiration">
                  Continue <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Needs your review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingReviews.map((r) => (
              <div key={r.id} className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{r.asset}</p>
                  <p className="text-xs text-muted-foreground">{r.reviewer} · Round {r.round}</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/revisions">
                View all revisions <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">All projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="rounded-lg border p-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-medium">{p.name}</p>
                  <Badge
                    variant={p.status === "Active" ? "success" : p.status === "Draft" ? "secondary" : "outline"}
                  >
                    {p.status}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {p.client} · Updated {formatDate(p.updatedAt)}
                </p>
                <Progress value={p.progress} className="mt-2" indicatorClassName={cn(p.progress === 100 && "bg-success")} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
