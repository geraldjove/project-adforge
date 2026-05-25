import { Plus, Package, ImageOff, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { concepts, type Concept } from "@/data/mockData";

function ConceptCard({ c }: { c: Concept }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-0">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="accent">{c.pillar}</Badge>
          <span className="text-xs text-muted-foreground">{c.format}</span>
        </div>
        <CardTitle className="text-base">{c.title}</CardTitle>
        <p className="mt-1 text-sm italic text-muted-foreground">{c.bigIdea}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="text-lg font-bold leading-tight">{c.headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">{c.subhead}</p>
          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {c.cta} <ArrowRight className="size-3" />
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <Badge key={t} variant="secondary">
              #{t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Concepts() {
  const withProduct = concepts.filter((c) => c.withProduct);
  const withoutProduct = concepts.filter((c) => !c.withProduct);

  return (
    <>
      <PageHeader
        eyebrow="Step 3"
        title="Concepts & Headlines"
        description="Big ideas with headline lockups, split by whether the product is shown. Each maps back to a messaging pillar."
        actions={
          <Button>
            <Plus className="size-4" /> New concept
          </Button>
        }
      />

      <Tabs defaultValue="with">
        <TabsList>
          <TabsTrigger value="with">
            <Package className="size-4" /> With product ({withProduct.length})
          </TabsTrigger>
          <TabsTrigger value="without">
            <ImageOff className="size-4" /> Without product ({withoutProduct.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="with">
          <div className="rounded-lg border-l-2 border-primary bg-accent/30 px-4 py-2.5 text-sm text-muted-foreground">
            <span className="font-medium text-accent-foreground">Product visualization.</span> The can or pack is the
            hero — strong for conversion and consideration.
          </div>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {withProduct.map((c) => (
              <ConceptCard key={c.id} c={c} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="without">
          <div className="rounded-lg border-l-2 border-primary bg-accent/30 px-4 py-2.5 text-sm text-muted-foreground">
            <span className="font-medium text-accent-foreground">No product visualization.</span> Mood, lifestyle, and
            abstract directions — strong for awareness and brand-building.
          </div>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {withoutProduct.map((c) => (
              <ConceptCard key={c.id} c={c} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
