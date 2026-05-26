import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Image,
  Layers,
  MessageSquare,
  Palette,
  RotateCcw,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { clientAccounts, productReferenceImages } from "@/data/mockData";

const artistJobs = [
  {
    id: "job-001",
    taskId: "t1",
    clientId: "client-001",
    concept: "The Glow Check",
    deliverable: "Meta Feed Static",
    status: "Ready to design",
    priority: "High",
    due: "May 28",
    notes: "Use the can hero front reference and keep the product larger than the mockup.",
  },
  {
    id: "job-002",
    taskId: "t2",
    clientId: "client-002",
    concept: "Cold Brew Desk Ritual",
    deliverable: "Story Static",
    status: "Needs revision",
    priority: "Medium",
    due: "May 29",
    notes: "Client wants warmer light and a less crowded bottle lineup.",
  },
  {
    id: "job-003",
    taskId: "t3",
    clientId: "client-003",
    concept: "Lamp Glow Angle",
    deliverable: "Display Static",
    status: "In progress",
    priority: "High",
    due: "May 30",
    notes: "Preserve product silhouette and ambient glow from uploaded product reference.",
  },
];

function statusVariant(status: string) {
  if (status === "Ready to design") return "accent";
  if (status === "Needs revision") return "warning";
  return "secondary";
}

export default function ArtistDashboard() {
  const readyJobs = artistJobs.filter((job) => job.status === "Ready to design").length;
  const revisionJobs = artistJobs.filter((job) => job.status === "Needs revision").length;
  const productRefs = productReferenceImages.length;

  return (
    <>
      <PageHeader
        eyebrow="Artist Workspace"
        title="Artist Dashboard"
        description="Production queue for generated ad concepts, product references, revision notes, and design handoff work."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned jobs" value={artistJobs.length} icon={Layers} hint="active creative tasks" />
        <StatCard label="Ready to design" value={readyJobs} icon={Palette} hint="approved for layout" />
        <StatCard label="Needs revision" value={revisionJobs} icon={RotateCcw} hint="requires artist pass" />
        <StatCard label="Product refs" value={productRefs} icon={Image} hint="available references" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Production queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {artistJobs.map((job) => {
              const client = clientAccounts.find((item) => item.id === job.clientId) ?? clientAccounts[0];

              return (
                <div key={job.id} className="rounded-lg border p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{job.concept}</p>
                        <Badge variant={statusVariant(job.status)}>{job.status}</Badge>
                        <Badge variant={job.priority === "High" ? "destructive" : "outline"}>{job.priority}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {client.clientName} · {job.deliverable} · Due {job.due}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/artist/tasks/${job.taskId}`}>
                        Open brief <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-3 flex gap-2 rounded-lg bg-muted/50 p-3 text-sm">
                    <MessageSquare className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <p>{job.notes}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Handoff checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Confirm selected concept and headline",
              "Use uploaded product reference images",
              "Check revision notes before export",
              "Prepare Figma-ready layout",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  {index < 2 ? <CheckCircle2 className="size-4" /> : <Clock className="size-4" />}
                </div>
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
