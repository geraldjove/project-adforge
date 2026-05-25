import { Plus, Heart, Quote } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { brandInputs, messagingMap } from "@/data/mockData";

export default function MessagingMap() {
  return (
    <>
      <PageHeader
        eyebrow="Step 2"
        title="Messaging Map"
        description="Translate brand inputs into messaging pillars — each with a promise, proof, and an emotional hook."
        actions={
          <Button>
            <Plus className="size-4" /> Add pillar
          </Button>
        }
      />

      <Card className="mb-6 bg-accent/40">
        <CardContent className="flex flex-wrap items-center gap-x-6 gap-y-2 p-4 text-sm">
          <span className="font-semibold text-accent-foreground">{brandInputs.brandName}</span>
          <span className="text-muted-foreground">"{brandInputs.tagline}"</span>
          <span className="text-muted-foreground">Tone: {brandInputs.toneOfVoice}</span>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {messagingMap.map((m, i) => (
          <Card key={m.id} className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Pillar {i + 1}
                </span>
                <Badge variant="accent" className="gap-1">
                  <Heart className="size-3" /> {m.emotion}
                </Badge>
              </div>
              <CardTitle className="text-base">{m.pillar}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div className="rounded-lg bg-muted p-3">
                <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Quote className="size-3" /> Promise
                </div>
                <p className="text-sm font-medium">{m.promise}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Proof points</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.proofPoints.map((p) => (
                    <Badge key={p} variant="secondary">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <button className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
          <Plus className="size-6" />
          <span className="text-sm font-medium">Add another pillar</span>
        </button>
      </div>
    </>
  );
}
