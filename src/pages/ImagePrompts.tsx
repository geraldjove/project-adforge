import * as React from "react";
import { Wand2, Copy, Check, Sparkles, Package, ImageOff } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { concepts, imagePrompts } from "@/data/mockData";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Button variant="outline" size="sm" onClick={onCopy}>
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

export default function ImagePrompts() {
  return (
    <>
      <PageHeader
        eyebrow="Step 5"
        title="Image Generation Prompts"
        description="Turn approved concepts into model-ready prompts for Midjourney, DALL·E, or your image API of choice."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <SectionCard title="Prompt builder" description="Generation is mocked — wire up your model later.">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Concept</Label>
                <Select>
                  {concepts.map((c) => (
                    <option key={c.id}>{c.title}</option>
                  ))}
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Model</Label>
                  <Select>
                    <option>Midjourney v6</option>
                    <option>DALL·E 3</option>
                    <option>Stable Diffusion 3</option>
                    <option>Imagen 3</option>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Aspect</Label>
                  <Select>
                    <option>4:5</option>
                    <option>1:1</option>
                    <option>9:16</option>
                    <option>16:9</option>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Style tags</Label>
                <Input placeholder="editorial, warm, dewy…" />
              </div>
              <div className="space-y-1.5">
                <Label>Direction notes</Label>
                <Textarea placeholder="What should the image show?" />
              </div>
              <Button className="w-full" disabled>
                <Sparkles className="size-4" /> Generate prompt (AI)
              </Button>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5 lg:col-span-2">
          {imagePrompts.map((p) => (
            <Card key={p.id}>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">{p.conceptTitle}</CardTitle>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant={p.withProduct ? "accent" : "secondary"} className="gap-1">
                      {p.withProduct ? <Package className="size-3" /> : <ImageOff className="size-3" />}
                      {p.withProduct ? "With product" : "Without product"}
                    </Badge>
                    <Badge variant="outline">{p.model}</Badge>
                    <Badge variant="outline">{p.aspectRatio}</Badge>
                  </div>
                </div>
                <Wand2 className="size-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Prompt</span>
                    <CopyButton text={p.prompt} />
                  </div>
                  <p className="text-sm leading-relaxed">{p.prompt}</p>
                </div>
                <div className="rounded-lg border border-dashed p-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Negative</span>
                  <p className="mt-1 text-sm text-muted-foreground">{p.negativePrompt}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.styleTags.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
