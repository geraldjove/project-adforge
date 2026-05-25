import { Save, Plus, X } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { brandInputs } from "@/data/mockData";

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
        >
          {t}
          <X className="size-3 cursor-pointer text-muted-foreground hover:text-foreground" />
        </span>
      ))}
      <button className="inline-flex items-center gap-1 rounded-full border border-dashed px-3 py-1 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground">
        <Plus className="size-3" /> Add
      </button>
    </div>
  );
}

export default function BrandInputs() {
  return (
    <>
      <PageHeader
        eyebrow="Step 1"
        title="Brand Inputs"
        description="The source of truth for the brand and product. Everything downstream references this."
        actions={
          <Button>
            <Save className="size-4" /> Save inputs
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Brand" description="Who the brand is and how it sounds.">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Brand name</Label>
              <Input defaultValue={brandInputs.brandName} />
            </div>
            <div className="space-y-1.5">
              <Label>Tagline</Label>
              <Input defaultValue={brandInputs.tagline} />
            </div>
            <div className="space-y-1.5">
              <Label>Tone of voice</Label>
              <Input defaultValue={brandInputs.toneOfVoice} />
            </div>
            <div className="space-y-1.5">
              <Label>Brand values</Label>
              <TagList items={brandInputs.brandValues} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Product" description="What we're actually selling.">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Product name</Label>
              <Input defaultValue={brandInputs.productName} />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea defaultValue={brandInputs.productDescription} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Input defaultValue={brandInputs.category} />
              </div>
              <div className="space-y-1.5">
                <Label>Price point</Label>
                <Input defaultValue={brandInputs.pricePoint} />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Audience & market" description="Who we're talking to and against whom.">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Target audience</Label>
              <Textarea defaultValue={brandInputs.targetAudience} />
            </div>
            <div className="space-y-1.5">
              <Label>Competitors</Label>
              <Input defaultValue={brandInputs.competitors} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Benefits & guardrails" description="The proof and the do-nots.">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Key benefits</Label>
              <TagList items={brandInputs.keyBenefits} />
            </div>
            <div className="space-y-1.5">
              <Label>Do not use</Label>
              <Textarea defaultValue={brandInputs.doNotUse} />
              <p className="text-xs text-muted-foreground">
                Legal / brand restrictions that copy and visuals must respect.
              </p>
            </div>
            <Badge variant="accent">Referenced by Messaging Map →</Badge>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
