import {
  CheckCircle2,
  Clock,
  FileUp,
  Megaphone,
  MessageSquare,
  PanelTop,
  Send,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clientAccounts } from "@/data/mockData";

type ModuleKey =
  | "admin-projects"
  | "admin-tasks"
  | "admin-submissions"
  | "admin-calendar"
  | "admin-artists"
  | "admin-brands"
  | "admin-settings"
  | "artist-tasks"
  | "artist-task-brief"
  | "artist-submit"
  | "artist-submissions"
  | "artist-settings";

const tasks = [
  { id: "t1", title: "Glow Check Feed v3", client: "Acme Hydration", artist: "GJ", status: "To Do", priority: "High", due: "May 28", progress: 15 },
  { id: "t2", title: "Cold Brew Story Set", client: "Northwind Coffee", artist: "GJ", status: "In Progress", priority: "Medium", due: "May 29", progress: 55 },
  { id: "t3", title: "Lamp Glow Display", client: "Luma Home", artist: "GJ", status: "For Review", priority: "High", due: "May 30", progress: 90 },
  { id: "t4", title: "Coaching Program Carousel", client: "BrightPath Fitness", artist: "GJ", status: "Revision", priority: "Low", due: "Jun 1", progress: 70 },
];

const taskClientIds: Record<string, string> = {
  t1: "client-001",
  t2: "client-002",
  t3: "client-003",
  t4: "client-004",
};

const adminConceptCards = [
  { title: "The Glow Check", headline: "Hydration That Shows Up", pillar: "Glow From Daily Ritual" },
  { title: "No Crash Club", headline: "Energy Without The Cliff", pillar: "Clean Hydration, No Crash" },
  { title: "Desk Status Hydration", headline: "Your Desk Drink Upgrade", pillar: "Desk Status Hydration" },
];

const submissions = [
  { id: "s1", title: "Glow Check Feed v3", artist: "GJ", client: "Acme Hydration", task: "Glow Check Feed v3", submittedAt: "May 26, 2026, 3:42 PM", status: "For Review", color: "from-cyan-200 to-amber-100" },
  { id: "s2", title: "Cold Brew Story v2", artist: "GJ", client: "Northwind Coffee", task: "Cold Brew Story Set", submittedAt: "May 26, 2026, 4:18 PM", status: "Revision", color: "from-stone-300 to-amber-100" },
  { id: "s3", title: "Lamp Glow Display v1", artist: "GJ", client: "Luma Home", task: "Lamp Glow Display", submittedAt: "May 27, 2026, 9:20 AM", status: "Approved", color: "from-indigo-200 to-yellow-100" },
];

const columns = ["Backlog", "To Do", "In Progress", "For Review", "Revision", "Approved", "Completed", "Blocked"];
const artistOptions = ["GJ Artist", "Maya Layouts", "Devin Motion"];

function priorityVariant(priority: string) {
  if (priority === "High") return "destructive";
  if (priority === "Medium") return "warning";
  return "outline";
}

function statusVariant(status: string) {
  if (status === "Approved" || status === "Completed") return "success";
  if (status === "Revision") return "warning";
  if (status === "Blocked") return "destructive";
  return "accent";
}

function AdminProjects() {
  const completed = clientAccounts.reduce((sum, client) => sum + client.fulfilledAdCount, 0);
  const total = clientAccounts.reduce((sum, client) => sum + client.adCount, 0);

  return (
    <>
      <PageHeader eyebrow="Admin Operations" title="Projects" description="Track project progress, milestone state, client brand, and fulfillment progress." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Projects" value={clientAccounts.length} icon={PanelTop} />
        <StatCard label="Fulfillment" value={`${completed}/${total}`} icon={CheckCircle2} />
        <StatCard label="For review" value={submissions.filter((s) => s.status === "For Review").length} icon={Clock} />
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle className="text-base">Project tracker</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {clientAccounts.map((client) => {
            const progress = Math.round((client.fulfilledAdCount / client.adCount) * 100);
            return (
              <div key={client.id} className="rounded-lg border p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{client.clientName}</p>
                    <p className="text-sm text-muted-foreground">{client.product} · {client.adsOrder} · {client.projectStatus}</p>
                  </div>
                  <Badge variant="accent">Delivered stage: Production</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span>{client.fulfilledAdCount} of {client.adCount} ads fulfilled</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="mt-2" />
                <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-4">
                  {["Brief Received", "Concepts Created", "Production", "First Draft Submitted"].map((stage, index) => (
                    <div key={stage} className="rounded-md bg-muted px-2 py-1">{index < 2 ? "Done" : "Next"} · {stage}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}

function AdminTasks() {
  return (
    <>
      <PageHeader eyebrow="Admin Operations" title="Tasks" description="Kanban workflow for assigning and tracking artist creative production." />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Concept & Headline Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
            <div className="space-y-1.5">
              <Label>Client</Label>
              <Select defaultValue="Acme Hydration">
                {clientAccounts.map((client) => (
                  <option key={client.id}>{client.clientName}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Messaging pillar</Label>
              <Select defaultValue="Clean Hydration, No Crash">
                <option>Clean Hydration, No Crash</option>
                <option>Glow From Daily Ritual</option>
                <option>Desk Status Hydration</option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Generate task concepts</Button>
            </div>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="mb-3 text-sm font-semibold">Assign generated task</p>
            <div className="grid gap-3 lg:grid-cols-[1fr_0.8fr_0.8fr_0.8fr_auto]">
              <div className="space-y-1.5">
                <Label>Task title</Label>
                <Input defaultValue="Glow Check Feed v3" />
              </div>
              <div className="space-y-1.5">
                <Label>Artist</Label>
                <Select defaultValue="GJ Artist">
                  {artistOptions.map((artist) => (
                    <option key={artist}>{artist}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Priority</Label>
                <Select defaultValue="High">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Due date</Label>
                <Input type="date" defaultValue="2026-05-28" />
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Megaphone className="size-4" />
                  Assign & notify
                </Button>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Front-end mock: assigning here adds the task to the artist's My Tasks queue and sends a notification.
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {adminConceptCards.map((concept) => (
              <div key={concept.title} className="rounded-lg border p-3">
                <Badge variant="accent">{concept.pillar}</Badge>
                <p className="mt-3 font-semibold">{concept.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{concept.headline}</p>
                <Button size="sm" variant="outline" className="mt-3">Create artist task</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 overflow-x-auto pb-2 xl:grid-cols-4 2xl:grid-cols-8">
        {columns.map((column) => (
          <Card key={column} className="min-w-72">
            <CardHeader className="p-4"><CardTitle className="text-sm">{column}</CardTitle></CardHeader>
            <CardContent className="space-y-3 p-4 pt-0">
              {tasks.filter((task) => task.status === column).map((task) => (
                <div key={task.id} className="rounded-lg border bg-card p-3">
                  <p className="text-sm font-semibold">{task.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{task.client} · {task.artist}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>
                    <Badge variant="outline">Due {task.due}</Badge>
                  </div>
                  <Progress value={task.progress} className="mt-3" />
                </div>
              ))}
              {tasks.every((task) => task.status !== column) && <p className="text-xs text-muted-foreground">No tasks</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function AdminSubmissions() {
  const [revisionSubmission, setRevisionSubmission] = React.useState<(typeof submissions)[number] | null>(null);
  const [removeSubmission, setRemoveSubmission] = React.useState<(typeof submissions)[number] | null>(null);

  return (
    <>
      <PageHeader eyebrow="Admin Review" title="Submissions" description="Review submitted artist work, approve files, or request revisions." />
      <div className="grid gap-4 lg:grid-cols-3">
        {submissions.map((submission) => (
          <Card key={submission.id} className="overflow-hidden">
            <div className={`h-40 bg-gradient-to-br ${submission.color}`} />
            <CardContent className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{submission.title}</p>
                  <p className="text-xs text-muted-foreground">{submission.client} · {submission.artist}</p>
                </div>
                <Badge variant={statusVariant(submission.status)}>{submission.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Submitted {submission.submittedAt}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <Button size="sm"><CheckCircle2 className="size-4" /> Approve</Button>
                <Button size="sm" variant="outline" onClick={() => setRevisionSubmission(submission)}>
                  <MessageSquare className="size-4" /> Revision
                </Button>
                <Button size="sm" variant="outline" onClick={() => setRemoveSubmission(submission)}>
                  <Trash2 className="size-4" /> Remove
                </Button>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                Human verification: Admin has final say before client handoff.
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {revisionSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-base">Request revision</CardTitle>
              <p className="text-sm text-muted-foreground">
                Send revision notes to {revisionSubmission.artist} for {revisionSubmission.title}.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Revision comment to artist</Label>
                <Textarea placeholder="Tell the artist exactly what needs to change..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setRevisionSubmission(null)}>Cancel</Button>
                <Button onClick={() => setRevisionSubmission(null)}>Send revision request</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {removeSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-base">Remove submission</CardTitle>
              <p className="text-sm text-muted-foreground">
                Capture why {removeSubmission.title} should be removed so future generations avoid the same issue.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Removal reason for AI negative prompt memory</Label>
                <Textarea placeholder="Why should this result be removed? This becomes client-specific negative prompt guidance." />
              </div>
              <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                This note will be saved as negative prompt memory for {removeSubmission.client}.
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setRemoveSubmission(null)}>Cancel</Button>
                <Button variant="destructive" onClick={() => setRemoveSubmission(null)}>Remove and save reason</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

function AdminCalendar() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  return (
    <>
      <PageHeader eyebrow="Admin Review" title="Submission Calendar" description="Month view with submitted artist work grouped by automatic submitted_at date." />
      <Card>
        <CardHeader><CardTitle className="text-base">May 2026</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
              const daySubs = submissions.filter((_, index) => day === 26 + index);
              return (
                <div key={day} className="min-h-28 rounded-lg border p-2">
                  <p className="text-xs font-semibold text-muted-foreground">{day}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {daySubs.map((submission) => (
                      <button key={submission.id} className={`size-10 rounded-md bg-gradient-to-br ${submission.color}`} aria-label={submission.title} />
                    ))}
                  </div>
                  {daySubs.length > 1 && <p className="mt-1 text-xs text-primary">+{daySubs.length - 1} more</p>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function AdminArtists() {
  return (
    <>
      <PageHeader eyebrow="Admin Directory" title="Artists" description="Roster, workload, active tasks, revision volume, and completed work." />
      <div className="grid gap-4 lg:grid-cols-3">
        {["GJ Artist", "Maya Layouts", "Devin Motion"].map((artist, index) => (
          <Card key={artist}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {artist.split(" ").map((part) => part[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold">{artist}</p>
                  <p className="text-xs text-muted-foreground">{index === 0 ? "Active" : "Available soon"}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-lg bg-muted p-2"><p className="font-bold">{3 - index}</p><p className="text-xs text-muted-foreground">Tasks</p></div>
                <div className="rounded-lg bg-muted p-2"><p className="font-bold">{index}</p><p className="text-xs text-muted-foreground">Revisions</p></div>
                <div className="rounded-lg bg-muted p-2"><p className="font-bold">{8 + index}</p><p className="text-xs text-muted-foreground">Done</p></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function AdminBrands() {
  return (
    <>
      <PageHeader eyebrow="Admin Directory" title="Brands" description="Brand records, research snapshots, messaging maps, and creative guardrails." />
      <div className="grid gap-4 lg:grid-cols-2">
        {clientAccounts.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{client.clientName}</p>
                  <p className="text-sm text-muted-foreground">{client.product}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{client.website}</p>
                </div>
                <Badge variant="accent">{client.subscriptionTier}</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline">Messaging map</Badge>
                <Badge variant="outline">Competitor scan</Badge>
                <Badge variant="outline">Guardrails</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function SettingsMock({ artist = false }: { artist?: boolean }) {
  return (
    <>
      <PageHeader eyebrow={artist ? "Artist Workspace" : "Admin Workspace"} title="Settings" description="Workspace preferences, provider settings, and account controls." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Name</Label><Input defaultValue={artist ? "GJ Artist" : "EJ Admin"} /></div>
            <div className="space-y-1.5"><Label>Role</Label><Input defaultValue={artist ? "Artist" : "Admin"} /></div>
            <div className="space-y-1.5"><Label>Notifications</Label><Select defaultValue="Immediate"><option>Immediate</option><option>Daily digest</option></Select></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">{artist ? "Submission defaults" : "Workspace integrations"}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {(artist ? ["Default export: PNG", "Auto-include Figma link", "Revision alerts enabled"] : ["Supabase Storage: task-submissions", "AI endpoint: /api/ai/generate", "Prompt templates enabled"]).map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium">{item}</span>
                <Badge variant="success">Ready</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ArtistTasks() {
  const lateTasks = tasks.filter((task) => task.id === "t1");
  return (
    <>
      <PageHeader eyebrow="Artist Workspace" title="My Tasks" description="Assigned queue with deadlines, briefs, references, progress, and status." />
      <div className="mb-4 rounded-lg border border-warning/40 bg-warning/10 p-4">
        <div className="flex gap-3">
          <Clock className="mt-0.5 size-5 text-warning-foreground" />
          <div>
            <p className="font-semibold text-warning-foreground">Late task needs priority</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {lateTasks[0]?.title} is past its due date. Prioritize this task or update its status so Admin can track the delay.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.client} · Due {task.due}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={statusVariant(task.status)}>{task.status}</Badge>
                  <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>
                  <Button size="sm" asChild>
                    <Link to={`/artist/tasks/${task.id}`}>Open brief</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Task progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} />
                </div>
                <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                  Brief, references, comments, and submission live inside the task brief.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function ArtistTaskBrief() {
  const { taskId } = useParams();
  const task = tasks.find((item) => item.id === taskId) ?? tasks[0];
  const clientId = taskClientIds[task.id] ?? "client-001";
  const references = [
    "Product reference: Can hero front",
    "Messaging pillar: Clean Hydration, No Crash",
    "Format: 1080 x 1350 Meta Feed",
  ];

  return (
    <>
      <PageHeader
        eyebrow="Artist Task Brief"
        title={task.title}
        description="Review the creative direction, reference files, notes, and submit your completed work from this brief."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Client</p>
                  <p className="font-semibold">{task.client}</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Due date</p>
                  <p className="font-semibold">{task.due}</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Priority</p>
                  <p className="font-semibold">{task.priority}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Task status</Label>
                <Select defaultValue="On-going">
                  <option>On-going</option>
                  <option>Paused</option>
                  <option>Submitted</option>
                  <option>Waiting for revisions</option>
                  <option>Cancelled</option>
                </Select>
                <p className="text-xs text-muted-foreground">Changing this status updates Admin task tracking.</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="font-semibold">Creative direction</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Build a polished ad layout using the selected AI concept and product reference. Keep the offer readable,
                  make the product the hero when product is included, and leave room for final Figma handoff.
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold">Reference checklist</p>
                <div className="grid gap-2">
                  {references.map((reference) => (
                    <div key={reference} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">{reference}</span>
                      <Badge variant="outline">Attached</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-accent/40 p-4">
                <p className="font-semibold text-accent-foreground">Admin notes</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Push product clarity, avoid generic stock composition, and submit both PNG export and Figma link.
                </p>
              </div>
              <Button asChild>
                <Link to={`/concepts?client=${clientId}`}>
                  Open Ad Concept Generator
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Submit work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-dashed p-5 text-center">
              <FileUp className="mx-auto size-7 text-muted-foreground" />
              <p className="mt-2 font-semibold">Upload final file</p>
              <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, PDF, video preview, or working file.</p>
              <Button variant="outline" className="mt-3">Choose file</Button>
            </div>
            <div className="space-y-1.5">
              <Label>Submission title</Label>
              <Input defaultValue={`${task.title} submission`} />
            </div>
            <div className="space-y-1.5">
              <Label>Figma or external link</Label>
              <Input placeholder="https://figma.com/file/..." />
            </div>
            <div className="space-y-1.5">
              <Label>Version</Label>
              <Input defaultValue="1" />
            </div>
            <div className="space-y-1.5">
              <Label>Submission notes</Label>
              <Textarea placeholder="Mention what changed, export notes, or anything admin should review." />
            </div>
            <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
              submitted_at will be captured automatically when you click submit.
            </div>
            <Button className="w-full">
              <Send className="size-4" />
              Submit work for review
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ArtistSubmit() {
  return (
    <>
      <PageHeader eyebrow="Artist Workspace" title="Submit Work" description="Upload work, attach links, add notes, and let the system timestamp the submission." />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader><CardTitle className="text-base">Submission details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Task</Label><Select><option>Glow Check Feed v3</option><option>Cold Brew Story Set</option></Select></div>
            <div className="space-y-1.5"><Label>Submission title</Label><Input placeholder="Feed static v3" /></div>
            <div className="space-y-1.5"><Label>External link</Label><Input placeholder="Figma or Drive link" /></div>
            <div className="space-y-1.5"><Label>Version number</Label><Input defaultValue="3" /></div>
            <div className="space-y-1.5"><Label>Notes</Label><Textarea placeholder="What changed, what needs review, export notes..." /></div>
            <Button className="w-full"><Send className="size-4" /> Submit work</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex min-h-80 flex-col items-center justify-center border-dashed p-6 text-center">
            <FileUp className="size-8 text-muted-foreground" />
            <p className="mt-3 font-semibold">Upload image or file</p>
            <p className="mt-1 text-sm text-muted-foreground">The exact submitted_at timestamp will be saved automatically.</p>
            <Button variant="outline" className="mt-4">Choose file</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ArtistSubmissions() {
  return (
    <>
      <PageHeader eyebrow="Artist Workspace" title="My Submissions" description="Submitted work history, versions, timestamps, status, and revision requests." />
      <div className="grid gap-4 lg:grid-cols-3">
        {submissions.map((submission) => (
          <Card key={submission.id} className="overflow-hidden">
            <div className={`h-36 bg-gradient-to-br ${submission.color}`} />
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div><p className="font-semibold">{submission.title}</p><p className="text-xs text-muted-foreground">{submission.submittedAt}</p></div>
                <Badge variant={statusVariant(submission.status)}>{submission.status}</Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{submission.task}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export function OperationsPage({ moduleKey }: { moduleKey: ModuleKey }) {
  if (moduleKey === "admin-projects") return <AdminProjects />;
  if (moduleKey === "admin-tasks") return <AdminTasks />;
  if (moduleKey === "admin-submissions") return <AdminSubmissions />;
  if (moduleKey === "admin-calendar") return <AdminCalendar />;
  if (moduleKey === "admin-artists") return <AdminArtists />;
  if (moduleKey === "admin-brands") return <AdminBrands />;
  if (moduleKey === "admin-settings") return <SettingsMock />;
  if (moduleKey === "artist-tasks") return <ArtistTasks />;
  if (moduleKey === "artist-task-brief") return <ArtistTaskBrief />;
  if (moduleKey === "artist-submit") return <ArtistSubmit />;
  if (moduleKey === "artist-submissions") return <ArtistSubmissions />;
  return <SettingsMock artist />;
}
