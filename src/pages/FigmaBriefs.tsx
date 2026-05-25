import { PenTool, Plus, Layers, FileImage } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { figmaBriefs } from "@/data/mockData";

export default function FigmaBriefs() {
  return (
    <>
      <PageHeader
        eyebrow="Step 6"
        title="Figma Design Briefs"
        description="Production-ready briefs that hand off copy, dimensions, assets, and layout notes to design."
        actions={
          <Button>
            <Plus className="size-4" /> New brief
          </Button>
        }
      />

      <div className="space-y-6">
        {figmaBriefs.map((b) => (
          <Card key={b.id}>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <PenTool className="size-4 text-primary" />
                  <CardTitle className="text-base">{b.conceptTitle}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  {b.deliverable} · {b.dimensions}
                </p>
              </div>
              <StatusBadge status={b.status} />
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Copy blocks
                  </p>
                  <div className="space-y-2">
                    {b.copyBlocks.map((cb) => (
                      <div key={cb.label} className="flex gap-3 rounded-lg border p-3">
                        <span className="w-20 shrink-0 text-xs font-medium text-muted-foreground">{cb.label}</span>
                        <span className="text-sm">{cb.value}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Layout notes
                  </p>
                  <p className="text-sm text-muted-foreground">{b.layoutNotes}</p>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <Layers className="size-3.5" /> Assets
                  </p>
                  <div className="space-y-2">
                    {b.assets.map((a) => (
                      <div key={a} className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                        <FileImage className="size-4 text-muted-foreground" />
                        <span className="truncate">{a}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full" disabled>
                    Open in Figma
                  </Button>
                  <Badge variant="outline" className="mt-2 w-full justify-center">
                    Figma sync · Planned
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
