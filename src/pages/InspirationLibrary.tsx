import * as React from "react";
import { Plus, Bookmark, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { inspiration } from "@/data/mockData";

export default function InspirationLibrary() {
  const allTags = Array.from(new Set(inspiration.flatMap((i) => i.tags)));
  const [active, setActive] = React.useState<string | null>(null);

  const filtered = active ? inspiration.filter((i) => i.tags.includes(active)) : inspiration;

  return (
    <>
      <PageHeader
        eyebrow="Step 4"
        title="Ads Inspiration Library"
        description="Reference work that informs direction. Tag and filter to build moodboards per concept."
        actions={
          <Button>
            <Plus className="size-4" /> Add reference
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className={
            "rounded-full border px-3 py-1 text-sm font-medium transition-colors " +
            (!active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/40")
          }
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={
              "rounded-full border px-3 py-1 text-sm font-medium transition-colors " +
              (active === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/40")
            }
          >
            #{t}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <Card key={i.id} className="group overflow-hidden">
            <div className={`relative h-40 bg-gradient-to-br ${i.imageColor}`}>
              <div className="absolute inset-0 flex items-end p-3">
                <Badge variant="secondary" className="bg-white/90">{i.format}</Badge>
              </div>
              <button className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                <Bookmark className="size-4" />
              </button>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{i.brand}</p>
                <span className="text-xs text-muted-foreground">{i.source}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{i.title}</p>
              <p className="mt-2 text-xs text-muted-foreground/90">{i.note}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {i.tags.map((t) => (
                  <Badge key={t} variant="outline">#{t}</Badge>
                ))}
              </div>
              <button className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                View source <ExternalLink className="size-3" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
