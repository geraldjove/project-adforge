import { Save, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { currentProject } from "@/data/mockData";

const channels = ["Meta", "TikTok", "Display", "YouTube", "Email", "OOH"];

export default function ProjectSetup() {
  return (
    <>
      <PageHeader
        eyebrow="Step 0"
        title="Project Setup"
        description="Define the campaign basics. This sets the frame for every downstream creative step."
        actions={
          <Button>
            <Save className="size-4" /> Save project
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="Campaign details" description="The essentials that orient the whole pipeline.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Project name</Label>
                <Input id="name" defaultValue={currentProject.name} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="client">Client</Label>
                <Input id="client" defaultValue={currentProject.client} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="objective">Primary objective</Label>
                <Textarea id="objective" defaultValue={currentProject.objective} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select id="status" defaultValue={currentProject.status}>
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" defaultValue={currentProject.owner} />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Channels" description="Where this creative will run.">
            <div className="flex flex-wrap gap-2">
              {channels.map((c) => {
                const active = currentProject.channel.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    className={
                      "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors " +
                      (active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40")
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="AI assist" description="Coming soon — connect Claude or OpenAI.">
            <div className="rounded-lg border border-dashed bg-accent/40 p-4 text-sm text-muted-foreground">
              <div className="mb-2 flex items-center gap-2 font-medium text-accent-foreground">
                <Sparkles className="size-4" /> Auto-fill from a brief
              </div>
              Paste a client brief and let the assistant pre-populate brand inputs, audience, and objectives.
            </div>
            <Button variant="outline" className="mt-3 w-full" disabled>
              Connect AI provider
            </Button>
          </SectionCard>

          <SectionCard title="Integrations" description="Planned connections for this workspace.">
            <div className="space-y-2 text-sm">
              {[
                ["Claude / OpenAI", "Concept + copy generation"],
                ["Supabase", "Project + asset storage"],
                ["n8n", "Workflow automation"],
                ["Figma", "Design brief sync"],
              ].map(([name, desc]) => (
                <div key={name} className="flex items-center justify-between rounded-lg border p-2.5">
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Badge variant="outline">Planned</Badge>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
