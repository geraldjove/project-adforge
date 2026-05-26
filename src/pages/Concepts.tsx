import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Copy, ImagePlus, Link as LinkIcon, Sparkles, Upload, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  clientAccounts,
  concepts,
  imagePrompts,
  productReferenceImages,
} from "@/data/mockData";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      <Copy className="size-4" />
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

export default function Concepts() {
  const [searchParams] = useSearchParams();
  const client = clientAccounts.find((item) => item.id === searchParams.get("client")) ?? clientAccounts[0];
  const productImages = React.useMemo(
    () => productReferenceImages.filter((image) => image.clientId === client.id),
    [client.id]
  );
  const [selectedConceptId, setSelectedConceptId] = React.useState(concepts[0]?.id ?? "");
  const [selectedProductImageId, setSelectedProductImageId] = React.useState(productImages[0]?.id ?? "");
  const selectedConcept = concepts.find((concept) => concept.id === selectedConceptId) ?? concepts[0];
  const selectedProductImage =
    productImages.find((image) => image.id === selectedProductImageId) ?? productImages[0];

  React.useEffect(() => {
    setSelectedProductImageId(productImages[0]?.id ?? "");
  }, [client.id, productImages]);

  return (
    <>
      <PageHeader
        eyebrow="Artist Tool"
        title={`${client.clientName} Ad Concept Generator`}
        description="Use the admin-approved concept, client context, and product references to generate image prompts for ad production."
        actions={
          <Button>
            <Sparkles className="size-4" />
            Generate prompts
          </Button>
        }
      />

      <div className="space-y-6">
        <SectionCard title="Assigned Concept Context" description="Concept and headline direction created by Admin and handed to the artist through the task brief.">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-1.5">
              <Label htmlFor="selected-concept">Assigned concept</Label>
              <Select id="selected-concept" value={selectedConceptId} onChange={(event) => setSelectedConceptId(event.target.value)}>
                {concepts.map((concept) => (
                  <option key={concept.id} value={concept.id}>
                    {concept.title}
                  </option>
                ))}
              </Select>
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent">{selectedConcept?.pillar}</Badge>
                  <Badge variant={selectedConcept?.withProduct ? "outline" : "secondary"}>
                    {selectedConcept?.withProduct ? "Product visible" : "No product"}
                  </Badge>
                </div>
                <p className="mt-3 text-lg font-bold">{selectedConcept?.headline}</p>
                <p className="mt-1 text-sm text-muted-foreground">{selectedConcept?.subhead}</p>
                <p className="mt-3 text-sm italic text-muted-foreground">{selectedConcept?.bigIdea}</p>
              </CardContent>
            </Card>
          </div>
        </SectionCard>

        <SectionCard title="Reference Uploads" description="Upload product images and ad inspiration references for the image generator.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <Label>Product image references</Label>
              <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 p-5 text-center transition-colors hover:border-primary/50 hover:bg-accent/40">
                <Upload className="size-6 text-muted-foreground" />
                <span className="mt-2 text-sm font-medium">Upload product image</span>
                <span className="mt-1 text-xs text-muted-foreground">Packshots, label details, angles, textures, or in-use product photos.</span>
                <input className="sr-only" type="file" accept="image/*" multiple />
              </label>
            </div>
            <div className="space-y-3">
              <Label>Ad inspiration references</Label>
              <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 p-5 text-center transition-colors hover:border-primary/50 hover:bg-accent/40">
                <ImagePlus className="size-6 text-muted-foreground" />
                <span className="mt-2 text-sm font-medium">Upload ad inspiration</span>
                <span className="mt-1 text-xs text-muted-foreground">Screenshots, swipe files, creative examples, or mood references.</span>
                <input className="sr-only" type="file" accept="image/*,.pdf" multiple />
              </label>
            </div>
            <div className="space-y-1.5 lg:col-span-2">
              <Label>Reference link</Label>
              <div className="flex gap-2">
                <Textarea placeholder="Paste ad library links, Figma references, Drive folders, or competitor examples..." />
                <Button variant="outline" size="icon" aria-label="Add reference link">
                  <LinkIcon className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Image Generation Prompts" description="Generate production-ready prompts with product references for Google Nano Banana or Google Imagen 3.">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="image-model">Image model</Label>
                <Select id="image-model">
                  <option>Google Nano Banana</option>
                  <option>Google Imagen 3</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="product-reference">Product image reference</Label>
                <Select
                  id="product-reference"
                  value={selectedProductImageId}
                  onChange={(event) => setSelectedProductImageId(event.target.value)}
                  disabled={productImages.length === 0}
                >
                  {productImages.length > 0 ? (
                    productImages.map((image) => (
                      <option key={image.id} value={image.id}>
                        {image.label} - {image.type}
                      </option>
                    ))
                  ) : (
                    <option>No product images uploaded</option>
                  )}
                </Select>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                {selectedProductImage ? (
                  <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
                    <div className={`h-28 rounded-md bg-gradient-to-br ${selectedProductImage.imageColor}`} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{selectedProductImage.label}</p>
                        <Badge variant="outline">{selectedProductImage.type}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{selectedProductImage.fileName}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{selectedProductImage.note}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No product image reference is attached to this client yet.</div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="generation-notes">Generation notes</Label>
                <Textarea
                  key={`${selectedConcept?.id}-${selectedProductImage?.id ?? "no-product"}`}
                  id="generation-notes"
                  defaultValue={`Create a polished ad image for "${selectedConcept?.title}" using the approved headline "${selectedConcept?.headline}". Use "${selectedProductImage?.label ?? "the uploaded product image"}" as the product reference for shape, packaging, label details, and material accuracy.`}
                />
              </div>
              <Button className="w-full">
                <Wand2 className="size-4" />
                Generate image prompts
              </Button>
            </div>

            <div className="grid gap-4">
              {imagePrompts.map((prompt) => (
                <Card key={prompt.id}>
                  <CardHeader className="gap-3 space-y-0 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-base">{prompt.conceptTitle}</CardTitle>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="accent">{prompt.model}</Badge>
                        <Badge variant="outline">{prompt.aspectRatio}</Badge>
                        <Badge variant={prompt.withProduct ? "outline" : "secondary"}>
                          {prompt.withProduct ? "Product visible" : "No product"}
                        </Badge>
                      </div>
                    </div>
                    <CopyButton text={prompt.prompt} />
                  </CardHeader>
                  <CardContent>
                    <p className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">{prompt.prompt}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Negative: {prompt.negativePrompt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SectionCard>

        <section className="rounded-lg border bg-accent/40 p-4">
          <div className="flex gap-3">
            <ImagePlus className="mt-0.5 size-5 text-accent-foreground" />
            <div>
              <p className="font-semibold text-accent-foreground">Artist production scope</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Admin owns concept/headline generation and final human verification. This tool is only for artist-side image prompt production from an approved task brief.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
